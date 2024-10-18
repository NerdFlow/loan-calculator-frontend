export default function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[410px] h-[376px] p-6 bg-white rounded-[10px] border border-[#e1e1e1] flex-col justify-start items-center gap-6 inline-flex">
        <div className="w-[362px] h-[84px] flex-col justify-center items-start gap-3 flex">
          <div className="text-black text-[26px] font-bold font-montserrat leading-tight">
            Admin Login
          </div>
          <div className="self-stretch text-neutral-500 text-sm font-normal font-raleway leading-tight">
            Login provides secure access to personalized accounts by verifying
            user credentials
          </div>
        </div>
        <div className="self-stretch h-16 flex-col justify-center items-center gap-1 flex">
          <div className="self-stretch text-black text-sm font-medium font-raleway">
            Login
          </div>
          <input
            type="email"
            className="self-stretch px-4 py-3 rounded-md border border-[#e1e1e1] justify-start items-center gap-3 inline-flex text-black text-base font-medium font-raleway leading-tight"
            placeholder="xyz@gmail.com"
          />
          {/* <div className="text-black text-base font-medium font-raleway leading-tight">
            xyz@gmail.com
          </div>
        </input> */}
        </div>
        <div className="self-stretch h-16 flex-col justify-center items-center gap-1 flex">
          <div className="self-stretch text-black text-sm font-medium font-raleway">
            Password
          </div>
          <input
            type="password"
            className="self-stretch px-4 py-3 rounded-md border border-[#e1e1e1] justify-start items-center gap-3 inline-flex text-black text-base font-medium font-raleway leading-tight"
            placeholder="**********"
          />
          {/* <div className="text-black text-base font-medium font-raleway leading-tight">
            **********
          </div>
        </input> */}
        </div>
        <div className="self-stretch h-11 flex-col justify-start items-start gap-3 flex">
          <div className="self-stretch h-11 flex-col justify-start items-start gap-2.5 flex">
            <button className="self-stretch h-11 px-[3px] py-3 bg-[#2e6fac] rounded-[45px] flex-col justify-center items-center gap-2.5 flex">
              <div className="text-right text-white text-base font-semibold font-montserrat leading-tight">
                Login
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
