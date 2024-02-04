/* eslint-disable react/prop-types */
const Loader = ({ loader }) => {
  return loader ? (
    <div className="min-h-[200px] h-[250px] bg-gray-300 animate-pulse rounded w-full my-10">Loading...</div>
  ) : null;
};

export default Loader;
