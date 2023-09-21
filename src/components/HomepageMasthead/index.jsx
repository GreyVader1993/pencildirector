import React from "react";

const HomepageMasthead = () => {
  return (
    <div className="h-screen flex justify-center items-center  bg-amber-50">
      <h1 className="fixed font-fraunces font-semibold text-9xl text-center text-indigo-500 left-1/4 top-1 z-10">
        Shraddha
      </h1>
      <video className="fixed max-w-lg opacity-95" autoPlay loop muted>
        <source
          src="https://video.wixstatic.com/video/695feb_4fb28a946f40421c8e290d38b44eaff1/480p/mp4/file.mp4"
          type="video/mp4"
        />
      </video>
      <h1 className="fixed font-fraunces font-semibold text-9xl text-center text-indigo-500 right-1/4 bottom-1 z-10">
        Tiwari
      </h1>
    </div>
  );
};

export default HomepageMasthead;
