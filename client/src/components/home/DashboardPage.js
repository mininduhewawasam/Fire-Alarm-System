import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSensors } from "../../actionControllers/sensors";
import { Card, Image } from "semantic-ui-react";
import Inactive from "./Inactive.png";
import Active from "./active.jpg";

class DashboardPage extends React.Component {
  componentDidMount = () => this.props.fetchSensors();

  render() {
    return (
      <div className="page-wrapper">
        <Card.Group itemsPerRow={4}>
          {this.props.sensors &&
            this.props.sensors.map((sensor,index) => {
              return (
                <Card key={index}>
                  <Card.Content className={((sensor.smokeLevel && sensor.co2Value) >=2 ? 'dangerLevel' : 'noDanger' )}>
                    {sensor.status && sensor.status === 1 ? (
                      <Image floated="right" size="mini" src={Active} />
                    ) : (
                      <Image floated="right" size="mini" src={Inactive} />
                    )}
                    <Card.Header>
                      {sensor.sensorName ? sensor.sensorName : "N/A"}
                    </Card.Header>
                    <Card.Description>
                      Sensor Status :
                      <strong>
                        {sensor.status
                          ? sensor.status === 0
                            ? false
                            : true
                          : "N/A"}
                      </strong>
                      <br />
                      Room Number :{" "}
                      <strong>{sensor.roomNo ? sensor.roomNo : "N/A"}</strong>
                      <br />
                      Room Number :{" "}
                      <strong>{sensor.floorNo ? sensor.floorNo : "N/A"}</strong>
                      <br />
                      location Name :{" "}
                      <strong>
                        {sensor.locationName ? sensor.locationName : "N/A"}
                      </strong>
                      <br />
                      Co2 Level :{" "}
                      <strong>
                        {sensor.co2Value ? sensor.co2Value : "N/A"}
                      </strong>
                      <br />
                      Smoke Level :{" "}
                      <strong>
                        {sensor.smokeLevel ? sensor.smokeLevel : "N/A"}
                      </strong>
                      <br />
                    </Card.Description>
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
  fetchSensors: PropTypes.func.isRequired,
  sensors: PropTypes.arrayOf(
    PropTypes.shape({
      sensorId: PropTypes.number.isRequired,
    }).isRequired
  )
};

function mapStateToProps(state) {
  return {
    sensors: state.sensors.sensors,
  };
}

export default connect(mapStateToProps, { fetchSensors })(DashboardPage);
