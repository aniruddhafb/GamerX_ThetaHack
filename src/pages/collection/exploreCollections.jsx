import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const exploreCollections = () => {
    return (
        <section className="shop-area" id='pageBG'>
            <div className="container mt-12">
                <div className="row justify-content-center">
                    <div>
                        <div className="shop__top-wrap">
                            <div className="row align-items-center">
                                <div className="col-lg-8 col-sm-6">
                                    <div className="shop__showing-result">
                                        <p style={{ fontSize: "25px" }}>Explore NFT Collections</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                    <div className="shop__ordering">
                                        <select name="orderby" className="orderby" fdprocessedid="8pe1d8">
                                            <option value="Default sorting">Default sorting</option>
                                            <option value="Sort by popularity">Sort by popularity</option>
                                            <option value="Sort by average rating">Sort by average rating</option>
                                            <option value="Sort by latest">Sort by latest</option>
                                            <option value="Sort by latest">Sort by latest</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-around align-middle'>
                            {/* loop here  */}
                            <div className="trendingNft__item">
                                <div className="trendingNft__item-image relative">
                                    <a href="#">
                                        <Image
                                            src="../../nftCard1.jpg"
                                            height={100}
                                            width={100}
                                            className='h-[200px]'
                                            alt="img" />
                                    </a>
                                    <div className='absolute'>
                                        <a href="#">
                                            <Image
                                                src="../../nft_avatar01.png"
                                                height={100}
                                                width={100}
                                                alt="img" />
                                        </a>
                                    </div>
                                </div>
                                <div className="trendingNft__item-bottom">
                                    <div className="trendingNft__item-price">
                                        <h6 className="eth"> GAMERX OFFICIAL COLLECTION</h6>
                                        <span className="bid text-gray-400 mt-2">By 0x4484</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default exploreCollections