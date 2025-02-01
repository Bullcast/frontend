import { Box, Text } from "@chakra-ui/react"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Logo: React.FC<LogoProps> = (props) => {
  return (
    <Box {...props}>
      <Text fontSize="2xl" fontWeight="bold">
        Bullcast
      </Text>
    </Box>
  )
}

interface FaviconProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Favicon: React.FC<FaviconProps> = (props) => {
  return (
    <Box {...props}>
      <Text fontSize="2xl" fontWeight="bold">
        Favicon
      </Text>
    </Box>
  )
}

interface SubmarkProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Submark: React.FC<SubmarkProps> = (props) => {
  return (
    <Box {...props}>
      <Text fontSize="2xl" fontWeight="bold">
        Submark
      </Text>
    </Box>
  )
}

