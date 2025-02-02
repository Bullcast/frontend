import { Flex, Box, Text, Heading, Image as ChakraImage } from "@chakra-ui/react";

type User = {
    name: string;
    avatar: string;
    rank: number;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    ishigher?: any;
}
export const UserPredictionCard: React.FC<Props> = (props) => {
    const { ishigher = undefined } = props;

    const user: User = {
        name: "John Doe",
        avatar: "https://miro.medium.com/v2/resize:fit:740/1*ooOH6jo8I0ns0J-BE0SAow.jpeg",
        rank: [1, 2, 3][Math.floor(Math.random() * 3)],
    };

    return (
        <div
            {...props}
            style={{
                transform: ishigher ? "translateY(-64px)" : "translateY(0)",
            }}
        // translateY={isHigher ? "-64" : "0"}
        >
            <Flex align="center" gap="4" direction={"column"}>
                <Flex w={"full"} align="center" gap="1" direction={"row"} justify={"end"}>
                    <Box w={"6"} h={"1"} borderRadius={"full"} bg={'fg'} />
                    <Text fontSize={"4xl"} fontWeight={"bold"}>
                        {user.rank}
                    </Text>
                </Flex>
                <ChakraImage
                    borderRadius={"full"}
                    w={"16"}
                    h={"16"}
                    src={user.avatar}
                    alt={user.name}
                />
                <Heading size="2xl" fontWeight={"bold"}>
                    {user.name}
                </Heading>
            </Flex>
        </div>
    );
}