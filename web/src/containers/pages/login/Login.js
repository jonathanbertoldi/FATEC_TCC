import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import * as authActions from '../../../actions/authActions';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { windowStyle, loginStyle, loginTitleStyle, logoStyle } from './style';

import Logo from '../../../tully.svg';

class Login extends Component {

    constructor(props) {
        super(props);

        // binds dos métodos da classe
        this.handleRequestClose = this.handleReqeustClose.bind(this);
        this.handleLogin        = this.handleLogin.bind(this);

        // state
        this.state = {
            inputPasswordError: "",
            inputUserError    : "",
            snackbarOpen      : false
        }
    }

    handleLogin() {
        if (this.validateInputs()) {
            var credentials = {
                username: this.refs.inputUser.getValue(),
                password: this.refs.inputPassword.getValue()
            }
            this.props.loginAdmin(credentials)
                .then(() => console.log("Administrador logado com sucesso"), this.handleRequestOpen);
        }
    }

    isUserInputValid = () => this.refs.inputUser.getValue().length > 0;

    isPasswordInputValid = () => this.refs.inputPassword.getValue().length > 0;

    validateInputs = () => {
        var r = true;
        this.clearInputErrors();
        if(!this.isUserInputValid()) {
            this.setState({ inputUserError: "Digite um login" });
            r = false;
        }
        if(!this.isPasswordInputValid()) {
            this.setState({ inputPasswordError: "Digite uma senha" });
            r = false;
        }
        return r;
    }

    clearInputErrors = () => this.setState({ inputUserError: "", inputPasswordError: "" });

    handleRequestOpen = () => {
        if (this.props.auth.errorMessage.length > 0) {
            this.setState({ snackbarOpen : true });
        }
    }

    handleReqeustClose = () => this.setState({ snackbarOpen: false });

    componentWillMount() {
        if (this.props.auth.isAuthenticated === false) {
            browserHistory.push("/");
        }
    }

    render() {
        return (
            <div style={ windowStyle } >
                <div style={ loginStyle } >
                    <div style={ loginTitleStyle } >
                        <img src={ Logo } style={ logoStyle } alt="Tully" />
                    </div>
                    <TextField floatingLabelText="User" 
                        errorText={this.state.inputUserError} 
                        fullWidth={true} 
                        ref="inputUser" />
                    <TextField floatingLabelText="Password" 
                        errorText={this.state.inputPasswordError} 
                        fullWidth={true} 
                        type="password" 
                        ref="inputPassword" />
                    <span style={{ margin: "10px", width: "100%" }}></span>
                    <RaisedButton label="Entrar" 
                        primary={true} 
                        fullWidth={true} 
                        onTouchTap={this.handleLogin} />
                    <Snackbar open={this.state.snackbarOpen}
                        message={this.props.auth.errorMessage}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;

    return {
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);