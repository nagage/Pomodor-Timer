import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import FocusButton from "./FocusButton"
import BreakButton from "./BreakButton"
import PlayPause from "./PlayPause"
import Timer from "./Timer"

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);


  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)

  const handleFocusButtonIncrease = () => {
    if (focusDuration <=55 && isTimerRunning === false && session === null){
    setFocusDuration(focusDuration + 5)
    }
  };
  
  const handleFocusButtonDecrease = () => {
    if (focusDuration >5 && isTimerRunning === false && session === null){
    setFocusDuration(focusDuration - 5)
    }
  };



  const handleBreakButtonIncrease = () => {
  if (breakDuration <15 && isTimerRunning === false && session === null){
    setBreakDuration(breakDuration + 1)
  }
  };
  
  const handleBreakButtonDecrease = () => {
    if (breakDuration >1 && isTimerRunning === false && session === null){
      setBreakDuration(breakDuration - 1)
    }
  };

  const handleStop = () => {
    if (isTimerRunning === true){
    setIsTimerRunning(false)
    session.timeRemaining = focusDuration * 60
    }
    setSession(null)
  }

  const secondsToDuration = (givenSeconds) => {
    const minutes = Math.floor((givenSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.round(givenSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function minutesToDuration(givenMinutes) {
    const minutes = Math.floor(givenMinutes).toString().padStart(2, "0");
    return `${minutes}:00`;
  }

let focusProgress  = Math.ceil((1 - ( session?.timeRemaining / (focusDuration * 60)))*100)

let breakProgress = Math.ceil((1 - ( session?.timeRemaining / (breakDuration * 60)))*100)



  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );



  return (
    <fragment>
    <FocusButton minutesToDuration={minutesToDuration}  isTimerRunning={isTimerRunning} setIsTimerRunning = {setIsTimerRunning} session={session} setSession={setSession}   focusDuration = {focusDuration} setFocusDuration={setFocusDuration} />
    <BreakButton  minutesToDuration={minutesToDuration}  isTimerRunning={isTimerRunning} setIsTimerRunning = {setIsTimerRunning} session={session} setSession={setSession}   breakDuration = {breakDuration} setBreakDuration={setBreakDuration} />
    <Timer minutesToDuration={minutesToDuration}  isTimerRunning={isTimerRunning} setIsTimerRunning = {setIsTimerRunning} session={session} setSession={setSession}   focusDuration = {focusDuration} setFocusDuration={setFocusDuration} breakDuration={breakDuration} setBreakDuration={setBreakDuration} />
    <PlayPause  handleStop = {handleStop}  minutesToDuration={minutesToDuration}   isTimerRunning={isTimerRunning} setIsTimerRunning = {setIsTimerRunning} session={session} setSession={setSession}   focusDuration = {focusDuration} setFocusDuration={setFocusDuration}/>
    </fragment>
  );
}

export default Pomodoro;


