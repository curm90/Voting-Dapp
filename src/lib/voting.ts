import { getContract } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';
import client from '@/constants/thirdwebClient';
import VotingArtifact from '../../artifacts/contracts/Voting.sol/Voting.json';
import { SEPOLIA_CONTRACT_ADDRESS } from '@/constants/chainIds';

export const votingContract = getContract({
  client,
  chain: sepolia,
  address: SEPOLIA_CONTRACT_ADDRESS,
  //@ts-ignore
  abi: VotingArtifact.abi,
});
