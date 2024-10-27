import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = ({ data }) => {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 4000);
  }, [data]);
  return spinner && <ClipLoader></ClipLoader>;
};
