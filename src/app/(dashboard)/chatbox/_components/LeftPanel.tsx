import { InputGroup } from "@/components/ui/input-group";
import { Container, Input, ContainerProps, Icon } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

interface Props extends ContainerProps { }
export const LeftPanel: React.FC<Props> = (props) => {
    return (
        <Container as="aside" {...props} maxW={"64"}>

        </Container>
    );
}
