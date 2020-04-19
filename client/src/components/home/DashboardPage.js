import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSensors } from "../../actionControllers/sensors";
import { Card, Button, Image } from "semantic-ui-react";

class DashboardPage extends React.Component {
  state = {
    errors: {},
  };

  componentDidMount = () => this.onInit(this.props);
  onInit = (props) => props.fetchSensors();

  render() {
    console.log(this.props.sensors);
    return (
      <div>
        {this.props.sensors &&
          this.props.sensors.map((sensor) => {
            return (
              <div>
                <Card.Group>
                  <Card>
                    <Card.Content>
                      {(sensor.status && sensor.status === 1) ? (
                        <Image
                          floated="right"
                          size="mini"
                          src="add gree image"
                        />
                      ) : (
                        <Image
                          floated="right"
                          size="mini"
                          src="add red image"
                        />
                      )}
                      <Card.Header>{sensor.name ? sensor.name : "N/A"}</Card.Header>
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
                </Card.Group>
              </div>
            );
          })}
      </div>
    );
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
  console.log(state);
  return {
    sensors: state.sensors.sensors,
  };
}

export default connect(mapStateToProps, { fetchSensors })(DashboardPage);
