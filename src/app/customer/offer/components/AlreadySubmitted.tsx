import React from "react";

function AlreadySubmitted() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
      <h3 className="font-bold text-xl">Link Expired </h3>
      <p className="text-lg">You have already selected your package!</p>
    </div>
  );
}

export default AlreadySubmitted;
