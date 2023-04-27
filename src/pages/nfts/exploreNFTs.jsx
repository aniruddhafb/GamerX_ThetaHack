import Loader from "@/components/Loader";
import NftCard from "@/components/cards/NftCard";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ExploreNFTs = ({ fetch_all_nfts }) => {
  const [nfts, set_nfts] = useState([]);
  const [loading, isLoading] = useState(false);

  const get_nfts = async () => {
    isLoading(true);
    const nfts = await fetch_all_nfts();
    set_nfts(nfts);
    isLoading(false);
  };

  useEffect(() => {
    get_nfts();

  }, []);
  return (
    <section className="shop-area" id="pageBG">
      {loading ?
        <div className="pt-[250px] pb-[250px]">
          <Loader />
        </div>
        :
        <div className="container mt-12">
          <div className="row justify-content-center">
            <div>
              <div className="shop__top-wrap">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-sm-6">
                    <div className="shop__showing-result">
                      <p style={{ fontSize: "25px" }}>Explore NFTs</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="shop__ordering">
                      <select
                        name="orderby"
                        className="orderby"
                        fdprocessedid="8pe1d8"
                      >
                        <option value="Default sorting">Default sorting</option>
                        <option value="Sort by popularity">
                          Sort by popularity
                        </option>
                        <option value="Sort by latest">Sort by latest</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-around align-middle">
                {/* loop here  */}
                {nfts?.map((e, index) => (
                  <NftCard
                    nftDesc={e.ipfsData.description}
                    nftImage={e.ipfsData.image}
                    nftName={e.ipfsData.title}
                    nftCollection={e.ipfsData.collection_address}
                    nftID={e.tokenId}
                    nftPrice={e.listingPrice}
                    isListed={e.isListed}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export default ExploreNFTs;
