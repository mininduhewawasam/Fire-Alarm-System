import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import DeleteModal from "./DeleteModal";
import { fetchSensors } from "../../actionControllers/sensors";
import { Card, Button, Image } from "semantic-ui-react";
import Inactive from './Inactive.png';
import Active from './active.jpg';

class DashboardPage extends React.Component {
  state = {
    editSensorModalState: false,
    removeSensorModalState: false,
  };

  componentDidMount = () => this.props.fetchSensors();

  handleRemoveSensorModalState(state) {
    this.setState({ removeSensorModalState: state });
  }

  handleEditSensorModalState(state) {
    this.setState({ editSensorModalState: state });
  }

  removeSensor = (selectedSensor) => {
    const data = {
      sensorId: selectedSensor.sensorId,
      roomId: selectedSensor.floorNo,
      ownerId: selectedSensor.ownerId,
      locationId: selectedSensor.locationId,
      floorId: selectedSensor.floorId,
      name: selectedSensor.sensorName,
    };
    axios
      .get(`/api/sensor`, { data })
      .then((res) => res.data.pages)
      .then(this.handleRemoveSensorModalState(false))
      .then(this.props.location.reload());
  };

  render() {
    return (
      <div className="page-wrapper">
      <Card.Group itemsPerRow={4}>
        {this.props.sensors &&
          this.props.sensors.map((sensor) => {
            return (
                <Card>
                  <Card.Content>
                    {(sensor.status && sensor.status === 1) ? (
                      <Image
                        floated="right"
                        size="mini"
                        src={Active}
                      />
                    ) : (
                      <Image
                        floated="right"
                        size="mini"
                        src={Inactive}
                      />
                    )}
                    <Card.Header>{sensor.sensorName ? sensor.sensorName : "N/A"}</Card.Header>
                    <Card.Description>
                      Sensor Status : <strong>{sensor.status ? sensor.status : "N/A"}</strong><br/>
                      Room Number   : <strong>{sensor.roomNo ? sensor.roomNo : "N/A"}</strong><br/>
                      Room Number   : <strong>{sensor.floorNo ? sensor.floorNo : "N/A"}</strong><br/>
                      location Name : <strong>{sensor.locationName ? sensor.locationName : "N/A"}</strong><br/>
                      Co2 Level     : <strong>{sensor.co2Value ? sensor.co2Value : "N/A"}</strong><br/>
                      Smoke Level   : <strong>{sensor.smokeLevel ? sensor.smokeLevel : "N/A"}</strong><br/>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button basic color="green">
                        Edit
                      </Button>
                      <Button basic color="red">
                        Delete
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
            );
          })}
      </Card.Group>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  fetchSensors: PropTypes.func.isRequired,
  sensors: PropTypes.arrayOf(
    PropTypes.shape({
      sensorId: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    sensors: state.sensors.sensors,
  };
}

export default connect(mapStateToProps, { fetchSensors })(DashboardPage);
