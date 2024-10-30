import React from "react";
import Image from "next/image";
import trashIcon from "@/app/assets/icons/icon-trash-outline.png";
import fileIcon from "@/app/assets/icons/icon-file-type.png";
import downloadIcon from "@/app/assets/icons/icon-download.png";
import xIcon from "@/app/assets/icons/icon-x-mark-large-solid.png";
import { Submission } from "@/app/interfaces/Submission/Submission.interface";
import { useDeleteSubmissionMutation } from "@/lib/slices/submissions/submissionApiSlice";
import { toast } from "react-toastify";
import SubmissionDocument from "../SubmissionDocument";

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

  const getFileName = (filePath: string) => {
    if (!filePath) return "";
    return filePath.split("/").pop()?.split(/-(.+)/)[1] || "";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[836px] h-[545px] p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
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
                ${submission.selected_package.loan_amount}
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
                Time
              </div>
              <div className="justify-start items-end gap-1 inline-flex">
                <div className="text-[#383a3d] text-xl font-semibold  font-montserrat">
                  {submission.selected_package.time}
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Origination Fees
              </div>
              <div className="w-[116px] text-[#383a3d] text-xl font-semibold  font-montserrat">
                ${submission.selected_package.origination_fee}
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
                {submission.selected_package.factor}%
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Payment
              </div>
              <div className="justify-start items-end gap-1 inline-flex">
                <div className="text-[#383a3d] text-xl font-semibold  font-montserrat">
                  ${submission.selected_package.payment}
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
                  ${submission.selected_package.buy_rate}
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Net Funding
              </div>
              <div className="w-6 h-6 relative" />
              <div className="justify-start items-end gap-1 inline-flex">
                <div className="text-[#383a3d] text-xl font-semibold  font-montserrat">
                  ${submission.selected_package.buy_rate}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          <div className="grow shrink basis-0 h-[43px] justify-start items-start gap-6 flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="text-black text-xs font-normal  font-montserrat leading-tight">
                Commision
              </div>
              <div className="w-[116px] text-[#383a3d] text-xl font-semibold  font-montserrat">
                {submission.selected_package.commission}%
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
          <div className="grow shrink basis-0 h-11 justify-start items-start gap-12 flex"></div>
        </div>
        <div className="self-stretch h-[200px] px-6 pt-6 pb-4 bg-[#f9fbfa] rounded-lg border border-[#e1e2e1] flex-col justify-start items-center gap-4 flex">
          <div className="self-stretch justify-start items-start gap-6 inline-flex">
            <div className="flex flex-wrap gap-6 ">
              <SubmissionDocument
                document_name="driver_license"
                customerId={submission.selected_package.customer_id}
                name="Driver's License"
                fileName={getFileName(submission.driver_license)}
              />
              <SubmissionDocument
                document_name="voided_check"
                customerId={submission.selected_package.customer_id}
                name="Voided Check"
                fileName={getFileName(submission.voided_check)}
              />
              <SubmissionDocument
                document_name="proof_of_ownership"
                customerId={submission.selected_package.customer_id}
                name="Proof of ownership"
                fileName={getFileName(submission.proof_of_ownership)}
              />
              <SubmissionDocument
                document_name="credit_card_processing_statement"
                customerId={submission.selected_package.customer_id}
                name="A/R or Credit Card Processing Statement"
                fileName={getFileName(
                  submission.credit_card_processing_statement
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSubmissionModal;
