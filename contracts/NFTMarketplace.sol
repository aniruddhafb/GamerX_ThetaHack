//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./NFTCollection.sol";

contract NFTMarketplace {
    using Counters for Counters.Counter;
    Counters.Counter private _nftId;
    Counters.Counter private _itemsSold;
    address payable owner;
    uint256 public listPrice = 0.01 ether;

    struct ListedToken {
        uint256 nftId;
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    struct Tip{
        string video_id;
        uint256 total_tip;
        address recipient;
    }

    mapping(string => Tip) public tips;

    event TokenListedSuccess(
        uint256 nftId,
        uint256 tokenId,
        address payable owner,
        address payable seller,
        uint256 price,
        bool currentlyListed
    );

    mapping(NFTCollection => mapping(uint256 => ListedToken)) public nft_record;
    mapping(uint256 => ListedToken) public id_listed_token;

    constructor() {
        owner = payable(msg.sender);
    }

    function tip_creator(string memory _video_id, address payable _recipient) public payable{
        require(msg.value > 0, "Please send a valid value");
        uint256 total_tip = tips[_video_id].total_tip;
        Tip memory tip = Tip(
            _video_id,
            total_tip + msg.value,
            _recipient
        );
        tips[_video_id] = tip;
        payable(_recipient).transfer(msg.value);
    }

    function ListToken(
        uint256 tokenId,
        uint256 price,
        NFTCollection collection
    ) public payable {
        require(msg.value == listPrice, "Please send the listing fees");
        require(price > 0, "Make sure the price isn't negative");
        uint256 nftId = _nftId.current();
        
        nft_record[collection][tokenId] = ListedToken(
            nftId,
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        id_listed_token[nftId] = nft_record[collection][tokenId];

        collection.transferFrom(msg.sender, address(this), tokenId);

        emit TokenListedSuccess(
            nftId,
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );
        _nftId.increment();
    }

    function cancelListing(NFTCollection collection, uint256 tokenId) public {
        require(nft_record[collection][tokenId].currentlyListed, "This NFT is not listed");
        require(nft_record[collection][tokenId].seller == msg.sender, "You are not the owner of this nft");

        nft_record[collection][tokenId].owner = payable(msg.sender);
        nft_record[collection][tokenId].seller = payable(address(0));
        nft_record[collection][tokenId].price = 0;
        nft_record[collection][tokenId].currentlyListed = false;

        collection.transferFrom(address(this), msg.sender, tokenId);
    }

    function executeSale(
        uint256 tokenId,
        NFTCollection collection
    ) public payable {
        ListedToken storage nft = nft_record[collection][tokenId];
        uint256 price = nft.price;
        address seller = nft.seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        //update the details of the token
        nft.currentlyListed = false;
        nft.seller = payable(msg.sender);
        _itemsSold.increment();

        //Actually transfer the token to the new owner
        collection.transferFrom(address(this), msg.sender, tokenId);
        // collection.approve(address(this), tokenId);

        //Transfer the listing fee to the marketplace creator
        payable(owner).transfer(listPrice);
        payable(seller).transfer(msg.value);
    }

    function change_listing_fee(uint256 new_listing_fee) public {
        require(
            msg.sender == owner,
            "Only platform owner can call this function"
        );
        listPrice = new_listing_fee;
    }

    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint256 nftCount = _nftId.current();
        ListedToken[] memory nfts = new ListedToken[](nftCount);
        uint256 currentIndex = 0;
        for(uint256 i = 0; i < nftCount; i++){
            if(id_listed_token[i].owner != address(0)){
                ListedToken memory currentToken = id_listed_token[i];
                nfts[currentIndex] = currentToken;
                currentIndex++;
            }
        }
        return nfts;
    }

    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint256 totalItemCount = _nftId.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                id_listed_token[i].owner == msg.sender ||
                id_listed_token[i].seller == msg.sender
            ) {
                itemCount += 1;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                id_listed_token[i].owner == msg.sender ||
                id_listed_token[i].seller == msg.sender
            ) {
                uint256 currentId = i;
                ListedToken storage currentItem = id_listed_token[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getLatestIdToListedToken()
        public
        view
        returns (ListedToken memory)
    {
        uint256 currentTokenId = _nftId.current();
        return id_listed_token[currentTokenId];
    }

    function getListedTokenById(
        uint256 tokenId,
        NFTCollection collection
    ) public view returns (ListedToken memory) {
        return nft_record[collection][tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _nftId.current();
    }

    receive() external payable {}
}