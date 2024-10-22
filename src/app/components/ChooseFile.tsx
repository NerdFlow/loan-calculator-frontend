import React from "react";

function ChooseFile() {
  return (
    <div className="flex gap-3 items-center font-inter">
      <div className="flex items-center">
        {/* Hidden file input */}
        <input type="file" id="file-upload" className="hidden" />
        {/* Custom button to trigger file input */}
        <label
          htmlFor="file-upload"
          className="bg-white text-black border border-gray-300 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100"
        >
          Choose File
        </label>
      </div>
      <p>No File Choosen</p>
    </div>
  );
}

export default ChooseFile;
