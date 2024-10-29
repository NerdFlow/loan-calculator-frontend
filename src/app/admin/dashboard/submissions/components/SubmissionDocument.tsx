import React from "react";
import fileIcon from "@/app/assets/icons/icon-file-type.png";
import downloadIcon from "@/app/assets/icons/icon-download.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { backendAddressUrl } from "@/app/config/address";

interface ISubmissionDocumentProps {
  name: string;
  fileName: string;
  document_name: string;
  customerId: number;
}

const SubmissionDocument = (props: ISubmissionDocumentProps) => {
  const { name, fileName, document_name, customerId } = props;

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleDownloadSubmissionDocument = async () => {
    const fileUrl = `${backendAddressUrl}/customer/submissions/download/document`;
    fetch(fileUrl, {
      method: "POST", // Add the appropriate HTTP method (e.g., POST, PUT)
      body: JSON.stringify({
        customer_id: customerId + "",
        document_name: document_name,
      }),
      headers: {
        "Content-Type": "application/json", // Add this to specify JSON content
        Authorization: "Bearer " + userInfo?.token,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="flex-grow w-1/3 self-stretch h-[68px] flex-col justify-start items-start gap-3 flex">
      <div className="text-black text-base font-medium  font-raleway leading-tight">
        {name}
      </div>
      <div className="self-stretch h-9 px-3 py-1.5 bg-white rounded-md border border-[#efefef] justify-center items-center gap-2.5 inline-flex">
        <Image src={fileIcon} width={18} height={18} alt="file icon" />
        <div className="h-[18px] relative" />
        <div className="grow shrink basis-0 h-6 justify-start items-center gap-0.5 flex">
          <div className="text-[#394560] text-xs font-normal font-['Inter'] leading-normal  line-clamp-1">
            {fileName}
          </div>
        </div>
        <div className="h-3.5 relative" />
        <Image
          onClick={handleDownloadSubmissionDocument}
          src={downloadIcon}
          className="cursor-pointer"
          width={14}
          height={14}
          alt="download icon"
        />
      </div>
    </div>
  );
};

export default SubmissionDocument;
