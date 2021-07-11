import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";



function PlayPause({nextTick, nextSession, isTimerRunning, playPause, handleStop, setIsTimerRunning, session, setSession, focusDuration, setFocusDuration, minutesToDuration}){

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

return (



<fragment>
<div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button disabled={session?.label !== "Focusing" && session?.label !=="On Break"}
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={handleStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
</fragment>
)}

export default PlayPause