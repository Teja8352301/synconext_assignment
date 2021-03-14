import React, { useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventIcon from "@material-ui/icons/Event";
import classes from "./KeyboardPickers.module.css";

export const KeyboardPickers = props => {
  return (
    <div className={classes.Grid_Outer}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.Grid_Inner}>
          <div>
            <p>
              Date <span className={classes.Span}>*</span>
            </p>
            <KeyboardDatePicker
              clearable
              value={
                props.dateTimeObject.updateDateObj
                  ? props.selectedDate
                  : props.dateTimeObject.initialDateAndTimeObj
              }
              placeholder="Enter the Date"
              onChange={date => props.changeDate(date)}
              format="DD/MM/YYYY"
              keyboardIcon={<EventIcon color="primary" />}
            />
          </div>
          <div>
            <p>
              Start Time <span className={classes.Span}>*</span>
            </p>
            <KeyboardTimePicker
              placeholder="Enter Time"
              mask="__:__ _M"
              value={
                props.dateTimeObject.updateTimeObj
                  ? props.selectedTime
                  : props.dateTimeObject.initialDateAndTimeObj
              }
              onChange={date => props.changeTime(date)}
              keyboardIcon={<AccessTimeIcon color="primary" />}
            />
          </div>
          <div>
            <p>
              Duration <span className={classes.Span}>*</span>
              <span>in mins</span>
            </p>

            <input
              value={
                props.dateTimeObject.updateDurationObj
                  ? props.selectedDuration
                  : 0
              }
              type="number"
              onChange={event => {
                props.changeDuration(event);
              }}
              placeholder="0"
              style={{
                maxWidth: "240px",
                fontSize: "20px",
                height: "20px",
                borderRadius: "4px",
                padding: "16.5px 14px",
                border: "1px solid grey",
                backgroundColor: "white",
              }}
            />
          </div>
        </div>
      </MuiPickersUtilsProvider>
      <div className={classes.Button_Grid}>
        <button
          className={classes.Button}
          onClick={event => props.submittionData(event)}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};
