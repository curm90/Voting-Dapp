import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const VotingModule = buildModule('VotingDeployment', (m) => {
  const voting = m.contract('Voting', [m.getAccount(0)]);

  return { voting };
});

export default VotingModule;
