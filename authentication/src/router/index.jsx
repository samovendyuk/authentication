import { Routes, Route } from "react-router-dom";
import LoginOrRegister from "../components/choice/LoginOrRegistr";
import Login from "../components/login/Login";
import Register from "../components/register/Registration";
import Home from "../page/Home";
import ProtectedRoute from "../components/protected-route";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginOrRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
