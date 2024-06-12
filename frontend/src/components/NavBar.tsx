import { FC } from "react";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  return (
    <div className="flex items-center px-[7%]">
      <div className="w-20">
        <img className="cover" src="Logo.png"></img>
      </div>
      <h1 className="tracking-widest font-semibold">HealthFlow</h1>
    </div>
  );
};

export default NavBar;
