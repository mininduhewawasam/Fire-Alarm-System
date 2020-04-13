import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import LoginPage from "./components/user-login/LoginPage";
import DashboardPage from "./components/home/DashboardPage";
import SignupPage from "./components/user-register/SignupPage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";
import TopNavigation from "./components/navigationbar/TopNavigation";
import "./App.css";

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    {isAuthenticated && <TopNavigation />}

    <Route location={location} path="/" exact component={LoginPage} />

    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />

    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
