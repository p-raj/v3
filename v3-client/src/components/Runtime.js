import React from "react";
import {connect} from "react-redux";
import getRuntimes from "../actions/getRuntimes";
import _ from "lodash";
import {START} from "../common/constants";


class Runtime extends React.Component {
    render() {

        if (this.props.runtimes.status === START) {
            return (
                <div>
                    <p>runtime_locker_uuid = {this.props.data.runtime_locker_uuid}</p>
                    <p>Getting runtimes</p>
                </div>
            )
        }

        if (!this.props.data.runtime_locker_uuid || _.isEmpty(this.props.runtimes.results)) {
            return (
                <div>
                    <p>runtime_locker_uuid = {this.props.data.runtime_locker_uuid}</p>
                    <p>No runtime available</p>
                </div>
            )
        }

        return (
            <div>
                <p>runtime_locker_uuid = {this.props.data.runtime_locker_uuid}</p>
                <p>Widget locker UUID {this.props.runtimes.results[0].widget_locker_uuid}</p>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.data.runtime_locker_uuid) {
            this.props.dispatch(
                getRuntimes(this.props.auth.access_token, this.props.data.runtime_locker_uuid));
        }
    }
}

// Redux wrapper
Runtime = connect((store) => {
    return store
})(Runtime);

export default Runtime;