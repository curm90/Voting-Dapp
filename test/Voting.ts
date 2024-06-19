import hre from 'hardhat';
import { expect } from 'chai';

describe('Voting', function () {
  async function deployContract() {
    const [owner, addr1] = await ethers.getSigners();
    const Voting = await hre.ethers.getContractFactory('Voting');
    const voting = await Voting.deploy(owner.address);

    return { voting, owner, addr1 };
  }

  it('Should create a proposal and emit ProposalCreated event', async function () {
    const description = 'Proposal 1';
    const { voting } = await deployContract();

    await expect(voting.createProposal(description))
      .to.emit(voting, 'ProposalCreated')
      .withArgs(0, description);

    const proposals = await voting.getProposals();
    expect(proposals.length).to.equal(1);
    expect(proposals[0].description).to.equal(description);
    expect(proposals[0].voteCount).to.equal(0);
  });

  it('Should vote for a proposal and emit Voted event', async function () {
    const description = 'Proposal 1';
    const { voting, addr1 } = await deployContract();
    await voting.createProposal(description);

    await expect(voting.connect(addr1).vote(0)).to.emit(voting, 'Voted').withArgs(addr1.address, 0);

    const proposals = await voting.getProposals();
    expect(proposals[0].voteCount).to.equal(1);
  });

  it('Should return all proposals', async function () {
    const description1 = 'Proposal 1';
    const description2 = 'Proposal 2';
    const { voting } = await deployContract();

    await voting.createProposal(description1);
    await voting.createProposal(description2);

    const proposals = await voting.getProposals();
    expect(proposals.length).to.equal(2);
    expect(proposals[0].description).to.equal(description1);
    expect(proposals[1].description).to.equal(description2);
  });

  it('Should only allow the owner of contract to create a proposal', async function () {
    const description1 = 'Proposal 1';
    const { voting, addr1 } = await deployContract();

    const proposals = await voting.getProposals();
    expect(proposals.length).to.equal(0);

    try {
      await voting.connect(addr1).createProposal(description1);
    } catch (error) {
      console.log({ message: error.message });
      expect(error.message).to.include('OwnableUnauthorizedAccount');
    }
  });

  it('Should only allow voter to vote on a valid proposal', async function () {
    const description = 'Proposal 1';
    const { voting, addr1 } = await deployContract();

    await expect(voting.connect(addr1).vote(0)).to.be.revertedWith('Invalid proposal');

    await voting.createProposal(description);

    await expect(voting.connect(addr1).vote(1)).to.be.revertedWith('Invalid proposal');
  });

  it('Should record the user has already voted', async function () {
    const description = 'Proposal 1';
    const { voting, addr1 } = await deployContract();

    await voting.createProposal(description);
    await voting.connect(addr1).vote(0);

    const hasVoted = await voting.hasVoted(addr1.address);
    expect(hasVoted).to.be.true;
  });

  it('Should only allow the user to vote once', async function () {
    const description = 'Proposal 1';
    const { voting, addr1 } = await deployContract();

    await voting.createProposal(description);
    await voting.connect(addr1).vote(0);

    await expect(voting.connect(addr1).vote(0)).to.be.revertedWith('Already voted');
  });
});
