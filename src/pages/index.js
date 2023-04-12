import Image from 'next/image'

import coin1 from "../../public/slider_shape01.png"
import coin2 from "../../public/slider_shape02.png"
import coin3 from "../../public/slider_shape03.png"
import coin4 from "../../public/slider_shape04.png"
import heroLogo from "../../public/favicon.png"
import thetalogo from "../../public/theta.webp"

export default function Home() {
  return (
    <section class="slider__area slider__bg" id='HeroMain'>
      <div class="slider-activee">
        <div class="single-slider">
          <div class="container custom-container">
            <div class="row justify-content-between">
              <div class="col-lg-6">
                <div class="slider__content">
                  <h6 class="sub-title wow"
                    style={{ visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp" }}>
                    live gaming</h6>
                  {/* <h2 class="title wow"
                    style={{ visibility: "visible", animationDelay: "0.5s", animationName: "fadeInUp" }}>
                    Platform</h2> */}
                  <p class="wow"
                    style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInUp" }}>
                    A platform for gamers</p>
                  <div class="slider__btn"
                    style={{ visibility: "visible", animationDelay: "1.2s", animationName: "fadeInUp" }}>
                    <a href="#"
                      class="tg-btn-1"><span>Get Started</span></a>
                  </div>
                </div>
              </div>
              <div class="col-xxl-6 col-xl-5 col-lg-6">
                <div class="slider__img text-center">
                  <Image src={heroLogo} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="slider__shapes">
        <Image src={coin1} alt="shape" />
        <Image src={coin2} alt="shape" />
        <Image src={coin3} alt="shape" />
        <Image src={coin4} alt="shape" />
      </div>
      <div class="slider__brand-wrap">
        <div class="container custom-container">
          <ul class="slider__brand-list list-wrap">
            <li>
              <h2 style={{ fontSize: "15px" }}>Powered By</h2>
              <a href="#">
                <Image
                  src={thetalogo}
                  style={{ height: "30px", width: "160px" }}
                  alt="brand" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
