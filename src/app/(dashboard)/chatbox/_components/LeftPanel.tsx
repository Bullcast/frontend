import { InputGroup } from "@/components/ui/input-group";
import { Container, Input, ContainerProps, Icon } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

interface Props extends ContainerProps { }
export const LeftPanel: React.FC<Props> = (props) => {
    return (
        <Container as="aside" {...props}>
            <InputGroup
                w={"full"}
                startElement={
                    <Icon color={"fg.muted"} size={"md"}>
                        <BiSearch />
                    </Icon>
                }
            >
                <Input w={"full"} placeholder="Search" />
            </InputGroup>
        </Container>
    );
}
