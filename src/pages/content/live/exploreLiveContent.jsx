import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiLiveFill } from "react-icons/ri"

const ExploreLiveContent = ({ get_all_livestreams }) => {
  const [data, set_data] = useState([]);
  const [loading, setLoading] = useState(false);

  const get_livestreams = async () => {
    setLoading(true);
    const res = await get_all_livestreams();
    set_data(res);
    setLoading(false);
  };

  useEffect(() => {
    get_livestreams();
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
                    <p style={{ fontSize: "25px" }}>Explore Live Streams</p>
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
            {loading ?
              <Loader />
              :
              <div className="flex flex-wrap justify-around align-middle">
                {/* loop here  */}
                {data.map((e) => (
                  <Link
                    href={`/content/live/${e.livestream.stream_id}`}
                    className="col-xxl-4 col-xl-5 col-lg-6 col-md-9"
                    style={{ textDecoration: "none" }}                  >
                    <div
                      className="nft-item__box"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <div className="nft-item__content">
                        <div
                          style={{
                            textDecoration: "none",
                            position: "relative",
                            zIndex: "10",
                          }}
                        >
                          <Image
                            className="w-[100%] h-[200px] rounded-md"
                            src={e.livestream.thumbnail.replace(
                              "ipfs://",
                              "https://gateway.ipfscdn.io/ipfs/"
                            )}
                            height={100}
                            width={100}
                            alt="img"
                          />
                          <div className="absolute top-[30%] right-[46%]">
                            <i className="flaticon-play text-white text-4xl hover:text-green-500"></i>
                          </div>
                          <span className="flex text-red-400 mb-[-27px] mt-[12px]">
                            <RiLiveFill className="mt-[6px]" />
                            <p className="ml-1 mt-[4px] text-[13px]">Live Now</p>
                          </span>
                          <h4 className="title mt-4">{e.livestream.title}</h4>
                        </div>

                        <div className="nft-item__avatar">
                          <div className="avatar-img" style={{ zIndex: "11" }}>
                            <Link href="#">
                              <Image
                                src="../../../nft_avatar01.png"
                                height={100}
                                width={100}
                                className="h-[30px] w-[30px]"
                                alt="img"
                              />
                            </Link>
                          </div>
                          <div className="avatar-name">
                            <h5 className="name" style={{ zIndex: "11" }}>
                              <Link
                                href="#"
                                style={{
                                  textDecoration: "none",
                                  fontSize: "15px",
                                }}
                              >
                                {e.owner.data.username}
                              </Link>
                            </h5>

                            <span className="designation">0 Watching</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreLiveContent;
