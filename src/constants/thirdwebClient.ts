import { SEPOLIA_NEWORK_ID } from '@/constants/chainIds';
import { createThirdwebClient, defineChain } from 'thirdweb';
import { createWallet, walletConnect } from 'thirdweb/wallets';

const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

const client = createThirdwebClient({
  clientId: CLIENT_ID as string,
});

export const chain = defineChain(SEPOLIA_NEWORK_ID); // Sepolia

export const wallets = [createWallet('io.metamask'), createWallet('io.rabby'), walletConnect()];

export default client;
