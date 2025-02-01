import { Box, Container, Flex, Heading } from "@chakra-ui/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}
export const PageHeader: React.FC<Props> = (props) => {
    return (
        <Box as="header" {...props}>
            <Container>
                <Flex
                    align="start"
                    direction={"column"}
                    h="16"
                    maxW="container.xl"
                >
                    <Flex align="center" gap={"1"} direction={"row"}>
                        <Box w={"12"} h={"1"} borderRadius={"full"} bg={'fg'}/>
                        <Heading size="2xl" fontWeight={"bold"}>
                            Bullcast
                        </Heading>
                    </Flex>
                    <Heading size="2xl" autoCapitalize="true" fontWeight={"bold"} color={"primary"}>
                        {props.title}
                    </Heading>
                </Flex>
            </Container>
        </Box>
    );
};