import React from "react";

const Toaster = ({ type = "success", message, onClose, visible }) => {
  if (!visible) return null;

  const config = {
    success: {
      id: "toast-success",
      iconColor:
        "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200",
      icon: (
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 11.917 9.724 16.5 19 7.5"
        />
      ),
    },
    danger: {
      id: "toast-danger",
      iconColor: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200",
      icon: (
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      ),
    },
    warning: {
      id: "toast-warning",
      iconColor:
        "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200",
      icon: (
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      ),
    },
  };

  const current = config[type] || config.success;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-short">
      <div
        id={current.id}
        className="flex items-center w-full max-w-sm p-4 text-body bg-white rounded-base shadow-lg border border-default"
        role="alert"
      >
        <div
          className={`inline-flex items-center justify-center shrink-0 w-7 h-7 rounded ${current.iconColor}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {current.icon}
          </svg>
        </div>

        <div className="ms-3 text-sm font-normal">{message}</div>

        <button
          onClick={onClose}
          type="button"
          className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent border border-transparent hover:bg-neutral-secondary-medium rounded h-8 w-8 focus:outline-none"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toaster;
