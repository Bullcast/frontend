import { Flex } from "@chakra-ui/react";

import styles from "./page.module.css";
import { PageHeader } from "@/components/molecules";
import { Chatbox } from "./_components/Chatbox";
import { LeftPanel } from "./_components/LeftPanel";
import { RightPanel } from "./_components/RightPanel";


export default function Prediction() {
    return (
        <Flex direction={"column"} flex="1" overflow={"hidden"} gap={"6"}>
            <PageHeader title="Chatbox" />
            <main className={styles.main}>
                <Flex direction={"row"} flex="1" gap={"6"}>
                    <LeftPanel flex={1} />
                    <Chatbox flex={2} />
                    <RightPanel flex={1} />
                </Flex>
            </main>
        </Flex>
    );
}
