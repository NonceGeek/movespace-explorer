import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const ToggleDarkModeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <input type="checkbox" name="light-switch" className="sr-only light-switch" />
      <label
        className={`relative h-8 p-1 rounded-full after:content-[''] after:transition-transform after:duration-500 after:absolute after:w-6 after:h-6 after:p-1.5 after:rounded-full after:bg-gradient-to-r after:from-gradFrom after:to-gradTo flex items-center cursor-pointer select-none bg-light-gray2 dark:bg-dark2 dark:after:translate-x-full`}
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
      className="flex items-center justify-between px-8 py-4 mx-auto mt-6 bg-white rounded-md w-content dark:bg-dark-deep"
      style={{
        boxShadow: "0px 16px 60px 0px #00000008",
      }}
    >
      <div className="flex space-x-6">
        <Image
          alt="nav-icon"
          className="cursor-pointer dark:brightness-0 dark:invert"
          width={18}
          height={15}
          src="/svg/nav.svg"
        />
        <ToggleDarkModeButton />
      </div>
      <Link href="/">
        <Image src="/assets/logo.png" width={203} height={40} alt="logo" />
      </Link>
      <div className="flex items-center space-x-6">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
