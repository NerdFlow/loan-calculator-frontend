import React from "react";
import Image from "next/image";
import trashIcon from "@/app/assets/icons/icon-trash-outline.png";
import fileIcon from "@/app/assets/icons/icon-file-type.png";
import downloadIcon from "@/app/assets/icons/icon-download.png";
import xIcon from "@/app/assets/icons/icon-x-mark-large-solid.png";
import { Submission } from "@/app/interfaces/Submission/Submission.interface";
import { useDeleteSubmissionMutation } from "@/lib/slices/submissions/submissionApiSlice";
import { toast } from "react-toastify";

interface ShowSubmissionProps {
  isModelOpen: boolean;
  onClose: () => void;
  submission: Submission;
}

const ShowSubmissionModal: React.FC<ShowSubmissionProps> = ({
  isModelOpen,
  onClose,
  submission,
}) => {
  // checking if modal is not open then we don't render it
  if (!isModelOpen) return;

  const [deleteSubmittion] = useDeleteSubmissionMutation();

  async function deleteSubmissionAction(id: number) {
    await deleteSubmittion(id)
      .unwrap()
      .then((response) => {
        if (!response.success) {
          return toast.error(
            response?.message ?? "Failed to Delete Submission"
          );
        }
        toast.success(response?.success);
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[836px] h-[456px] p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
            <div className="w-[92px] text-black text-sm font-normal font-raleway">
              Customer:
            </div>
            <div className="text-[#2e6fac] text-2xl font-semibold  font-montserrat">
              {submission.name}
            </div>
          </div>
          <Image
            src={xIcon}
            className="cursor-pointer"
            width={18}
            height={18}
            alt="close icon"
            onClick={onClose}
          />
        </div>
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          <div className="grow shrink basis-0 h-[43px] justify-start items-start gap-6 flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Loan Amount
              </div>
              <div className="w-[116px] text-[#383a3d] text-xl font-semibold  font-montserrat">
                {submission.selected_package.loan_amount}
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Payment Frequency
              </div>
              <div className="justify-start items-end gap-1 inline-flex">
                <div className="text-[#383a3d] text-xl font-semibold  font-montserrat">
                  {submission.selected_package.payment_frequency}
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 h-[43px] justify-start items-start gap-12 flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Commission
              </div>
              <div className="justify-start items-end gap-1 inline-flex">
                <div className="text-[#383a3d] text-xl font-semibold  font-montserrat">
                  {submission.selected_package.commission}
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Origination Fees
              </div>
              <div className="w-[116px] text-[#383a3d] text-xl font-semibold  font-montserrat">
                {submission.selected_package.origination_fee}
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          <div className="grow shrink basis-0 h-[43px] justify-start items-start gap-6 flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Factor
              </div>
              <div className="w-[116px] text-[#383a3d] text-xl font-semibold  font-montserrat">
                {submission.selected_package.factor}
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Payment
              </div>
              <div className="justify-start items-end gap-1 inline-flex">
                <div className="text-[#383a3d] text-xl font-semibold  font-montserrat">
                  {submission.selected_package.payment}
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 h-11 justify-start items-start gap-12 flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Buy Rate
              </div>
              <div className="justify-start items-end gap-1 inline-flex">
                <div className="text-[#383a3d] text-xl font-semibold  font-montserrat">
                  {submission.selected_package.buy_rate}
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Action
              </div>
              <div className="w-6 h-6 relative" />
              <Image
                onClick={() => {
                  deleteSubmissionAction(submission.id);
                }}
                src={trashIcon}
                className="cursor-pointer"
                width={24}
                height={24}
                alt="trash icon"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch h-[200px] px-6 pt-6 pb-4 bg-[#f9fbfa] rounded-lg border border-[#e1e2e1] flex-col justify-start items-center gap-4 flex">
          <div className="self-stretch justify-start items-start gap-6 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
              <div className="self-stretch h-[68px] flex-col justify-start items-start gap-3 flex">
                <div className="text-black text-base font-medium  font-raleway leading-tight">
                  Driver’s License
                </div>
                <div className="self-stretch h-9 px-3 py-1.5 bg-white rounded-md border border-[#efefef] justify-center items-center gap-2.5 inline-flex">
                  <Image
                    src={fileIcon}
                    width={18}
                    height={18}
                    alt="file icon"
                  />
                  <div className="h-[18px] relative" />
                  <div className="grow shrink basis-0 h-6 justify-start items-center gap-0.5 flex">
                    <div className="text-[#394560] text-xs font-normal font-['Inter'] leading-normal">
                      Driver’s License.pdf
                    </div>
                  </div>
                  <div className="h-3.5 relative" />
                  <Image
                    src={downloadIcon}
                    className="cursor-pointer"
                    width={14}
                    height={14}
                    alt="download icon"
                  />
                </div>
              </div>
              <div className="self-stretch h-[68px] flex-col justify-start items-start gap-3 flex">
                <div className="text-black text-base font-medium  font-raleway leading-tight">
                  Proof of ownership
                </div>
                <div className="self-stretch h-9 px-3 py-1.5 bg-white rounded-md border border-[#efefef] justify-center items-center gap-2.5 inline-flex">
                  <Image
                    src={fileIcon}
                    width={18}
                    height={18}
                    alt="file icon"
                  />
                  <div className="h-[18px] relative" />
                  <div className="grow shrink basis-0 h-6 justify-start items-center gap-0.5 flex">
                    <div className="text-[#394560] text-xs font-normal font-['Inter'] leading-normal">
                      Proof of ownership.pdf
                    </div>
                  </div>
                  <div className="h-3.5 relative" />
                  <Image
                    src={downloadIcon}
                    className="cursor-pointer"
                    width={14}
                    height={14}
                    alt="download icon"
                  />
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
              <div className="self-stretch h-[68px] flex-col justify-start items-start gap-3 flex">
                <div className="text-black text-base font-medium  font-raleway leading-tight">
                  Voided Check
                </div>
                <div className="self-stretch h-9 px-3 py-1.5 bg-white rounded-md border border-[#efefef] justify-center items-center gap-2.5 inline-flex">
                  <Image
                    src={fileIcon}
                    width={18}
                    height={18}
                    alt="file icon"
                  />
                  <div className="h-[18px] relative" />
                  <div className="grow shrink basis-0 h-6 justify-start items-center gap-0.5 flex">
                    <div className="text-[#394560] text-xs font-normal font-['Inter'] leading-normal">
                      Voided Check.pdf
                    </div>
                  </div>
                  <div className="h-3.5 relative" />
                  <Image
                    src={downloadIcon}
                    className="cursor-pointer"
                    width={14}
                    height={14}
                    alt="download icon"
                  />
                </div>
              </div>
              <div className="self-stretch h-[68px] flex-col justify-start items-start gap-3 flex">
                <div className="text-black text-base font-medium  font-raleway leading-tight">
                  A/R or Credit Card Processing Statement
                </div>
                <div className="self-stretch h-9 px-3 py-1.5 bg-white rounded-md border border-[#efefef] justify-center items-center gap-2.5 inline-flex">
                  <Image
                    src={fileIcon}
                    width={18}
                    height={18}
                    alt="file icon"
                  />
                  <div className="h-[18px] relative" />
                  <div className="grow shrink basis-0 h-6 justify-start items-center gap-0.5 flex">
                    <div className="text-[#394560] text-xs font-normal font-['Inter'] leading-normal">
                      A/R or Credit Card Processing Statement.pdf
                    </div>
                  </div>
                  <div className="h-3.5 relative" />
                  <Image
                    src={downloadIcon}
                    className="cursor-pointer"
                    width={14}
                    height={14}
                    alt="download icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSubmissionModal;
