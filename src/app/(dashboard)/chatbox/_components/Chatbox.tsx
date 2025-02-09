'use client';

import { Box, Center, CenterProps, Flex, Group, HStack, Icon, IconButton, Input, Link, Span, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaPaperPlane, FaRegImage } from 'react-icons/fa';
import { IoCopyOutline, IoReload, IoStop } from 'react-icons/io5';
import { MdOutlineLocalFireDepartment, MdOutlineRocket } from 'react-icons/md';
import Markdown from 'react-markdown'
import RemarkGfm from 'remark-gfm';
import RehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { marked } from "marked";

import { InputGroup } from '@/components/ui/input-group';
import { formatTime } from '@/libs/helper';
import { Logo } from '@/components/brand';
import { APP_NAME } from '@/utils/constants';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

interface Message {
    role: 'user' | 'assistant';  // Role to determine who sent the message
    content: string;  // Content of the message
    createdAt?: Date
}
import { LuLink } from 'react-icons/lu';
import { IoIosAdd } from 'react-icons/io';
import { Tooltip } from '@/components/ui/tooltip';

interface Props extends CenterProps { }
export const Chatbox: React.FC<Props> = (props) => {
    const [messages, setMessages] = useState<Message[]>([]); // Now TypeScript knows what type is inside messages
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const account = useCurrentAccount();
    const {
        mutate: signAndExecuteTransaction,
        isPending: isSigning,
    } = useSignAndExecuteTransaction({
        onSuccess: (result) => {
            console.log('Transaction executed:', `https://suivision.xyz/txblock/${result.digest}`);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Transaction executed successfully. ' + `https://suivision.xyz/txblock/${result.digest}`,
                createdAt: new Date(),
            }]);
        },
        onError: (error) => {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, there was an error processing your request.'
            }]);
        },
    });

    const {
        mutate: sendMessage,
        isPending: isSending,
        isSuccess: isSent,
        reset: resetSendMessage,
    } = useMutation({
        mutationKey: ['sendMessage', input],
        mutationFn: async (newMessage: Message): Promise<Message[]> => {
            if (!newMessage.content.trim()) return [];
            if (!account) return [];

            const response = await axios.post('/api/chat', {
                messages: [...messages, newMessage],
                wallet: account.address,
            })
            return response.data;
        },
        onMutate: (newMessage: Message) => {
            if (!account) throw new Error('Please connect your wallet to continue 😊');

            const userMessage: Message = {
                role: 'user',
                content: newMessage.content,
                createdAt: new Date(),
            };
            const preBotMessage: Message = {
                role: 'assistant',
                content: 'Bullcast is thinking, please wait a moment ...',
                createdAt: new Date(),
            };
            setMessages(prev => [...prev, userMessage, preBotMessage]);
            setInput('');
            setIsLoading(true);
        },
        onSuccess: (data: any) => {
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages.pop();
                for (let i = 0; i < data.length; i++) {
                    if (i + 1 < data.length && data[i].ptb) {
                        const ptb = Buffer.from(data[i].ptb);
                        const payloadUint8Array = new Uint8Array(ptb);
                        const tx = Transaction.from(payloadUint8Array);
                        tx.setGasBudget(150000000);
                        signAndExecuteTransaction(
                            {
                                transaction: tx,
                            },
                        );
                        delete data[i].ptb;
                    }
                }
                data.forEach((item: any, index: number) => {
                    item.createdAt = new Date();
                    item.role = 'assistant';
                });

                return [...newMessages, ...data];
            });
            setIsLoading(false);
        },
        onError: (error) => {
            if (error instanceof Error) {
                setMessages(prev => [...prev, {
                    id: Math.random(),
                    role: 'assistant',
                    content: error.message || 'Sorry, there was an error processing your request.',
                    createdAt: new Date(),
                }]);
            }
        }
    })

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!input.trim()) return;

    //     if (!account) {
    //         setMessages(prev => [...prev, {
    //             id: messages.length ? messages[messages.length - 1].id + 1 : 0,
    //             role: 'assistant',
    //             content: 'Please connect your wallet to continue.'
    //         }]);
    //         return;
    //     }


    //     const id = messages.length ? messages[messages.length - 1].id + 1 : 0;
    //     const userMessage: Message = { id, role: 'user', content: input };
    //     setMessages(prev => [...prev, userMessage]);
    //     setInput('');
    //     setIsLoading(true);

    //     try {
    //         const response = await fetch('/api/chat', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 messages: [...messages, userMessage],
    //                 wallet: account.address,
    //             }),
    //         });

    //         if (!response.ok) throw new Error('Failed to fetch');

    //         const data = await response.json();
    //         for (let i = 0; i < data.length; i++) {
    //             data[i].id = id + i + 1;
    //             if (i + 1 < data.length && data[i].ptb) {
    //                 const ptb = Buffer.from(data[i].ptb);
    //                 const payloadUint8Array = new Uint8Array(ptb);
    //                 const tx = Transaction.from(payloadUint8Array);
    //                 tx.setGasBudget(150000000);
    //                 signAndExecuteTransaction(
    //                     {
    //                         transaction: tx,
    //                     },
    //                     {
    //                         onSuccess: (result) => {
    //                             console.log('Transaction executed:', `https://suivision.xyz/txblock/${result.digest}`);
    //                             setMessages(prev => [...prev, {
    //                                 id: messages.length ? messages[messages.length - 1].id + 1 : 0,
    //                                 role: 'assistant',
    //                                 content: 'Transaction executed successfully. ' + `https://suivision.xyz/txblock/${result.digest}`,
    //                             }]);
    //                         },
    //                     },
    //                 );
    //                 delete data[i].ptb;
    //             }
    //         }
    //         setMessages(prev => [...prev, ...data]);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         setMessages(prev => [...prev, {
    //             id: messages.length ? messages[messages.length - 1].id + 1 : 0,
    //             role: 'assistant',
    //             content: 'Sorry, there was an error processing your request.'
    //         }]);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };


    const messagesEndRef = React.useRef<HTMLDivElement>(null);

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
                @Copyright by BullCast | 2025
            </Text>
        </Flex>
    ));
    NoticeMessages.displayName = "NoticeMessages";

    const StartElement = React.memo(() => (
        <HStack
            w={'fit-content'}
            gap={2}
            borderRadius={'md'}
            bg={'bg.emphasized'}
        >
            <IconButton
                size={"md"}
                variant={'plain'}
                borderRadius={"md"}
                aria-label="Send image"
                color={"fg.muted"}
            >
                <LuLink />
            </IconButton>
            <Tooltip
                content={"New conversation"}
                aria-label={"New conversation"}
            >
                <IconButton
                    variant={'plain'}
                    size={"md"}
                    borderRadius={"md"}
                    aria-label="Send image"
                    onClick={() => resetAll()}
                >
                    <IoIosAdd />
                </IconButton>
            </Tooltip>
        </HStack>
    ));
    StartElement.displayName = "StartElement";

    const EndElement = React.memo(() => (
        <IconButton
            size={"md"}
            borderRadius={"md"}
            type="submit"
            aria-label="Send message"
            onClick={
                isLoading ? stop : undefined
            }
        >
            {isLoading ? <IoStop /> : <FaPaperPlane />}
        </IconButton>
    ));
    EndElement.displayName = "EndElement";

    const resetAll = () => {
        setMessages && setMessages([]);
        handleInputChange({ target: { value: '' } } as any);
    }

    const stop = () => {

    }

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Center {...props} >
            <Flex w={'full'} maxW={"50vw"} h={'full'} flexDirection={'column'} gap={'6'} overflow={'hidden'} align={'center'}>
                <Flex direction={'column'} gap={'4'} flex={1} overflow={"scroll"} w={"full"}>
                    {messages.length === 0 && (
                        <MessageIntro
                            handleInputChange={handleInputChange}
                            setMessages={setMessages}
                        />
                    )}
                    {messages.map((message, index) => (
                        message.role === 'user' ? (
                            <MessageUser key={index} message={message} />
                        ) : (
                            <MessageBot key={index} message={message} isLoading={isLoading && index === messages.length - 1} />
                        )
                    ))}
                    <div ref={messagesEndRef} />
                </Flex>
                <Flex direction={'column'} gap={'4'} w={"full"}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage({
                            role: 'user',
                            content: input,
                            createdAt: new Date(),
                        });
                    }}>
                        <Group
                            w={'full'}
                            gap={'4'}
                            bg={'bg.muted'}
                            p={'2'}
                            borderRadius={'lg'}
                        >
                            <StartElement />
                            <Input
                                border={'none'}
                                _focus={{
                                    border: 'none',
                                    outline: 'none',
                                }}
                                bg={'transparent'}
                                w={'full'}
                                value={input}
                                placeholder="Ask something ..."
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <EndElement />
                        </Group>
                    </form>
                    <NoticeMessages />
                </Flex>
            </Flex>
        </Center>
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
    error?: any;
    isLoading?: boolean;
    funcs?: {
        reload: () => void;
    }
}
const MessageBot: React.FC<MessageBotProps> = (props) => {
    const { message, funcs, isLoading } = props;

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
                                language={match[1]}
                                style={dark}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...rest}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {
                    message.content
                        .trim()
                        .replace(/\n/g, '<br />')
                        .replace(/```([a-zA-Z]+)?\n([\s\S]+?)\n```/g, '```$1\n$2\n```')
                }
            </Markdown>
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
                    {!isLoading &&
                        <>
                            <MessageRender />
                        </>
                    }
                </Box>
            </Box>
            {
                isLoading && (
                    <Group>
                        <Spinner size={'md'} />
                        <Text color={'fg.muted'}>
                            Bullcast is thinking, please wait a moment ...
                        </Text>
                    </Group>
                )
            }

            <Flex justify={'start'} align={'center'} w={'full'} gap={'1'}>
                <Text fontSize={'xs'} color={'fg.muted'}>
                    {formatTime(message.createdAt)}
                </Text>
                <MessageTools
                    reload={funcs?.reload}
                    copyContent={message.content}
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


