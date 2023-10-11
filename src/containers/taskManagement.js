import taskManage from "../components/taskManagement/taskManage";
import { connect } from "react-redux";
import { setUserData, setLoginUser } from "../action/actions";

const mapStateToProps = (state, ownState) => ({
  userData: state.userReducer.userData,
  ...ownState,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => dispatch(setUserData(data)),
  setLoginUser: (data) => dispatch(setLoginUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(taskManage);
