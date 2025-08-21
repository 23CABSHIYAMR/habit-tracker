import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center border-1 border-black">
      {isRegister ? <RegisterForm switchToLogin={()=>{setIsRegister(false)}}/> : <LoginForm switchToRegister={()=>{setIsRegister(true)}}/>}
      
    </div>
  );
};

export default AuthPage;