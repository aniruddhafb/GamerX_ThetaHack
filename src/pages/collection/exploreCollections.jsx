import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const ExploreCollections = ({ get_all_collections }) => {
  const [collections, set_collections] = useState([]);
  const all_collections = async () => {
    const collections = await get_all_collections();
    console.log(collections);
    set_collections(collections);
  };
  useEffect(() => {
    all_collections();
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
                    <p style={{ fontSize: "25px" }}>Explore NFT Collections</p>
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
              {collections.map((e, index) => (
                <Link
                  href={`/collection/${e.id}`}
                  key={index}
                  className="trendingNft__item"
                >
                  <div className="trendingNft__item-image relative">
                    <a href="#">
                      <Image
                        src={e.logo.replace(
                          "ipfs://",
                          "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        height={100}
                        width={100}
                        className="h-[130px] mt-[60px]"
                        alt="img"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        className="absolute bottom-[-35px] right-[35%]"
                      >
                        <Image
                          src="../../nft_avatar01.png"
                          height={100}
                          width={100}
                          className=" h-[75px] w-[75px] border border-gray-500"
                          style={{ borderRadius: "50%" }}
                          alt="img"
                        />
                      </a>
                      <MdVerified
                        style={{ color: "#4f87ff", cursor: "pointer" }}
                        className="absolute bottom-[-40px] right-[90px]"
                        size={22}
                      />
                      {/* <BsFillExclamationCircleFill
                                            style={{ color: "#cfc62d", cursor: "pointer" }}
                                            className='absolute bottom-[-40px] right-[90px]'
                                            size={22}
                                        /> */}
                    </div>
                  </div>
                  <div className="trendingNft__item-bottom mt-[36px]">
                    <div className="trendingNft__item-price">
                      <h6 className="eth"> {e.name}</h6>
                      <span className="bid text-gray-400 mt-2">
                        By{" "}
                        <Link
                          href="#"
                          className="text-green-500"
                          style={{ textDecoration: "none" }}
                        >
                          0x4484
                        </Link>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCollections;
