import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError, LoginResponse, callLogin } from "../../api";
import { login } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const userState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userState) navigate("/");
  }, [userState, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = (await callLogin(formData).catch((err: ApiError) =>
      toast.error(err.response.data.message),
    )) as AxiosResponse<LoginResponse>;

    if (response.status == 200) {
      toast.success("Login successful!");
      localStorage.setItem("userState", JSON.stringify(response.data));
      dispatch(login(response.data));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <div className="flex h-full align-middle">
        <div className="m-auto flex max-w-md flex-col rounded-md bg-gray-900 p-6 text-gray-100 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Login</h1>
            <p className="text-sm text-gray-400">Login to your account!</p>
          </div>
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                  Sign In
                </button>
              </div>
              <p className="px-6 text-center text-sm text-gray-400">
                Don't have an account yet?
                <Link to="/register" className="text-red-400 hover:underline">
                  Sign up
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

export default Login;
