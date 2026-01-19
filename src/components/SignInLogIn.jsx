import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../utils/useFetch";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../store/userSlice";
import Toaster from "./common/Toaster";
export const SignInLogIn = () => {
  const [register, setRegister] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState(null);
  const [triggerUrl, setTriggerUrl] = useState(null);
  const location = useLocation();
  const { data, loading, error } = useFetch(triggerUrl, "POST", formData);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    if (error) {
      const msg =
        typeof error === "string"
          ? error
          : error.message || "Something went wrong";
      setToast({ show: true, message: msg, type: "danger" });
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const obj = Object.fromEntries(formdata.entries());
    setFormData(obj);
    setTriggerUrl(`${apiUrl}/user${location.pathname}`);
  };

  useEffect(() => {
    if (data?.token) {
      const token = data.token;
      const decodedUser = jwtDecode(token);
      dispatch(setCredentials({ user: decodedUser, token: token }));
      Navigate("/shop");
    }
  }, [data, Navigate, dispatch]);
  const handleSetRegister = () => {
    setRegister(!register);
    if (register) {
      Navigate("/signIn");
    } else {
      Navigate("/signUp");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="furniture hub"
            src="/images/logo_image.png"
            className="mx-auto h-20 w-20 dark:hidden rounded-full"
          />
          <img
            alt="furniture hub"
            src="/images/logo_image.png"
            className="mx-auto h-20 w-20 not-dark:hidden rounded-full"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
            {register ? "Sign Up to your account" : "Sign in to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div className="m-auto ">
              {register && (
                <>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="username"
                      className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                    >
                      Username
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      required
                      autoComplete="username"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </>
              )}
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 ${
                  loading
                    ? "opacity-70 cursor-not-allowed bg-indigo-400 dark:bg-indigo-500"
                    : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : register ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
            {register ? "already a member? " : " Not a member? "}
            <button
              href={register ? "signUp" : "signIn"}
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              onClick={handleSetRegister}
            >
              {register ? "signIn" : "signUp"}
            </button>
          </p>
          {
            <Toaster
              visible={toast.show}
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, show: false })}
            />
          }
        </div>
      </div>
    </>
  );
};
