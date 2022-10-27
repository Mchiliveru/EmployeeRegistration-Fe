import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Helper_Contants, ROUTE_VALUES } from "./helper.constants";
import { getSessionVariable } from "./session.maintainance";

export const useRouting = () => {
  const navigate = useNavigate();
  const userId = getSessionVariable(Helper_Contants.USERINFO);
  const goToRoute = (route) => {
    navigate(route);
  };
  return { goToRoute };
};

export const PrivateRoute = () => {
  const userInfo = JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
  return userInfo && userInfo.id ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_VALUES.LOGIN} />
  );
};
