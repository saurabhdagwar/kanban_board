const initialState = {
  userData: [],
  loginUser: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      localStorage.setItem("loggedUser", action.id);
      return {
        ...state,
        loginUser: action.id,
      };

    case "SET_USER_DATA":
      const getUserData = JSON.parse(localStorage.getItem("userData"));
      const updatedUserData = getUserData.map((user) => {
        if (user.uname === state.loginUser) {
          return { ...user, tasks: [...action.data] };
        }
        return user;
      });

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      return {
        ...state,
        userData: action.data,
      };
    default:
      return state;
  }
};
