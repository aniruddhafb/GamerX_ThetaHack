import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RiLiveFill } from 'react-icons/ri'

const LiveVideoCard = ({ liveID, thumbnail, liveTitle, ownerUsername, ownerProfileImg }) => {
    return (
        <Link
            href={`/content/live/${liveID}`}
            className="col-xxl-4 col-xl-5 col-lg-6 col-md-9"
            style={{ textDecoration: "none" }}>
            <div
                className="nft-item__box"
                style={{ backgroundColor: "transparent" }}
            >
                <div className="nft-item__content">
                    <div
                        style={{
                            textDecoration: "none",
                            position: "relative",
                            zIndex: "10",
                        }}
                    >
                        <Image
                            className="w-[100%] h-[200px] rounded-md"
                            src={thumbnail.replace(
                                "ipfs://",
                                "https://gateway.ipfscdn.io/ipfs/"
                            )}
                            height={100}
                            width={100}
                            alt="img"
                        />
                        <div className="absolute top-[30%] right-[46%]">
                            <i className="flaticon-play text-white text-4xl hover:text-green-500"></i>
                        </div>
                        <span className="flex text-red-400 mb-[-27px] mt-[12px]">
                            <RiLiveFill className="mt-[6px]" />
                            <p className="ml-1 mt-[4px] text-[13px]">Live Now</p>
                        </span>
                        <h4 className="title mt-4">{liveTitle}</h4>
                    </div>

                    <div className="nft-item__avatar">
                        <div className="avatar-img" style={{ zIndex: "11" }}>
                            <Link href="#">
                                <Image
                                    src={ownerProfileImg.replace(
                                        "ipfs://",
                                        "https://gateway.ipfscdn.io/ipfs/"
                                    )}
                                    height={100}
                                    width={100}
                                    className="h-[30px] w-[30px]"
                                    alt="img"
                                />
                            </Link>
                        </div>
                        <div className="avatar-name">
                            <h5 className="name" style={{ zIndex: "11" }}>
                                <Link
                                    href="#"
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "15px",
                                    }}
                                >
                                    {ownerUsername}
                                </Link>
                            </h5>

                            <span className="designation">0 Watching</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LiveVideoCard