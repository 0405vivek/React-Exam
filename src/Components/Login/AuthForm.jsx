

import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  signINAsync,
  signUpAsync,
  googleSignInAsync,
  checkAuthState,
  signOutAsync,
} from "../../Services/Actions/authAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password are required!");
      return;
    }
    if (isSignup) {
      dispatch(signUpAsync({ email, password }));
    } else {
      dispatch(signINAsync({ email, password }));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(googleSignInAsync());
    toast.info("Redirecting to Google Sign In...");
  };

  const handleLogout = () => {
    dispatch(signOutAsync());
    toast.info("Logged out successfully!");
  };

  return (
    <Container className="my-5" style={{ maxWidth: "500px" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="mb-4 text-center">{isSignup ? "Create Account" : "Sign In"}</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100 btn-orange fw-bold text-white mb-2"
        >
          {isSignup ? "Create Account" : "Login"}
        </Button>

        <Button
          variant="danger"
          className="w-100 mb-3"
          onClick={handleGoogleLogin}
        >
          {isSignup ? "Sign up with Google" : "Sign in with Google"}
        </Button>

        <div className="text-center">
          {isSignup ? (
            <span>
              Already have an account?{' '}
              <a href="#" onClick={() => setIsSignup(false)}>
                Sign In
              </a>
            </span>
          ) : (
            <span>
              New to Flipkart?{' '}
              <a href="#" onClick={() => setIsSignup(true)}>
                Create an account
              </a>
            </span>
          )}
        </div>
      </Form>

      {isAuthenticated && user && (
        <Alert variant="success" className="mt-4 text-center">
          Logged in as: {user.email}
          <Button
            variant="outline-dark"
            size="sm"
            className="ms-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Alert>
      )}
    </Container>
  );
};

export default AuthForm;
