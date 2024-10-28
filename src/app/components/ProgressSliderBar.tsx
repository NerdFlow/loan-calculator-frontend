import React from "react";

const ProgressSliderBar = ({
  value,
  min,
  max,
}: {
  value: number;
  min: number;
  max: number;
}) => {
  // Calculate the percentage of progress based on the range (min to max)
  let progress = 0;

  if (min === max) {
    // If min and max are the same, show full progress
    progress = 100;
  } else {
    progress = ((value - min) / (max - min)) * 100;
  }

  // Ensure there's a minimum width even when progress is very small
  const minProgressWidth = 3; // Set this to a minimum percentage width you want
  if (progress === 0) {
    progress = minProgressWidth;
  }

  return (
    <div className="w-full relative">
      <p className="absolute left-0 -bottom-[15px] text-sm">{min}$</p>
      <div className="relative h-[6px] bg-[#EEEEEE] rounded-lg mb-5">
        {/* Fill based on value */}
        <div
          className="h-full bg-[#2E6FAC] rounded-lg"
          style={{
            width: `${progress.toFixed(2)}%`,
          }}
        />
      </div>
      <p className="absolute right-0 -bottom-[15px] text-sm">{max}$</p>
    </div>
  );
};

export default ProgressSliderBar;
