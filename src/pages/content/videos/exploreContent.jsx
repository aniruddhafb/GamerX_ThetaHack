import Loader from "@/components/Loader";
import VideoCard from "@/components/cards/VideoCard";
import Head from "next/head";
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
      <Head>
        <title>Explore Content - GamerX</title>
        <meta
          name="description"
          content="About GamerX"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
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
                      <option value="Sort by latest">Sort by latest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className="flex justify-around align-middle">
                {/* loop here  */}
                <div className="flex flex-wrap justify-around align-middle">
                  {videos.map((e, index) => {
                    return (
                      <VideoCard
                        key={index}
                        thumbnail={e.video.thumbnail}
                        title={e.video.name}
                        creatorImage={e.owner.profile_image}
                        creatorName={e.owner.username}
                        creatorAddress={e.owner.id}
                        videoDate={e.video.upload_date}
                        videoID={e.video.id}
                      />
                    )
                  })}
                  {
                    videos?.length <= 0 &&
                    <p style={{ marginTop: "52px", fontSize: "20px" }}>No Videos Found</p>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreContent;
