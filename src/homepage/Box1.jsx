import React from "react";
import style from "../homepage/Box1.module.css";
export const Box1 = () => {
  return (
    <div className={style.box1}>
      <ul className={style.buttonlist}>
        <div className={style.buttons}>
          <button>live</button>
          <button>24c</button>
          <button>50%</button>
          <button>350W</button>
          <button>80%</button>
        </div>
      </ul>
    </div>
  );
};
