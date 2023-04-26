import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NftCard = ({ nftName, nftImage, nftDesc, isListed, nftPrice, nftCollection, nftID }) => {
    return (
        <div className="trendingNft__item">
            <div className="trendingNft__item-image mt-4">
                <Link href={`/nfts/${nftCollection}/${nftID}`}>
                    <Image
                        src={nftImage?.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        height={100}
                        width={100}
                        className='h-[200px] w-[auto]'
                        alt="img" />
                </Link>
                <div className="trendingNft__item-top mt-2">
                    <div className="trendingNft__item-avatar">
                        <div className="info">
                            <h6 className="name mt-2 mb-2" style={{ fontSize: "20px" }}>{nftName}</h6>
                            <span className="userName"
                                style={{
                                    width: "280px",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    textDecoration: "none"
                                }}>
                                {nftDesc}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="trendingNft__item-bottom mt-[-10px]">
                <div className="trendingNft__item-price">
                    <span className="bid text-gray-400">Last Price</span>
                    {isListed ?
                        <h6 className="eth"> {nftPrice} <span>TFUEL</span></h6>
                        :
                        <h6 className="eth">Not Listed</h6>
                    }
                </div>
                {isListed ?
                    <Link href={`/nfts/${nftCollection}/${nftID}`} className="bid-btn" style={{ textDecoration: "none" }}>Buy <i
                        className="fas fa-long-arrow-alt-right"></i></Link>
                    :
                    <Link href={`/nfts/${nftCollection}/${nftID}`} className="bid-btn" style={{ textDecoration: "none" }}>View <i
                        className="fas fa-long-arrow-alt-right"></i></Link>
                }
            </div>
        </div>
    )
}

export default NftCard