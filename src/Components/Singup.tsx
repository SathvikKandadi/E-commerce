import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import axios from "axios";

const Signup: NextPage = () => {
    const cardStyle = {
        maxWidth: 400,
        margin: 'auto',
        padding: 16,
        marginTop: 100,
    };

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const session = useSession();
    const router = useRouter();
    const apiUrl = process.env.NEXT_APP_API_URL || 'http://localhost:3000';

    if (session.data)
        router.push("/");

    const handleSignIn = async () => {


        const result = await signIn('credentials', {
            username,
            password,
            redirect: false, // Redirect is handled on the client side
        });


        if (result && !result.error) {
            // Redirect to a different page upon successful sign-in
            //   window.location.href = '/home';
            console.log("Sucessfull");
            router.push('/');

        } else {
            // Handle sign-in error
            console.error('Sign-in failed:', (result) ? result.error : "error");
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            alert("Required credentials are empty");
        } else {
            try {
                const resp = await axios.post(`${apiUrl}/api/createNewUser`, {
                    username: username,
                    email: email,
                    password: password,
                });
                if (resp.data.message === "User created successfully") {
                    console.log(resp);
                    console.log(resp.data);
                    handleSignIn();
                }
                else {
                    alert(resp.data.message);
                }
            } catch (error: any) {
                console.error('Sign-up failed:', error.response?.data || error.message || 'Unknown error');
                // Handle the error and provide feedback to the user
                alert(error.response?.data.message || "Sign-up failed. Please try again later.");
                // alert("Sign-up failed. Please try again later.");
            }
        }
    };


    return (
        <div className="mb-10">
            <Card style={cardStyle}>
                <Typography variant="h5" component="div" gutterBottom>
                    Signup
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="outlined" fullWidth onClick={handleSignUp}>
                    Signup
                </Button>
                <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 10 }}>
                    Already have an account? <a href="/signin">Login here</a>
                </Typography>
            </Card>
        </div>

    )
}

export default Signup;