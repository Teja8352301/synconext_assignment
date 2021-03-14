import React from "react";
import classes from "./TimeItems.module.css";
import { TimeItem } from "../../components/TimeItem/TimeItem";
export const TimeItems = props => {
  let items = <h5>Please select the Date</h5>;
  if (props.date) {
    items = props.data.map((val, index) => {
      if (
        val.dateMonthYear.date == props.date._d.getDate() &&
        val.dateMonthYear.month == props.date._d.getMonth() &&
        val.dateMonthYear.year == props.date._d.getFullYear()
      ) {
        let bgColor = "";
        bgColor = val.availability ? "green" : "grey";
        return (
          <div key={index}>
            <TimeItem
              bgColor={bgColor}
            >{`${val.start.hours}:${val.start.minutes} ${val.start.timeStamp}
          `}</TimeItem>
          </div>
        );
      }
    });
  }

  return (
    <div className={classes.TimeItems}>
      <h4
        style={{
          backgroundColor: "yellow",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        Events of the Day:
      </h4>
      <div className={classes.TimeItems_Inner}>{items}</div>
    </div>
  );
};
