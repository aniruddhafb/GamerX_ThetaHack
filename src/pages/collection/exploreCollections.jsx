import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import Loader from "@/components/Loader";
import Head from "next/head";

const ExploreCollections = ({ get_all_collections }) => {
  const [collections, set_collections] = useState([]);
  const [loading, isLoading] = useState(false);

  const all_collections = async () => {
    isLoading(true);
    const collections = await get_all_collections();
    set_collections(collections);
    console.log({ coll: collections })
    isLoading(false);
  };

  useEffect(() => {
    all_collections();
  }, []);

  return (
    <section className="shop-area" id="pageBG">
      <Head>
        <title>Explore Collections - GamerX</title>
        <meta name="description" content="About GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ? (
        <div className="pt-[250px] pb-[250px]">
          <Loader />
        </div>
      ) : (
        <div className="container mt-12">
          <div className="row justify-content-center">
            <div>
              <div className="shop__top-wrap">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-sm-6">
                    <div className="shop__showing-result">
                      <p style={{ fontSize: "25px" }}>
                        Explore NFT Collections
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="shop__ordering">
                      <select name="orderby" className="orderby">
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
                {collections.map(
                  (e, index) =>
                    e.logo !== "gamerx logo image" && (
                      <Link
                        href={`/collection/${e.id}`}
                        key={index}
                        className="trendingNft__item"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="trendingNft__item-image relative">
                          <a href="#">
                            <Image
                              src={e.coverImage.replace(
                                "ipfs://",
                                "https://gateway.ipfscdn.io/ipfs/"
                              )}
                              height={100}
                              width={100}
                              className="mt-[60px]"
                              style={{ height: "150px", width: "250px" }}
                              alt="img"
                            />
                          </a>
                          <div>
                            <a
                              href="#"
                              className="absolute bottom-[-35px] right-[31%]"
                            >
                              <Image
                                src={e.logo.replace(
                                  "ipfs://",
                                  "https://gateway.ipfscdn.io/ipfs/"
                                )}
                                height={100}
                                width={100}
                                className="border border-gray-500"
                                style={{
                                  borderRadius: "50%",
                                  height: "100px",
                                  width: "100px",
                                }}
                                alt="img"
                              />
                            </a>
                            <MdVerified
                              style={{ color: "#4f87ff", cursor: "pointer" }}
                              className="absolute bottom-[-40px] right-[82px]"
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
                                href={`/profile/${e.owner.id}`}
                                className="text-green-500"
                                style={{ textDecoration: "none" }}
                              >
                                {e.owner.id.slice(0, 5) +
                                  "..." +
                                  e.owner.id.slice(38)}
                              </Link>
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                )}
                {collections?.length <= 0 && (
                  <p style={{ marginTop: "52px", fontSize: "20px" }}>
                    No NFT Collections Found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreCollections;
