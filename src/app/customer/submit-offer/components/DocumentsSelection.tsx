import ChooseFile from "@/app/components/ChooseFile";
import React from "react";

function DocumentsSelection({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h3 className="font-semibold">{name}</h3>
      <ChooseFile />
    </div>
  );
}

export default DocumentsSelection;
