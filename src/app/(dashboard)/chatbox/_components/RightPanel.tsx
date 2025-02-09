import { Button } from "@/components/ui/button";
import { Container, ContainerProps, Flex, Icon } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";

interface Props extends ContainerProps { }
export const RightPanel: React.FC<Props> = (props) => {
    return (
        <Container as="aside" {...props}>
            <Flex justify="end" align="start" h="full">
            </Flex>
        </Container>
    );
}