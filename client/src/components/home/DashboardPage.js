import React from "react";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchSensors();

  render() {
    return (
      <div>
        Hi Malith
      </div>
    );
  }
}

// DashboardPage.propTypes = {
//   isConfirmed: PropTypes.bool.isRequired,
//   fetchSensors: PropTypes.func.isRequired,
//   sensors: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired
//     }).isRequired
//   ).isRequired
// };

// function mapStateToProps(state) {
//   return {
//     isConfirmed: !!state.user.confirmed,
//     sensors: allSensorsSelector(state)
//   };
// }

// export default connect(mapStateToProps, { fetchSensors })(DashboardPage);
export default DashboardPage;