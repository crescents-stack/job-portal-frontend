/* eslint-disable react/prop-types */
import Skeleton from "@mui/material/Skeleton";
const Loader = ({ loader }) => {
  return loader ? (
    <div className="space-y-8">
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <Skeleton
            key={item}
            variant="rectangular"
            animation="wave"
            width="100%"
            height="50px"
          />
        );
      })}
    </div>
  ) : null;
};

export default Loader;
