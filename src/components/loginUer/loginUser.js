import React, { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Link,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import "./style.scss";

const userNameRejex = /^[a-zA-Z][a-zA-Z0-9._]{7,15}$/;
const emailrejex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passowrdRejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

const LoginUser = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [uname, setUName] = useState("");
  const [password, setPassword] = useState("");
  const [captchaField, setCaptchaField] = useState("");
  const [error, setError] = useState({
    flag: false,
    message: "",
  });
  const navigate = useNavigate();
  const [currentCaptcha, setCaptcha] = useState(
    Math.random().toString(36).slice(8)
  );
  const { setLoginUser, setUserData, setToast } = props;

  const refreshCaptcha = () => {
    setCaptcha(Math.random().toString(36).slice(8));
  };

  const successfullyLogin = (currentUser) => {
    if (currentUser.password === password) {
      setLoginUser(currentUser.uname);
      setUserData(currentUser.tasks);
      navigate("/dashboard");
      setToast({ flag: true, message: "Login Successfully" });
      setError({ flag: false, message: "" });
    } else {
      setError({ flag: true, message: "Incorrect Password" });
    }
  };

  const handleSubmit = () => {
    if (captchaField !== currentCaptcha) {
      setError({ flag: true, message: "Incorrect Captcha" });
    } else if (uname === "" || password === "") {
      setError({ flag: true, message: "Please Enter Valid Data" });
    } else if (userNameRejex.test(uname)) {
      const currentUserData = JSON.parse(localStorage.getItem("userData"));
      if (!passowrdRejex.test(password)) {
        setError({ flag: true, message: "Please Exter Proper Password" });
      } else {
        try {
          const currentUser = currentUserData.find((user) => {
            return user.uname === uname;
          });
          successfullyLogin(currentUser);
        } catch {
          setError({ flag: true, message: "No User Found" });
        }
      }
    } else if (emailrejex.test(uname)) {
      const currentUserData = JSON.parse(localStorage.getItem("userData"));
      if (!passowrdRejex.test(password)) {
        setError({ flag: true, message: "Please Exter Proper Password" });
      } else {
        try {
          const currentUser = currentUserData.find((user) => {
            return user.email === uname;
          });
          successfullyLogin(currentUser);
        } catch {
          setError({ flag: true, message: "No User Found" });
        }
      }
    }
  };
  return (
    <Grid>
      <Paper elevation={10} className="login_paper">
        <Grid align="center">
          <Avatar className="avtar-icon" color="primary">
            <AccountCircleIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        {/* <div className={`error_message ${error.flag && "show_message"}`}>
          {error.message}
        </div> */}
        <Alert
          sx={{
            display: error.flag ? "flex" : "none",
            flexDirection: "row",
            marginBottom: "5px",
          }}
          severity="error"
        >
          {error.message}
        </Alert>
        <Grid align="left">
          <TextField
            className="text-field"
            label="UserName/Email"
            placeholder="Uname/Email"
            fullWidth
            value={uname}
            onChange={(e) => setUName(e.target.value)}
            required
          />
          <TextField
            className="text-field"
            label="Password"
            placeholder="****"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                name="displayPassword"
                color="primary"
                onChange={() => {
                  setShowPassword(!showPassword);
                }}
              />
            }
            label="Visible Password"
          />
          <Link
            to="/createuser"
            color="primary"
            onClick={() => {
              navigate("/createuser");
            }}
          >
            Create New User
          </Link>
          <div className="captcha-field">
            <h3 className="captch-field">{currentCaptcha}</h3>
            <button onClick={refreshCaptcha} className="change_captcha">
              <Avatar className="avtar-icon" color="primary">
                <RefreshOutlinedIcon />
              </Avatar>
            </button>
          </div>
          <TextField
            className="text-field"
            label="CAPTCHA"
            fullWidth
            required
            value={captchaField}
            onChange={(e) => setCaptchaField(e.target.value)}
          />
          <Button
            className="login_button"
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default LoginUser;
