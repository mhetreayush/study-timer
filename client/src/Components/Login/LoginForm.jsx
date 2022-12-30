import axios from "axios";
// import GoogleOneTapLogin from "react-google-one-tap-login";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import { Formik } from "formik";
import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
const LoginForm = ({ setIsLogin, setIsSignup, regEmail }) => {
  useGoogleOneTapLogin({
    onError: (error) => console.log(error),
    onSuccess: (response) => console.log(response),
    googleAccountConfigs: {
      client_id:
        "405559007623-gsdkiotat0t002msrlltb9ti4rpmmuor.apps.googleusercontent.com",
    },
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-y-8 w-full">
      {/* <button>
        <GoogleOneTapLogin
          onError={(error) => console.log(error)}
          onSuccess={(response) => console.log(response)}
          googleAccountConfigs={{
            client_id:
              "405559007623-gsdkiotat0t002msrlltb9ti4rpmmuor.apps.googleusercontent.com",
          }}
        />
        asd
      </button> */}
      <h1 className="text-2xl font-semibold text-center">Log In</h1>
      <hr className="h-[0.1rem] w-1/2 self-center bg-gray-200 rounded-md border-none" />
      <Formik
        enableReinitialize
        initialValues={{ password: "", email: regEmail }}
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
              err.response.data.msg && toast.error(err.response.data.msg);
            }
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
            onKeyDown={(e) => {
              if (e.keyCode === 13) e.preventDefault();
            }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-6 w-full"
          >
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
                Password
                <span className="text-red-500"> *</span>
              </h1>
              <div className="border-2 rounded-md flex items-center bg-white">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Ssshhhh..."
                  className="w-full h-full p-2"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) handleSubmit();
                  }}
                />
                <div className="border-l-2 border-black px-2 h-full flex items-center">
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <BiHide /> : <BiShow />}
                  </button>
                </div>
              </div>
              {errors.password && touched.password && errors.password}
            </div>

            <button
              className="bg-blue-500 p-2 mt-4 text-white w-2/4 rounded-md self-center"
              type="submit"
              disabled={isSubmitting}
            >
              Sign In
            </button>
          </form>
        )}
      </Formik>
      {error}
      <div className="flex gap-x-1 mt-2 items-center self-center">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => setIsSignup(true)}
          className="underline hover:text-blue-500"
        >
          Register
        </button>
      </div>
      <ToastContainer position="top-left" />
    </div>
  );
};

export default LoginForm;
