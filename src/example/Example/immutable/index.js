import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFoo, getBar } from "../../reducers/immutable";
import Example from "./Example";

function mapStateToProps ({ immutable }) {
  return {
    ...immutable
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
