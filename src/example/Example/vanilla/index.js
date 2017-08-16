import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFoo, getBar } from "../reducers/vanilla";
import Example from "./Example";

function mapStateToProps ({ vanilla }) {
  return {
    ...vanilla
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators (
    {
      getFoo,
      getBar
    },
    dispatch
  );
}

export default connect (mapStateToProps, mapDispatchToProps) (Example);
