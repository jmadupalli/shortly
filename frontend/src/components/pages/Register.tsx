import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError, callRegister } from "../../api";
import ErrorComp from "../ErrorComp";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userState) navigate("/");
  }, [userState, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await callRegister(formData).catch((err: ApiError) =>
      setError(err.response.data.message),
    );
    if (response) {
      navigate("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      {error && <ErrorComp error={error} setError={setError} />}

      <div className="flex h-full align-middle">
        <div className="m-auto flex max-w-md flex-col rounded-md bg-gray-900 p-6 text-gray-100 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Register</h1>
            <p className="text-sm text-gray-400">Register your account!</p>
          </div>
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jayanth"
                  required
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Madupalli"
                  required
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@jayanthm.in"
                  required
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100"
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*****"
                  required
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-red-400 px-8 py-3 font-semibold text-gray-900"
                >
                  Sign Up
                </button>
              </div>
              <p className="px-6 text-center text-sm text-gray-400">
                Already have an account?
                <Link to="/login" className="text-red-400 hover:underline">
                  Sign In
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
