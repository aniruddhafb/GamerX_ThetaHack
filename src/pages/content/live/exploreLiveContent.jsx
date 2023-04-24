import Loader from "@/components/Loader";
import LiveVideoCard from "@/components/cards/LiveVideoCard";
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
    console.log({ liveres: res })
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
                  <LiveVideoCard
                    liveID={e.livestream.stream_id}
                    liveTitle={e.livestream.title}
                    ownerProfileImg={e.owner.data.profile_image}
                    ownerUsername={e.owner.data.username}
                    thumbnail={e.livestream.thumbnail}
                  />
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
