import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

function Stats() {
  return (
    <div className="flex justify-evenly">
      <div className="pb-4 w-1/2">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center border-blue-500 border-2 rounded-2xl p-4 m-4 w-full h-1/4">
            <div className="flex">
              <div className="w-[3.8em]">
                <CountUp end={70} redraw={true}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span className="text-5xl font-bold" ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
              </div>
              <p className="text-5xl font-bold">+</p>
            </div>
            <div className="text-xl">Students Taught</div>
          </div>
          <div className="flex flex-col items-center border-blue-500 border-2 rounded-2xl p-4 m-4 w-full h-1/4">
            <div className="flex">
              <div className="w-[5.2em]">
                <CountUp end={140} redraw={true}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span
                        className="text-5xl text-right font-bold"
                        ref={countUpRef}
                      />
                    </VisibilitySensor>
                  )}
                </CountUp>
              </div>
              <p className="text-5xl font-bold">+</p>
            </div>
            <div className="text-xl">Hours Provided</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center border-blue-500 border-2 rounded-2xl p-4 m-4 w-full h-1/4">
            <div className="flex">
              <div className="">
                <CountUp end={4} redraw={true}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span className="text-5xl font-bold" ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
              </div>
            </div>
            <div className="text-xl">Schools and Libraries</div>
          </div>
          <div className="flex flex-col items-center border-blue-500 border-2 rounded-2xl p-4 m-4 w-full h-1/4">
            <div className="flex">
              <p className="text-5xl font-bold">1</p>
            </div>
            <div className="text-xl">Website</div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl w-1/3 pr-10">
        <img src="/demo.jpeg" alt="Classroom Picture" />
      </div>
    </div>
  );
}

export default Stats;
