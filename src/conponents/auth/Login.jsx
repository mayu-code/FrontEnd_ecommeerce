import React, { useState } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAction } from "../../redux/auth/auth.action";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage success/error messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>

        {/* Show success or error message */}
        {message && (
          <div className={`text-center py-2 px-4 rounded-lg mb-4 ${messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {message}
          </div>
        )}
        
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // Clear any previous messages
            setMessage("");
            setMessageType("");

            dispatch(loginUserAction({ data: values }))
              .then((data) => {
                // Set success message when login is successful
                setMessage("Login successful!");
                setMessageType("success");

                // Redirect to homepage after successful login
                setTimeout(() => {
                  navigate("/"); // Redirect to the home page
                }, 20); // Wait 2 seconds before redirecting

                setSubmitting(false);
              })
              .catch((error) => {
                // Set error message if login fails
                setMessage("Login failed. Please check your credentials.");
                setMessageType("error");
                setSubmitting(false);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && touched.password && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                Login
              </button>

              {/* Extra Links */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-500 hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
