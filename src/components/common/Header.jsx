import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";

export const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ];

  const mobileNavigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Wish List", href: "/wish-list" },
    { name: "My Cart", href: "/order-history" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Furniture Hub</span>
            <img
              alt="logo_image.png"
              src="/images/logo_image.png"
              className="h-8 w-auto dark:hidden"
            />
            <img
              alt="logo_image.png"
              src="/images/logo_image.png"
              className="h-12 rounded-full w-auto not-dark:hidden"
            />
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
              Furniture Hub
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              to={item.href}
              key={item.name}
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              {item.name}
            </Link>
          ))}

          {/* wishlist and shop logo */}
          <Link to={"/wish-list"}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Link>
          <Link to={"/order-history"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Link>
        </div>
        <div></div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!user ? (
            <Link
              to="/signIn"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold uppercase">
                  {user.username?.charAt(0) || "U"}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.username || "User"}
                </span>
              </div>

              <button
                onClick={() => dispatch(logout())}
                className="text-sm font-bold text-red-500 hover:text-red-600 transition"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Furniture Hub</span>
              <img
                alt="logo_image.png"
                src="/images/logo_image.png"
                className="h-8 w-auto dark:hidden rounded-full"
              />
              <img
                alt="logo_image.png"
                src="/images/logo_image.png"
                className="h-8 w-auto items-center not-dark:hidden rounded-full"
              />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Furniture Hub
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                {mobileNavigation.map((item) => (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to={item.href}
                    key={item.name}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {!user ? (
                  <>
                    {" "}
                    <a
                      href="/signUp"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      Sign Up
                    </a>
                    <a
                      href="/signIn"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      Sign in
                    </a>
                  </>
                ) : (
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold uppercase">
                        {user.username?.charAt(0) || "U"}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user.username || "User"}
                      </span>
                    </div>

                    <button
                      onClick={() => dispatch(logout())}
                      className="text-sm font-bold text-red-500 hover:text-red-600 transition"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
