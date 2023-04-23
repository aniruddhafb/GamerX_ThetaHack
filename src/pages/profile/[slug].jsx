import Image from "next/image";
import React, { useEffect, useState } from "react";
import heroLogo from "../../../public/favicon.png";
import { useRouter } from "next/router";
const GamerProfile = ({ get_gamer }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, set_data] = useState([]);
  const fetch_gamer = async () => {
    const res = await get_gamer(slug);
    console.log(res);
    set_data(res);
  };
  useEffect(() => {
    if (!slug) return;
    fetch_gamer();
  }, [slug]);
  return (
    <div id="pageBG">
      <section className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb__wrapper">
            <div className="row">
              <div className="col-xl-6 col-lg-7">
                <div className="breadcrumb__content">
                  <h2 className="title">{data.username}</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item active">Gamer</li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Influencer
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 position-relative d-none d-lg-block">
                <div className="breadcrumb__img">
                  <Image src={heroLogo} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team__info-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="team__info-wrap">
                <div className="team__info-discord">
                  <div className="team__info-item">
                    <div className="team__info-icon">
                      <Image src={heroLogo} alt="img" />
                    </div>
                    <div className="team__info-content">
                      <span className="sub">Real name</span>
                      <h5 className="title">{data.username}</h5>
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
                          <h5 className="title">Pubg Mobile</h5>
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

      <div className="w-[100%] h-[100%] flex justify-center align-middle py-4 cursor-pointer">
        <div className="flex px-12 py-1 border-2 border-transparent border-b-green-500">
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
        <div className="px-12 py-1 border-2 border-transparent hover:border-b-green-500">
          <h4>Videos</h4>
        </div>
        <div className="px-12 py-1 border-2 border-transparent hover:border-b-green-500">
          <h4>Live Streams</h4>
        </div>
        <div className="flex px-12 py-1 border-2 border-transparent hover:border-b-green-500">
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

      <div className="h-[400px] flex justify-center align-middle">
        <h3 className="mt-16">No NFTs Found!</h3>
      </div>
    </div>
  );
};

export default GamerProfile;
