import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const ToggleDarkModeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex justify-center ml-2 bg-light dark:bg-dark"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <input type="checkbox" name="light-switch" className="sr-only light-switch" />
      <label
        className={`relative h-[30px] p-[3px] rounded-full after:content-[''] after:transition-transform after:duration-500 after:absolute after:w-6 after:h-6 after:p-[6px] after:rounded-full after:bg-gradient-to-r after:from-[#439DFF] after:to-[#6052FF] flex items-center cursor-pointer select-none bg-[#F0F2F5] dark:bg-[#2C2C2C] dark:after:translate-x-full`}
        htmlFor="light-switch"
      >
        <Image className="m-[6px] z-20" width={12} height={12} src="/svg/light-mode.svg" alt="light-mode" />
        <Image className="m-[6px] z-20" width={12} height={12} src="/svg/dark-mode.svg" alt="dark-mode" />
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="w-[1280px] rounded-[6px] mx-auto flex justify-between items-center bg-white py-4 px-[29px]"
      style={{
        boxShadow: "0px 16px 60px 0px #00000008",
      }}
    >
      <div className="flex space-x-6">
        <Image alt="nav-icon" className="cursor-pointer" width={18} height={15} src="/svg/nav.svg" />
        <ToggleDarkModeButton />
      </div>
      <Image src="/assets/logo.png" width={203} height={40} alt="logo" />
      <div className="flex items-center space-x-6">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
