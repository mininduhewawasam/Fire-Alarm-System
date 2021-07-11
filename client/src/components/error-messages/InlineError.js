import React from "react";
import PropTypes from "prop-types";

const InlineError = ({ text }) => (
  <span className="error-fire" style={{ color: "#ae5856" }}>{text}</span>
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