interface MessageIntroProps extends React.HTMLAttributes<HTMLDivElement> {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}
export const MessageIntro: React.FC<MessageIntroProps> = (props) => {
    const { handleInputChange } = props;

    const MessageDemo = (props: { demoContent: string, title: string, icon: React.ReactElement }) => {
        const { demoContent, title, } = props;

        return (
            <Box
                w={'fit-content'}
                p={'4'}
                bg={'bg.muted'}
                borderRadius={'md'}
                borderLeft={'2px'}
                borderColor={'primary'}
                _hover={{
                    cursor: 'pointer',
                    scale: '105%',
                    transition: 'all 0.3s',
                }}
                onClick={() => {
                    // handleInputChange && handleInputChange({ target: { value: demoContent } } as any);
                }}
                {...props}
            >
                <Flex direction={'column'} gap={'2'} align={'center'}>
                    {props.icon}
                    <Text fontSize={'lg'} fontWeight={'bold'} textAlign={'center'}>
                        {title}
                    </Text>
                    <Text fontSize={'md'} color={'fg.muted'} textAlign={'center'}>
                        {demoContent}
                    </Text>
                </Flex>
            </Box>
        );
    }

    return (
        <Flex direction={'column'} gap={'4'} justify={'center'} align={'center'} {...props}>
            <Icon
                w={'16'}
                h={'16'}
                borderRadius={'sm'}
                bg={'primary.3'}
                p={'2'}
            >
                <Logo />
            </Icon>
            <Text fontSize={'4xl'} fontWeight={'bold'} textAlign={'center'}>
                Welcome to <Span color={'primary'}>{APP_NAME}</Span> <br /> AI Chatbox!
            </Text>
            <Text fontSize={'md'} color={'fg.muted'} textAlign={'center'}>
                This is the hint message to help users know how to use!
            </Text>
            <Flex direction={'row'} gap={'4'} justify={'center'} align={'center'}>
                <MessageDemo
                    title={'Get Started'}
                    demoContent={'What is BullCast?'}
                    icon={
                        <Icon
                            size={'md'}
                            color={'fg.muted'}
                        >
                            <MdOutlineRocket />
                        </Icon>
                    }
                />
                <MessageDemo
                    title={'Next'}
                    demoContent={'How to use BullCast?'}
                    icon={
                        <Icon
                            size={'md'}
                            color={'fg.muted'}
                        >
                            <MdOutlineLocalFireDepartment />
                        </Icon>
                    }
                />
            </Flex>
        </Flex>
    );
}