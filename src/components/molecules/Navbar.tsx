import { Box, Container, Flex, VisuallyHidden, Link as ChakraLink } from "@chakra-ui/react"
import Link from "next/link"

import { Logo } from "../brand"
import { ConnectWallet } from "./ConnectWallet"
import { GoArrowUpRight } from "react-icons/go"


interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

export const Navbar: React.FC<Props> = (props) => {
    const navLinks = [
        { href: '/chatbox', label: 'Chatbox' },
        { href: '/prediction', label: 'Prediction' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/api', label: 'API' },
    ]
    return (
        <Box as="nav" {...props}>
            <Container>
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    h="16"
                    maxW="container.xl"
                >
                    <Box flex={1}>
                        <ChakraLink as={Link} href="/" display="flex">
                            <VisuallyHidden>Home</VisuallyHidden>
                            <Logo />
                        </ChakraLink>
                    </Box>
                    <Flex align="center" gap={"6"} flex={2} justify="center">
                        {navLinks.map((navLink) => (
                            <ChakraLink
                                as={Link}
                                key={navLink.href}
                                href={navLink.href}
                                color={"fg.muted"}
                                _active={{
                                    color: "primary",
                                }}
                                _hover={{
                                    color: "primary",
                                    scale: 1.1,
                                }}
                                transition={"0.2s all"}
                            >
                                {navLink.label}
                            </ChakraLink>
                        ))}
                    </Flex>
                    <Flex align="center" gap={"6"} flex={1} justify="flex-end">
                        <ChakraLink
                            as={Link}
                            href="/docs"
                        >
                            Docs
                            <GoArrowUpRight />
                        </ChakraLink>
                        <ConnectWallet />
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}