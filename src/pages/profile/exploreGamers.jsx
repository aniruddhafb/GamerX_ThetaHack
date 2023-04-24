import Loader from "@/components/Loader";
import ProfileCard from "@/components/cards/ProfileCard";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TopGamers = ({ fetch_gamers }) => {
  const [data, set_data] = useState([]);
  const [loading, setLoading] = useState(false);

  const get_gamers = async () => {
    setLoading(true);
    const res = await fetch_gamers();
    set_data(res);
    setLoading(false);
  };

  useEffect(() => {
    get_gamers();
  }, []);
  return (
    <section className="shop-area" id="pageBG">
      <div className="container mt-12">
        <div className="row justify-content-center">
          {/* search  */}
          {/* <div className="shop-sidebar mb-8">
            <div className="shop__widget">
              <div className="shop__widget-inner">
                <div className="shop__search">
                  <input type="text" placeholder="Search here" fdprocessedid="l4mdqs" />
                  <button className="p-0 border-0" fdprocessedid="njwzvu"><i className="flaticon-search"></i></button>
                </div>
              </div>
            </div>
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
                      <option value="Sort by latest">Sort by latest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {loading ?
              <Loader />
              :
              <div className="flex justify-center w-full" style={{ display: "flex", flexWrap: "wrap" }}>
                {/* loop here  */}
                <div className="grid grid-cols-3 justify-center w-full">
                  {data.map((e) => (
                    <ProfileCard
                      coverImage={e.data.cover_image}
                      gamerBio={e.data.bio}
                      gamerID={e.data.id}
                      gamerName={e.data.username}
                      profileImage={e.data.profile_image}
                    />
                  ))}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopGamers;
