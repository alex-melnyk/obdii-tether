import {connect} from "react-redux";
import Settings from "../components/Settings";

export default connect(({drive}) => ({
    ...drive
}), {
})(Settings);