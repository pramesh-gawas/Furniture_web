import React from "react";

export const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-white px-6 py-16 sm:py-24 lg:px-8 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      {/* Background decoration matching your Testimonial style */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_bottom,var(--color-indigo-50),white)] opacity-20 dark:bg-[radial-gradient(45rem_50rem_at_bottom,var(--color-indigo-900),transparent)] dark:opacity-10" />

      <div className="mx-auto max-w-7xl">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand & Newsletter Section */}
          <div className="space-y-8">
            <img
              alt="Furniture Store"
              src="/images/logo_image.png"
              className="h-10 dark:hidden"
            />
            <img
              alt="Furniture Store"
              src="/images/logo_image.png"
              className="h-10 hidden dark:block rounded-full"
            />
            <p className="text-sm/6 text-gray-600 dark:text-gray-400 max-w-xs">
              Crafting comfort for modern living. Elevate your space with our
              curated collection of sustainable furniture.
            </p>
            <div className="flex space-x-6">
              {/* Replace # with your social links */}
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-white"
              >
                <span className="sr-only">Instagram</span>
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Shop
                </h3>
                <ul className="mt-6 space-y-4">
                  {["Living Room", "Bedroom", "Office", "Dining"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Support
                </h3>
                <ul className="mt-6 space-y-4">
                  {["Shipping", "Returns", "Warranty", "FAQ"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Join our Newsletter
                </h3>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  The latest deals and design tips, sent to your inbox.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            &copy; 2025 Furniture Store, Inc. All rights reserved. Designed for
            comfort.
          </p>
        </div>
      </div>
    </footer>
  );
};
