
import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";


function Timer({isTimerRunning, setIsTimerRunning, session, setSession, focusDuration, setFocusDuration, minutesToDuration, breakDuration, setBreakDuration}){

    function nextTick(prevState) {
        const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
        return {
          ...prevState,
          timeRemaining,
        };
      }

  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  const handleStop = () => {
    if (isTimerRunning === true){
    setIsTimerRunning(false)
    session.timeRemaining = focusDuration * 60
    }
    setSession(null)
  }

  let focusProgress  = Math.ceil((1 - ( session?.timeRemaining / (focusDuration * 60)))*100)

let breakProgress = Math.ceil((1 - ( session?.timeRemaining / (breakDuration * 60)))*100)

const secondsToDuration = (givenSeconds) => {
    const minutes = Math.floor((givenSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.round(givenSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

return (



<fragment>
<div>
{/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
<div className="row mb-2" style={{display: session !== null ? "block" : "none"}} >
  <div className="col">
    {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
    {session?.label === "Focusing" || session?.label === "On Break" ? <h2 data-testid="session-title" >
      {session?.label} for {session?.label === "Focusing" ? minutesToDuration(focusDuration) : minutesToDuration(breakDuration)} minutes
    </h2> : null}
    {/* TODO: Update message below correctly format the time remaining in the current session */}
    {session?.label === "Focusing" || session?.label === "On Break" ? <p className="lead" data-testid="session-sub-title">
    {secondsToDuration(session?.timeRemaining)} remaining
    </p> : null}
  </div>
</div>
<div className="row mb-2">
  <div className="col">
      <h2  style={{display: session !== null && isTimerRunning !== true ? "block" : "none"}}>PAUSED</h2>
    <div className="progress" style={{ height: "20px", display:session !== null ? "block" : "none"  }}>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow= {session?.label === "Focusing" ? focusProgress : breakProgress} // TODO: Increase aria-valuenow as elapsed time increases
        style={{ width: session?.label === "Focusing" ? focusProgress + "%" : breakProgress + "%",  height: "100%"}} // TODO: Increase width % as elapsed time increases
      />
    </div>
  </div>
</div>
</div>
</fragment>
)}

export default Timer





