import { Button } from "@/components/ui/button";
import { Container, ContainerProps } from "@chakra-ui/react";

interface Props extends ContainerProps { }
export const RightPanel: React.FC<Props> = (props) => {
    return (
        <Container as="aside" {...props}>
            <Button>Button</Button>
        </Container>
    );
}