'use client';

import { Box, Flex, FlexProps, Group, HStack, Icon, IconButton, Input, Link, Text } from '@chakra-ui/react';
import { useChat, Message } from 'ai/react';
import React from 'react';
import { BiPaperPlane } from 'react-icons/bi';
import { FaRegImage } from 'react-icons/fa';
import { IoCopyOutline, IoReload } from 'react-icons/io5';
import Markdown from 'react-markdown'
import RemarkGfm from 'remark-gfm';
import RehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { InputGroup } from '@/components/ui/input-group';
import { formatTime } from '@/libs/helper';
import { Logo } from '@/components/brand';
import { APP_NAME } from '@/utils/constants';

interface Props extends FlexProps { }
export const Chatbox: React.FC<Props> = (props) => {
    const { messages, input, handleSubmit, handleInputChange, isLoading, error, reload } =
        useChat();

    const InputImage = React.memo(() => (
        <Icon as={FaRegImage} color={"fg.muted"} size={"md"} />
    ));
    InputImage.displayName = "InputImage";

    const NoticeMessages = React.memo(() => (
        <Flex justify={'center'} align={'center'} color={'fg.muted'} direction={'column'} gap={'1'}>
            <Text fontSize={'sm'}>
                This is the hint message to help users know how to use!
            </Text>
            <Text fontSize={'sm'}>
                @Copyright by BullCast | 2024
            </Text>
        </Flex>
    ));
    NoticeMessages.displayName = "NoticeMessages";

    return (
        <Flex {...props} w={'full'} h={'full'} direction={'column'} gap={'6'} overflow={'hidden'}>
            <Flex direction={'column'} gap={'4'} flex={1} overflow={"scroll"}>
                {messages.map(message => (
                    message.role === 'user' ? (
                        <MessageUser key={message.id} message={message} />
                    ) : (
                        <MessageBot key={message.id} message={message} error={error} funcs={{ reload }} />
                    )
                ))}
            </Flex>
            <Flex direction={'column'} gap={'4'}>
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
                            bg={'bg.muted'}
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
                <NoticeMessages />
            </Flex>
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
                bg={'primary'}
                px={'2'}
                py={'1'}
                borderRadius={'md'}
                ml={'auto'}
                {...props}
            >
                <Text textAlign={'right'} color={'primary.1'}>
                    {message.content}
                </Text>
            </Box>
            <Flex justify={'end'} align={'center'} w={'full'} gap={'1'}>
                <MessageTools
                    copyContent={message.content}
                />
                <Text fontSize={'xs'} color={'fg.muted'}>
                    {formatTime(message.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
}
MessageUser.displayName = "MessageUser";

interface MessageBotProps extends React.HTMLAttributes<HTMLDivElement> {
    message: Message;
    error: any;
    funcs: {
        reload: () => void;
    }
}
const MessageBot: React.FC<MessageBotProps> = (props) => {
    const { message, error, funcs } = props;

    const BotAvatar = () => {
        return (
            <Group>
                <Icon
                    size={'md'}
                    borderRadius={'full'}
                    borderColor={'primary.5'}
                    borderWidth={'1px'}
                    bg={'bg.muted'}
                    p={'1'}
                >
                    <Logo />
                </Icon>
                <Text fontSize={'md'} color={'fg'} fontWeight={'bold'}>
                    {APP_NAME}
                </Text>
            </Group>
        )
    }

    const MessageRender = () => {
        return (
            <Markdown
                remarkPlugins={[RemarkGfm]}
                rehypePlugins={[RehypeRaw]}
                components={{
                    a: ({ node, ...props }) => (
                        <Link color={'primary'} {...props} target='_blank' textDecoration={'underline'} />
                    ),
                    code: ({ node, className, children, ...rest }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                style={dark}
                            />
                        ) : (
                            <code className={className} {...rest}>
                                {children}
                            </code>
                        );
                    },
                }}>
                {message.content}
            </Markdown >
        )
    }
    return (
        <Flex direction={'column'} gap={'1'} justify={"flex-start"} {...props}>
            <Box
                w={'fit-content'}
                maxW={'75%'}
                px={'2'}
                py={'1'}
                borderRadius={'md'}
                mr={'auto'}
                {...props}
            >
                <Box color={'fg'} textAlign={'left'}>
                    <BotAvatar />
                    <MessageRender />
                    {message.experimental_attachments && (
                        message.experimental_attachments.map((attachment, index) => (
                            <MessageAttachment key={index} attachment={attachment} />
                        ))
                    )}
                </Box>
            </Box>
            {
                error && (
                    <Text color={'danger'}>
                        {error.message}
                    </Text>
                )
            }
            <Flex justify={'start'} align={'center'} w={'full'} gap={'1'}>
                <Text fontSize={'xs'} color={'fg.muted'}>
                    {formatTime(message.createdAt)}
                </Text>
                <MessageTools
                    copyContent={message.content}
                    reload={() => funcs.reload()}
                />
            </Flex>
        </Flex>
    );
}
MessageBot.displayName = "MessageBot";

interface MessageToolsProps extends React.HTMLAttributes<HTMLDivElement> {
    copyContent: string;
    reload?: () => void;
}
const MessageTools: React.FC<MessageToolsProps> = (props) => {
    const { copyContent, reload } = props;
    return (
        <Flex {...props} gap={'1'} direction={'row'} justify={'flex-end'}>
            {copyContent && (
                <IconButton aria-label="Copy" onClick={() => navigator.clipboard.writeText(copyContent)} variant={'plain'} size={'xs'} color={'fg.muted'} _hover={{ color: 'fg' }}>
                    <IoCopyOutline />
                </IconButton>
            )}
            {reload && (
                <IconButton aria-label="Reload" onClick={reload} variant={'plain'} size={'xs'} color={'fg.muted'} _hover={{ color: 'fg' }}>
                    <IoReload />
                </IconButton>
            )}
        </Flex>
    );
}
MessageTools.displayName = "MessageTools";

interface MessageAttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
    attachment: NonNullable<Message['experimental_attachments']>[number]
}
const MessageAttachment: React.FC<MessageAttachmentProps> = (props) => {
    const { attachment } = props;

    return (
        <Box {...props}>
            <Text>
                {attachment.contentType}
            </Text>
            <Text>
                {attachment.url}
            </Text>
        </Box>
    );
}
