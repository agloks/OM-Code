import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import ProfileViewModel from "./Profile.ViewModel";
import { setUser } from "../../redux/userSlice";

export default function ProfileView() {
  const vm = new ProfileViewModel();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('password') as String === '') {
      alert('Password é obrigatório!');
      return;
    }
    
    vm.update(user.id as number, data.get('email') as string, data.get('password') as string, data.get('firstName') as string, data.get('lastName') as string).then((data) => {
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
                  defaultValue={user.firstName}
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
                  defaultValue={user.lastName}
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
                  defaultValue={user.email}
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
          </Box>
        </Box>
      </Container>
  );
}
