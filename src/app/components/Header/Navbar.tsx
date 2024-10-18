import Image from "next/image";
import Logo from "@/app/assets/logos/logo.png";

const Navbar = () => {
  return (
    <div className="flex bg-primary w-full h-[44px] px-[24px] justify-between items-center flex-shrink-0">
      <Image src={Logo} width={143} height={29} alt="logo" />
    </div>
  );
};

export default Navbar;
