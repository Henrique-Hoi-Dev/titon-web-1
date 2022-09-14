import { Grid, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "services/requests/useLogin";
import { signInRequest } from "store/modules/auth/actions";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";

import { Wrapper } from './styles'

const INITIAL_STATE = {
  username: null,
  password: null,
};

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState(INITIAL_STATE);

  const { error, isFetching } = useLogin(userData);

  const auth = useSelector((state) => state.auth);

  const token = auth?.token
  
  const showLoading = isFetching
  const showError = error

  useEffect(() => {
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [auth, token, navigate]);

  useEffect(() => {
    error && setUserData(INITIAL_STATE);
  }, [error]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(signInRequest(email, password));
  };

  return (
    <Wrapper>
      <Grid 
        container 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <Paper 
          elevation={3} 
          sx={{ 
            backgroundColor: "transparent!important",
            boxShadow: "none"
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Text
              fontSize={"110px"}
              id="title"
              sx={{ 
                fontWeight: "900", 
                color: "#df3237",
                marginBottom: "-24px!important", 
              }}
            >
              GABRA
            </Text>
            <Text
              fontSize={"27px"}
              sx={{ fontWeight: "900", color: "#3b3d90" }}
            >
              TRANSPORTE E LOGÍSTICA
            </Text>

            <Grid
              container
              justifyContent="center"
              direction="column"
              rowSpacing={3}
              p={4}
              minWidth="200px"
              width="400px"
              maxWidth="400px"
            >
              <Grid item>
                <Input
                  type="text"
                  placeholder={"E-mail"}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <Input
                  placeholder={"Senha"}
                  type={showPassword ? "text" : "password"}
                  onChange={(ev) => setPassword(ev.target.value)}
                  isPassword
                  onClick={() => setShowPassword(!showPassword)}
                  required
                />
              </Grid>
              {!showLoading && (
                <Grid item>
                  <Button
                    disableElevation
                    sx={{
                      fontSize: "14px",
                      color: "white",
                      minHeight: "40px",
                      backgroundColor: "#f93131",
                      ":hover": {
                        backgroundColor: "#f93131",
                      },
                    }}
                    fullWidth
                    type="submit"
                  >
                    Login
                  </Button>
                </Grid>
              )}
              {showLoading && <Loading />}
              {showError && !showLoading && (
                <Text center sx={{ mt: "10px" }} type="warning">
                  Usuário e/ou senha incorretos
                </Text>
              )}
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Wrapper>
  );
};

export default Login;
