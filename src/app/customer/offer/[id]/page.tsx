"use client";

import { useState, useEffect } from "react";
import OfferBanner from "../components/OfferBanner";
import { useParams, useRouter } from "next/navigation";
import { useGetCustomerIsoPackagesQuery } from "@/lib/slices/offer/offerApiSlice";
import OverlayLoader from "@/app/components/Loaders/OverlayLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCustomerPackages,
  setCustomerSelectedPackage,
} from "@/lib/slices/offer/offerSlice";
import { RootState } from "@/lib/store";
import SubmitOffer from "../components/SubmitOffer";
import AlreadySubmitted from "../components/AlreadySubmitted";
import { formattedNumber } from "@/app/utils/helpers";

export interface IIisoPackage {
  id: number;
  customer_id: number;
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

export default function Offer() {
  // initializing the router
  const params = useParams();

  // getting the Id from parameters
  const { id } = params;

  // initializing the get packages function
  const { data: customerPackages, isLoading } =
    useGetCustomerIsoPackagesQuery(id);

  //State
  const [isPackageSelected, setIsPackageSelected] = useState<boolean>(false);

  useEffect(() => {
    if (!customerPackages?.data?.packages) return;
    setPackages(customerPackages?.data?.packages);
    const frequencies = Array.from(
      new Set(
        (customerPackages.data.packages as IIisoPackage[]).map((pkg) => {
          return pkg.payment_frequency;
        })
      )
    );
    setFrequencies(frequencies);
    setFrequency(frequencies[0]);
  }, [customerPackages?.data?.packages]);

  // State for storing selected package and input values
  const [packages, setPackages] = useState<IIisoPackage[]>([]);
  const [loanAmount, setLoanAmount] = useState<number | null>();
  const [timePeriod, setTimePeriod] = useState<number | null>();
  const [originationFee, setOriginationFee] = useState<number | null>();
  const [frequency, setFrequency] = useState<any>();
  const [frequencies, setFrequencies] = useState<string[]>();
  const [loanAmounts, setloanAmounts] = useState<number[]>([]);
  const [timePeriods, setTimePeriods] = useState<number[]>([]);
  const [originationFeeses, setOriginationFeeses] = useState<number[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<IIisoPackage | null>();
  const [maxLoanAmount, setMaxLoaAmount] = useState("0");

  //maxLoanAmount
  useEffect(() => {
    if (!packages || packages?.length <= 0) return;
    const reducedMaxLoanAmount = packages.reduce((acc, v) => {
      if (acc > v) return acc;
      else return v;
    }).loan_amount;
    setMaxLoaAmount(reducedMaxLoanAmount);
  }, [packages]);

  // Initial Frequency
  useEffect(() => {
    const filteredPackages = packages.filter(
      (pkg) => pkg.payment_frequency === frequency
    );

    const filteredLoans = Array.from(
      new Set(
        filteredPackages
          .map((pkg) => parseInt(pkg.loan_amount))
          .sort((a, b) => a - b)
      )
    );

    setloanAmounts(filteredLoans);
  }, [frequency]);

  // Initialization
  useEffect(() => {
    if (loanAmounts) setLoanAmount(loanAmounts[0]);
    else setLoanAmount(null);
  }, [loanAmounts]);
  // Initialization
  useEffect(() => {
    if (timePeriods) setTimePeriod(timePeriods[0]);
    else setTimePeriod(null);
  }, [timePeriods]);
  // Initialization
  useEffect(() => {
    if (originationFeeses) setOriginationFee(originationFeeses[0]);
    else setOriginationFee(null);
  }, [originationFeeses, loanAmount]);

  //Time Period Options
  useEffect(() => {
    const filteredPackages = packages.filter(
      (pkg) => pkg.payment_frequency === frequency + ""
    );
    const filteredTimePeriod = Array.from(
      new Set(filteredPackages.map((pkg) => parseFloat(pkg.time)))
    ).sort((a, b) => a - b);

    setTimePeriods(filteredTimePeriod);
  }, [frequency]);

  // Origination Fee Options
  useEffect(() => {
    const filteredPackages = packages.filter(
      (pkg) =>
        pkg.payment_frequency === frequency + "" &&
        pkg.loan_amount == loanAmount + "" &&
        pkg.time == timePeriod + ""
    );

    const filteredOrigination = Array.from(
      new Set(filteredPackages.map((pkg) => parseInt(pkg.origination_fee)))
    ).sort((a, b) => a - b);

    setOriginationFeeses(filteredOrigination);
  }, [loanAmount, frequency, timePeriod]);

  // Selected Package Selection
  useEffect(() => {
    if (!loanAmount || !timePeriod || !originationFee) return;
    const selectedPackage = packages.filter(
      (pkg) =>
        pkg.loan_amount == loanAmount + "" &&
        pkg.time == timePeriod + "" &&
        pkg.origination_fee == originationFee + ""
    );
    setSelectedPackage(selectedPackage[0]);
  }, [loanAmount, timePeriod, originationFee]);

  //hanlders

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(loanAmounts[(e.target as any).value - 1]);
    const filteredTimePeriod = packages.filter(
      (pkg) =>
        pkg.payment_frequency === frequency + "" &&
        pkg.loan_amount == loanAmounts[(e.target as any).value - 1] + ""
    );
    setTimePeriod(parseInt(filteredTimePeriod[0].time));
  };

  const handleTimePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimePeriod(timePeriods[(e.target as any).value - 1]);

    const filteredLoanAmount = packages.filter(
      (pkg) =>
        pkg.payment_frequency === frequency + "" &&
        pkg.time == timePeriods[(e.target as any).value - 1] + ""
    );

    setLoanAmount(parseInt(filteredLoanAmount[0].loan_amount));
  };
  const handleOrignationFeeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOriginationFee(originationFeeses[(e.target as any).value - 1]);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(e.target.value);
  };

  const frequencyUnit = () => {
    switch (frequency) {
      case "Monthly":
      case "Bi-Monthly":
        return "Months";
      case "Weekly":
        return "Weeks";
      case "Daily":
        return "Days";
    }
  };
  const dispatch = useDispatch();
  const handleSelectOffer = () => {
    dispatch(setCustomerSelectedPackage(selectedPackage));
    dispatch(setAllCustomerPackages(packages));
    setIsPackageSelected(true);
  };

  const [isPackageSubmitted, setIsPackageSubmitted] = useState<boolean>(false);

  if ((!customerPackages?.success && !isLoading) || isPackageSubmitted)
    return <AlreadySubmitted />;

  return (
    <>
      {isLoading && <OverlayLoader />}
      {!isPackageSelected ? (
        <div className="mx-8 mt-8">
          <header className="flex flex-wrap gap-10 justify-between items-center">
            <div className="flex gap-3 items-center self-stretch my-auto">
              <h1 className="self-stretch my-auto font-montserrat text-2xl font-semibold tracking-tight text-right text-neutral-700">
                Offer Submission Calculator
              </h1>
            </div>
          </header>

          {/* displaying the offer banner */}
          <OfferBanner amount={maxLoanAmount ?? "0"} />

          {/* caluclator layout */}
          <div className="grid grid-cols-12 gap-4 mt-5">
            <div className="bg-white min-h-[100px] rounded-md col-span-12 lg:col-span-8 border">
              <div className="p-6 flex justify-between items-start gap-6">
                {/* Merchant Section */}
                <div className="flex flex-col justify-start items-start gap-1.5">
                  <div className="text-black text-base font-semibold font-montserrat leading-tight">
                    Merchant:
                  </div>
                  <div className="text-black text-base font-normal font-montserrat leading-tight">
                    {customerPackages?.data?.name}
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
                      <option hidden value="">
                        Select
                      </option>
                      {frequencies &&
                        frequencies.map((frequency, index) => {
                          return (
                            <option
                              className="capitalize"
                              key={index}
                              value={frequency}
                            >
                              {frequency}
                            </option>
                          );
                        })}
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
                      ${loanAmount && formattedNumber(loanAmount)}
                    </p>
                  </div>
                  <div className="flex-grow flex justify-end items-center">
                    <div className="w-[470px] max-w-full relative">
                      <p className="absolute left-0 -bottom-[15px] text-sm">
                        ${loanAmounts[0] && formattedNumber(loanAmounts[0])}
                      </p>
                      <input
                        disabled={loanAmounts.length <= 1}
                        id="minmax-range"
                        type="range"
                        step={1}
                        className="w-full mb-5"
                        min={loanAmounts.length > 1 ? 1 : 0}
                        max={loanAmounts.length}
                        value={loanAmounts.indexOf(loanAmount ?? 0) + 1}
                        onChange={handleLoanAmountChange}
                      />
                      <p className="absolute right-0 -bottom-[15px] text-sm">
                        $
                        {loanAmounts[loanAmounts.length - 1] &&
                          formattedNumber(loanAmounts[loanAmounts.length - 1])}
                      </p>
                    </div>
                  </div>
                </div>
                {/* s2 */}
                <div className="flex flex-wrap justify-between">
                  <div className="">
                    <p>Time ({frequencyUnit()})</p>
                    <p className="font-semibold text-xl text-secondary">
                      {timePeriod}
                    </p>
                  </div>
                  <div className="flex-grow flex justify-end items-center">
                    <div className="w-[470px] max-w-full relative">
                      <p className="absolute left-0 -bottom-[15px] text-sm">
                        {timePeriods[0]}
                      </p>
                      <input
                        value={timePeriods.indexOf(timePeriod ?? 0) + 1}
                        disabled={!(timePeriods.length > 1)}
                        id="minmax-range"
                        type="range"
                        step={1}
                        className="w-full mb-5"
                        min={timePeriods.length > 1 ? 1 : 0}
                        max={timePeriods.length}
                        onChange={handleTimePeriodChange}
                      />
                      <p className="absolute right-0 -bottom-[15px] text-sm">
                        {timePeriods[timePeriods.length - 1]}
                      </p>
                    </div>
                  </div>
                </div>
                {/* s3 */}
                <div className="flex flex-wrap justify-between">
                  <div className="">
                    <p>Origination Fee</p>
                    <p className="font-semibold text-xl text-secondary">
                      ${originationFee && formattedNumber(originationFee)}
                    </p>
                  </div>
                  <div className="flex-grow flex justify-end items-center">
                    <div className="w-[470px] max-w-full relative">
                      <p className="absolute left-0 -bottom-[15px] text-sm">
                        $
                        {originationFeeses[0] &&
                          formattedNumber(originationFeeses[0])}
                      </p>
                      <input
                        value={
                          originationFeeses.indexOf(originationFee ?? 0) + 1
                        }
                        disabled={!(originationFeeses.length > 1)}
                        id="minmax-origination-range"
                        type="range"
                        step={1}
                        className="w-full mb-5"
                        min={originationFeeses.length > 1 ? 1 : 0}
                        max={originationFeeses.length}
                        onChange={handleOrignationFeeChange}
                      />
                      <p className="absolute right-0 -bottom-[15px] text-sm">
                        $
                        {originationFeeses[originationFeeses.length - 1] &&
                          formattedNumber(
                            originationFeeses[originationFeeses.length - 1]
                          )}
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
                  Privacy Policy from time to time by making available a
                  revised, dated version on the site. If the revised version
                  includes a substantial change, we will provide a more
                  prominent notice (including, for certain services, an email or
                  other type of notification of Privacy Policy changes) prior to
                  the change becoming effective.
                </p>
              </div>
            </div>

            <div className="bg-major p-3 flex flex-col gap-3 text-white min-h-[100px] rounded-md col-span-12 lg:col-span-4 border">
              <div className="flex  flex-col justify-start items-center gap-2">
                <p className="text-sm font-semibold ">Offer Summary</p>
                <div className="bg-minor w-full rounded text-center p-4 flex flex-col gap-2">
                  <p className="font-semibold">Total Repayment</p>
                  <p className="text-3xl font-bold font-inter">
                    $
                    {selectedPackage &&
                      formattedNumber(selectedPackage.net_funding_amount)}
                  </p>
                </div>
              </div>
              {/* <div className="flex gap-2 flex-col ">
                <div className="font-inter flex justify-between">
                  <p>Factor</p>
                  <p>{selectedPackage && selectedPackage.factor}%</p>
                </div>
                <div className="font-inter flex justify-between">
                  <p>Payment</p>
                  <p>${selectedPackage && selectedPackage.payment}</p>
                </div>
              </div> */}
              <div className="flex flex-col py-3 gap-2 ">
                <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                  <p>Payment</p>
                  <p className="font-semibold">
                    $
                    {selectedPackage &&
                      formattedNumber(selectedPackage.payment)}
                  </p>
                </div>
                <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                  <p>Factor</p>
                  <p className="font-semibold">
                    {selectedPackage && selectedPackage.factor}%
                  </p>
                </div>
                <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                  <p>Frequency</p>
                  <p className="font-semibold">{frequencyUnit()}</p>
                </div>
                <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                  <p>Term</p>
                  <p className="font-semibold">
                    {timePeriod} {frequencyUnit()}
                  </p>
                </div>
                <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                  <p>Origination Fee</p>
                  <p className="font-semibold">
                    ${originationFee && formattedNumber(originationFee)}
                  </p>
                </div>
                <div className="flex justify-between bg-minor/30 p-2 rounded-lg">
                  <p>Net Funding Amount</p>
                  <p className="font-semibold">
                    $
                    {selectedPackage?.net_funding_amount &&
                      formattedNumber(selectedPackage?.net_funding_amount)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSelectOffer}
                className="text-sm bg-secondary rounded-full p-2 font-semibold hover:bg-secondary/80"
              >
                Select This Offer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SubmitOffer
          handleBackToPackageSelection={() => {
            setIsPackageSelected(false);
          }}
          handleExpireLink={() => {
            setIsPackageSubmitted(true);
          }}
        />
      )}
    </>
  );
}
