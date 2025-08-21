import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({switchToLogin}) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/users/register", formData);
      login(res.data);
      navigate("/Week");
    }
    catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form 
    onSubmit={handleSubmit} 
    style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <input
        className=" bg-gray-300 p-2 rounded-b-sm" 
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        className=" bg-gray-300 p-2 rounded-b-sm" 
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        className=" bg-gray-300 p-2 rounded-b-sm" 
        type="password"
        name="password"
        placeholder="Password (min 6 chars)"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button 
      type="submit" 
      className=" bg-blue-300 p-2 text-white"
      >
      Register
      </button>

      <div className="relative flex items-center w-[100%] my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500 font-medium">
          OR
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <span>
        Already have a account?
        <button type="button" onClick={switchToLogin}>Log In?</button>
      </span>
    </form> 
  );
};

export default RegisterForm;
