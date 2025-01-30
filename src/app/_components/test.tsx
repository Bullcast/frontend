import { ConnectButton, useAutoConnectWallet } from '@mysten/dapp-kit';
 
export function MyComponent() {
	const autoConnectionStatus = useAutoConnectWallet();
 
	return (
		<div>
			<ConnectButton />
			<div>Auto-connection status: {autoConnectionStatus}</div>
		</div>
	);
}