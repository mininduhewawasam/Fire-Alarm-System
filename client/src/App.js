import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import LoginPage from "./components/user-login/LoginPage";
import DashboardPage from "./components/home/DashboardPage";
import UserRoute from "./routes/UserRoute";
import TopNavigation from "./components/navigationbar/TopNavigation";
import "./App.css";

const App = ({ location, isAuthenticated }) => (
    <div className="ui container ">
        <Route location={location} path="/" exact component={LoginPage} />

        {isAuthenticated && <TopNavigation />}
        <div className="main-content-wrapper">
            <UserRoute
            location={location}
            path="/dashboard"
            exact
            component={DashboardPage}
            />
        </div>
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
