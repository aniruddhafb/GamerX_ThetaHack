import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TopGamers = ({ fetch_gamers }) => {
  const [data, set_data] = useState([]);
  const get_gamers = async () => {
    const res = await fetch_gamers();
    console.log({ res });
    set_data(res);
  };

  useEffect(() => {
    get_gamers();
  }, []);
  return (
    <section className="shop-area" id="pageBG">
      <div className="container mt-12">
        <div className="row justify-content-center">
          {/* search  */}
          {/* <div className="col-xl-3 col-lg-4 col-md-11 order-2 order-lg-0">
                        <aside className="shop-sidebar">
                            <div className="shop__widget">
                                <h4 className="shop__widget-title">search</h4>
                                <div className="shop__widget-inner">
                                    <div className="shop__search">
                                        <input type="text" placeholder="Search here" fdprocessedid="l4mdqs" />
                                        <button className="p-0 border-0" fdprocessedid="njwzvu"><i className="flaticon-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div> */}
          <div>
            <div className="shop__top-wrap">
              <div className="row align-items-center">
                <div className="col-lg-8 col-sm-6">
                  <div className="shop__showing-result">
                    <p style={{ fontSize: "25px" }}>Top Gamers</p>
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
            <div className="flex justify-center w-full">
              {/* loop here  */}
              <div className="grid grid-cols-3 justify-center w-full">
                {data.map((e) => (
                  <Link
                    className="team__item relative"
                    href={`/profile/${e.data.id}`}
                  >
                    <div>
                      <Image
                        src={e.data.cover_image?.replace(
                          "ipfs://",
                          "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        height={100}
                        width={100}
                        alt="img"
                        className="absolute top-0 right-0 h-[110px] w-[100%]"
                      />
                    </div>

                    <div className="team__thumb">
                      <Link href="#">
                        <Image
                          src={e.data.profile_image?.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                          )}
                          height={100}
                          width={100}
                          alt="img"
                          className="ml-7 mt-4 h-[170px] w-[170px]"
                          style={{ zIndex: "10", position: "relative" }}
                        />
                      </Link>
                    </div>

                    <div className="team__content mt-[-13px] mr-3">
                      <h4 className="name">
                        <Link href="#" style={{ textDecoration: "none" }}>
                          {e.data.username}
                        </Link>
                      </h4>
                      <span
                        className="designation"
                        style={{ fontSize: "15px" }}
                      >
                        {e.data.bio}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopGamers;
