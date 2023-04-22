import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ExploreContent = ({ fetch_videos }) => {
  const [videos, set_videos] = useState([]);
  const get_all_videos = async () => {
    const data = await fetch_videos();
    set_videos(data);
  };
  useEffect(() => {
    get_all_videos();
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
                    <p style={{ fontSize: "25px" }}>Explore Videos</p>
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
            <div className="flex justify-around align-middle">
              {/* loop here  */}
              <div className="flex flex-wrap justify-around align-middle">
                {videos.map((e) => {
                  console.log(e);
                  return (
                    <div
                      className="nft-item__box m-4 w-[340px]"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <div className="nft-item__content">
                        <Link
                          href={`/content/videos/${e.video.id}`}
                          style={{
                            textDecoration: "none",
                            position: "relative",
                            zIndex: "10",
                          }}
                        >
                          <Image
                            className="w-[100%] h-[200px] rounded-md"
                            src={e.video.thumbnail.replace(
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
                          <h4 className="title mt-4">{e.video.name}</h4>
                        </Link>

                        <div className="nft-item__avatar">
                          <div className="avatar-img" style={{ zIndex: "11" }}>
                            <Link href="#">
                              <Image
                                src={e.owner.profile_image?.replace(
                                  "ipfs://",
                                  "https://gateway.ipfscdn.io/ipfs/"
                                )}
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
                                {e.owner.username}
                              </Link>
                            </h5>
                            <span className="designation">4/12/2023</span>
                            <span className="designation">No views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreContent;
