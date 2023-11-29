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
                Signup
            </Typography>
            <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                label="Phone Number"
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
                Signup
            </Button>
            <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 10 }}>
          Already have an account? <a href="#">Login here</a>
        </Typography>
    </Card>
    )
}