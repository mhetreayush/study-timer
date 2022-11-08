import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const SignupForm = ({ setIsSignup, setRegEmail }) => {
  const [error, setError] = useState("");
  return (
    <div className="flex flex-col gap-y-8 w-full">
      <h1 className="text-2xl font-semibold text-center">Register</h1>
      <hr className="h-[0.1rem] w-1/2 self-center bg-gray-200 rounded-md border-none" />
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
              setRegEmail(values.email);
              toast.success("User created successfully");
              setTimeout(() => setIsSignup(false), 1000);
            } catch (err) {
              err.response.data.msg && toast.error(err.response.data.msg);
            }
            resetForm(
              (values = {
                username: "",
                email: "",
                password: "",
              })
            );
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-6 w-full"
          >
            <div>
              <ToastContainer position="bottom-right" />
              <h1>
                Username<span className="text-red-500"> *</span>
              </h1>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="John Doe"
                className="border-2 p-2 w-full rounded-md my-2"
              />
            </div>
            <div>
              <h1>
                Email<span className="text-red-500"> *</span>
              </h1>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="johndoe@example.com"
                className="border-2 p-2 w-full rounded-md my-2"
              />
              <br />
              {errors.email && touched.email && errors.email}
            </div>
            <div>
              <h1>
                Password<span className="text-red-500"> *</span>
              </h1>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Keepme$@fe"
                className="border-2 p-2 w-full rounded-md my-2"
              />
              <br />
              {errors.password && touched.password && errors.password}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 p-2 mt-4 text-white w-2/4 rounded-md self-center"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      {error}
      <div className="flex gap-x-1 mt-2 items-center self-center">
        Already have an account?{" "}
        <button
          className="underline hover:text-blue-500"
          onClick={() => setIsSignup(false)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
