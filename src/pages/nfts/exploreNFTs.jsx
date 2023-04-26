import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ExploreNFTs = ({ fetch_all_nfts }) => {
  const [nfts, set_nfts] = useState([]);
  const get_nfts = async () => {
    const nfts = await fetch_all_nfts();
    console.log(nfts);
    set_nfts(nfts);
  };
  useEffect(() => {
    get_nfts();
  }, []);
  return (
    <section className="shop-area" id="pageBG">
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
                      <option value="Sort by average rating">
                        Sort by average rating
                      </option>
                      <option value="Sort by latest">Sort by latest</option>
                      <option value="Sort by latest">Sort by latest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-around align-middle">
              {/* loop here  */}
              {nfts?.map((e, index) => (
                <div key={index} className="trendingNft__item">
                  <div className="trendingNft__item-image mt-8">
                    <a href="#">
                      <Image
                        src="../../nftCard1.jpg"
                        height={100}
                        width={100}
                        className="h-[200px]"
                        alt="img"
                      />
                    </a>
                    <div className="trendingNft__item-top mt-2">
                      <div className="trendingNft__item-avatar">
                        <div className="info">
                          <h6 className="name">{e.ipfsData.title}</h6>
                          <span
                            className="userName"
                            style={{
                              width: "280px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              textDecoration: "none",
                            }}
                          >
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Pariatur, nihil. Culpa ducimus, iure veniam
                            dolorem voluptas illo enim hic maiores possimus
                            illum adipisci eum perferendis vel neque. Accusamus
                            expedita similique, quos atque molestiae aliquid
                            voluptatibus? Nulla amet repudiandae, labore
                            adipisci ipsum excepturi hic vel molestiae dolorum
                            ipsa odit enim quo!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="trendingNft__item-bottom mt-[-16px]">
                    <div className="trendingNft__item-price">
                      <span className="bid text-gray-400">Last Price</span>
                      <h6 className="eth">
                        {" "}
                        1.005 <span>TFUEL</span>
                      </h6>
                    </div>
                    <a
                      href="#"
                      className="bid-btn"
                      style={{ textDecoration: "none" }}
                    >
                      Buy <i className="fas fa-long-arrow-alt-right"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreNFTs;
