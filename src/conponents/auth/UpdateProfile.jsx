import React, { useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux"; 
import { Link, useNavigate } from "react-router-dom";
import { UpdateUserProfile } from "../../redux/auth/auth.action";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user data from the store (Assuming user data is stored in redux)
  const user = useSelector((state) => state.auth.user);

  // If user data is not yet available, you can show a loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  // Initialize form values with user data, if available
  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    mobileNo: user?.mobileNo || "",
    password: "", // Password field remains empty for updates (or can be updated if needed)
    address: {
      country: user?.address?.country || "",
      state: user?.address?.state || "",
      city: user?.address?.city || "",
      pinCode: user?.address?.pinCode || "", // Ensure pinCode is handled as a string or number
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Update Profile
        </h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true} // Enable reinitialization when user data changes
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

            // Address validation
            if (!values.address?.country) {
              errors.address = { ...errors.address, country: "Country is required" };
            }
            if (!values.address?.state) {
              errors.address = { ...errors.address, state: "State is required" };
            }
            if (!values.address?.city) {
              errors.address = { ...errors.address, city: "City is required" };
            }
            if (!values.address?.pinCode) {
              errors.address = { ...errors.address, pinCode: "Pin code is required" };
            } else if (!/^\d{6}$/.test(values.address?.pinCode)) {
              errors.address = { ...errors.address, pinCode: "Invalid pin code (must be 6 digits)" };
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(UpdateUserProfile({ data: values })).then(() => {
              navigate("/profile"); // Redirect to the profile page after update
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
                    errors.name && touched.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && (
                  <span className="text-sm text-red-500 mt-1">{errors.name}</span>
                )}
              </div>

              {/* Other fields... */}

              {/* Address Fields */}
              <div className="flex flex-col">
                <label htmlFor="address.country" className="text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="address.country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address.country}
                  className={`mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.address?.country && touched.address?.country ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your country"
                />
                {errors.address?.country && touched.address?.country && (
                  <span className="text-sm text-red-500 mt-1">{errors.address.country}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                Update
              </button>

              {/* Extra Links */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Want to go back to profile?{" "}
                  <Link to="/profile" className="text-blue-500 hover:underline">
                    Back to Profile
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

export default UpdateProfile;
