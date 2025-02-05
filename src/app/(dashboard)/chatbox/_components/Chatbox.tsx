'use client';

import { Button } from '@/components/ui/button';
import { InputGroup } from '@/components/ui/input-group';
import { formatTime } from '@/libs/helper';
import { Box, Container, Flex, FlexProps, Group, HStack, Icon, IconButton, Input, Text } from '@chakra-ui/react';
import { useChat, Message } from 'ai/react';
import React from 'react';
import { BiPaperPlane } from 'react-icons/bi';
import { FaRegImage } from 'react-icons/fa';

interface Props extends FlexProps { }
export const Chatbox: React.FC<Props> = (props) => {
    const { messages, input, handleSubmit, handleInputChange, isLoading, error, reload } =
        useChat();

    const InputImage = React.memo(() => (
        <Icon as={FaRegImage} color={"fg.muted"} size={"md"} />
    ));

    return (
        <Flex {...props} w={'full'} direction={'column'} gap={'6'}>
            {messages.map(message => (
                message.role === 'user' ? (
                    <MessageUser key={message.id} message={message} />
                ) : (
                    <MessageBot key={message.id} message={message} />
                )
            ))}
            {
                error && (
                    <Flex justify={'center'} color={'danger'}>
                        <Text>
                            An error occurred: {error.message}
                        </Text>
                        <Button onClick={() => reload()}>
                            Reload
                        </Button>
                    </Flex>
                )
            }

            <form onSubmit={handleSubmit}>
                <Group w={'full'} gap={'4'}>
                    <InputGroup
                        w={'full'}
                        startElement={
                            <HStack>
                                <Icon>
                                    <InputImage />
                                </Icon>
                            </HStack>
                        }
                    >
                        <Input
                            w={'full'}
                            value={input}
                            placeholder="Send a message..."
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </InputGroup>
                    <IconButton
                        type="submit"
                        aria-label="Send message"
                        loading={isLoading}
                    >
                        <BiPaperPlane />
                    </IconButton>
                </Group>
            </form>
        </Flex>
    );
}

interface MessageUserProps extends React.HTMLAttributes<HTMLDivElement> {
    message: Message;
}
const MessageUser: React.FC<MessageUserProps> = (props) => {
    const { message } = props;

    return (
        <Flex direction={'column'} gap={'1'} justify={'flex-end'} align={"end"} {...props}>
            <Box
                w={'fit-content'}
                maxW={'75%'}
                bg={'bg.emphasized'}
                px={'2'}
                py={'1'}
                borderRadius={'md'}
                ml={'auto'}
                {...props}
            >
                <Text textAlign={'right'} color={'fg'}>
                    {message.content}
                </Text>
            </Box>
            <Text fontSize={'xs'} color={'fg.muted'}>
                {formatTime(message.createdAt)}
            </Text>
        </Flex>
    );
}

interface MessageBotProps extends React.HTMLAttributes<HTMLDivElement> {
    message: Message;
}
const MessageBot: React.FC<MessageBotProps> = (props) => {
    const { message } = props;

    return (
        <Flex direction={'column'} gap={'1'} justify={"flex-start"} {...props}>
            <Box
                w={'fit-content'}
                maxW={'75%'}
                bg={'primary.8'}
                px={'2'}
                py={'1'}
                borderRadius={'md'}
                mr={'auto'}
                {...props}
            >
                <Text color={'primary.1'} textAlign={'left'}>
                    {message.content}
                </Text>
            </Box>
            <Text fontSize={'xs'} color={'fg.muted'}>
                {formatTime(message.createdAt)}
            </Text>
        </Flex>
    );
}