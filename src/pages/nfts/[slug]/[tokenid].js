import Image from "next/image";
import React, { useState } from "react";

const nftPage = () => {
    const [props, showProps] = useState(true);
    const [otherInfo, showOtherInfo] = useState(false);

    return (
        <section className="shop-area shop-details-area" id="pageBG">
            <div className="container">
                <div className="flex flex-wrap pt-30">
                    <div className="shop__details-images-wrap">
                        <div className="tab-content" style={{ width: "90%" }}>
                            <div className="tab-pane show active">
                                <Image src="../../nftCard1.jpg" height={100} width={100} alt="img" style={{ width: "100%" }} />
                            </div>
                        </div>
                    </div>
                    <div className="shop__details-content">
                        <h2 className="title">game controller</h2>

                        <div className="shop__details-short-description">
                            <p>
                                Lorem ipsum dolor sit amet, consteur adipiscing Duis elementum
                                solliciin is yaugue euismods Nulla ullaorper.
                            </p>
                        </div>
                        <div className="shop__details-model d-flex align-items-center">
                            <p className="model m-0">Tags:</p>
                            <ul className="list-wrap d-flex align-items-center">
                                <li className="active">Esports</li>
                            </ul>
                        </div>
                        <div className="trendingNft__item-avatar mb-4">
                            {/* owner  */}
                            <div className="image">
                                <a href="#">
                                    <img
                                        src="../../nft_avatar01.png"
                                        alt="img" />
                                </a>
                            </div>
                            <div className="info">
                                <h6 className="name">Owner</h6>
                                <a href="#"
                                    className="userName">0x49393334454555</a>
                            </div>

                            {/* creator  */}
                            <div className="phoneGayab image ml-10">
                                <a href="#">
                                    <img
                                        src="../../nft_avatar01.png"
                                        alt="img" />
                                </a>
                            </div>
                            <div className="phoneGayab info">
                                <h6 className="name">Creator</h6>
                                <a href="#"
                                    className="userName">0x49393334454555</a>
                            </div>
                        </div>
                        <div className="shop__details-qty">
                            <div className="shop__details-price">
                                <span className="amount">
                                    106 <span className="stock-status">TFUEL</span>
                                </span>
                            </div>
                            <div className="cart-plus-minus d-flex flex-wrap align-items-center">
                                <button
                                    className="shop__details-cart-btn"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                        <div className="shop__details-bottom">
                            <div className="product_share">
                                <b>Share :</b>
                                <a href="#">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="product__desc-wrap">
                            <ul className="nav nav-tabs" id="descriptionTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    {props ?
                                        <button className="nav-link active" style={{ backgroundColor: "#1b242e", border: "1px solid #22292f", color: "#45f882" }}>
                                            Properties
                                        </button>
                                        :
                                        <button className="nav-link" onClick={() => (showOtherInfo(false), showProps(true))}>
                                            Properties
                                        </button>
                                    }
                                </li>
                                <li className="nav-item" role="presentation">
                                    {otherInfo ?
                                        <button className="nav-link active" style={{ backgroundColor: "#1b242e", border: "1px solid #22292f", color: "#45f882" }}>
                                            Other Information
                                        </button>
                                        :
                                        <button className="nav-link" onClick={() => (showProps(false), showOtherInfo(true))}>
                                            Other Information
                                        </button>
                                    }
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className={`tab-pane ${props && "active"}`}>
                                    <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
                                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                                            <a
                                                style={{ textDecoration: "none" }}
                                                className="imageBck flex flex-col rounded-lg p-3 py-4 text-center transition-shadow hover:shadow-xl"
                                            >
                                                <span className="text-sm uppercase text-accent">
                                                    Background
                                                </span>
                                                <span className="text-base text-jacarta-700 dark:text-white pt-[5px]">
                                                    pinkish
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane ${otherInfo && "active"}`}>
                                    <table className="table table-sm">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Contract Address</th>
                                                <td>0X3940dd</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Token ID</th>
                                                <td>2</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Token Standard</th>
                                                <td>ERC-721</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Blockchain</th>
                                                <td>Theta</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default nftPage;