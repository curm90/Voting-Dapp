import { ethers } from 'ethers';

import VotingArtifact from '../../artifacts/contracts/Voting.sol/Voting.json';

const CONTRACT_ADDRESS = '0xC3253A478B90879E01ad39cD8B6EB0dcD462d3a6';
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

export async function getContract() {
  const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC_URL);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingArtifact.abi, signer);

  return contract;
}
