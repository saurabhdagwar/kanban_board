import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Input,
  Box,
  InputLabel,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./style.scss";
const nameRegex = /^[a-zA-Z -]+$/;
const userNameRejex = /^[a-zA-Z][a-zA-Z0-9._]{7,15}$/;
const emailrejex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passowrdRejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

const CreateUser = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [uname, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState({});
  const [error, setError] = useState({
    flag: false,
    message: "",
  });
  const { toastClose, setToast } = props;
  const navigate = useNavigate();

  const createNewUser = () => {
    let currentUserData = localStorage.getItem("userData");

    if (currentUserData === null || currentUserData === undefined) {
      currentUserData = [];
    } else {
      currentUserData = JSON.parse(currentUserData);
    }
    const updatedUserData = [
      ...currentUserData,
      {
        name: name,
        uname: uname,
        email: email,
        mobile: mobile,
        password: password,
        image: JSON.stringify(image.name),
        tasks: [],
      },
    ];
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    navigate("/login");
    setToast({ flag: true, message: "User Regestered Successfully" });
  };

  const handleSubmit = () => {
    if (!nameRegex.test(name)) {
      setError({ flag: true, message: "Name is not Valid" });
    } else if (!userNameRejex.test(uname)) {
      setError({ flag: true, message: "User Name is not Valid" });
    } else if (!emailrejex.test(email)) {
      setError({ flag: true, message: "Email is not Valid" });
    } else if (!passowrdRejex.test(password)) {
      setError({ flag: true, message: "Please Enter Valid Password" });
    } else {
      const getUserData = JSON.parse(localStorage.getItem("userData"));
      if (
        getUserData === undefined ||
        getUserData === null ||
        getUserData === []
      ) {
        setError({ flag: false, message: "" });
        createNewUser();
      } else {
        const checkUser = getUserData.filter((user) => {
          return user.uname === uname || user.email === email;
        });
        if (checkUser.length !== 0) {
          setError({ flag: true, message: "User is already Regestered" });
        } else {
          setError({ flag: false, message: "" });
          createNewUser();
        }
      }
    }
  };

  return (
    <Grid>
      <Paper elevation={10} className="create_paper">
        <Grid align="center">
          <Avatar className="avtar-icon">
            <PersonAddAltIcon />
          </Avatar>
          <h2>Create User</h2>
        </Grid>
        <Grid align="left">
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
          <TextField
            className="text-field"
            label="Name"
            placeholder="name"
            fullWidth
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            className="text-field"
            label="UserName"
            placeholder="u_name"
            fullWidth
            required
            value={uname}
            onChange={(e) => setUName(e.target.value)}
          />
          <TextField
            className="text-field"
            label="Email"
            placeholder="abc@domain.com"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="text-field"
            label="Contact Number"
            placeholder=""
            type="number"
            fullWidth
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Box className="input-field">
            <InputLabel>Profile Image</InputLabel>
            <Input
              type="file"
              label="Profile Image"
              fullWidth
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </Box>

          <TextField
            className="text-field"
            label="Password"
            placeholder="****"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default CreateUser;
