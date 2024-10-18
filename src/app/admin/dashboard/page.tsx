import Image from "next/image";
import DMenueOne from "@/app/assets/images/d-menu-1.png";
import DMenueTwo from "@/app/assets/images/d-menu-2.png";

export default function Dashboard() {
  return (
    <div className="flex justify-center mt-[65px]">
      <div className="h-[414px] justify-start items-start gap-6 inline-flex">
        <div className="w-[410px] pb-6 bg-white rounded-[10px] border border-[#e1e1e1] flex-col justify-start items-center gap-6 inline-flex">
          <Image
            src={DMenueOne}
            alt="dashboard menu image"
            width={410}
            height={282}
          />
          <div className="w-[362px] h-[84px] flex-col justify-center items-start gap-3 flex">
            <div className="self-stretch justify-start items-center gap-3 inline-flex">
              <div className="text-black text-[26px] font-bold font-montserrat leading-tight">
                View submission
              </div>
              <div className="self-stretch px-[7px] bg-[#2e6fac]/20 rounded justify-center items-center flex">
                <div className="text-[#2e6fac] text-base font-bold font-montserrat">
                  12
                </div>
              </div>
            </div>
            <div className="self-stretch text-neutral-500 text-sm font-normal font-raleway leading-tight">
              Login provides secure access to personalized accounts by verifying
              user credentials
            </div>
          </div>
        </div>
        <div className="w-[410px] pb-6 bg-white rounded-[10px] border border-[#e1e1e1] flex-col justify-start items-center gap-6 inline-flex">
          <Image
            src={DMenueTwo}
            alt="dashboard menu image"
            width={410}
            height={282}
          />
          <div className="w-[362px] h-[84px] flex-col justify-center items-start gap-3 flex">
            <div className="self-stretch justify-start items-center gap-3 inline-flex">
              <div className="text-black text-[26px] font-bold font-montserrat leading-tight">
                ISO Interface
              </div>
            </div>
            <div className="self-stretch text-neutral-500 text-sm font-normal font-raleway leading-tight">
              Login provides secure access to personalized accounts by verifying
              user credentials
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
