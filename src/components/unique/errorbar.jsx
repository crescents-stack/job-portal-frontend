// eslint-disable-next-line react/prop-types
const ErrorBar = ({ props }) => {
  // eslint-disable-next-line react/prop-types
  const { text } = props;
  return text ? <span style={{color: "red"}}>{text}</span> : null;
};

export default ErrorBar;
