import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import gamerXlogo from "../../public/logo.png"


const Footer = () => {
    return (
        <footer className="footer-style-one" style={{ backgroundColor: "#0F161B" }}>
            <div className="footer__top-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5 col-md-7">
                            <div className="footer-widget">
                                <div className="footer-logo logo">
                                    <Link href="#"><Image
                                        src={gamerXlogo} alt="Logo" /></Link>
                                </div>
                                <div className="footer-text">
                                    <p className="desc">An ultimate platform for gamers and influencers</p>
                                    <p className="social-title">Grow <span>With Us <i
                                        className="fas fa-angle-double-right"></i></span></p>
                                    <div className="footer-social">
                                        <a href="https://github.com/aniruddhafb/GamerX_ThetaHack" target='_blank'>
                                            <svg
                                                className="h-5 w-5 fill-white hover:fill-green-400"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                            </svg>
                                        </a>
                                        <a href="https://github.com/aniruddhafb/GamerX_ThetaHack" target='_blank'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 fill-white hover:fill-green-400"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-5 col-sm-6">
                            <div className="footer-widget widget_nav_menu">
                                <h4 className="fw-title">Quick Links</h4>
                                <ul className="list-wrap menu">
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Top Gamers</Link></li>
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Trade NFTs</Link></li>
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Watch Livestreams</Link></li>
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Explore Content</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-5 col-sm-6">
                            <div className="footer-widget widget_nav_menu">
                                <h4 className="fw-title">Other</h4>
                                <ul className="list-wrap menu">
                                    <li><Link href="#" style={{ textDecoration: "none" }}>About Us</Link></li>
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Help</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-5 col-md-7">
                            <div class="footer-widget">
                                <h4 class="fw-title">Newsletter</h4>
                                <div class="footer-newsletter">
                                    <p>Subscribe to our newsletter to get latest updates on GamerX</p>
                                    <form action="#"
                                        class="footer-newsletter-form">
                                        <input type="email" placeholder="Your email address" />
                                        <button type="submit"><i class="flaticon-paper-plane"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright__wrap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <div className="copyright__text">
                                <p>Copyright © 2023 - All Rights Reserved By <span>GamerX</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer