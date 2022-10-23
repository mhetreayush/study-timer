import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
const LoginForm = ({ setIsLogin }) => {
  const [error, setError] = useState("");
  return (
    <div>
      <h1 className="text-2xl font-semibold">Login</h1>
      <Formik
        enableReinitialize
        initialValues={{ password: "" }}
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
              const res = await axios.post("/user/login", {
                email: values.email,
                password: values.password,
              });
              setError("");
              localStorage.setItem("tokenStore", res.data.token);
              setIsLogin(true);
            } catch (err) {
              resetForm((values = { email: "", password: "" }));
              err.response.data.msg && setError(err.response.data.msg);
            }
            // console.log(JSON.stringify(values, null, 1));
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
      Don&apos;t have an account?<button>Register</button>
    </div>
  );
};

export default LoginForm;
