import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import IDEIntro from "./IDEIntro";

function QuotesIntro() {
  return (
    <Carousel showArrows={true}>
      <div>
        <div className="px-10 pt-2 pb-4 bg-slate-600">
          <div className="mt-8 flex items-center justify-center">
            <div className="w-3/4 h-[40vh] items-center">
              <div className="flex justify-center items-center">
                <img
                  className="object-scale-down h-10 w-20"
                  src="blue-quotation-marks.png"
                  alt="“"
                />
              </div>
              <br></br>
              <div className="text-3xl text-white h-[15vh]">
                I really enjoy designing things. When we were designing
                improvements, I noticed I had a lot of fun doing it and would
                like to design stuff again. I might try learning coding more
                because it seems really interesting.
              </div>
              <br></br>
              <div className="text-2xl text-blue-400 text-center">
                5th Grade Student
              </div>
              <div className="text-xl text-white text-center">
                Francis B. Campanelli Elementary School
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="px-10 pt-2 pb-4 bg-slate-600">
          <div className="mt-8 flex items-center justify-center">
            <div className="w-3/4 h-[40vh] items-center">
              <div className="flex justify-center items-center">
                <img
                  className="object-scale-down h-10 w-20"
                  src="blue-quotation-marks.png"
                  alt="“"
                />
              </div>
              <br></br>
              <div className="text-3xl text-white h-[15vh]">
                The code for this was a bit harder to figure out at first, but
                then it became easier and more fun once I got used to it. Way
                better than block coding.
              </div>
              <br></br>
              <div className="text-2xl text-blue-400 text-center">
                6th Grade Student
              </div>
              <div className="text-xl text-white text-center">
                Participant in Conant High School CompSciKids Program
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="px-10 pt-2 pb-4 bg-slate-600">
          <div className="mt-8 flex items-center justify-center">
            <div className="w-3/4 h-[40vh] items-center">
              <div className="flex justify-center items-center">
                <img
                  className="object-scale-down h-10 w-20"
                  src="blue-quotation-marks.png"
                  alt="“"
                />
              </div>
              <br></br>
              <div className="text-3xl text-white h-[15vh]">
                This was more of a hands on experience rather than just clicking
                a screen. It was fun seeing the code actually in real life.
              </div>
              <br></br>
              <div className="text-2xl text-blue-400 text-center">
                5th Grade Student
              </div>
              <div className="text-xl text-white text-center">
                Francis B. Campanelli Elementary School
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="px-10 pt-2 pb-4 bg-slate-600">
          <div className="mt-8 flex items-center justify-center">
            <div className="w-3/4 h-[40vh] items-center">
              <div className="flex justify-center items-center">
                <img
                  className="object-scale-down h-10 w-20"
                  src="blue-quotation-marks.png"
                  alt="“"
                />
              </div>
              <br></br>
              <div className="text-3xl text-white h-[15vh]">
                This session was more advanced and more challenging to follow,
                it was better then block coding and I wish there were more
                opportunities for line coding.
              </div>
              <br></br>
              <div className="text-2xl text-blue-400 text-center">
                6th Grade Student
              </div>
              <div className="text-xl text-white text-center">
                Participant at Schaumburg Township District Library
              </div>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export default QuotesIntro;
