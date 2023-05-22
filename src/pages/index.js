import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoCard from "@/components/cards/VideoCard";

import coin1 from "../../public/slider_shape01.png";
import coin2 from "../../public/slider_shape02.png";
import coin3 from "../../public/slider_shape03.png";
import coin4 from "../../public/slider_shape04.png";

import thetalogo from "../../public/theta.png";
import thetaText from "../../public/thetaplain.png";
import ProfileCard from "@/components/cards/ProfileCard";
import Loader from "@/components/Loader";
import NftCard from "@/components/cards/NftCard";
import Head from "next/head";
import { useRouter } from "next/router";


export default function Home({ fetch_videos, fetch_gamers, fetch_all_nfts, setChainID, chainID, signer }) {

  const router = useRouter();
  const [videos, set_videos] = useState([]);
  const [gamers_data, set_gamers_data] = useState([]);
  const [nfts, set_nfts] = useState([]);

  const [videoLoading, setVideoLoading] = useState(false);
  const [gamerLoading, setGamerLoading] = useState(false);
  const [nftLoading, setNftLoading] = useState(false);

  const chainSwitchReload = async () => {
    try {
      setChainID();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const get_all_videos = async () => {
    setVideoLoading(true);
    const data = await fetch_videos();
    set_videos(data);
    setVideoLoading(false);
  };

  const get_gamers = async () => {
    setGamerLoading(true);
    const res = await fetch_gamers();
    set_gamers_data(res);
    setGamerLoading(false);
  };

  const fetch_nfts = async () => {
    setNftLoading(true);
    const nfts = await fetch_all_nfts();
    set_nfts(nfts);
    setNftLoading(false);
  };

  // switch chain
  const switchThetaChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x16d" }],
      });
      chainSwitchReload();
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x16d",
                chainName: "Theta",
                nativeCurrency: {
                  name: "Theta",
                  symbol: "TFUEL",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://testnet-explorer.thetatoken.org/"],
                rpcUrls: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],
              },
            ],
          });
          chainSwitchReload();
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  useEffect(() => {
    get_all_videos();
    get_gamers();
    fetch_nfts();
  }, []);

  return (
    <>
      <Head>
        <title>GamerX - A platform for gamers</title>
        <meta
          name="description"
          content="GamerX is a platform for gamers to share their content, launch their NFT collections, find gaming jobs, and a lot more stuff at one place"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* hero section  */}
      <section className="relative slider__area slider__bg" id="HeroMain">

        {chainID != 365 && signer &&
          <div className="absolute top-[100px] bg-[#198754] w-[100%] py-[5px]">
            <h3 style={{ textTransform: "none", textAlign: "center", fontSize: "19px" }}>Currently we only support Theta Network, <span onClick={() => switchThetaChain()} style={{ cursor: "pointer", color: "#040608", fontWeight: "bolder" }}>Click here</span> to switch for Theta Testnet</h3>
          </div>
        }

        <div className="slider-activee">
          <div className="single-slider">
            <div className="container custom-container">
              <div className="row justify-content-between">
                <div className="col-lg-6">
                  <div className="slider__content">
                    <h6 className="sub-title">Gamerx.Space</h6>
                    <h2 className="title">Here Gamers Live!!</h2>
                    <p style={{ fontSize: "15px" }}>
                      Connect with other gamers 🎮 <br /> Launch your NFT
                      Collections on Theta 🎨 <br />
                      Get incentivize for sharing your gaming content 💰
                    </p>
                    <div className="slider__btn">
                      <Link
                        href="/content/uploadVideo"
                        className="tg-btn-1"
                        style={{ textDecoration: "none" }}
                      >
                        <span>Get Started</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-5 col-lg-6">
                  <div className="slider__img text-center">
                    <Image
                      src="../../hero1.png"
                      height={100}
                      width={100}
                      className="h-[100%] w-auto"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slider__shapes">
          <Image src={coin1} alt="shape" />
          <Image src={coin2} alt="shape" />
          <Image src={coin3} alt="shape" />
          <Image src={coin4} alt="shape" />
        </div>
        <div className="container custom-container">
          <ul className="slider__brand-list list-wrap">
            <li className="customPowered">
              <h2 style={{ fontSize: "12px" }}>Powered By</h2>
              <Link
                href="https://thetatoken.org/"
                target="_blank"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={thetalogo}
                  style={{
                    height: "23px",
                    width: "25px",
                  }}
                  alt="brand"
                />
                <Image
                  src={thetaText}
                  style={{
                    height: "38px",
                    width: "110px",
                    filter: "invert(1)",
                  }}
                  alt="brand"
                />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* videos section  */}
      <section
        className="nft-item__area relative"
        id="videoBack"
        style={{ overflow: "hidden" }}
      >
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-10">
            <div className="section__title text-center mb-60">
              <span className="text-green-500">Top Gamers</span>
              <h3 className="title">Trending Videos</h3>
            </div>
          </div>
        </div>
        <div className="container custom-container">
          <div className="row justify-content-center">
            {/* loop videos here  */}
            {videoLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-wrap justify-around align-middle">
                {videos.map((e, index) => {
                  return (
                    index < 6 && (
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
                  );
                })}
                {videos?.length <= 0 && (
                  <p style={{ marginBottom: "32px", fontSize: "20px" }}>
                    No Video Content Found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* shape divider  */}
        <div className="custom-shape-divider-bottom-1681979696">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <rect x="1200" height="3.6"></rect>
            <rect height="3.6"></rect>
            <path
              d="M0,0V3.6H580.08c11,0,19.92,5.09,19.92,13.2,0-8.14,8.88-13.2,19.92-13.2H1200V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* Gamers section  */}
      <section
        className="team__area team-bg section-pt-130 section-pb-100 relative"
        id="gamersBack"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10">
              <div className="section__title text-center mb-60">
                <span className="text-green-500">Influencers</span>
                <h3 className="title">Top Gamers</h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* loop here  */}
            {gamerLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-wrap justify-around align-middle">
                {gamers_data.map(
                  (e, index) =>
                    // index < 6 &&
                    e.data.cover_image &&
                    e.data.profile_image && (
                      <ProfileCard
                        key={index}
                        coverImage={e.data.cover_image}
                        gamerBio={e.data.bio}
                        gamerID={e.data.id}
                        gamerName={e.data.username}
                        profileImage={e.data.profile_image}
                      />
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1681980015">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* nft section  */}
      <section className="trendingNft-area section-pt-120 section-pb-90">
        <div className="container">
          <div className="trendingNft__title-wrap">
            <div className="row">
              <div className="col-md-7">
                <div className="trendingNft__title">
                  <h2 className="title">
                    top Trending NFTs
                    <Image
                      src="../../fire.png"
                      width={35}
                      height={35}
                      alt="icon"
                    />
                  </h2>
                </div>
              </div>
              <div className="col-md-5">
                <div className="trendingNft__nav">
                  <button
                    className="slider-button-prev"
                    tabIndex="0"
                    aria-label="Previous slide"
                    aria-controls="swiper-wrapper-78bfcf17c01752af"
                    fdprocessedid="b9aoy"
                  >
                    <i className="fas fa-angle-left"></i>
                  </button>
                  <button
                    className="slider-button-next"
                    tabIndex="0"
                    aria-label="Next slide"
                    aria-controls="swiper-wrapper-78bfcf17c01752af"
                    fdprocessedid="4802g5"
                  >
                    <i className="fas fa-angle-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {nftLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap justify-around align-middle">
              {/* loop here  */}
              {nfts?.map(
                (e, index) =>
                  index < 6 && (
                    <NftCard
                      nftDesc={e.ipfsData.description}
                      nftImage={e.ipfsData.image}
                      nftName={e.ipfsData.title}
                      nftCollection={e.ipfsData.collection_address}
                      nftID={e.tokenId}
                      nftPrice={e.listingPrice}
                      isListed={e.isListed}
                      key={index}
                    />
                  )
              )}
              {nfts?.length <= 0 && (
                <p style={{ marginTop: "52px", fontSize: "20px" }}>
                  No NFTs Found
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* roadmap  */}
      <section
        className="roadMap__area roadMap-bg section-pt-150 section-pb-150 relative"
        id="roadmapBack"
      >
        <div className="custom-shape-divider-top-1681981826">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="roadMap__inner">
                <div className="row">
                  <div className="col-xl-5 col-lg-6">
                    <div className="roadMap__content">
                      <h2 className="title">a look into our roadmap</h2>
                      <p>Our development roadmap from the very beginning...</p>
                      <a
                        href="/about"
                        className="tg-btn-1"
                        style={{ textDecoration: "none", marginBottom: "33px" }}
                      >
                        <span>About Us</span>
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-6">
                    <div className="roadMap__steps-wrap">
                      <div className="roadMap__steps-item active">
                        <h3 className="title">Q2 2023</h3>
                        <ul className="roadMap__list list-wrap">
                          <li className="text-gray-400 ready style2 active">
                            Started GamerX Development at Theta Hack 2023
                          </li>
                          <li className="text-gray-400 ready style2 active">
                            Introduced Live stream feature
                          </li>
                          <li className="text-gray-400 ready style2 active">
                            Introduced create NFT collections feature
                          </li>
                          <li className="text-gray-400 ready style2">
                            Introduce create gaming job feature
                          </li>
                        </ul>
                      </div>
                      <div className="roadMap__steps-item">
                        <h3 className="title">Q3 2023</h3>
                        <ul className="roadMap__list list-wrap">
                          <li className="text-gray-400 ready style2">
                            Introduce buy and sell gaming accounts feature
                          </li>
                          <li className="text-gray-400 ready style2">
                            Introduce organise tournaments feature
                          </li>
                          <li className="text-gray-400 ready style2">
                            Mainnet Deployment on Theta Chain
                          </li>
                          <li className="text-gray-400 ready style2">
                            Coming Soon..
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1681981240">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
    </>
  );
}
