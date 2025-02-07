import { PageHeader } from "@/components/molecules";
import { Flex } from "@chakra-ui/react";

import { UserPredictionCard } from "./_components/UserPredictionCard";
import { SocialPostCard } from "./_components/SocialPostCard";
import { Wallpaper } from "./_components/Wallpaper";


export default function Prediction() {
  return (
    <Flex direction={"column"} flex="1" gap={"6"}>
      <PageHeader title="Prediction" />
      <main>
        <Flex direction={"column"} flex="1" gap={"6"}>
          <Flex direction={"row"} flex="1" justify={"space-between"}>
            {Array.from({ length: 3 }).map((_, index) => (
              <UserPredictionCard key={index} ishigher={index === 1 ? "true" : undefined} />
            ))}
          </Flex>
          <Flex direction={"row"} flex="1" justify={"space-between"}>
            {Array.from({ length: 3 }).map((_, index) => (
              <SocialPostCard key={index} />
            ))}
          </Flex>
        </Flex>
      </main>
      <Wallpaper />
    </Flex>
  );
}
