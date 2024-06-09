import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
