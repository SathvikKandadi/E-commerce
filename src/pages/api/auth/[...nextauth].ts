import NextAuth, { Account, Awaitable } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Provider } from "next-auth/providers/index";
import * as bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/User";
import type { User as NextAuthUser } from 'next-auth';
import { Profile } from "next-auth";
import axios from "axios";
import { JWTOptions } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";



const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;

if (!clientId) {
  console.error("clientId is not defined in the environment variables.");
  process.exit(1);
}

if (!clientSecret) {
  console.error("clientSecret is not defined in the environment variables.");
  process.exit(1);
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        if (!credentials) {
          return null;
        }
        const username = credentials.username;
        const password = credentials.password;
        console.log(username);
        console.log(password);
        const user = await User.findOne({ username });
        if (!user) {
          console.log("No such user found!");
          return null;
        } else {
          try {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
              console.log("success");
              return {
                id: user._id,
                email: user.email,
                name: user.username,
              };
            } else {
              console.log("Sign in Failed");
              return null;
            }
          } catch (error) {
            console.error("Error comparing passwords:", error);
            console.log("error");
            return null;
          }
        }
      },
    }),
  ] as Provider[],
  callbacks: {
    async signIn(params: {
      user: NextAuthUser | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
      email?: {
        verificationRequest?: boolean | undefined;
      } | undefined;
      credentials?: Record<string, any> | undefined;
    }): Promise<boolean> {
      const { account, profile } = params;
      console.log("Call Back");
      console.log(profile);
      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error("No profile");
        }
        const email = profile.email;
        const username = profile.name;
        await dbConnect();
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
          try {
            const resp = await axios.post("http://localhost:3000/api/createNewUser", {
              username: username,
              email: email,
              password: generateRandomPassword(12), // Change the length as needed
            });

            if (resp.data.message === "User created successfully") {
              console.log(resp.data);
            } else {
              alert(resp.data.message);
            }
          } catch (error) {
            console.error("Sign-up failed:", "Unknown error");
            alert("Sign-up failed. Please try again later.");
          }
        } else {
          console.log("In else");
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    encryption: true,
  } as Partial<JWTOptions>,
  pages: {
    signIn: "/signin",
  },
};

function generateRandomPassword(length: number): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

export default NextAuth(authOptions);










































































