import React, { useCallback, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDarkMode } from 'usehooks-ts';

import { useOutsideClick } from "~~/hooks/scaffold-eth";

import { Bars3Icon, BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";

import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

interface HeaderMenuLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  // {
  //   label: "Tagger",
  //   href: "/debug",
  //   icon: <BugAntIcon className="w-4 h-4" />,
  // },
  // {
  //   label: "ETH-SPACE",
  //   href: "/",
  //   icon: <SparklesIcon className="w-4 h-4" />,
  // },
  // {
  //   label: "Block Explorer",
  //   href: "https://sepolia-blockscout.scroll.io/address/0xEd6a0A29A962B4296bCeEC4e1E55F5Ec0474EAC7/contracts#address-tabs",
  //   icon: <MagnifyingGlassIcon className="w-4 h-4" />,
  // },
];

export const HeaderMenuLinks = () => {
  const router = useRouter();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = router.pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${isActive ? "bg-secondary shadow-md" : ""
                } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div
      className="w-[1280px] mx-auto flex justify-between items-center bg-white py-4 px-[29px]"
      style={{
        boxShadow: '0px 16px 60px 0px #00000008',
      }}>
      <div className="hidden w-auto navbar-start lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
      </div>
      <Image alt="nav-icon" className="cursor-pointer" width={18} height={15} src="/svg/nav.svg" />
      <Link href="/" passHref className="items-center hidden gap-2 ml-4 mr-6 lg:flex shrink-0">
        <div className="flex flex-col">
          <span className="font-bold leading-tight">MoveSpace AI Explorer</span>
          <span className="text-xs">Search and Tag Vector Data in the MoveSpace, powered by AI.</span>
        </div>
      </Link>
      <ul className="hidden gap-2 px-1 lg:flex lg:flex-nowrap menu menu-horizontal">
        <HeaderMenuLinks />
      </ul>
      <div className="flex-grow mr-4 navbar-end">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
