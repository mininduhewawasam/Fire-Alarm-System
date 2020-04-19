import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSensors } from "../../actionControllers/sensors";

class DashboardPage extends React.Component {
  state = {
    data: {
      sensors: this.props.sensors,
    },
    errors: {},
  };

  componentDidMount = () => this.onInit(this.props);
  onInit = (props) => props.fetchSensors();

  render() {
    console.log(this.state.sensors);
    return <di></di>;
  }
}

DashboardPage.propTypes = {
  fetchSensors: PropTypes.func.isRequired,
  sensors: PropTypes.arrayOf(
    PropTypes.shape({
      sensorId: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    sensors: state.sensors.data,
  };
}

export default connect(mapStateToProps, { fetchSensors })(DashboardPage);
