import { Button, Card, TextField, Typography } from "@mui/material";

export default function Login()
{

    const cardStyle = {
        maxWidth: 400,
        margin: 'auto',
        padding: 16,
        marginTop: 100,
    };

    return(
        <Card style={cardStyle}>
            <Typography variant="h5" component="div" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <Button variant="outlined"  fullWidth>
                Login
            </Button>
            <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 10 }}>
          Don't have an account? <a href="#">Create Account</a>
        </Typography>
    </Card>
    )
}