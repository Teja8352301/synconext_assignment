import React from "react";
import classes from "./Recognise.module.css";
export const Recognise = () => {
  return (
    <div className={classes.RecoDiv}>
      <div className={classes.RecoDiv}>
        <span
          className={classes.RecongiseSpan}
          style={{ backgroundColor: "grey" }}
        ></span>
        <h5>Busy</h5>
      </div>
      <div className={classes.RecoDiv}>
        <span
          className={classes.RecongiseSpan}
          style={{ backgroundColor: "green" }}
        ></span>
        <h5>Free</h5>
      </div>
    </div>
  );
};
