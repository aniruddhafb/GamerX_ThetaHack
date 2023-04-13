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
                                        <Link href="#"></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-xl-2 col-lg-3 col-md-5 col-sm-6">
                            <div className="footer-widget widget_nav_menu">
                                <h4 className="fw-title">Quick Links</h4>
                                <ul className="list-wrap menu">
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Gamers</Link></li>
                                    <li><Link href="#" style={{ textDecoration: "none" }}>All NFTs</Link></li>
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Social Network</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-5 col-sm-6">
                            <div className="footer-widget widget_nav_menu">
                                <h4 className="fw-title">Other</h4>
                                <ul className="list-wrap menu">
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Setting &amp; Privacy</Link></li>
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Help &amp; Support</Link></li>
                                    <li><Link href="#" style={{ textDecoration: "none" }}>Live Auctions</Link></li>
                                </ul>
                            </div>
                        </div> */}
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