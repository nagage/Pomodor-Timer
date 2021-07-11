import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";


function FocusButton({isTimerRunning, setIsTimerRunning, session, setSession, focusDuration, setFocusDuration, minutesToDuration}){

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

return (



<fragment>
<div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick= {handleFocusButtonDecrease}
              >
                <span className="oi oi-minus"/>
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick = {handleFocusButtonIncrease}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
</fragment>
)}

export default FocusButton