import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "./Login";
import { login } from "../../actionControllers/auth";

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
        <h1 className="login-heading">
          Welcome to Fire alarm monitoring system
        </h1>
        <div className="login-square">
          <h2>Login</h2>
          <LoginForm submit={this.submit} />
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
