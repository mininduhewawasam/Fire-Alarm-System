import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actionControllers/auth";

const TopNavigation = ({ user, logout, hasSensors }) => (
    <div className="TopNavigation">
        <Menu>
            <Menu.Item as={Link} to="/dashboard">
              Dashboard
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item
                    className="logout"
                    name='Logout'
                    onClick={() => logout()}
                />
            </Menu.Menu>
        </Menu>
    </div>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
