import ChooseFile from "@/app/components/ChooseFile";
import React from "react";

function DocumentsSelection({
  name,
  className,
  handleFile,
  error,
}: {
  name: string;
  className?: string;
  handleFile: any;
  error?: string | null | false;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h3 className="font-semibold">{name}</h3>
      <ChooseFile name={name} handleSelectedFile={handleFile} />
      {error && <p className="text-sm text-red-500 ">{error}</p>}
    </div>
  );
}

export default DocumentsSelection;
