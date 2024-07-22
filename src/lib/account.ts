import { ethers } from 'ethers';
import { getContract } from './voting';

export async function getConnectedWallet() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    return address;
  }

  alert('MetaMask is not installed');
  return;
}

export async function checkIsOwner() {
  const contract = await getContract();
  const owner = await contract.owner();

  console.log({ owner });
  return owner;
}
