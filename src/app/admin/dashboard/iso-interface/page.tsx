"use client";

import Image from "next/image";
import React, { useState } from "react";
import dollaricon from "../../../assets/images/icon-dollar.png";
import percenticon from "../../../assets/images/icon-percent.png";
import plusicon from "../../../assets/images/icon-plus.png";
import trashicon from "../../../assets/images/icon-trash.png";

interface Row {
  id: number;
}

export default function ISOInterface() {
  const [rows, setRows] = useState<Row[]>([{ id: Date.now() }]);
  const addRow = () => {
    setRows([...rows, { id: Date.now() }]);
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="mx-8 mt-8">
      <header className="flex flex-wrap gap-10 justify-between items-center">
        <div className="flex gap-3 items-center self-stretch my-auto">
          <div className="flex flex-col justify-center items-center self-stretch px-2.5 my-auto w-11 h-11 bg-white rounded-md border-2 border-solid border-neutral-200 ">
            {"<"}
          </div>
          <h1 className="self-stretch my-auto font-montserrat text-2xl font-semibold tracking-tight text-right text-neutral-700">
            ISO Interface
          </h1>
        </div>
        <div className="flex flex-col self-stretch my-auto text-sm min-w-[240px] w-[264px]">
          <label htmlFor="customerName" className="text-black font-raleway">
            Customer:
          </label>
          <div className="flex gap-2.5 items-center pr-2 pl-3 mt-1 w-full font-medium tracking-tight bg-white rounded-md border border-solid border-neutral-200 min-h-[44px] text-neutral-700">
            <input
              type="text"
              id="customerName"
              className="flex-1 shrink self-stretch my-auto opacity-40 basis-0 text-ellipsis font-raleway"
              placeholder="Enter customer name"
            />
          </div>
        </div>
      </header>

      {/* Grid with border around the whole section */}
      <div className="mt-8 p-4 border border-gray-300 bg-white rounded-lg">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="text-left bg-white">
              <th className="font-semibold font-montserrat text-neutral-700 py-2 border-b">
                Loan Amount
              </th>
              <th className="font-semibold font-montserrat text-neutral-700 py-2 border-b">
                Payment Frequency
              </th>
              <th className="font-semibold font-montserrat text-neutral-700 py-2 border-b">
                Commission
              </th>
              <th className="font-semibold font-montserrat text-neutral-700 py-2 border-b">
                Origination Fee
              </th>
              <th className="font-semibold font-montserrat text-neutral-700 py-2 border-b">
                Factor
              </th>
              <th className="font-semibold font-montserrat text-neutral-700 py-2 border-b">
                Buy Rate
              </th>
              <th className="font-semibold font-montserrat text-neutral-700 py-2 border-b">
                Payment
              </th>
              <th className="font-semibold font-montserrat text-neutral-700 py-2 border-b">
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
                      type="text"
                      placeholder="$50,000"
                      className="flex-1 placeholder-black w-20 font-raleway focus:outline-none"
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
                    <select className="w-full border-none outline-none">
                      <option value="weekly">-Select-</option>
                      <option value="biweekly">Bi-Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </td>

                {/* Commission */}
                <td className="py-2 px-3 border-b">
                  <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                    <input
                      type="text"
                      placeholder="2.5"
                      className="flex-1 placeholder-black font-raleway  w-20 focus:outline-none"
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
                      type="text"
                      placeholder="$50,000"
                      className="flex-1 placeholder-black font-raleway  w-20 focus:outline-none"
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
                      type="text"
                      placeholder="1.2"
                      className="flex-1 placeholder-black font-raleway  w-20 focus:outline-none"
                    />
                  </div>
                </td>

                {/* Buy Rate */}
                <td className="py-2 px-3 border-b">
                  <div className="flex gap-2.5 items-center pr-2 pl-3 font-medium tracking-tight bg-white rounded-md border border-neutral-200 min-h-[44px] text-neutral-700">
                    <input
                      type="text"
                      placeholder="$50,000"
                      className="flex-1 placeholder-black font-raleway  w-20 focus:outline-none"
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
                      type="text"
                      placeholder="$50,000"
                      className="flex-1 placeholder-black font-raleway w-20 focus:outline-none"
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
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => deleteRow(row.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Button to Add Row */}
          <tfoot>
            <tr>
              <td colSpan={8} className="py-4">
                <button
                  className="text-black font-montserrat font-semibold px-4 py-2 rounded-md border border-neutral-200 flex items-center gap-2"
                  onClick={addRow}
                >
                  <Image src={plusicon} alt="plus-icon" className="w-6 h-6" />
                  Add Another Row
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex flex-row justify-between items-center mt-8 p-4 border border-gray-300 bg-white rounded-lg">
        <div className="w-[75%]">
          <h1 className="font-montserrat font-bold text-lg">Generate Link</h1>
          <p className="font-raleway text-sm mt-2">
            The system updates and saves changes, arranging entries in ascending
            order before generating a permanent link. Once generated, the link
            cannot be updated or deleted, ensuring its integrity.
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <button className="flex justify-center font-semibold items-center px-6 py-3 rounded-full bg-[#2E6FAC] text-white font-montserrat">
            Save and Generate Link
          </button>
        </div>
      </div>
    </div>
  );
}
