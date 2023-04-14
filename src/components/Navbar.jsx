import React from "react";
import gamerXlogo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ connect_wallet }) => {
    return (
        <header>
            <div
                id="sticky-header"
                className="tg-header__area transparent-header"
                style={{ backgroundColor: "#182029" }}
            >
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mobile-nav-toggler">
                                <i className="fas fa-bars"></i>
                            </div>
                            <div className="tgmenu__wrap">
                                <nav className="tgmenu__nav">
                                    <div className="logo">
                                        <Link href="/">
                                            <Image src={gamerXlogo} alt="Logo" />
                                        </Link>
                                    </div>
                                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                        <ul className="navigation">
                                            <li>
                                                <Link href="/" style={{ textDecoration: "none" }}>
                                                    Home
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/about" style={{ textDecoration: "none" }}>
                                                    About us
                                                </Link>
                                            </li>
                                            <li className="menu-item-has-children">
                                                <Link href="#" style={{ textDecoration: "none" }}>
                                                    Other Pages
                                                </Link>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/topGamers">Gamers</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/topNFTs">All NFTs</Link>
                                                    </li>
                                                </ul>
                                                <div className="dropdown-btn">
                                                    <span className="plus-line"></span>
                                                </div>
                                            </li>
                                            <li className="menu-item-has-children">
                                                <Link href="#" style={{ textDecoration: "none" }}>
                                                    Create
                                                </Link>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/uploadVideo">Upload Video</Link>
                                                    </li>
                                                </ul>
                                                <div className="dropdown-btn">
                                                    <span className="plus-line"></span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tgmenu__action d-none d-md-block">
                                        <ul className="list-wrap">
                                            <li className="header-btn">
                                                <div onClick={connect_wallet} className="tg-border-btn">
                                                    Connect Wallet
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                        <ul className="navigation">
                                            <li className="menu-item-has-children"><Link
                                                href="#" style={{ textDecoration: "none" }}>Profile</Link>
                                                <ul className="sub-menu" style={{ overflow: "hidden" }}>
                                                    <li>
                                                        <a href="#" class="flex items-center text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                                            <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar" />
                                                            <div class="mx-1">
                                                                <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200">Jane Doe</h1>
                                                                <p class="text-sm text-gray-500 dark:text-gray-400">janedoe@exampl.com</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li><Link href="/profile">View Profile</Link>
                                                    </li>
                                                </ul>
                                                <div className="dropdown-btn"><span className="plus-line"></span></div>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>

                            {/* <!-- Mobile Menu  --> */}
                            <div className="tgmobile__menu">
                                <nav className="tgmobile__menu-box">
                                    <div className="close-btn">
                                        <i className="flaticon-swords-in-cross-arrangement"></i>
                                    </div>
                                    <div className="nav-logo">
                                        <Link href="index.html">
                                            <img src="logo.png" alt="Logo" />
                                        </Link>
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
                                            <li>
                                                <Link href="#">Home</Link>
                                            </li>
                                            <li>
                                                <Link href="#">ABOUT US</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="social-links">
                                        <ul className="list-wrap">
                                            <li>
                                                <Link href="#">
                                                    <i className="fab fa-twitter"></i>
                                                </Link>
                                            </li>
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
    );
};

export default Navbar;
