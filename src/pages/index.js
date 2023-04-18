import Image from 'next/image'
import Link from 'next/link'

import coin1 from "../../public/slider_shape01.png"
import coin2 from "../../public/slider_shape02.png"
import coin3 from "../../public/slider_shape03.png"
import coin4 from "../../public/slider_shape04.png"
import NFTImage from "../../public/nft_img01.jpg"
import NFTImage2 from "../../public/nft_avatar01.png"
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
      <section className="nft-item__area" style={{ overflow: "hidden" }}>
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
                  <Link href="/content/videos" style={{ textDecoration: "none" }}>
                    <Image
                      className='w-[100%] h-[200px] rounded-md'
                      src={NFTImage}
                      alt="img" />
                    <h4 className="title mt-4">
                      wolf gaming
                      art
                    </h4>
                  </Link>

                  <div className="nft-item__avatar">
                    <div className="avatar-img">
                      <Link href="#">
                        <Image
                          src={NFTImage2}
                          className='h-[30px] w-[30px]'
                          alt="img" />
                      </Link>
                    </div>
                    <div className="avatar-name">
                      <h5 className="name">
                        <Link href="#" style={{ textDecoration: "none", fontSize: "15px" }}>
                          Alax Max
                        </Link>
                      </h5>
                      <span className="designation">Creator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamers section  */}
      <section className="team__area team-bg section-pt-130 section-pb-100" id='gamersBack' >
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
            <div className="col-xl-3 col-lg-4 col-sm-6 wow fadeInUp" >
              <div className="team__item">
                <div className="team__thumb">
                  <Link href="#">
                    <Image
                      src={teamPNG} alt="img" />
                  </Link>
                </div>
                <div className="team__content">
                  <h4 className="name">
                    <Link href="#" style={{ textDecoration: "none" }}>
                      killer
                      master</Link>
                  </h4>
                  <span className="designation">Blockchain Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
