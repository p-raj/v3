import React from "react";
import {connect} from "react-redux";
import {TextInput, Button, View} from "react-native";
import _ from "lodash";
import auth from "../actions/auth";
import {SUCCESS} from "../common/constants";

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
};


class AuthScreen extends React.Component {
    constructor(props) {
        super(props);

        // Don't set to undefined by default instead use empty string.
        // http://stackoverflow.com/a/38015169/5463404
        this.state = {
            username: '',
            password: ''
        };

        this.onLoginClicked = this.onLoginClicked.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.status === SUCCESS) {
            // Move to splash screen which will redirect to proper screen
            this.props.router.replace('/');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Enter username"
                    onChangeText={this.onUserNameChange}
                    value={this.state.username}/>
                <TextInput
                    placeholder="Enter password"
                    onChangeText={this.onPasswordChange}/>

                <Button title="Login"
                        onPress={this.onLoginClicked}/>
            </View>
        )
    }

    componentDidMount() {
        // Don't load data from idb
        // Doing that will fire componentWillReceiveProps
        // If we have status success stored in IDB for previous auth request
        // then we will move to Splash Screen
    }

    onUserNameChange(username) {
        this.setState({
            username: _.trim(username)
        });
    }

    onPasswordChange(password) {
        this.setState({
            password: _.trim(password)
        });
    }

    onLoginClicked() {
        this.props.dispatch(auth(this.state.username, this.state.password));
    }
}


// Redux wrapper
AuthScreen = connect((store) => {
    return {
        ...store
    }
})(AuthScreen);


export default AuthScreen;