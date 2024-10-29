"use client";
import ChooseFile from "@/app/components/ChooseFile";
import ProgressSliderBar from "@/app/components/ProgressSliderBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import DocumentsSelection from "./DocumentsSelection";
import OverlayLoader from "@/app/components/Loaders/OverlayLoader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelectPackageMutation } from "@/lib/slices/offer/offerApiSlice";
import { toast } from "react-toastify";

export default function SubmitOffer({
  handleBackToPackageSelection,
  handleExpireLink,
}: {
  handleBackToPackageSelection: () => void;
  handleExpireLink: () => void;
}) {
  const router = useRouter();
  const { selectedPackage, packages } = useSelector(
    (state: RootState) => state.offer
  );
  //states
  const [userOfferData, setUserOfferData] = useState({
    loan: {
      min: "",
      max: "",
    },
    term: {
      min: "",
      max: "",
    },
    net_funding: {
      min: "",
      max: "",
    },
    origination: {
      min: "",
      max: "",
    },
  });

  const [submitPackage] = useSelectPackageMutation();

  useEffect(() => {
    if (!packages || packages.length === 0) return;

    // Find min and max loan amounts
    const minLoan = packages.reduce((acc, v) =>
      parseInt(v.loan_amount) < parseInt(acc.loan_amount) ? v : acc
    ).loan_amount;
    const maxLoan = packages.reduce((acc, v) =>
      parseInt(v.loan_amount) > parseInt(acc.loan_amount) ? v : acc
    ).loan_amount;

    // Find min and max terms
    const minTerm = packages.reduce((acc, v) =>
      parseInt(v.time) < parseInt(acc.time) ? v : acc
    ).time;
    const maxTerm = packages.reduce((acc, v) =>
      parseInt(v.time) > parseInt(acc.time) ? v : acc
    ).time;

    // Find min and max net funding amounts
    const minFund = packages.reduce((acc, v) =>
      parseInt(v.net_funding_amount) < parseInt(acc.net_funding_amount)
        ? v
        : acc
    ).net_funding_amount;
    const maxFund = packages.reduce((acc, v) =>
      parseInt(v.net_funding_amount) > parseInt(acc.net_funding_amount)
        ? v
        : acc
    ).net_funding_amount;

    // Find min and max origination fees
    const minOrigination = packages.reduce((acc, v) =>
      parseInt(v.origination_fee) < parseInt(acc.origination_fee) ? v : acc
    ).origination_fee;
    const maxOrigination = packages.reduce((acc, v) =>
      parseInt(v.origination_fee) > parseInt(acc.origination_fee) ? v : acc
    ).origination_fee;

    // Update the state with the computed values
    setUserOfferData({
      loan: {
        min: minLoan,
        max: maxLoan,
      },
      term: {
        min: minTerm,
        max: maxTerm,
      },
      net_funding: {
        min: minFund,
        max: maxFund,
      },
      origination: {
        min: minOrigination,
        max: maxOrigination,
      },
    });
  }, [packages]);

  //handlers
  const handleBack = () => {
    handleBackToPackageSelection();
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      driver_license: null,
      voided_check: null,
      proof_of_ownership: null,
      credit_card_processing_statement: null,
    },
    validationSchema: Yup.object().shape({
      driver_license: Yup.mixed()
        .nullable()
        .required("Driver license is required"),

      voided_check: Yup.mixed().nullable().required("Voided check is required"),

      proof_of_ownership: Yup.mixed()
        .nullable()
        .required("Proof of ownership is required"),

      credit_card_processing_statement: Yup.mixed()
        .nullable()
        .required("Credit card processing statement is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("customer_id", selectedPackage?.customer_id + "");
      formData.append("selected_package_id", selectedPackage?.id + "");
      if (values.driver_license)
        formData.append("driver_license", values.driver_license);
      if (values.voided_check)
        formData.append("voided_check", values.voided_check);
      if (values.proof_of_ownership)
        formData.append("proof_of_ownership", values.proof_of_ownership);
      if (values.credit_card_processing_statement)
        formData.append(
          "credit_card_processing_statement",
          values.credit_card_processing_statement
        );
      await submitPackage(formData)
        .unwrap()
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            handleExpireLink();
          } else {
            toast.error(response.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  const handleFile1 = (file: File | null) => {
    validation.setFieldValue("driver_license", file);
  };

  const handleFile2 = (file: File | null) => {
    validation.setFieldValue("voided_check", file);
  };
  const handleFile3 = (file: File | null) => {
    validation.setFieldValue("proof_of_ownership", file);
  };
  const handleFile4 = (file: File | null) => {
    validation.setFieldValue("credit_card_processing_statement", file);
  };

  const frequencyUnit = (frequency: string) => {
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

  return (
    <form onSubmit={validation.handleSubmit}>
      {validation.isSubmitting && <OverlayLoader />}
      <section className="p-4 mt-10 flex flex-col gap-4">
        {/* topbar */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={handleBack}
            className="border-gray-200 border-2 p-4 bg-white shadow-sm rounded-md"
          >
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.555607 9.53033C0.262714 9.23744 0.262714 8.76256 0.555607 8.46967L8.05561 0.96967C8.3485 0.676777 8.82337 0.676777 9.11627 0.96967C9.40916 1.26256 9.40916 1.73744 9.11627 2.03033L2.1466 9L9.11627 15.9697C9.40916 16.2626 9.40916 16.7374 9.11627 17.0303C8.82337 17.3232 8.3485 17.3232 8.05561 17.0303L0.555607 9.53033Z"
                fill="#383A3D"
              />
            </svg>
          </button>
          <h2 className="font-semibold text-xl text-black/80">Submit Offer</h2>
        </div>
        <div className="bg-white border-gray-200 border-2 rounded-lg p-4 flex flex-col gap-4">
          {/* total Loan */}
          <div className="flex flex-wrap justify-between">
            <div className="">
              <p>Loan Amount</p>
              <p className="font-semibold text-xl text-secondary">
                ${selectedPackage?.loan_amount}
              </p>
            </div>
            <div className="flex-grow flex justify-end items-center w-[80%] max-w-[600px]">
              <ProgressSliderBar
                min={parseInt(userOfferData.loan.min)}
                max={parseInt(userOfferData.loan.max)}
                value={parseInt(selectedPackage?.loan_amount + "")}
                isAmount
              />
            </div>
          </div>
          <div className=" bg-[rgba(249, 251, 250, 1)]  bg-gray-400/15 rounded-md">
            <div className="p-4 grid grid-cols-12 gap-4 sm:gap-6">
              <div className="col-span-12 sm:col-span-6">
                <DocumentsSelection
                  key={1}
                  className=" "
                  name="Driver's License"
                  handleFile={handleFile1}
                  error={
                    validation.touched.driver_license &&
                    validation.errors.driver_license
                  }
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <DocumentsSelection
                  key={2}
                  className=" "
                  name="Voided Check"
                  handleFile={handleFile2}
                  error={
                    validation.touched.voided_check &&
                    validation.errors.voided_check
                  }
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <DocumentsSelection
                  key={3}
                  className=" "
                  name="Proof of Ownership"
                  handleFile={handleFile3}
                  error={
                    validation.touched.proof_of_ownership &&
                    validation.errors.proof_of_ownership
                  }
                />
              </div>
              <div className="col-span-12 sm:col-span-6 ">
                <DocumentsSelection
                  key={4}
                  className=" "
                  name="A/R or Credit Card Processing Statement"
                  handleFile={handleFile4}
                  error={
                    validation.touched.credit_card_processing_statement &&
                    validation.errors.credit_card_processing_statement
                  }
                />
              </div>
            </div>
            <div className="col-span-12 border-t px-4 p-2">
              <p className="text-gray-400 text-sm ">
                Additional documentation could be required.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="custom-checkbox"
                className="hidden peer"
              />
              <label
                htmlFor="custom-checkbox"
                className=" flex items-center justify-center h-5 w-5 border border-gray-400 rounded-sm cursor-pointer peer-checked:bg-gray-400 relative"
              >
                {/* Check mark symbol */}
                <span className="peer-checked:block text-white text-lg absolute">
                  &#10003; {/* Unicode for check mark */}
                </span>
              </label>
              <label
                htmlFor="custom-checkbox"
                className="ml-4 text-sm font-semibold"
              >
                Opted for Pre-Payment Discount
              </label>
            </div>
          </div>
        </div>
        {/* section progress */}
        <div className="grid grid-cols-12 gap-5">
          {/* s1 */}
          <div className="col-span-12 sm:col-span-6 bg-white rounded-lg p-4 border-gray-200 border-2">
            <div className="flex flex-col">
              <div className="">
                <p>Net Funding Amount</p>
                <p className="font-semibold text-xl text-secondary">
                  ${selectedPackage?.net_funding_amount}
                </p>
              </div>
              <div className="flex-grow flex justify-end items-center mb-4">
                <ProgressSliderBar
                  value={parseInt(selectedPackage?.net_funding_amount + "")}
                  min={parseInt(userOfferData.net_funding.min)}
                  max={parseInt(userOfferData.net_funding.max)}
                  isAmount
                />
              </div>
            </div>
          </div>
          {/* s1 */}
          <div className="col-span-12 sm:col-span-6 bg-white rounded-lg p-4 border-gray-200 border-2">
            <div className="flex flex-col">
              <div className="">
                <p>
                  Term (
                  {frequencyUnit(selectedPackage?.payment_frequency ?? "")})
                </p>
                <p className="font-semibold text-xl text-secondary">
                  {selectedPackage?.time}
                </p>
              </div>
              <div className="flex-grow flex justify-end items-center mb-4">
                <ProgressSliderBar
                  value={parseInt(selectedPackage?.time + "")}
                  min={parseInt(userOfferData.term.min)}
                  max={parseInt(userOfferData.term.max)}
                />
              </div>
            </div>
          </div>
          {/* s1 */}
          <div className="col-span-12 sm:col-span-6 bg-white rounded-lg p-4 border-gray-200 border-2">
            <div className="flex flex-col">
              <div className="">
                <p>Origination Fee</p>
                <p className="font-semibold text-xl text-secondary">
                  ${selectedPackage?.origination_fee}
                </p>
              </div>
              <div className="flex-grow flex justify-end items-center mb-4">
                <ProgressSliderBar
                  value={parseInt(selectedPackage?.origination_fee + "")}
                  min={parseInt(userOfferData.origination.min)}
                  max={parseInt(userOfferData.origination.max)}
                  isAmount
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 g rounded-lg p-4  flex items-end justify-end gap-3">
            <button
              onClick={handleBack}
              className="text-sm uppercase  bg-white rounded-full p-2 font-semibold hover:bg-white/80 border-gray-200 border-2 flex basis-28 justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm text-white bg-secondary rounded-full p-2 font-semibold hover:bg-secondary/80 px-4"
            >
              Submit Offer
            </button>
          </div>
        </div>
        {/* Disclaimer */}
        <div className="border-gray/50 border-t p-4 px-5 flex flex-col gap gap-5">
          <p className="text-[10px] text-gray-400">
            By visiting the site or using our Services, you accept the practices
            described in this Privacy Policy. We may update this Privacy Policy
            from time to time by making available a revised, dated version on
            the site. If the revised version includes a substantial change, we
            will provide a more prominent notice (including, for certain
            services, an email or other type of notification of Privacy Policy
            changes) prior to the change becoming effective. 
          </p>
        </div>
      </section>
    </form>
  );
}
