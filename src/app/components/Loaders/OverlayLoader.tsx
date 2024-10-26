import Image from "next/image";
import loaderPng from "@/app/assets/images/Loader.png";

const OverlayLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Image src={loaderPng} alt="Loader" width={100} height={100} />
    </div>
  );
};

export default OverlayLoader;
