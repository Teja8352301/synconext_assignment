import React, { useState, useEffect } from "react";
import { KeyboardPickers } from "../KeyboardPickers/KeyboardPickers";
import { Heading } from "../../components/Heading/Heading";
import { TimeItems } from "../TimeItems/TimeItems";
import classes from "./Main.module.css";
import { Recognise } from "../../components/Recognise/Recognise";
export const Main = () => {
  let newDateArray = [];
  let objectDateArray = [];

  //-------------------------------------------------
  let initialDateAndTime = new Date("03/03/2021");
  const [selectedDate, handleDateChange] = useState(null);
  const [selectedTime, handleTimeChange] = useState(null);
  const [selectedDuration, handleDurationChange] = useState(0);
  ////////////////////////////
  const [updateDate, setUpdateDate] = useState(false);
  const [updateTime, setUpdateTime] = useState(false);
  const [updateDuration, setUpdateDuration] = useState(false);
  const [dataNewState, setDataNewState] = useState(false);
  const [newStartDateUpdate, setNewStartDateUpdate] = useState(null);
  let [count, setCount] = useState(0);

  let dateTimeObj = {
    updateDateObj: updateDate,
    updateTimeObj: updateTime,
    updateDurationObj: updateDuration,
    initialDateAndTimeObj: initialDateAndTime,
  };
  //--------------------------------------------------
  let [dataState, setDataState] = useState([
    {
      start: "Wed, 03 Mar 2021 04:00:15 GMT",
      end: "Wed, 03 Mar 2021 05:00:15 GMT",
    },
    {
      start: "Wed, 03 Mar 2021 06:00:15 GMT",
      end: "Wed, 03 Mar 2021 06:30:15 GMT",
    },
    {
      start: "Wed, 03 Mar 2021 08:30:15 GMT",
      end: "Wed, 03 Mar 2021 09:30:15 GMT",
    },
    {
      start: "Wed, 03 Mar 2021 09:30:15 GMT",
      end: "Wed, 03 Mar 2021 09:50:15 GMT",
    },
    {
      start: "Wed, 03 Mar 2021 12:50:15 GMT",
      end: "Wed, 03 Mar 2021 13:10:15 GMT",
    },
    {
      start: "Wed, 03 Mar 2021 11:30:15 GMT",
      end: "Wed, 03 Mar 2021 12:15:15 GMT",
    },
    {
      start: "Wed, 03 Mar 2021 13:30:15 GMT",
      end: "Wed, 03 Mar 2021 14:00:15 GMT",
    },
    {
      start: "Wed, 03 Mar 2021 15:00:15 GMT",
      end: "Wed, 03 Mar 2021 15:30:15 GMT",
    },
    {
      start: "Wed, 04 Mar 2021 15:00:15 GMT",
      end: "Wed, 04 Mar 2021 15:30:15 GMT",
    },
    {
      start: "Wed, 04 Mar 2021 04:00:15 GMT",
      end: "Wed, 04 Mar 2021 05:00:15 GMT",
    },
  ]);

  let newEndDate;
  let newStartDate;
  // ---------------TO RERENDER THE DATE DATA IN THE UI------------- //
  useEffect(() => {
    if (dataNewState) {
      newStartDate = newStartDateUpdate;
      newEndDate = new Date(
        new Date(newStartDateUpdate).getTime() + selectedDuration * 60000
      );
      conditionCheck(objectDateArray);
    }
    return () => {
      setUpdateDate(false);
      setUpdateTime(false);
      setUpdateDuration(false);
    };
  }, [dataState, newStartDateUpdate]);

  //------------DATE CHANGE--------------------//
  const changeDate = date => {
    handleDateChange(date);
    setUpdateDate(true);
    if (selectedTime && updateTime) {
      date._d.setHours(selectedTime._d.getHours());
      date._d.setMinutes(selectedTime._d.getMinutes());
    }
  };
  //--------------TIME CHANGE------------//
  const changeTime = time => {
    handleTimeChange(time);
    setUpdateTime(true);
    if (selectedDate && updateDate) {
      selectedDate._d.setHours(time._d.getHours());
      selectedDate._d.setMinutes(time._d.getMinutes());
      handleDateChange(selectedDate);
    }
  };
  //---------------DURATION CHANGE-----------//
  const changeDuration = event => {
    setUpdateDuration(true);
    handleDurationChange(event.target.value);
  };

  //------------------checking condition----------------//

  const conditionCheck = newDateArray => {
    let newDateArraying = newDateArray;
    newDateArraying.reduce((prev, next, index) => {
      if (
        prev.end.getTime() <= newStartDate.getTime() &&
        next.start.getTime() >= newEndDate.getTime()
      ) {
        setCount(count => {
          return count + 1;
        });
        setDataState([
          ...dataState,
          {
            start: new Date(
              newStartDate.getTime() + 3600000 * 5.5
            ).toUTCString(),
            end: new Date(newEndDate.getTime() + 3600000 * 5.5).toUTCString(),
            availability: true,
          },
        ]);
        setNewStartDateUpdate(newEndDate);
        setDataNewState(true);
        newDateArraying.splice(index, newDateArraying.length);
        return next;
      } else {
        if (newStartDate.getHours() === 15) {
          newDateArraying.splice(index, newDateArraying.length);
        }
        if (newStartDate.getTime() <= prev.start.getTime()) {
          setNewStartDateUpdate(newDateArraying[index - 1].end);
          newDateArraying.splice(index, newDateArraying.length);
          setDataNewState(true);
        }
        if (index + 1 === newDateArraying.length && count === 0) {
          alert("NO FREE TIME AVAILABLE");
        }
        return next;
      }
    });
  };
  //-------------DATA SUBMITTION----------------//
  const dataSubmittion = event => {
    setCount(count => {
      return 0;
    });
    if (updateDate && updateTime && updateDuration) {
      newStartDate = new Date(selectedDate._d);
      newEndDate = new Date(
        new Date(selectedDate._d).getTime() + selectedDuration * 60000
      );
      conditionCheck(objectDateArray);
    } else {
      alert("Enter The Required Data");
    }
  };

  //---------------24HRS TO 12 HRS Conversion-------------------//

  const railWayToNormal = dataArray => {
    let dateObj = 0;
    let monthObj = 0;
    let yearObj = 0;
    let startHour = 0;
    let endHour = 0;
    let startMinute = 0;
    let endMinute = 0;
    let startStamp = "";
    let endStamp = "";

    dataArray.forEach((val, index) => {
      dateObj = val.start.getDate();
      monthObj = val.start.getMonth();
      yearObj = val.start.getFullYear();
      let avail = val.availability ? true : false;
      for (var i in val) {
        if (i !== "availability")
          if (val[i].getHours() == 12) {
            if (i === "start") {
              startHour = val[i].getHours().toString().padStart(2, "0");
              startMinute = val[i].getMinutes().toString().padStart(2, "0");
              startStamp = "PM";
            } else {
              endHour = val[i].getHours().toString().padStart(2, "0");
              endMinute = val[i].getMinutes().toString().padStart(2, "0");
              endStamp = "PM";
            }
          } else if (val[i].getHours() > 12) {
            if (i === "start") {
              startHour = (val[i].getHours() - 12).toString().padStart(2, "0");
              startMinute = val[i].getMinutes().toString().padStart(2, "0");
              startStamp = "PM";
            } else {
              endHour = (val[i].getHours() - 12).toString().padStart(2, "0");
              endMinute = val[i].getMinutes().toString().padStart(2, "0");
              endStamp = "PM";
            }
          } else {
            if (i === "start") {
              startHour = val[i].getHours().toString().padStart(2, "0");
              startMinute = val[i].getMinutes().toString().padStart(2, "0");
              startStamp = "AM";
            } else {
              endHour = val[i].getHours();
              endMinute = val[i].getMinutes();
              endStamp = "AM";
            }
          }
      }
      amToPm(
        dateObj,
        monthObj,
        yearObj,
        startHour,
        startMinute,
        startStamp,
        endHour,
        endMinute,
        endStamp,
        avail
      );
    });
    // }
  };
  const amToPm = (
    dateObject,
    monthObject,
    yearObject,
    startHours,
    startMinutes,
    startTimeStamp,
    endHours,
    endMinutes,
    endTimeStamp,
    avail
  ) => {
    newDateArray.push({
      start: {
        hours: startHours,
        minutes: startMinutes,
        timeStamp: startTimeStamp,
      },
      end: {
        hours: endHours,
        minutes: endMinutes,
        timeStamp: endTimeStamp,
      },
      availability: avail,
      dateMonthYear: {
        date: dateObject,
        month: monthObject,
        year: yearObject,
      },
    });
  };

  //---------------Sort ArrayData--------------//
  const sorting = dateArray => {
    dateArray.sort(function (x, y) {
      if (x.start.getTime() > y.start.getTime()) {
        return 1;
      } else {
        return -1;
      }
    });
    objectDateArray = dateArray;
    railWayToNormal(dateArray);
  };
  //----------DATE TO OBJECT ARRAY------------//
  let dateArray = null;
  const dateToObj = dataArray => {
    dateArray = dataArray.map(val => {
      let avail = val.availability ? true : false;
      return {
        start: new Date(new Date(val.start).getTime() - 3600000 * 5.5),
        end: new Date(new Date(val.end).getTime() - 3600000 * 5.5),
        availability: avail,
      };
    });
    sorting(dateArray);
  };
  dateToObj(dataState);

  return (
    <div className={classes.Main}>
      <Heading>FIND A FREE TIME</Heading>
      <KeyboardPickers
        changeDate={changeDate}
        changeTime={changeTime}
        changeDuration={changeDuration}
        selectedDate={selectedDate}
        selectedDuration={selectedDuration}
        selectedTime={selectedTime}
        submittionData={dataSubmittion}
        dateTimeObject={dateTimeObj}
      />
      <TimeItems
        data={newDateArray}
        date={selectedDate ? selectedDate : null}
      />
      <Recognise />
    </div>
  );
};
