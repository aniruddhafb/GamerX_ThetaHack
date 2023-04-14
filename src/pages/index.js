import Image from 'next/image'
import Link from 'next/link'

import coin1 from "../../public/slider_shape01.png"
import coin2 from "../../public/slider_shape02.png"
import coin3 from "../../public/slider_shape03.png"
import coin4 from "../../public/slider_shape04.png"
import heroLogo from "../../public/favicon.png"
import thetalogo from "../../public/theta.webp"

export default function Home() {
  return (
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
  )
}
