import OfferBanner from "./components/OfferBanner";

export default function Offer() {
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
            <div className="h-[46px] p-6 flex justify-between items-start gap-6">
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
                  Term (Months)
                </div>
                <div className="self-stretch border border-[#dedede]"></div>
                <div className="flex gap-6 items-center">
                  {/* Radio Button 100% */}
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 bg-gray-100 border-gray-300"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Default radio
                    </label>
                  </div>

                  {/* Radio Button 50% */}
                  {/* <label className="flex items-center gap-[5px] cursor-pointer">
                    <input
                      type="radio"
                      name="term"
                      value="50"
                      className="hidden peer"
                    />
                    <div className="w-5 h-5 flex justify-center items-center">
                      <div className="w-9 h-9 relative bg-black/0 rounded-[20px]">
                        <div className="w-4 h-4 absolute rounded-full border peer-checked:border-[#2e6fac] border-[#bdbdbd]" />
                        <div className="w-2.5 h-2.5 absolute bg-[#2e6fac] rounded-full peer-checked:block hidden" />
                      </div>
                    </div>
                    <div className="text-black text-sm font-normal font-montserrat">
                      50%
                    </div>
                  </label> */}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white min-h-[100px] rounded-md sm:col-span-4 border"></div>
        </div>
      </div>
    </>
  );
}
