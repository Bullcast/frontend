import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
  defineRecipe,
  useRecipe
} from "@chakra-ui/react"
import type { RecipeVariantProps } from "@chakra-ui/react"
import * as React from "react"

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

type ButtonVariantProps = RecipeVariantProps<any>

const buttonRecipe = defineRecipe({
  base: {},
  variants: {
    size: {
      md: {
        borderRadius: "md",
      },
    } as any,
  }
})
export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps, ButtonVariantProps { }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, size, ...rest } = props
    const recipe = useRecipe({ recipe: buttonRecipe })

    const styles = recipe({ size, ...rest })

    return (
      <ChakraButton disabled={loading || disabled} css={styles} ref={ref} px={"4"} {...rest}>
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    )
  },
)
