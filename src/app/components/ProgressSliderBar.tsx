import React, { useState } from "react";

const ProgressSliderBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full relative">
      <p className="absolute left-0 -bottom-[15px] text-sm">5000$</p>
      <div className="relative h-[6px] bg-[#EEEEEE] rounded-lg mb-5">
        {/* Fill based on value */}
        <div
          className="h-full bg-[#2E6FAC] rounded-lg"
          style={{
            width: `${((value / 250000) * 100).toFixed(2)}%`,
          }}
        />
      </div>
      <p className="absolute right-0 -bottom-[15px] text-sm">250,000$</p>
    </div>
  );
};

export default ProgressSliderBar;
