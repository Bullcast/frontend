"use client";

import { Box, Group, Image } from "@chakra-ui/react"
import { DotLottieReact, DotLottieWorkerReact } from "@lottiefiles/dotlottie-react"

import styles from "../page.module.css"

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Wallpaper: React.FC<Props> = (props) => {
    return (
        <Group
            as={"section"}
            position={"absolute"}
            top={0}
            left={0}
            zIndex={-1}
            w={"full"}
            h={"full"}
            pointerEvents={"none"}
            {...props}
        >
            <Box
                position={"absolute"}
                bottom={0}
                left={0}
                w={"50vw"}
                aspectRatio={1 / 2}
                bgGradient={"linear(to-r, primary, secondary)"}
            />
            <DotLottieReact
                src="https://lottie.host/59e493c1-208f-40a4-90a1-c119a2eea102/QozLBTlxgn.lottie"
                loop
                autoplay
                width={"100%"}
                height={"100%"}
                speed={0.5}
                mode="reverse"
                renderConfig={{
                    devicePixelRatio: 1,
                    autoResize: true,
                }}
                className={styles.lottie}
            />
        </Group>
    )
}