import Image from 'next/image'
import Link from 'next/link'
import VideoCard from '@/components/cards/videoCard'

import coin1 from "../../public/slider_shape01.png"
import coin2 from "../../public/slider_shape02.png"
import coin3 from "../../public/slider_shape03.png"
import coin4 from "../../public/slider_shape04.png"

import teamPNG from "../../public/team02.png"
import heroLogo from "../../public/favicon.png"
import thetalogo from "../../public/theta.webp"


export default function Home() {
  return (
    <>
      {/* hero section  */}
      <section className="slider__area slider__bg" id='HeroMain'>
        <div className="slider-activee">
          <div className="single-slider">
            <div className="container custom-container">
              <div className="row justify-content-between">
                <div className="col-lg-6">
                  <div className="slider__content">
                    <h6 className="sub-title">
                      Gamerx.Space</h6>
                    <h2 className="title">
                      Here Gamers Live!!</h2>
                    <p style={{ fontSize: "15px" }}>
                      A platform for gamers</p>
                    <div className="slider__btn">
                      <Link href="#"
                        className="tg-btn-1" style={{ textDecoration: "none" }}><span>Get Started</span></Link>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-5 col-lg-6">
                  <div className="slider__img text-center">
                    <Image src={heroLogo} alt="img" />
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
        <div className="slider__brand-wrap">
          <div className="container custom-container">
            <ul className="slider__brand-list list-wrap">
              <li style={{ marginTop: "30px" }}>
                <h2 style={{ fontSize: "12px" }}>Powered By</h2>
                <Link href="#">
                  <Image
                    src={thetalogo}
                    style={{ height: "23px", width: "120px", filter: "invert(1)" }}
                    alt="brand" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* videos section  */}
      <section className="nft-item__area relative" id='videoBack' style={{ overflow: "hidden" }}>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-10">
            <div className="section__title text-center mb-60">
              <span className='text-green-500'>Top Gamers</span>
              <h3 className="title">Trending Videos</h3>
            </div>
          </div>
        </div>
        <div className="container custom-container">
          <div className="row justify-content-center">
            {/* loop videos here  */}
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9">
              <div className="nft-item__box" style={{ backgroundColor: "transparent" }}>
                <div className="nft-item__content">
                  <Link href="/content/videos" style={{ textDecoration: "none", position: "relative", zIndex: "10" }}>
                    <Image
                      className='w-[100%] h-[200px] rounded-md'
                      src="../../../nft_img01.jpg"
                      height={100}
                      width={100}
                      alt="img" />
                    <div className='absolute top-[30%] right-[46%]'>
                      <i className="flaticon-play text-white text-4xl hover:text-green-500"></i>
                    </div>
                    <h4 className="title mt-4">
                      wolf gaming is a perfect gameplay and on so..
                    </h4>
                  </Link>

                  <div className="nft-item__avatar">
                    <div className="avatar-img" style={{ zIndex: "11" }}>
                      <Link href="#">
                        <Image
                          src="../../../nft_avatar01.png"
                          height={100}
                          width={100}
                          className='h-[30px] w-[30px]'
                          alt="img" />
                      </Link>
                    </div>
                    <div className="avatar-name">
                      <h5 className="name" style={{ zIndex: "11" }}>
                        <Link href="#" style={{ textDecoration: "none", fontSize: "15px" }}>
                          Alax Max
                        </Link>
                      </h5>
                      <span className="designation">4/12/2023</span>
                      <span className="designation">No views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <VideoCard /> */}
          </div>
        </div>

        {/* shape divider  */}
        <div className="custom-shape-divider-bottom-1681979696">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <rect x="1200" height="3.6"></rect>
            <rect height="3.6"></rect>
            <path d="M0,0V3.6H580.08c11,0,19.92,5.09,19.92,13.2,0-8.14,8.88-13.2,19.92-13.2H1200V0Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Gamers section  */}
      <section className="team__area team-bg section-pt-130 section-pb-100 relative" id='gamersBack' >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10">
              <div className="section__title text-center mb-60">
                <span className='text-green-500'>Influencers</span>
                <h3 className="title">Top Gamers</h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* loop here  */}
            <div className="col-xl-3 col-lg-4 col-sm-6 wow fadeInUp" >
              <div className="team__item relative">
                <div>
                  <Image
                    src="../../mask_img02.jpg" height={100} width={100} alt="img" className='absolute top-0 right-0 h-[110px] w-[100%]' />
                </div>

                <div className="team__thumb">
                  <Link href="#">
                    <Image
                      src={teamPNG} alt="img" className='ml-7 mt-4 h-[170px] w-[170px]' style={{ zIndex: "10", position: "relative" }} />
                  </Link>
                </div>

                <div className="team__content mt-[-13px] mr-3">
                  <h4 className="name">
                    <Link href="#" style={{ textDecoration: "none" }}>
                      killer
                      master</Link>
                  </h4>
                  <span className="designation" style={{ fontSize: "15px" }}>Blockchain Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1681980015">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
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
                      alt="icon" />
                  </h2>
                </div>
              </div>
              <div className="col-md-5">
                <div className="trendingNft__nav">
                  <button className="slider-button-prev" tabindex="0" aria-label="Previous slide"
                    aria-controls="swiper-wrapper-78bfcf17c01752af" fdprocessedid="b9aoy"><i
                      className="fas fa-angle-left"></i></button>
                  <button className="slider-button-next" tabindex="0" aria-label="Next slide"
                    aria-controls="swiper-wrapper-78bfcf17c01752af" fdprocessedid="4802g5"><i
                      className="fas fa-angle-right"></i></button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap justify-around align-middle'>
            {/* loop here  */}
            <div className="trendingNft__item">
              <div className="trendingNft__item-top">
                <div className="trendingNft__item-avatar">
                  <div className="image">
                    <a href="#">
                      <Image
                        src="../../nft_avatar01.png"
                        height={100}
                        width={100}
                        alt="img" />
                    </a>
                  </div>
                  <div className="info">
                    {/* full name  */}
                    <h6 className="name">Black Crypto</h6>
                    {/* username  */}
                    <a href="#"
                      className="userName">@Jon Max</a>
                  </div>
                </div>
                <div className="trendingNft__item-wish">
                  <a href="#!"><i
                    className="far fa-heart"></i></a>
                </div>
              </div>
              <div className="trendingNft__item-image">
                {/* nft image  */}
                <a href="#">
                  <Image
                    src="../../nftCard1.jpg"
                    height={100}
                    width={100}
                    alt="img" />
                </a>
              </div>
              <div className="trendingNft__item-bottom">
                <div className="trendingNft__item-price">
                  <span className="bid text-gray-400">Last Price</span>
                  <h6 className="eth"> 1.005 <span>TFUEL</span></h6>
                </div>
                <a href="#" className="bid-btn" style={{ textDecoration: "none" }}>Buy <i
                  className="fas fa-long-arrow-alt-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* roadmap  */}
      <section className="roadMap__area roadMap-bg section-pt-150 section-pb-150 relative" id='roadmapBack'>
        <div className="custom-shape-divider-top-1681981826">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
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
                      <p>Our future roadmap
                      </p>
                      <a href="#"
                        className="tg-btn-1" style={{ textDecoration: "none" }}><span>roadmap</span></a>
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-6">
                    <div className="roadMap__steps-wrap">
                      <div className="roadMap__steps-item active">
                        <h3 className="title">Q1 2023</h3>
                        <ul className="roadMap__list list-wrap">
                          <li className="text-gray-400 ready style2 active">Initial Development</li>
                        </ul>
                      </div>
                      <div className="roadMap__steps-item">
                        <h3 className="title">Q2 2023</h3>
                        <ul className="roadMap__list list-wrap">
                          <li className="text-gray-400 ready style2 active">Coming soon..</li>
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
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

    </>
  )
}
