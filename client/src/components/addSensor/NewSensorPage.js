import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import SensorForm from "./AddSensor";
import { createBook } from "../../actionControllers/books";

class NewSensorPage extends React.Component {
  state = {
    sensor: null
  };

  onSensorSelect = sensor => {
    this.setState({ sensor });
    axios
      .get(`/api/sensor/fetchPages`)
      .then(res => res.data.pages)
      .then(pages => this.setState({ sensor: { ...sensor, pages } }));
  };

  addSensor = sensor =>
    this.props
      .createBook(sensor)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <Segment>
        <h1>Add new Sensor to your collection</h1>
        {this.state.book && (
          <SensorForm submit={this.addSensor} sensor={this.state.sensor} />
        )}
      </Segment>
    );
  }
}

NewBookPage.propTypes = {
  createSensor: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createSensor })(NewSensorPage);
