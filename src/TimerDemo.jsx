import React, { useState, useEffect } from "react";
import moment from "moment";
const TimerDemo = ({ lockAt }) => {
  const [localTimestamp, setLocalTimeStamp] = useState("");
  let [minutes, setMinutes] = useState(0);
  let [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (lockAt) {
      let timer =
        30000 -
        moment(Math.abs(lockAt - Math.round(new Date().getTime() / 1000)));
      setMinutes(moment(timer).format("mm"));
      setSeconds(moment(timer).format("ss"));
    }
  }, []);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === "00") {
          setMinutes(0);
          const timer = setTimeout(() => {
            setMinutes(5);
          }, 5000);
          return () => clearTimeout(timer);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // lockAt unixtimestamp from the blockChain
  console.log(lockAt);

  // Convert lockAt to human-readable
  console.log(moment.unix(lockAt).format("YYYY-MM-DDTHH:mm:ssZ"));

  //Get timestamp in locale
  var tDate = new Date();

  //Convert timestamp in GMT/UTC format
  var utcDate = tDate.toUTCString();
  console.log(utcDate);

  //Used math.abs
  console.log(Math.abs(lockAt - new Date().getTime() / 1000));

  return (
    <div>
      <hr />
      <center>
        <h2>Start time from the block chain</h2>
        <p>
          Start Timestamp : {/*  */}
          {lockAt}
        </p>
        <p>
          Human-readable Start Timestamp :{" "}
          {moment.unix(lockAt).format("YYYY-MM-DDTHH:mm:ssZ")}
        </p>
      </center>
      <hr />
      <center>
        <h2>locale time</h2>
        <p>Get timestamp in locale: {new Date() / 1000}</p>
        <p>Convert timestamp in GMT/UTC format: {utcDate}</p>
      </center>
      <hr />
      <center>
        <h2>Difference between lockAt-currentTimeStamp</h2>
        <p>without Math.abs : {lockAt - new Date().getTime() / 1000}</p>
        <p>
          Difference between lockAt-currentTimeStamp with Math.abs :{" "}
          {Math.abs(lockAt - new Date().getTime() / 1000)}
        </p>
        <p>
          Time :{" "}
          {moment(
            Math.abs(lockAt - Math.round(new Date().getTime() / 1000))
          ).format("hh:mm:ss")}
        </p>
        <h2>
          {minutes === 0 && seconds === 0 ? (
            "00:00"
          ) : (
            <>
              {" "}
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </>
          )}
        </h2>
      </center>
    </div>
  );
};

export default TimerDemo;
