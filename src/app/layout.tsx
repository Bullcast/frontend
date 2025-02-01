import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import '@mysten/dapp-kit/dist/index.css';
import Provider from "./providers";
import utils from "@/utils";
import { Flex } from "@chakra-ui/react";
import { Navbar } from "@/components/molecules";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: utils.constants.APP_NAME.concat(" | ", utils.constants.APP_DESCRIPTION),
  description: utils.constants.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable}`}>
        <Provider>
          <Flex direction="column" minH="100vh" gap={"6"} p="4">
            <Navbar />
            <Flex direction="column" flex="1">
              {children}
            </Flex>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
