"use client";

import { useState, useEffect } from "react";
import OfferBanner from "./components/OfferBanner";

export default function Offer() {
  const packages = [
    {
      loan_amount: "40000",
      payment_frequency: "Monthly",
      commission: "4.5",
      origination_fee: "4500",
      factor: "6.7",
      buy_rate: "3400",
      payment: "12000",
    },
    {
      loan_amount: "40000",
      payment_frequency: "Weekly",
      commission: "4.5",
      origination_fee: "4500",
      factor: "6.7",
      buy_rate: "3400",
      payment: "12000",
    },
    {
      loan_amount: "10000",
      payment_frequency: "Monthly",
      commission: "2.5",
      origination_fee: "3500",
      factor: "2.7",
      buy_rate: "3340",
      payment: "2000",
    },
  ];

  // State for storing selected package and input values
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [loanAmount, setLoanAmount] = useState(selectedPackage.loan_amount);
  const [commission, setCommission] = useState(selectedPackage.commission);
  const [originationFee, setOriginationFee] = useState(
    selectedPackage.origination_fee
  );
  const [frequency, setFrequency] = useState(selectedPackage.payment_frequency);

  // Determine the min/max for loan amount and commission
  const loanMin = Math.min(...packages.map((pkg) => parseInt(pkg.loan_amount)));
  const loanMax = Math.max(...packages.map((pkg) => parseInt(pkg.loan_amount)));
  const commissionMin = Math.min(
    ...packages.map((pkg) => parseFloat(pkg.commission))
  );
  const commissionMax = Math.max(
    ...packages.map((pkg) => parseFloat(pkg.commission))
  );

  const originationFeeMin = Math.min(
    ...packages.map((pkg) => parseInt(pkg.origination_fee))
  );
  const originationFeeMax = Math.max(
    ...packages.map((pkg) => parseInt(pkg.origination_fee))
  );

  // Update state when user changes an input
  const handleLoanAmountChange = (e: any) => {
    const value = e.target.value;
    setLoanAmount(value);
    updatePackage(value, commission, frequency, originationFee);
  };

  const handleOriginationFeeChange = (e: any) => {
    const value = e.target.value;
    setOriginationFee(value);
    updatePackage(loanAmount, commission, frequency, value);
  };

  const handleCommissionChange = (e: any) => {
    const value = e.target.value;
    setCommission(value);
    updatePackage(loanAmount, value, frequency, originationFee);
  };

  const handleFrequencyChange = (e: any) => {
    const value = e.target.value;
    setFrequency(value);
    updatePackage(loanAmount, commission, value, originationFee);
  };

  // Function to update the selected package based on inputs
  const updatePackage = (
    loanAmount: string,
    commission: string,
    frequency: string,
    originationFee: string
  ) => {
    const match = packages.find(
      (pkg) =>
        pkg.loan_amount === loanAmount &&
        pkg.commission === commission &&
        pkg.origination_fee === originationFee &&
        pkg.payment_frequency === frequency
    );
    // console.log({ originationFee, commission, loanAmount, frequency });
    console.log(match);
    if (match) {
      setSelectedPackage(match);
      // setOriginationFee(match.origination_fee);
    }
  };

  useEffect(() => {
    updatePackage(loanAmount, commission, frequency, originationFee);
  }, [loanAmount, commission, frequency, originationFee]);

  return (
    <>
      <div className="mx-8 mt-8">
        <header className="flex flex-wrap gap-10 justify-between items-center">
          <div className="flex gap-3 items-center self-stretch my-auto">
            <h1 className="self-stretch my-auto font-montserrat text-2xl font-semibold tracking-tight text-right text-neutral-700">
              Offer Submission Calculator
            </h1>
          </div>
        </header>

        {/* displaying the offer banner */}
        <OfferBanner />

        {/* caluclator layout */}
        <div className="grid sm:grid-cols-12 gap-4 mt-5">
          <div className="bg-white min-h-[100px] rounded-md sm:col-span-8 border">
            <div className="p-6 flex justify-between items-start gap-6">
              {/* Merchant Section */}
              <div className="flex flex-col justify-start items-start gap-1.5">
                <div className="text-black text-base font-semibold font-montserrat leading-tight">
                  Merchant:
                </div>
                <div className="text-black text-base font-normal font-montserrat leading-tight">
                  Private limited
                </div>
              </div>
              {/* Term Section */}
              <div className="h-12 px-6 rounded-md border border-[#dedede] flex justify-start items-center gap-6">
                <div className="text-black text-base font-semibold font-montserrat">
                  Frequency
                </div>
                <div className="self-stretch border border-[#dedede]"></div>
                <div className="flex gap-6 items-center">
                  <select
                    value={frequency}
                    onChange={handleFrequencyChange}
                    className="w-32 h-8 border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Settings Section */}
            <div className="border-gray/50 border-t p-4 px-5 flex flex-col gap gap-5">
              {/* s1 */}
              <div className="flex flex-wrap justify-between">
                <div className="">
                  <p>Loan Amount</p>
                  <p className="font-semibold text-xl text-secondary">
                    ${loanAmount}
                  </p>
                </div>
                <div className="flex-grow flex justify-end items-center">
                  <div className="w-[80%] max-w-[600px] relative">
                    <p className="absolute left-0 -bottom-[15px] text-sm">
                      ${loanMin}
                    </p>
                    <input
                      id="minmax-range"
                      type="range"
                      step={loanMax - loanMin}
                      className="w-full mb-5"
                      min={loanMin}
                      max={loanMax}
                      value={loanAmount}
                      onChange={handleLoanAmountChange}
                    />
                    <p className="absolute right-0 -bottom-[15px] text-sm">
                      ${loanMax}
                    </p>
                  </div>
                </div>
              </div>
              {/* s2 */}
              <div className="flex flex-wrap justify-between">
                <div className="">
                  <p>Commision</p>
                  <p className="font-semibold text-xl text-secondary">
                    {commission}%
                  </p>
                </div>
                <div className="flex-grow flex justify-end items-center">
                  <div className="w-[80%] max-w-[600px] relative">
                    <p className="absolute left-0 -bottom-[15px] text-sm">
                      {commissionMin}%
                    </p>
                    <input
                      id="minmax-range"
                      type="range"
                      step={commissionMax - commissionMin}
                      min={commissionMin}
                      max={commissionMax}
                      value={commission}
                      onChange={handleCommissionChange}
                      className="w-full mb-5"
                    />
                    <p className="absolute right-0 -bottom-[15px] text-sm">
                      {commissionMax}%
                    </p>
                  </div>
                </div>
              </div>
              {/* s3 */}
              <div className="flex flex-wrap justify-between">
                <div className="">
                  <p>Organization Fee</p>
                  <p className="font-semibold text-xl text-secondary">
                    ${originationFee}
                  </p>
                </div>
                <div className="flex-grow flex justify-end items-center">
                  <div className="w-[80%] max-w-[600px] relative">
                    <p className="absolute left-0 -bottom-[15px] text-sm">
                      ${originationFeeMin}
                    </p>
                    <input
                      id="minmax-range"
                      type="range"
                      step={originationFeeMax - originationFeeMin}
                      min={originationFeeMin}
                      max={originationFeeMax}
                      value={originationFee}
                      onChange={handleOriginationFeeChange}
                      className="w-full mb-5"
                    />
                    <p className="absolute right-0 -bottom-[15px] text-sm">
                      ${originationFeeMax}
                    </p>
                  </div>
                </div>
              </div>
              {/* s4 */}
              {/* <div className="flex flex-wrap justify-between">
                <div className="">
                  <p>Loan Amount</p>
                  <p className="font-semibold text-xl text-secondary">
                    $50,000
                  </p>
                </div>
                <div className="flex-grow flex justify-end items-center">
                  <div className="w-[80%] max-w-[600px] relative">
                    <p className="absolute left-0 -bottom-[15px] text-sm">
                      50,000$
                    </p>
                    <input
                      id="minmax-range"
                      type="range"
                      min="0"
                      max="10"
                      className="w-full mb-5"
                    />
                    <p className="absolute right-0 -bottom-[15px] text-sm">
                      250,000$
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            {/* Disclaimer */}
            <div className="border-gray/50 border-t p-4 px-5 flex flex-col gap gap-5">
              <p className="text-[10px] text-gray-400">
                By visiting the site or using our Services, you accept the
                practices described in this Privacy Policy. We may update this
                Privacy Policy from time to time by making available a revised,
                dated version on the site. If the revised version includes a
                substantial change, we will provide a more prominent notice
                (including, for certain services, an email or other type of
                notification of Privacy Policy changes) prior to the change
                becoming effective. 
              </p>
            </div>
          </div>

          <div className="bg-major p-3 flex flex-col gap-3 text-white min-h-[100px] rounded-md sm:col-span-4 border">
            <div className="flex  flex-col justify-start items-center gap-2">
              <p className="text-sm font-semibold ">Offer Summary</p>
              <div className="bg-minor w-full rounded text-center p-4 flex flex-col gap-2">
                <p className="font-semibold">Total Repayment</p>
                <p className="text-3xl font-bold font-inter">$250,000</p>
              </div>
            </div>
            <div className="flex gap-2 flex-col ">
              <div className="font-inter flex justify-between">
                <p>Buy Rate</p>
                <p>${selectedPackage.buy_rate}</p>
              </div>
              <div className="font-inter flex justify-between">
                <p>Factor</p>
                <p>{selectedPackage.factor}</p>
              </div>
              <div className="font-inter flex justify-between">
                <p>Payment</p>
                <p>${selectedPackage.payment}</p>
              </div>
            </div>
            <div className="border-white/25 border-t flex flex-col py-3 gap-2">
              <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                <p>Payment</p>
                <p className="font-semibold">$30,10.70</p>
              </div>
              <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                <p>Payment</p>
                <p className="font-semibold">$30,10.70</p>
              </div>
              <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                <p>Payment</p>
                <p className="font-semibold">$30,10.70</p>
              </div>
              <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                <p>Payment</p>
                <p className="font-semibold">$30,10.70</p>
              </div>
            </div>
            <button className="text-sm bg-secondary rounded-full p-2 font-semibold hover:bg-secondary/80">
              Select This Offer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
