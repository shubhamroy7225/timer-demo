import React, { useState, useEffect } from "react";
import moment from "moment";
const TimerDemo = ({ lockAt }) => {
  const [localTimestamp, setLocalTimeStamp] = useState("");
  let [minutes, setMinutes] = useState(0);
  let [seconds, setSeconds] = useState(0);
  useEffect(() => {

    var utcDate = tDate.toUTCString();
    var currentTimeUNIX =moment(utcDate).valueOf()/ 1000;

    if (lockAt) {
      let timer = moment.duration
        (300 -
        moment(Math.abs(lockAt - currentTimeUNIX)),'seconds');
      setMinutes(timer.minutes());
      setSeconds(timer.seconds());
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

  // UTC time of unix timestamp
  console.log("UTC ",moment.utc(moment.unix(lockAt).format("YYYY-MM-DDTHH:mm:ssZ")));

  
  //Get timestamp in locale
  var tDate = new Date();

  //Convert timestamp in GMT/UTC format
  var utcDate = tDate.toUTCString();
  console.log(utcDate);

  var currentTimeUNIX =moment(utcDate).valueOf()/ 1000;

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
        <p>Get timestamp in UTC: {currentTimeUNIX}</p>
        <p>Convert timestamp in GMT/UTC format: {utcDate}</p>
      </center>
      <hr />
      <center>
        <h2>Difference between lockAt-currentTimeStamp</h2>
        <p>without Math.abs : {lockAt - new Date().getTime() / 1000}</p>
        <p>
          Difference between lockAt-currentTimeStamp in Seconds with Math.abs :{" "}
          {Math.abs(lockAt - currentTimeUNIX)}
        </p>
        <p>
          Time :{" "}
          {moment(
            Math.abs(lockAt - currentTimeUNIX)
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
