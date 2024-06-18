// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Voting {
    struct Proposal {
        uint256 voteCount;
        string description;
    }

    Proposal[] public proposals;

    function createProposal(string memory _description) public {
        proposals.push(Proposal({description: _description, voteCount: 0}));
    }

    function vote(uint256 proposalId) public {
        proposals[proposalId].voteCount += 1;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}
