"use client";

import { IoWalletOutline } from "react-icons/io5";

import { ConnectModal, useConnectWallet, useCurrentAccount } from "@mysten/dapp-kit"
import { Button } from "../ui/button";
import { truncate } from "@/libs/helper";
import { Tooltip } from "../ui/tooltip";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

export const ConnectWallet: React.FC<Props> = (props) => {
    const currentAccount = useCurrentAccount();
    const { isPending } = useConnectWallet();

    return (
        <ConnectModal
            trigger={
                <Button
                    borderColor={"primary.5"}
                    color={"primary"}
                    variant={"outline"}
                >
                    {
                        currentAccount ?
                            <Tooltip content={currentAccount.address}>
                                <Button as={"a"} variant={"plain"} color={"primary"}>
                                    {truncate(currentAccount.address, 11)}
                                </Button>
                            </Tooltip>
                            : (
                                <>
                                    <IoWalletOutline />
                                    Connect Wallet
                                </>
                            )
                    }
                </Button>
            }
        />

    )
}