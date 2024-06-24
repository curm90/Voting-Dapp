import { ConnectButton } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import client from '@/constants/thirdwebClient';

const wallets = [
  inAppWallet(),
  createWallet('io.metamask'),
  createWallet('io.rabby'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
];

export default function ConnectWalletBtn() {
  return (
    <div>
      <ConnectButton client={client} wallets={wallets} />
    </div>
  );
}
