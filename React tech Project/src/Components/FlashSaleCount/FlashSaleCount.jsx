/* eslint-disable react/prop-types */
import './FlashSaleCount.css';
import { useState, useEffect } from "react";

function FlashSaleCount(props) {
  const { showCountdown, showArrows,handleNext,handlePrev} = props;

  const [days, setDays] = useState("01");
  const [hours, setHours] = useState("24");
  const [minutes, setMinutes] = useState("60");
  const [seconds, setSeconds] = useState("60");
 
  useEffect(() => {
    let intervalId;
    if (showCountdown) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === "00") {
            setMinutes(prevMinutes => {
              if (prevMinutes === "00") {
                setHours(prevHours => {
                  if (prevHours === "00") {
                    setDays(prevDays => {
                      if (prevDays === "00") {
                        clearInterval(intervalId);
                        return "00";
                      }
                      return String(prevDays - 1).padStart(2, "0");
                    });
                    return "24";
                  }
                  return String(prevHours - 1).padStart(2, "0");
                });
                return "60";
              }
              return String(prevMinutes - 1).padStart(2, "0");
            });
            return "60";
          }
          return String(prevSeconds - 1).padStart(2, "0");
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [showCountdown]);



  return (
    <div id="FlashSaleCount-root">
      <div className="FlashCountDown">
        <p className="SectionAbout">{props.SectionAbout}</p>
        {showCountdown && (
          <div className="Countdown">
            <div>
              <h6>Days</h6>
              <p>{days}</p>
            </div>

            <p style={{ color: "#DB4444" }}>:</p>

            <div>
              <h6>Hours</h6>
              <p>{hours}</p>
            </div>
            <p style={{ color: "#DB4444" }}>:</p>
            <div>
              <h6>Minutes</h6>
              <p>{minutes}</p>
            </div>
            <p style={{ color: "#DB4444" }}>:</p>

            <div>
              <h6>Seconds</h6>
              <p>{seconds}</p>
            </div>
          </div>
        )}

        {showArrows && (
          <div className="navigateSection">
            <img src="/assets/Imgs/CategoriesBrands/LeftArrow.png" alt="" onClick={handlePrev}/>
            <img src="/assets/Imgs/CategoriesBrands/RightArrow.png" alt="" onClick={handleNext}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashSaleCount;
