import React from "react";
import Validator from "validator";
import PropTypes from "prop-types";
import InlineError from "../error-messages/InlineError";
import { Form, Button, Message } from "semantic-ui-react";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <img src={`/images/login/profile1.svg`} alt="Profile" />
        <h2 className="title">Login</h2>
        {errors.msg && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.msg}</p>
          </Message>
        )}

        <div className={`input-div one`} >
          <div className="i">
            <i className="fas fa-user"></i>
          </div>
          <div className="div">
            <Form.Field error={!!errors.email}>
              <input
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={this.onChange}
              />
              {errors.email && <InlineError text={errors.email} />}
            </Form.Field>
          </div>
        </div>
        <div className={`input-div pass`}>
          <div className="i">
            <i className="fas fa-lock"></i>
          </div>
          <div className="div">
            <Form.Field error={!!errors.password}>
              <input
                  placeholder="password"
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password} />}
            </Form.Field>
          </div>
        </div>
        <Button className="fire-login-btn">Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
