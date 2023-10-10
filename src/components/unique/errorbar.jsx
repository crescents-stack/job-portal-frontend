// eslint-disable-next-line react/prop-types
const ErrorBar = ({ props }) => {
  // eslint-disable-next-line react/prop-types
  const { text } = props;
  return text ? <span className="text-pink-600">{text}</span> : null;
};

export default ErrorBar;
