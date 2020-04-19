import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actionControllers/auth";

const TopNavigation = ({ user, logout, hasSensors }) => (
    <div className="TopNavigation">
        <div className="logout">
            <p onClick={() => logout()}>Logout</p>
        </div>
        <Menu fluid vertical tabular>
            <Menu.Item as={Link} to="/dashboard">
              Dashboard
            </Menu.Item>
            {hasSensors && (
              <Menu.Item as={Link} to="/books/new" >
                Add New Sensor
              </Menu.Item>
            )}
        </Menu>
    </div>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  sensors: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    sensors: state.sensors
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
