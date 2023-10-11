import React, { Suspense, useState } from "react";
import "./App.css";
import "jquery-ui-dist/jquery-ui";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
const CreateUser = React.lazy(() => import("./containers/createUser"));
const Dashboard = React.lazy(() => import("./containers/dashboard"));
const LoginUser = React.lazy(() => import("./containers/loginUser"));

function App() {
  const [toast, setToast] = useState({
    flag: false,
    message: "",
  });
  const toastClose = () => {
    setToast({
      flag: false,
      message: "",
    });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const checkLogged = () => {
    const logginFlag = localStorage.getItem("loggedUser");
    if (logginFlag === "" || logginFlag === null) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginUser
                  setToast={setToast}
                  toast={toast}
                  toastClose={toastClose}
                />
              }
            />
            <Route
              path="/createuser"
              element={
                <CreateUser
                  setToast={setToast}
                  toast={toast}
                  toastClose={toastClose}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                checkLogged() ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={toast.flag}
          autoHideDuration={6000}
          onClose={toastClose}
        >
          <Alert onClose={toastClose} severity="success" sx={{ width: "100%" }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default App;
