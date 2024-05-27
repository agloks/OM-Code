import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignUpViewModel, { StructuredData } from "./SignUp.ViewModel";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

export default function SignUpView() {
  const vm = new SignUpViewModel();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const structuredData : StructuredData = {
      'email': data.get('email') as string,
      'password': data.get('password') as string,
      'firstName': data.get('firstName') as string,
      'lastName': data.get('lastName') as string,
    }

    for(const key in structuredData) {
      if(structuredData[key] === '') {
        alert(key + ' é obrigatório!');
        return;
      }
    }

    vm.signUp(structuredData['email'], structuredData['password'], structuredData['firstName'], structuredData['lastName']).then((data) => {
      if (data.hasOwnProperty('user')) {
        dispatch(setUser(data["user"]));
        navigate('/users-list');
      } else {
        alert('Error ao fazer cadastro: \n' + data.message);
      }
    }).catch((error) => {
      alert('Error ao fazer cadastro: \n' + error.message);
    });
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {vm.mainText}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Primeiro Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {vm.buttonText}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in">
                  {vm.linkSignInText}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
