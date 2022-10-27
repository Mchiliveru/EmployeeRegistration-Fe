import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LazyLoader from "./components/molecules/lazyLoader/index";
import { ROUTE_VALUES } from "./helpers/helper.constants";
import { PrivateRoute } from "./helpers/routing.helper";
import AddMultipleEmployee from "./pages/AddMultipleEmployee";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Registration = lazy(() => import("./pages/Registration"));
const EmployeeOverview = lazy(() => import("./pages/EmployeeOverview"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddSingleEmployee = lazy(() => import("./pages/AddSingleEmployee"));

function App() {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Routes>
        <Route path={ROUTE_VALUES.HOME} element={<PrivateRoute />}>
          <Route path={ROUTE_VALUES.HOME} element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route
              path={`${ROUTE_VALUES.EMPLOYEEDETAILS}/:id`}
              element={<EmployeeOverview />}
            />
            <Route
              path={`${ROUTE_VALUES.ADDSINGLE}`}
              element={<AddSingleEmployee />}
            />
            <Route 
              path={`${ROUTE_VALUES.ADDMULIPLE}`}
              element={<AddMultipleEmployee />}
            />
          </Route>
        </Route>
        <Route path={ROUTE_VALUES.LOGIN} element={<Login />} />
        <Route path={ROUTE_VALUES.REGISTRATION} element={<Registration />} />
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
