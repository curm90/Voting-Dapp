import hre from 'hardhat';
import { expect } from 'chai';

describe('Voting', function () {
  async function deployContract() {
    const Voting = await hre.ethers.getContractFactory('Voting');
    const voting = await Voting.deploy();

    return voting;
  }

  it('Should create a proposal', async function () {
    const description = 'Proposal 1';
    const voting = await deployContract();
    await voting.createProposal(description);

    const proposals = await voting.getProposals();
    expect(proposals.length).to.equal(1);
    expect(proposals[0].description).to.equal(description);
    expect(proposals[0].voteCount).to.equal(0);
  });

  it('Should vote for a proposal', async function () {
    const description = 'Proposal 1';
    const voting = await deployContract();
    await voting.createProposal(description);

    await voting.vote(0);

    const proposals = await voting.getProposals();
    expect(proposals[0].voteCount).to.equal(1);
  });

  it('Should return all proposals', async function () {
    const description1 = 'Proposal 1';
    const description2 = 'Proposal 2';
    const voting = await deployContract();

    await voting.createProposal(description1);
    await voting.createProposal(description2);

    const proposals = await voting.getProposals();
    expect(proposals.length).to.equal(2);
    expect(proposals[0].description).to.equal(description1);
    expect(proposals[1].description).to.equal(description2);
  });
});
