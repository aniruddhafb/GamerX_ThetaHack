import Image from 'next/image'
import React from 'react'
import { MdVerified } from 'react-icons/md'

const CollectionCard = ({ collectionCover, collectionProfile, collectionName, collectionCreator, isVerified = true }) => {
    return (
        <div className="trendingNft__item">
            <div className="trendingNft__item-image relative">
                <a href="#">
                    <Image
                        src={collectionCover?.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        height={100}
                        width={100}
                        className='h-[130px] mt-[60px]'
                        alt="img" />
                </a>
                <div>
                    <a href="#" className='absolute bottom-[-35px] right-[35%]'>
                        <Image
                            src={collectionProfile?.replace(
                                "ipfs://",
                                "https://gateway.ipfscdn.io/ipfs/"
                            )}
                            height={100}
                            width={100}
                            className=' h-[75px] w-[75px] border border-gray-500'
                            style={{ borderRadius: "50%" }}
                            alt="img" />
                    </a>
                    {isVerified ?
                        <MdVerified style={{ color: "#4f87ff", cursor: "pointer" }} className='absolute bottom-[-40px] right-[90px]' size={22} />
                        :
                        <BsFillExclamationCircleFill
                            style={{ color: "#cfc62d", cursor: "pointer" }}
                            className='absolute bottom-[-40px] right-[90px]'
                            size={22}
                        />
                    }
                </div>
            </div>
            <div className="trendingNft__item-bottom mt-[36px]">
                <div className="trendingNft__item-price">
                    <h6 className="eth"> {collectionName}</h6>
                    <span className="bid text-gray-400 mt-2">By <Link href={`/profile/${collectionCreator}`} className='text-green-500' style={{ textDecoration: "none" }}>
                        {collectionCreator.slice(0, 5) +
                            "..." +
                            collectionCreator.slice(38)}
                    </Link></span>
                </div>
            </div>
        </div>
    )
}

export default CollectionCard