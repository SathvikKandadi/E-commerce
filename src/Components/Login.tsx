import { NextPage } from 'next';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { Button, Card, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { useRouter } from 'next/router';


const SignIn: NextPage = () => {
  const router = useRouter();
  const session = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

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
      alert("Invalid Credentials");
      setUsername("");
      setPassword("");
      console.error('Sign-in failed:', (result) ? result.error : "error");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google');
  };


  const cardStyle = {
    maxWidth: 400,
    margin: "auto",
    padding: 16,
    marginTop: 100,
    marginBottom: 140
  };

  return (
    <Card style={cardStyle}>
      <Typography variant="h5" component="div" gutterBottom>
        Sign in
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        margin="normal"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="outlined" fullWidth onClick={handleSignIn}>
        Sign In
      </Button>
      <button className='rounded-full border-2 border-slate-500 w-full mt-4 p-2' onClick={handleGoogleSignIn}><GoogleIcon style={{ fontSize: "large" }} /> Sign in with Google</button>
      <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 10 }}>
        Don't have an account? <a href="/signup">Create Account</a>
      </Typography>
    </Card>
  )
}

export default SignIn;