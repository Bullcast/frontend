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
      <body className={`${plusJakartaSans.variable}`} style={{
        height: "100vh",
        overflow: "hidden",
      }}>
        <Provider>
          <Flex direction="column" height="100%" overflow={"hidden"} gap={"6"} p="4">
            <Navbar />
            {children}
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
