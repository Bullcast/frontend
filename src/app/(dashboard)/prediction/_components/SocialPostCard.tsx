import numeral from "numeral"
import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa6";
import { GiChart } from "react-icons/gi";

type Post = {
    title: string;
    price: number;
    content: string;
    image: string;
    user: {
        name: string;
        image: string;
    };
    date: string;
}
interface props extends React.HTMLAttributes<HTMLDivElement> {
    post?: Post;
}
export const SocialPostCard: React.FC<props> = (props) => {
    const post: Post = {
        title: "$126.323",
        price: 0.361273,
        content: "Bitcoin price will hit 50k by the end of the month",
        image: "https://www.bitcoin.com/wp-content/uploads/2021/09/bitcoin-ethereum-1.jpg",
        user: {
            name: "John Doe",
            image: "https://miro.medium.com/v2/resize:fit:740/1*ooOH6jo8I0ns0J-BE0SAow.jpeg",
        },
        date: "30/01 14:49",
    }

    const SocialPostUserCard: React.FC = (props) => {
        const items = [
            {
                title: "Average ROI",
                value: "12%",
            },
            {
                title: "Accuracy",
                value: "50% (41/82)",
            },
        ]
        return (
            <Flex align="center" gap={"2"}>
                <Box w={"12"} h={"12"} borderRadius={"full"} bg={"fg"} />
                <Flex direction={"column"} w={"full"}>
                    <Heading size={"md"}>John Doe</Heading>
                    {items.map((item, index) => (
                        <Flex align="center" justify={"space-between"} direction={"row"} w={"full"} key={index}>
                            <Text fontSize={"xs"} fontWeight={"medium"} color={"fg.muted"}>
                                {item.title}
                            </Text>
                            <Text fontSize={"xs"} fontWeight={"medium"} color={"fg"}>
                                {item.value}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        )
    }

    return (
        <Box
            {...props}
            p={"4"}
            h="fit-content"
            w={"full"}
            maxW={"72"}
            bg={"rgba(255, 255, 255, 0.05)"}
            backdropBlur={"md"}
            borderLeftColor={"primary"}
            borderLeftWidth={"medium"}
            borderRadius={"lg"}
        >
            <Flex
                w={"full"}
                align="center"
                direction={"column"}
                gap={"4"}
            >
                <GiChart size={"64"} color={"primary"} />
                <Flex align="center" gap={"2"} direction={"row"} borderRadius={"full"} bg={"primary.5"} p={"1"}>
                    <Icon color={"primary"} fontSize={"xs"}>
                        <FaCircle size={"8"} />
                    </Icon>
                    <Text color={"primary"} fontSize={"md"} fontWeight={"semibold"}>
                        {post.title}
                    </Text>
                </Flex>
                <Heading size="4xl" autoCapitalize="true" fontWeight={"bold"}>
                    {numeral(post.price).format("0,0.00000")}
                </Heading>
                <Text fontSize={"sm"} color={"fg.muted"}>
                    {post.date}
                </Text>
            </Flex>
            <SocialPostUserCard />
        </Box>
    );
}