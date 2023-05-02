import Image from "next/image";
import React, { useEffect, useState } from "react";
import heroLogo from "../../../public/favicon.png";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import NftCard from "@/components/cards/NftCard";
import VideoCard from "@/components/cards/VideoCard";
import LiveStream from "../content/live/[slug]";
import LiveVideoCard from "@/components/cards/LiveVideoCard";
import Head from "next/head";

const GamerProfile = ({
  get_gamer,
  fetch_nfts_from_user_wallet,
  signerAddress,
  get_user_videos,
  get_user_livestream,
}) => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, set_data] = useState([]);
  const [loading, isLoading] = useState(false);

  const [NFTs, showNFTs] = useState(true);
  const [videos, showVideos] = useState(false);
  const [lives, showLives] = useState(false);
  const [jobs, showJobs] = useState(false);

  const [user_nfts, set_user_nfts] = useState([]);
  const [user_videos, set_user_videos] = useState([]);
  const [livestream, set_livestream] = useState([]);

  const fetch_gamer = async () => {
    isLoading(true);
    const res = await get_gamer(slug);
    console.log({ res });
    set_data(res);
    isLoading(false);
  };

  const get_nfts = async () => {
    const res = await fetch_nfts_from_user_wallet(signerAddress);
    set_user_nfts(res);
  };

  const get_videos = async () => {
    const res = await get_user_videos(signerAddress);
    set_user_videos(res);
  };

  const get_livestream = async () => {
    const res = await get_user_livestream();
    set_livestream(res);
  };
  useEffect(() => {
    if (!slug && !signerAddress) return;
    fetch_gamer();
    get_nfts();
    get_videos();
    get_livestream();
  }, [slug, signerAddress]);

  return (
    <div id="pageBG">
      <Head>
        <title>Profile - GamerX</title>
        <meta name="description" content="Gamers profile on GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ? (
        <div className="pt-[400px] pb-[400px]">
          <Loader />
        </div>
      ) : (
        <div>
          {/* top area  */}
          <section className="breadcrumb-area">
            <div className="container">
              <div className="breadcrumb__wrapper">
                <div className="row">
                  <div className="col-xl-6 col-lg-7">
                    <div className="breadcrumb__content">
                      <h2 className="title">{data.username}</h2>
                      <p className="mt-[5px] text-wheat">{data.bio}</p>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item active">
                            {data.role}
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            <a
                              href={data.username && data?.socials[1]}
                              target="_blank"
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="twitter"
                                className="pointer-events-none top-1/2 left-4 h-4 w-4 fill-white"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                              </svg>
                            </a>

                            <a
                              href={data.username && data?.socials[0]}
                              target="_blank"
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="instagram"
                                className="pointer-events-none top-1/2 left-4 h-4 w-4 fill-white ml-3"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                              </svg>
                            </a>
                          </li>
                        </ol>
                      </nav>
                      <p className="mt-[8px] text-wheat">228 Followers</p>
                      <button class=" hover:bg-[#198754] text-[#68fb9a] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2">
                        Follow
                      </button>
                      <button class=" hover:bg-[#faa706] text-[#faa706] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2 ml-4">
                        Following
                      </button>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-5 position-relative d-none d-lg-block">
                    <div className="breadcrumb__img">
                      <Image
                        src={data?.profile_image?.replace(
                          "ipfs://",
                          "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        height={100}
                        width={100}
                        className="rounded-[50%] h-[250px] w-[250px]"
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* achiements area  */}
          <section className="team__info-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="team__info-wrap">
                    <div className="team__info-discord">
                      <div className="team__info-item">
                        <div className="team__info-icon">
                          <Image
                            src={heroLogo}
                            alt="img"
                            height={100}
                            width={100}
                            className="h-[60px] w-[60px]"
                          />
                        </div>
                        <div className="team__info-content">
                          <span className="sub" style={{ fontSize: "16px" }}>
                            GamerX Identity
                          </span>
                          <h5 className="title" style={{ fontSize: "18px" }}>
                            Beginner
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="team__info-list">
                      <ul className="list-wrap">
                        <li>
                          <div className="team__info-item">
                            <div className="team__info-icon">
                              <i className="flaticon-swords-1"></i>
                            </div>
                            <div className="team__info-content">
                              <span className="sub">Pro Gamer At</span>
                              <h5 className="title">{data?.favourite_game}</h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="team__info-item">
                            <div className="team__info-icon">
                              <i className="flaticon-diamond"></i>
                            </div>
                            <div className="team__info-content">
                              <span className="sub">Tournaments won</span>
                              <h5 className="title">04 Times</h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* tabs area  */}
          <div
            className="w-[100%] h-[100%] flex justify-center align-middle py-4 cursor-pointer"
            style={{ overflow: "auto", whiteSpace: "nowrap" }}
          >
            <div
              onClick={() => (
                showVideos(false),
                showLives(false),
                showJobs(false),
                showNFTs(true)
              )}
              className={`flex px-12 py-1 border-2 border-transparent hover:border-b-green-500 ${
                NFTs && "border-b-green-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 mt-1 h-5 w-5 fill-current text-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 5v3h14V5H5zM4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" />
              </svg>
              <h4>NFTs</h4>
            </div>

            <div
              onClick={() => (
                showVideos(true),
                showLives(false),
                showJobs(false),
                showNFTs(false)
              )}
              className={`flex px-12 py-1 border-2 border-transparent hover:border-b-green-500 ${
                videos && "border-b-green-500"
              }`}
            >
              <h4>Videos</h4>
              <></>
            </div>

            <div
              onClick={() => (
                showVideos(false),
                showLives(true),
                showJobs(false),
                showNFTs(false)
              )}
              className={`flex px-12 py-1 border-2 border-transparent hover:border-b-green-500 ${
                lives && "border-b-green-500"
              }`}
            >
              <h4>Live Streams</h4>
            </div>

            <div
              onClick={() => (
                showVideos(false),
                showLives(false),
                showJobs(true),
                showNFTs(false)
              )}
              className={`flex px-12 py-1 border-2 border-transparent hover:border-b-green-500 ${
                jobs && "border-b-green-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 mt-1 h-5 w-5 fill-current text-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z" />
              </svg>
              <h4>Jobs</h4>
            </div>
          </div>

          {/* tab info area  */}
          {NFTs && (
            <div className=" flex justify-center align-middle">
              <div className="container mt-12 mb-12">
                {!user_nfts?.length && (
                  <h3 className="mt-16 mb-16" style={{ textAlign: "center" }}>
                    No NFTs Found!
                  </h3>
                )}
                <div className="row justify-content-center">
                  <div className="flex flex-wrap justify-around align-middle">
                    {user_nfts?.map((e, index) => (
                      <NftCard
                        key={index}
                        nftName={e.ipfsData.title}
                        isListed={e.isListed}
                        nftID={e.tokenId}
                        nftCollection={e.ipfsData.collection_address}
                        nftImage={e.ipfsData.image.replace(
                          "ipfs://",
                          "https://gateway.ipfscdn.io/ipfs/"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {videos && (
            <div className=" flex justify-center align-middle">
              <div className="container mt-12 mb-12">
                {!user_videos.length && (
                  <h3 className="mt-16 mb-16" style={{ textAlign: "center" }}>
                    No Content Found!
                  </h3>
                )}
                <div className="row justify-content-center">
                  <div className="flex flex-wrap justify-around align-middle">
                    {user_videos?.map((e) => {
                      const d = new Date();
                      let time;
                      if (e.video.upload_date) {
                        time = `${d.getDate(e.video.upload_date)}/${
                          d.getMonth(e.video.upload_date) + 1
                        }/${d.getFullYear(e.video.upload_date)}`;
                      }
                      return (
                        <VideoCard
                          title={e.video.name}
                          thumbnail={e.video.thumbnail}
                          creatorAddress={e.owner.id}
                          creatorImage={e.owner.profile_image}
                          creatorName={e.owner.username}
                          videoDate={time}
                          videoID={e.video.id}
                          key={e.video.id}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {lives && (
            <div className=" flex justify-center align-middle">
              <div className="container mt-12 mb-12">
                {!livestream.length && (
                  <h3 className="mt-16 mb-16" style={{ textAlign: "center" }}>
                    No Live Streams!
                  </h3>
                )}
                <div className="row justify-content-center">
                  <div className="flex flex-wrap justify-around align-middle">
                    {livestream?.map((e) => {
                      return (
                        <LiveVideoCard
                          liveID={e.livestream.id}
                          liveTitle={e.livestream.title}
                          thumbnail={e.livestream.thumbnail}
                          ownerAddress={e.owner.id}
                          ownerProfileImg={e.owner.profile_image}
                          ownerUsername={e.owner.username}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {jobs && (
            <div className=" flex justify-center align-middle">
              <div className="container mt-12 mb-12">
                <h3 className="mt-16 mb-16" style={{ textAlign: "center" }}>
                  No Jobs Found!
                </h3>
                <div className="row justify-content-center">
                  {/* loop jobs here */}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GamerProfile;
