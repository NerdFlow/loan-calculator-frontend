import React, { useState } from "react";

interface ChooseFileProps {
  handleSelectedFile: (file: File | null) => void;
  name: string;
}

const ChooseFile: React.FC<ChooseFileProps> = ({
  handleSelectedFile,
  name,
}) => {
  const [selectedFileName, setSelectedFileName] =
    useState<string>("No File Chosen");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFileName(file.name);
      handleSelectedFile(file);
    } else {
      setSelectedFileName("No File Chosen");
      handleSelectedFile(null);
    }
  };

  return (
    <div className="flex gap-3 items-center font-inter">
      <div className="flex items-center">
        {/* Hidden file input */}
        <input
          type="file"
          id={name}
          className="hidden"
          onChange={onFileChange}
        />
        {/* Custom button to trigger file input */}
        <label
          htmlFor={name}
          className="bg-white text-black border border-gray-300 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100"
        >
          Choose File
        </label>
      </div>
      <p>{selectedFileName}</p>
    </div>
  );
};

export default ChooseFile;
