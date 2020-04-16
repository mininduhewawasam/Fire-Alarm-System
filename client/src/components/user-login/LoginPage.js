import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "./Login";
import { login } from "../../actionControllers/auth";
import './login.css';

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
          <h1 className="login-heading">Welcome to Fire Alarm Monitoring System</h1>
        <img className="wave" src={`/images/login/wave.png`} alt="Wave" />
        <div className="container-fire-login">
          <div className="img">
              <img src={`/images/login/bg1.svg`} alt="BG"/>
          </div>
          <div className="login-content">
              <LoginForm submit={this.submit} />
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
