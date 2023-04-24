import Loader from "@/components/Loader";
import VideoCard from "@/components/cards/VideoCard";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ExploreContent = ({ fetch_videos }) => {
  const [videos, set_videos] = useState([]);
  const [loading, setLoading] = useState(false);

  const get_all_videos = async () => {
    setLoading(true);
    const data = await fetch_videos();
    set_videos(data);
    setLoading(false);
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
            {loading ?
              <Loader />
              :
              <div className="flex justify-around align-middle">
                {/* loop here  */}
                <div className="flex flex-wrap justify-around align-middle">
                  {videos.map((e) => {
                    console.log(e);
                    return (
                      <VideoCard
                        thumbnail={e.video.thumbnail}
                        title={e.video.name}
                        creatorImage={e.owner.profile_image}
                        creatorName={e.owner.username}
                        videoDate={"8/12/2023"}
                        videoID={e.video.id}
                      />
                    );
                  })}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreContent;
