import dashboard from "../components/dashboard/dashboard";
import { connect } from "react-redux";
import { setUserData, setLoginUser } from "../action/actions";

const mapStateToProps = (state) => ({
  userData: state.userReducer.userData,
  loginUser: state.userReducer.loginUser,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => dispatch(setUserData(data)),
  setLoginUser: (data) => dispatch(setLoginUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
