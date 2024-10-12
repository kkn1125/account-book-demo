import Home from "@pages/Home";
import Layout from "@templates/Layout";
import { Route, Routes } from "react-router-dom";

function Router() {
  return (
    <Routes>
      <Route path='/'>
        <Route element={<Layout />}>
          <Route path='' element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
