export default function ISOInterface() {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center mx-8 mt-8">
      <div className="flex gap-3 items-center self-stretch my-auto">
        <div className="flex flex-col justify-center items-center self-stretch px-2.5 my-auto w-11 h-11 bg-white rounded-md border border-solid border-neutral-200">
          {/* <img
            loading="lazy"
            src={iconSr
            alt=""
            className="object-contain w-6 aspect-square"
          /> */}
          {"<"}
        </div>
        <h1 className="self-stretch my-auto font-montserrat text-2xl font-semibold tracking-tight text-right text-neutral-700">
          Iso Interface
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
  );
}
