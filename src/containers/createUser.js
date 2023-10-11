import createUser from "../components/createUser/createUser";
import { connect } from "react-redux";
import { setUserData } from "../action/actions";

const mapStateToProps = (state, ownState) => ({
  userData: state.userReducer.userData,
  ...ownState,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => dispatch(setUserData(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(createUser);
