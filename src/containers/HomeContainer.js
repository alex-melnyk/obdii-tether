import {connect} from "react-redux";
import Home from "../components/Home";
import {obdiiConnect, obdiiDisconnect} from "../store/actions/OBDIIActions";

export default connect(({app, drive}) => ({
    ...app,
    ...drive
}), {
    obdiiConnect,
    obdiiDisconnect
})(Home);