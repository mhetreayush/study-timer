import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
const SignupForm = () => {
  const [error, setError] = useState("");
  return (
    <div>
      <h1 className="text-2xl font-semibold">Register</h1>
      <Formik
        enableReinitialize
        initialValues={{ email: "", password: "", username: "" }}
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(async () => {
            try {
              const res = await axios.post("/user/register", {
                username: values.username,
                email: values.email,
                password: values.password,
              });
            } catch (err) {
              resetForm(
                (values = {
                  username: "",
                  email: "",
                  password: "",
                })
              );
              err.response.data.msg && setError(err.response.data.msg);
            }
            // console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="username"
              className="border-2 p-2"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="email"
              className="border-2 p-2"
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="password"
              className="border-2 p-2"
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      {error}
      Have an account? <button>Login</button>
    </div>
  );
};

export default SignupForm;
