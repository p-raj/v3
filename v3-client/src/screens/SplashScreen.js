import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import loadPersistantData from "../actions/loadPersistantData";
import refreshToken from "../actions/refreshToken";
import {FAILED, START} from "../common/constants";
import _ from "lodash";


class SplashScreen extends React.Component {
    // FIXME: remove code duplication
    // This needs to be done becoz
    // componentWillReceiveProps will not be fired if IDB data has already been loaded
    // So suppose user went to Memberships screen but the token was expired
    // so got redirected to auth screen.
    // After auth success he was sent to SplashScreen
    // but componentWillReceiveProps doesn't get called
    componentWillMount() {
        // try to load from idb first before we proceed
        if (!this.props.idb) return;

        // Now that we have loaded data from IDB
        // We have two cases, either we found nothing related to auth in idb
        // or we found auth

        // If auth is empty move to auth screen
        if (_.isEmpty(this.props.auth)) {
            this.props.router.replace('/auth');
            return;
        }

        // Check whether the token loaded from IDB is still valid
        let validTillTimestamp = this.props.auth.created_at_millis + (this.props.auth.expires_in * 1000);

        // If the token is out of date, try to get a new token using the refresh token loaded from idb
        if (new Date() > new Date(validTillTimestamp)) {
            // Check if refresh token is also expired using status code of earlier requests
            // If its FAILED then move to auth screen
            if (this.props.refreshToken.status === FAILED) {
                this.props.router.replace('/auth');
                return;
            }

            // If refresh token is valid make request.
            // Also make sure that the request is currently not running (status=START)
            if (this.props.refreshToken.status === START) {
                // The request has already been made wait for it to complete
                return;
            }

            this.props.dispatch(refreshToken(this.props.auth.refresh_token));

            return;
        }

        // TODO: Token is valid. Send to where we came from
        this.props.router.replace('/memberships');
    }

    componentWillReceiveProps(nextProps) {
        // try to load from idb first before we proceed
        if (!nextProps.idb) return;

        // Now that we have loaded data from IDB
        // We have two cases, either we found nothing related to auth in idb or we founf auth

        // If auth is empty move to auth screen
        if (_.isEmpty(nextProps.auth)) {
            this.props.router.replace('/auth');
            return;
        }

        // Check whether the token loaded from IDB is still valid
        let validTillTimestamp = nextProps.auth.created_at_millis + (nextProps.auth.expires_in * 1000);

        // If the token is out of date, try to get a new token using the refresh token loaded from idb
        if (new Date() > new Date(validTillTimestamp)) {
            // Check if refresh token is also expired using status code of earlier requests
            // If its FAILED then move to auth screen
            if (nextProps.refreshToken.status === FAILED) {
                this.props.router.replace('/auth');
                return;
            }

            // If refresh token is valid make request.
            // Also make sure that the request is currently not running (status=START)
            if (nextProps.refreshToken.status === START) {
                // The request has already been made wait for it to complete
                return;
            }

            this.props.dispatch(refreshToken(nextProps.auth.refresh_token));

            return;
        }

        // TODO: Token is valid. Send to where we came from
        this.props.router.replace('/memberships');
    }

    render() {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    componentDidMount() {
        // Dispatch action to load data from idb
        if (!this.props.idb) {
            this.props.dispatch(loadPersistantData())
        }
    }
}

// Redux wrapper
SplashScreen = connect((store) => {
    return {
        ...store
    }
})(SplashScreen);

// react-router wrapper
SplashScreen = withRouter(SplashScreen);

export default SplashScreen;