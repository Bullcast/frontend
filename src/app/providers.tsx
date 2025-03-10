"use client";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Provider as UIProvider } from '@/components/ui/provider';

const { networkConfig } = createNetworkConfig({
    mainnet: { url: getFullnodeUrl('mainnet') },
});
const queryClient = new QueryClient();

export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
                <WalletProvider>
                    <UIProvider forcedTheme='dark'>{children}</UIProvider>
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}