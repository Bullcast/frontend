import { Box, Group } from "@chakra-ui/react"

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Wallpaper: React.FC<Props> = (props) => {
    return (
        <Group
            as={"section"}
            position={"absolute"}
            top={0}
            left={0}
            zIndex={0}
            w={"full"}
            h={"full"}
            pointerEvents={"none"}
            {...props}
        >
            <Box
                position={"absolute"}
                top={0}
                left={0}
                translateX={"-50%"}
                translateY={"-50%"}
                w={"50vw"}
                h={"50vw"}
                bg={"primary"}
                filter={"blur(128px)"}
                opacity={0.1}
            />
        </Group>
    )
}