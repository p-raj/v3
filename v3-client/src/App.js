import React from "react";
import {Provider} from "react-redux";
import store from "./store";
import AuthScreen from "./screens/AuthScreen";
import { nativeHistory, Route, Router,} from 'react-router-native';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={nativeHistory}>
                    <Route path="/" component={AuthScreen}/>
                </Router>
            </Provider>
        )
    }
}
