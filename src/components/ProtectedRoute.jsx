import { useContext, useEffect } from "react";
import { FakeAuthContext } from "../contexts/FakeAuthProvider";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const { isAuth } = useContext(FakeAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};
