import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LoginPage = ({ setIsLogin }) => {
  return (
    <>
      <LoginForm setIsLogin={setIsLogin} />
      <SignupForm />
    </>
  );
};

export default LoginPage;
