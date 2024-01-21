import Login from "@/Components/Login";
import User from "@/lib/User";
import dbConnect from "@/lib/dbConnect";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function login()
{
    const session = useSession();
    const router = useRouter();
    if(session.data)
    {
        router.push("/");
    }
    
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         console.group("here");
    //         console.log(session);
    //         console.log(session.data);
    //         if (session.data) {
    //             const email = session.data.user?.email;
    //             const username = session.data.user?.name;
    //             await dbConnect();
    //             // const user = await User.findOne({ email });
    //             const user=null;

    //             if (!user ) {
    //                 try {
    //                     const resp = await axios.post('http://localhost:3000/api/createNewUser', {
    //                         username: username,
    //                         email: email,
    //                         password: generateRandomPassword(12), // Change the length as needed
    //                     });

    //                     if (resp.data.message === 'User created successfully') {
    //                         router.push('/');
    //                     } else {
    //                         alert(resp.data.message);
    //                     }
    //                 } catch (error) {
    //                     console.error('Sign-up failed:',  'Unknown error');
    //                     // Handle the error and provide feedback to the user
    //                     alert('Sign-up failed. Please try again later.');
    //                 }
    //                 router.push('/');
    //             } else {
    //                 router.push('/');
    //             }
    //         }
    //     };

    //     fetchUserData();
    // }, [session]);
    // // 
    
    // function generateRandomPassword(length: number): string {
    //     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    //     let password = "";
    
    //     for (let i = 0; i < length; i++) {
    //         const randomIndex = Math.floor(Math.random() * charset.length);
    //         password += charset.charAt(randomIndex);
    //     }
    
    //     return password;
    // }
    
    return(
        <Login></Login>
    )
}