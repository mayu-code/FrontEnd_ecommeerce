import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAction } from "../../redux/auth/auth.action"; // Assuming a register action is defined

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register
        </h1>
        <Formik
          initialValues={{ name: "", email: "", mobileNo: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.mobileNo) {
              errors.mobileNo = "Required";
            } else if (!/^\d{10}$/.test(values.mobileNo)) {
              errors.mobileNo = "Invalid mobile number (must be 10 digits)";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(registerUserAction({ data: values })).then(() => {
              navigate("/login");
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
              {/* Name Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

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

              {/* Mobile Number Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="mobileNo"
                  className="text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobileNo}
                  className={`mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.mobileNo && touched.mobileNo
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobileNo && touched.mobileNo && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.mobileNo}
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
                Register
              </button>

              {/* Extra Links */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Login here
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

export default Register;
