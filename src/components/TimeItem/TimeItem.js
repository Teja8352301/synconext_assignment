import React from "react";
import classes from "./TimeItem.module.css";
export const TimeItem = props => {
  return (
    <h4 className={classes.TimeItem} style={{ backgroundColor: props.bgColor }}>
      {props.children}
    </h4>
  );
};
