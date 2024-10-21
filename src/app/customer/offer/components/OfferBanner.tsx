import Image from "next/image";
import logo from "@/app/assets/logos/logo-trademark.png";
import offerRectangle from "@/app/assets/images/offer-rectangle.png";

const OfferBanner = () => {
  return (
    <div className="w-full h-[108px] px-4 py-1.5 mt-6 bg-[#172b4b] rounded-lg justify-start items-center gap-8 flex relative">
      <div className="h-[65.71px] px-5 justify-start items-center gap-[30px] flex">
        <Image src={logo} alt="logo" height={65} width={99} />

        {/* Text Container */}
        <div className="flex-col justify-start items-start gap-3 inline-flex max-w-full">
          <div className="text-white font-semibold font-montserrat leading-tight text-lg sm:text-xl lg:text-2xl">
            Offer amount up to $60,0000
          </div>
          <div className="text-white font-medium font-inter leading-tight text-sm sm:text-base lg:text-xl">
            Earn more large deals through our funding. Contact your
            representative to know more.
          </div>
        </div>
      </div>

      {/* Rotated Box Image */}
      <Image
        src={offerRectangle}
        alt="rectangle svg"
        className="absolute top-0 right-0 hidden md:block"
      />
    </div>
  );
};

export default OfferBanner;
