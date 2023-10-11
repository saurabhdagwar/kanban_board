import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TaskManagement from "../../containers/taskManagement";

const taskColumn = [
  { name: "Backlog", stage: 0 },
  { name: "To Do", stage: 1 },
  { name: "On Going", stage: 2 },
  { name: "Done", stage: 3 },
];
const Dashboard = (props) => {
  const { setUserData, setLoginUser, userData, loginUser } = props;
  const [openDrawer, setDrawer] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await setLoginUser("");
    navigate("/login");
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser !== "") {
      const getUserData = JSON.parse(localStorage.getItem("userData"));
      const currentData = getUserData.filter((user) => {
        return user.uname === loggedUser;
      })[0].tasks;
      setLoginUser(loggedUser);
      setUserData(currentData);
    }
  }, []);

  const list = () => {
    const checkCount = (passStage) => {
      return userData.filter((task) => {
        return task.stage === passStage;
      }).length;
    };
    const totalData = [`Total task`, `Completed Task`, `Pending Task`].map(
      (text, index) => {
        const completedCount = checkCount(3);
        switch (index) {
          case 0:
            return { text: text, count: userData.length };
          case 1:
            return { text: text, count: completedCount };
          case 2:
            return {
              text: text,
              count: userData.length - completedCount,
            };
          default:
            return {
              text: text,
              count: 0,
            };
        }
      }
    );
    const taskData = taskColumn.map((text, index) => {
      return { ...text, count: checkCount(index) };
    });
    return (
      <Box
        role="presentation"
        onClick={() => setDrawer(false)}
        onKeyDown={() => setDrawer(false)}
      >
        <List>
          {totalData.map((data, index) => (
            <ListItem key={data.text} disablePadding>
              <ListItemText
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "5px 20px",
                  "& p": {
                    marginLeft: "5px",
                  },
                }}
                primary={`${data.text}: `}
                secondary={data.count}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {taskData.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemText
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "5px 20px",
                  "& p": {
                    marginLeft: "5px",
                  },
                }}
                primary={`${text.name}: `}
                secondary={text.count}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <div className="user-dashboard">
      {/* <Paper elevation={10} className="dashboard_paper"> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={"left"}
            open={openDrawer}
            onClose={() => setDrawer(false)}
            onOpen={() => setDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Button
            color="secondary"
            variant="contained"
            sx={{ fontWeight: "800" }}
            onClick={() => logoutUser()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <TaskManagement taskColumn={taskColumn} />
      {/* </Paper> */}
    </div>
  );
};
export default Dashboard;
