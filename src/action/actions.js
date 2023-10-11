export const LOGIN_USER = "LOGIN_USER";
export const SET_USER_DATA = "SET_USER_DATA";

export const setLoginUser = (userId) => {
  return {
    type: LOGIN_USER,
    id: userId,
  };
};

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    data: data,
  };
};
