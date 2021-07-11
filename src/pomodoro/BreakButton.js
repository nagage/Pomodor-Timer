import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";


function BreakButton({isTimerRunning, setIsTimerRunning, session, setSession, breakDuration, setBreakDuration, minutesToDuration}){


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

return (



<fragment>
<div className="row">
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick = {handleBreakButtonDecrease}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick = {handleBreakButtonIncrease}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</fragment>
)}

export default BreakButton