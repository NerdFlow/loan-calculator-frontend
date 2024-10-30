"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import trashIcon from "@/app/assets/icons/icon-trash-outline.png";
import documentIcon from "@/app/assets/icons/icon-document-text-outline.png";
import backIcon from "@/app/assets/icons/icon-chevron-left-solid.png";
import ShowSubmissionModal from "./components/modal/ShowSubmissionModal";
import { Submission as SubmissionInterface } from "@/app/interfaces/Submission/Submission.interface";
import {
  useDeleteSubmissionMutation,
  useGetSubmissionsQuery,
} from "@/lib/slices/submissions/submissionApiSlice";
import OverlayLoader from "@/app/components/Loaders/OverlayLoader";
import { toast } from "react-toastify";

export default function Submission() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionData, setSubmissionData] = useState<SubmissionInterface>();

  const closeModal = () => setIsModalOpen(false);

  const handleSubmissionView = (row: SubmissionInterface) => {
    setSubmissionData(row);
    setIsModalOpen(true);
  };

  // initiliazing the navigation hook
  const router = useRouter();

  const { data: submissions, isLoading, isError } = useGetSubmissionsQuery({});

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

  const SubmissionTableBody = ({ row, index }: { row: any; index: number }) => {
    return (
      <>
        <tr key={row.id}>
          {/* Customer Name */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              {row.name}
            </div>
          </td>

          {/* Loan Amount */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              ${row.selected_package.loan_amount}
            </div>
          </td>
          {/* Frequency */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              {row.selected_package.payment_frequency}
            </div>
          </td>
          {/* Time (Months) */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              {row.selected_package.time}
            </div>
          </td>

          {/* Commission */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              {row.selected_package.commission}%
            </div>
          </td>

          {/* Net Funding Amount */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              ${row.selected_package.net_funding_amount}
            </div>
          </td>

          {/* Origination Fee */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              ${row.selected_package.origination_fee}
            </div>
          </td>

          {/* Buy Rate */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              {row.selected_package.buy_rate}%
            </div>
          </td>

          {/* Factor */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              {row.selected_package.factor}%
            </div>
          </td>

          {/* Payment */}
          <td className="py-6 px-3">
            <div className="text-neutral-700 px-3 font-medium font-raleway">
              ${row.selected_package.payment}
            </div>
          </td>

          {/* Actions */}
          <td className="py-6 px-3 flex gap-2 items-center">
            <button>
              <Image
                src={documentIcon}
                alt="Delete"
                className="w-5 h-5 cursor-pointer"
                onClick={() => handleSubmissionView(row)}
              />
            </button>
            <button>
              <Image
                onClick={() => {
                  deleteSubmissionAction(row.id);
                }}
                src={trashIcon}
                alt="Delete"
                className="w-5 h-5 cursor-pointer"
              />
            </button>
          </td>
        </tr>
        {index < submissions.length - 1 && (
          <tr>
            <td colSpan={8} className="p-0">
              <hr className="border-t border-gray-300" />
            </td>
          </tr>
        )}
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <OverlayLoader />
      ) : (
        <div className="mx-8 mt-8">
          <header className="flex flex-wrap gap-10 justify-between items-center">
            <div className="flex gap-3 items-center self-stretch my-auto">
              <div
                onClick={() => router.back()}
                className="flex flex-col justify-center items-center self-stretch px-2.5 my-auto w-11 h-11 bg-white rounded-md border-2 border-solid border-neutral-200 cursor-pointer"
              >
                <Image src={backIcon} alt="back icon" width={24} height={24} />
              </div>
              <h1 className="self-stretch my-auto font-montserrat text-2xl font-semibold tracking-tight text-right text-neutral-700">
                View Submissions
              </h1>
            </div>
          </header>

          <div className="mt-8 py-4 border border-gray-300 bg-white rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                {/* Table Header */}
                <thead className="border-b border-gray-300">
                  <tr className="text-left bg-white">
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Customer Name
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Loan Amount
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Frequency
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Time
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Commission
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Net Funding
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Origination Fee
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Buy Rate
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Factor
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Payment
                    </th>
                    <th className="font-semibold font-montserrat text-neutral-700 p-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {submissions?.data?.map((row: any, index: number) => (
                    <SubmissionTableBody key={index} row={row} index={index} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* checking if modal is open and submission view data is set */}
            {isModalOpen && submissionData && (
              <ShowSubmissionModal
                isModelOpen={isModalOpen}
                onClose={closeModal}
                submission={submissionData}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
