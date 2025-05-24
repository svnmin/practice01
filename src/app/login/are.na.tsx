"use client"

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      // Redirect to dashboard or home
      // e.g., router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <div className="text-gray-400 text-2xl">✳︎</div>
        <Link
          href="/join"
          className="bg-zinc-800 text-white text-sm px-4 py-2 rounded-md hover:bg-zinc-700"
        >
          Sign up
        </Link>
      </div>

      {/* Center Form */}
      <div className="flex flex-1 justify-center items-center">
        <form
          className="flex flex-col w-80 gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="text-center text-gray-400 text-xl mb-2">✳︎</div>

          <input
            type="email"
            placeholder="Enter your email"
            className="bg-zinc-800 text-white text-sm px-4 py-3 rounded-md placeholder-gray-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-zinc-800 text-white text-sm px-4 py-3 pr-10 rounded-md placeholder-gray-500 w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-gray-400 hover:underline">
              Forgot password?
            </a>
            <button
              type="submit"
              className="bg-zinc-700 px-4 py-2 rounded-md font-semibold hover:bg-zinc-600"
            >
              Log in
            </button>
          </div>

          {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}