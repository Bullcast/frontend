"use client"

import { ChakraProvider } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

import themeConfig from "../../../theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={themeConfig}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
