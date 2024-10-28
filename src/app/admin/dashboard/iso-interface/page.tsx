"use client";

import Image from "next/image";
import React, { useState } from "react";
import dollaricon from "../../../assets/images/icon-dollar.png";
import percenticon from "../../../assets/images/icon-percent.png";
import plusicon from "../../../assets/images/icon-plus.png";
import trashicon from "@/app/assets/icons/icon-trash-outline.png";
import backIcon from "@/app/assets/icons/icon-chevron-left-solid.png";
import { useRouter } from "next/navigation";
import { useAddIsoPackagesMutation } from "@/lib/slices/iso-interface/isoApiSlice";
import { toast } from "react-toastify";
import OverlayLoader from "@/app/components/Loaders/OverlayLoader";
import ClipboardIcon from "@/app/assets/icons/icon-square-2-stack-outline.png";

interface Row {
  id: number;
  loan_amount: string;
  payment_frequency: string;
  time: string;
  commission: string;
  origination_fee: string;
  net_funding_amount: string;
  factor: string;
  buy_rate: string;
  payment: string;
}

export default function ISOInterface() {
  const [customerName, setCustomerName] = useState("");
  const [sharingLink, setSharingLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [rows, setRows] = useState<Row[]>([
    {
      id: Date.now(),
      loan_amount: "",
      payment_frequency: "",
      time: "",
      commission: "",
      origination_fee: "",
      net_funding_amount: "",
      factor: "",
      buy_rate: "",
      payment: "",
    },
  ]);

  // initializing the mutation
  const [addIsoPackages, { isLoading }] = useAddIsoPackagesMutation();

  // initializing the navigation hook
  const router = useRouter();

  // function for adding new row to the table
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        loan_amount: "",
        payment_frequency: "",
        time: "",
        commission: "",
        origination_fee: "",
        net_funding_amount: "",
        factor: "",
        buy_rate: "",
        payment: "",
      },
    ]);
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowChange = (id: number, field: keyof Row, value: string) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  // function for submitting the packages
  const handleSubmit = async () => {
    try {
      // preparing the payload
      const payload = {
        customer_name: customerName,
        packages: rows.map(({ id, ...rowData }) => rowData),
      };

      // calling the mutation for storing packages
      const response = await addIsoPackages(payload).unwrap();

      // checking if response is false
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      // setting sharing link to the state
      setSharingLink(response.link);
      toast.success(response.message || "Packages added successfully");
    } catch (error) {}
  };

  // Function to copy the link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(sharingLink)
      .then(() => {
        setCopySuccess("Link copied!");
      })
      .catch((error) => {
        setCopySuccess("Failed to copy link");
      });
  };

  return (
    <div className="relative">
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
              ISO Interface
            </h1>
          </div>
          <div className="flex flex-col self-stretch my-auto text-sm min-w-[240px] w-[264px]">
            <label htmlFor="customerName" className="text-black font-raleway">
              Customer:
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="flex gap-2.5 items-center pr-2 pl-3 mt-1 w-full font-medium tracking-tight bg-white rounded-md border border-solid border-neutral-200 min-h-[44px] text-neutral-700"
            />
            <div
              id="customerName"
              className="flex-1 shrink self-stretch my-auto opacity-40 basis-0 text-ellipsis font-raleway"
            >
              {" "}
            </div>
            {/* </input> */}
          </div>
        </header>

        {/* Grid with border around the whole section */}
        <div className="mt-8 py-4 border border-gray-300 bg-white rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead className="border-b border-gray-300">
                <tr className="text-left bg-white">
                  <th className="font-semibold font-montserrat text-neutral-700 p-3">
                    Loan Amount
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Frequency
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Time
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Commission
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Origination Fee
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Net Funding
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Factor
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Buy Rate
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Payment
                  </th>
                  <th className="font-semibold font-montserrat text-neutral-700 py-2">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {/* Loan Amount */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <input
                          type="number"
                          placeholder="$50,000"
                          className="flex-1 w-20 font-raleway focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={row.loan_amount}
                          onChange={(e) =>
                            handleRowChange(
                              row.id,
                              "loan_amount",
                              e.target.value
                            )
                          }
                        />
                        <Image
                          src={dollaricon}
                          alt="dollar-icon"
                          className="w-6 h-6"
                        />
                      </div>
                    </td>

                    {/* Payment Frequency */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium font-raleway  tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <select
                          className="w-full border-none outline-none"
                          value={row.payment_frequency}
                          onChange={(e) =>
                            handleRowChange(
                              row.id,
                              "payment_frequency",
                              e.target.value
                            )
                          }
                        >
                          <option value="">-Select-</option>
                          <option value="Bi-Monthly">Bi-Monthly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Daily">Daily</option>
                        </select>
                      </div>
                    </td>

                    {/* Origination Fee */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <input
                          type="number"
                          // placeholder="$50,000"
                          className="flex-1  font-raleway  w-20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={row.time}
                          onChange={(e) =>
                            handleRowChange(row.id, "time", e.target.value)
                          }
                        />
                      </div>
                    </td>

                    {/* Commission */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <input
                          type="number"
                          placeholder="2.5"
                          className="flex-1  font-raleway  w-20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={row.commission}
                          onChange={(e) =>
                            handleRowChange(
                              row.id,
                              "commission",
                              e.target.value
                            )
                          }
                        />
                        <Image
                          src={percenticon}
                          alt="percent-icon"
                          className="w-6 h-6"
                        />
                      </div>
                    </td>

                    {/* Origination Fee */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <input
                          type="number"
                          placeholder="$50,000"
                          className="flex-1  font-raleway  w-20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={row.origination_fee}
                          onChange={(e) =>
                            handleRowChange(
                              row.id,
                              "origination_fee",
                              e.target.value
                            )
                          }
                        />
                        <Image
                          src={dollaricon}
                          alt="dollar-icon"
                          className="w-6 h-6"
                        />
                      </div>
                    </td>

                    {/* Net funding Fee */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <input
                          type="number"
                          placeholder="$50,000"
                          className="flex-1  font-raleway  w-20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={row.net_funding_amount}
                          onChange={(e) =>
                            handleRowChange(
                              row.id,
                              "net_funding_amount",
                              e.target.value
                            )
                          }
                        />
                        <Image
                          src={dollaricon}
                          alt="dollar-icon"
                          className="w-6 h-6"
                        />
                      </div>
                    </td>

                    {/* Factor */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <input
                          type="number"
                          placeholder="1.2"
                          className="flex-1  font-raleway  w-20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={row.factor}
                          onChange={(e) =>
                            handleRowChange(row.id, "factor", e.target.value)
                          }
                        />
                      </div>
                    </td>

                    {/* Buy Rate */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <input
                          type="number"
                          placeholder="$50,000"
                          className="flex-1  font-raleway  w-20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={row.buy_rate}
                          onChange={(e) =>
                            handleRowChange(row.id, "buy_rate", e.target.value)
                          }
                        />
                        <Image
                          src={dollaricon}
                          alt="dollar-icon"
                          className="w-6 h-6"
                        />
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                        <input
                          type="number"
                          placeholder="$50,000"
                          className="flex-1  font-raleway w-20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={row.payment}
                          onChange={(e) =>
                            handleRowChange(row.id, "payment", e.target.value)
                          }
                        />
                        <Image
                          src={dollaricon}
                          alt="dollar-icon"
                          className="w-6 h-6"
                        />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-3 border-b">
                      <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight min-h-[44px] text-neutral-700">
                        <Image
                          src={trashicon}
                          alt="trash-icon"
                          className={`w-6 h-6 cursor-pointer ${
                            rows.length === 1 || sharingLink
                              ? "opacity-50 cursor-default"
                              : ""
                          }`}
                          onClick={() =>
                            // checking if there is only one row then dont allow to delete
                            rows.length > 1 && !sharingLink
                              ? deleteRow(row.id)
                              : null
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Button to Add Row */}
              <tfoot>
                <tr>
                  <td colSpan={8} className="p-3">
                    <button
                      className="text-black font-montserrat font-semibold px-4 py-2 rounded-md border border-neutral-200 flex items-center gap-2"
                      onClick={addRow}
                    >
                      <Image
                        src={plusicon}
                        alt="plus-icon"
                        className="w-6 h-6"
                      />
                      Add Another Row
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 p-4 border border-gray-300 bg-white rounded-lg">
          <div className="w-full md:w-[65%] mb-4 md:mb-0">
            {" "}
            {/* Full width on small screens */}
            <h1 className="font-montserrat font-bold text-lg">Generate Link</h1>
            <p className="font-raleway text-sm mt-2">
              The system updates and saves changes, arranging entries in
              ascending order before generating a permanent link. Once
              generated, the link cannot be updated or deleted, ensuring its
              integrity.
            </p>
          </div>
          <div className="w-full md:w-[30%] flex justify-end">
            {!sharingLink ? (
              <button
                onClick={handleSubmit}
                className="w-full md:w-auto flex justify-center font-semibold items-center px-6 py-3 rounded-full bg-[#2E6FAC] text-white font-montserrat"
              >
                Save and Generate Link
              </button>
            ) : (
              <>
                <div className="flex items-center gap-2.5 pr-2 pl-3 mt-1 w-full font-medium tracking-tight bg-white rounded-md border border-solid border-neutral-200 min-h-[44px]">
                  {/* Input Field */}
                  <input
                    type="text"
                    value={sharingLink}
                    readOnly
                    className="flex-1 font-raleway text-neutral-700 focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap"
                  />

                  {/* Clipboard Icon */}
                  <Image
                    src={ClipboardIcon}
                    alt="copy icon"
                    className="cursor-pointer w-6 h-6"
                    onClick={copyToClipboard}
                  />
                </div>
                <div
                  id="customerName"
                  className="flex-1 shrink self-stretch my-auto opacity-40 basis-0 text-ellipsis font-raleway"
                >
                  {" "}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* showing loading overlay on api call waiting */}
      {isLoading && <OverlayLoader />}
    </div>
  );
}
