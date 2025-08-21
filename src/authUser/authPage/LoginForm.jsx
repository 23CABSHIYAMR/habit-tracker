import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({switchToRegister}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/users/login", { email, password });
      login(res.data);
      navigate("/Week");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-fit max-w-md p-10  flex flex-col gap-3 justify-center">
      <h3>Welcome!</h3>
      

      <input placeholder="Email" 
      className=" bg-gray-300 p-2 rounded-b-sm" 
      onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Password" 
      className=" bg-gray-300 p-2 rounded-b-sm" 
      onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" className="bg-blue-300 p-2 text-white">Login</button>
      <div className="relative flex items-center w-[100%] my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500 font-medium">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <span>Don't have an account?<button type="button" onClick={switchToRegister}>Sign Up?</button></span>
    </form>
    
  );
};

export default LoginForm;
