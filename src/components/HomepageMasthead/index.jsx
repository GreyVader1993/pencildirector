import React from "react";

const HomepageMasthead = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-amber-50">
      <h1 className="font-fraunces font-semibold text-3xl md:text-7xl text-center text-indigo-500 mb-8">
        Shraddha Tiwari
      </h1>
      <div className="flex flex-row gap-2">
        <video className="max-w-lg opacity-95 rounded-xl hidden lg:block" autoPlay loop muted>
          <source
            src="https://video.wixstatic.com/video/695feb_4fb28a946f40421c8e290d38b44eaff1/480p/mp4/file.mp4#t=4"
            type="video/mp4"
          />
        </video>
        <video className="max-w-lg opacity-95 rounded-xl" autoPlay loop muted>
          <source
            src="https://video.wixstatic.com/video/695feb_4fb28a946f40421c8e290d38b44eaff1/480p/mp4/file.mp4#t=2"
            type="video/mp4"
          />
        </video>
        <video className="max-w-lg opacity-95 rounded-xl hidden lg:block" autoPlay loop muted>
          <source
            src="https://video.wixstatic.com/video/695feb_4fb28a946f40421c8e290d38b44eaff1/480p/mp4/file.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <a href="/home" className="font-fraunces font-semibold text-4xl text-center text-indigo-500 bottom-1 z-10 border-2 border-indigo-500 rounded-xl mt-8 py-0.5 px-4 hover:text-white hover:bg-indigo-500 cursor-pointer">
        Enter
      </a>
    </div>
  );
};

export default HomepageMasthead;
