import ChooseFile from "@/app/components/ChooseFile";
import ProgressSliderBar from "@/app/components/ProgressSliderBar";
import DocumentsSelection from "./components/DocumentsSelection";

export default function SubmitOffer() {
  return (
    <section className="p-4 mt-10 flex flex-col gap-4">
      {/* topbar */}
      <div className="flex items-center gap-5">
        <button className="border-gray-200 border-2 p-4 bg-white shadow-sm rounded-md">
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
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
            <p className="font-semibold text-xl text-secondary">$200,000</p>
          </div>
          <div className="flex-grow flex justify-end items-center w-[80%] max-w-[600px]">
            <ProgressSliderBar value={200000} />
          </div>
        </div>
        <div className=" bg-[rgba(249, 251, 250, 1)]  bg-gray-400/15 rounded-md">
          <div className="p-4 grid grid-cols-12 gap-4 sm:gap-6">
            <div className="col-span-12 sm:col-span-6">
              <DocumentsSelection className=" " name="Driver's License" />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <DocumentsSelection className=" " name="Driver's License" />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <DocumentsSelection className=" " name="Driver's License" />
            </div>
            <div className="col-span-12 sm:col-span-6 ">
              <DocumentsSelection className=" " name="Driver's License" />
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
              <p>Loan Amount</p>
              <p className="font-semibold text-xl text-secondary">$200,000</p>
            </div>
            <div className="flex-grow flex justify-end items-center mb-4">
              <ProgressSliderBar value={200000} />
            </div>
          </div>
        </div>
        {/* s1 */}
        <div className="col-span-12 sm:col-span-6 bg-white rounded-lg p-4 border-gray-200 border-2">
          <div className="flex flex-col">
            <div className="">
              <p>Loan Amount</p>
              <p className="font-semibold text-xl text-secondary">$200,000</p>
            </div>
            <div className="flex-grow flex justify-end items-center mb-4">
              <ProgressSliderBar value={200000} />
            </div>
          </div>
        </div>
        {/* s1 */}
        <div className="col-span-12 sm:col-span-6 bg-white rounded-lg p-4 border-gray-200 border-2">
          <div className="flex flex-col">
            <div className="">
              <p>Loan Amount</p>
              <p className="font-semibold text-xl text-secondary">$200,000</p>
            </div>
            <div className="flex-grow flex justify-end items-center mb-4">
              <ProgressSliderBar value={200000} />
            </div>
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="border-gray/50 border-t p-4 px-5 flex flex-col gap gap-5">
        <p className="text-[10px] text-gray-400">
          By visiting the site or using our Services, you accept the practices
          described in this Privacy Policy. We may update this Privacy Policy
          from time to time by making available a revised, dated version on the
          site. If the revised version includes a substantial change, we will
          provide a more prominent notice (including, for certain services, an
          email or other type of notification of Privacy Policy changes) prior
          to the change becoming effective. 
        </p>
      </div>
    </section>
  );
}
