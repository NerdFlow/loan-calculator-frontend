import Image, { StaticImageData } from "next/image";

interface MenuCard {
  image: StaticImageData;
  title: string;
  description: string;
  badgeCount?: number;
}

const MenuCard: React.FC<MenuCard> = ({
  image,
  title,
  description,
  badgeCount,
}) => {
  return (
    <div className="w-[410px] pb-6 bg-white rounded-[10px] border border-[#e1e1e1] flex-col justify-start items-center gap-6 inline-flex">
      <Image src={image} alt="dashboard menu image" width={410} height={282} />
      <div className="w-[362px] h-[84px] flex-col justify-center items-start gap-3 flex">
        <div className="self-stretch justify-start items-center gap-3 inline-flex">
          <div className="text-black text-[26px] font-bold font-montserrat leading-tight">
            {title}
          </div>
          {badgeCount && (
            <div className="self-stretch px-[7px] bg-[#2e6fac]/20 rounded justify-center items-center flex">
              <div className="text-[#2e6fac] text-base font-bold font-montserrat">
                {badgeCount}
              </div>
            </div>
          )}
        </div>
        <div className="self-stretch text-neutral-500 text-sm font-normal font-raleway leading-tight">
          {description}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
