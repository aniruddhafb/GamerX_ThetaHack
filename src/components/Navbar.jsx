import React from 'react'
import gamerXlogo from "../../public/logo.png"
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <header>
            <div id="sticky-header" className="tg-header__area transparent-header" style={{ backgroundColor: "#182029" }}>
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                            <div className="tgmenu__wrap">
                                <nav className="tgmenu__nav">
                                    <div className="logo">
                                        <Link href="/"><Image
                                            src={gamerXlogo}
                                            alt="Logo" /></Link>
                                    </div>
                                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                        <ul className="navigation">
                                            <li><Link href="about-us.html" style={{ textDecoration: "none" }}>Home</Link></li>
                                            <li><Link href="about-us.html" style={{ textDecoration: "none" }}>About us</Link></li>
                                            <li className="menu-item-has-children"><Link
                                                href="#" style={{ textDecoration: "none" }}>Other Pages</Link>
                                                <ul className="sub-menu">
                                                    <li><Link
                                                        href="tournament.html">Gamers</Link>
                                                    </li>
                                                    <li><Link href="tournament-details.html">All NFTs</Link></li>
                                                </ul>
                                                <div className="dropdown-btn"><span className="plus-line"></span></div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tgmenu__action d-none d-md-block">
                                        <ul className="list-wrap">
                                            <li className="header-btn">
                                                <Link href="contact.html"
                                                    className="tg-border-btn">
                                                    Connect Wallet
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                </nav>
                            </div>

                            {/* <!-- Mobile Menu  --> */}
                            <div className="tgmobile__menu">
                                <nav className="tgmobile__menu-box">
                                    <div className="close-btn"><i className="flaticon-swords-in-cross-arrangement"></i></div>
                                    <div className="nav-logo">
                                        <Link href="index.html">
                                            <img src="logo.png"
                                                alt="Logo" /></Link>
                                    </div>
                                    {/* <div className="tgmobile__search">
                                        <form action="#">
                                            <input type="text" placeholder="Search here..." />
                                            <button><i className="flaticon-loupe"></i></button>
                                        </form>
                                    </div> */}
                                    <div className="tgmobile__menu-outer">
                                        {/* popup menu */}

                                        <ul className="navigation">
                                            <li><Link href="#">Home</Link></li>
                                            <li><Link href="#">ABOUT US</Link></li>
                                        </ul>
                                    </div>
                                    <div className="social-links">
                                        <ul className="list-wrap">
                                            <li><Link href="#"><i
                                                className="fab fa-twitter"></i></Link></li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div className="tgmobile__menu-backdrop"></div>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Navbar