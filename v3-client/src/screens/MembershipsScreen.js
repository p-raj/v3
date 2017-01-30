import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import getMemberships from "../actions/getMemberships";
import {FAILED, START} from "../common/constants";
import _ from "lodash";
import Thumbnail from "../components/Thumbnail";
import Runtime from "../components/Runtime";


class MembershipsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberships: [],
            selectedIndex: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        // Make sure token has not expired
        if (nextProps.memberships.status === FAILED && nextProps.memberships.statusCode === 401) {
            // Token has expired but not by timeout so move to login screen
            this.props.router.replace('/auth');
        }
    }

    render() {
        if (this.props.memberships.status === START) {
            return (
                <p>Loading memberships</p>
            )
        }

        if (_.isEmpty(this.props.memberships.results)) {
            return (
                <p>No membership data available</p>
            )
        }

        // Memberships results is not empty
        // FIXME: render is called multiple times. We should not create variables here.
        let thumbs = [];
        let index = 0;
        for (let item of this.props.memberships.results) {

            thumbs.push(<Thumbnail url={item.organization.logo}
                                   key={item.id}
                                   index={index}
                                   onClick={this.onThumbClicked.bind(this,index)}/>
            );

            index++;
        }

        return (
            <div>
                <div>
                    {thumbs}
                </div>

                <div>
                    <Runtime data={this.props.memberships.results[this.state.selectedIndex]}
                             key={this.props.memberships.results[this.state.selectedIndex].id}/>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.dispatch(getMemberships(this.props.auth.access_token));
    }

    onThumbClicked(index) {
        this.setState({
            selectedIndex: index
        })
    }
}

// Redux wrapper
MembershipsScreen = connect((store) => {
    return {
        ...store
    }
})(MembershipsScreen);

// react-router wrapper
MembershipsScreen = withRouter(MembershipsScreen);

export default MembershipsScreen ;