import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { auth, provider } from "../firebase/firebaseConfig";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl w-[400px]">
        <h1 className="text-3xl text-white mb-6 text-center">TaskFlow</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginUser}
          className="w-full bg-indigo-600 p-3 rounded text-white mb-3 cursor-pointer"
        >
          Login
        </button>

        <button
          onClick={googleLogin}
          className="w-full bg-red-500 p-3 rounded text-white cursor-pointer"
        >
          Google Login
        </button>
      </div>
    </div>
  );
}