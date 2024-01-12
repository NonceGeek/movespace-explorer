import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Montserrat, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

const plus = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={isDarkTheme ? darkTheme() : lightTheme()}
      >
        <ThemeProvider defaultTheme="dark" attribute="class">
          <div className="flex flex-col min-h-screen bg-light dark:bg-dark">
            <style jsx global>
              {`
                :root {
                  --font-plus-jakarta-sans: ${plus.style.fontFamily};
                  --font-poppins: ${poppins.style.fontFamily};
                  --font-montserrat: ${montserrat.style.fontFamily};
                }
              `}
            </style>
            <Header />
            <main className="relative flex flex-col flex-1">
              <Component {...pageProps} />
            </main>
          </div>
        </ThemeProvider>
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
