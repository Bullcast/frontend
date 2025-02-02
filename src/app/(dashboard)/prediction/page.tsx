import { PageHeader } from "@/components/molecules";
import { Container, Flex } from "@chakra-ui/react";
import { UserPredictionCard } from "./_components/UserPredictionCard";


export default function Prediction() {
  return (
    <Flex direction={"column"} flex="1" gap={"6"}>
      <PageHeader title="Prediction" />
      <main>
        <Flex direction={"row"} flex="1" justify={"space-between"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <UserPredictionCard key={index} ishigher={index === 1 ? "true" : undefined} />
          ))}
        </Flex>
      </main>
    </Flex>
  );
}
