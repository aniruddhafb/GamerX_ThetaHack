import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const VideoCard = ({ thumbnail, title, creatorName, creatorImage, videoDate, videoID }) => {
    return (
        <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9">
            <div className="nft-item__box" style={{ backgroundColor: "transparent" }}>
                <div className="nft-item__content">
                    <Link href={`/content/videos/${videoID}`} style={{ textDecoration: "none", position: "relative", zIndex: "10" }}>
                        <Image
                            className='w-[100%] h-[200px] rounded-md'
                            src={thumbnail}
                            alt="img" />
                        <div className='absolute top-[30%] right-[46%]'>
                            <i className="flaticon-play text-white text-4xl hover:text-green-500"></i>
                        </div>
                        <h4 className="title mt-4">
                            {title}
                        </h4>
                    </Link>

                    <div className="nft-item__avatar">
                        <div className="avatar-img" style={{ zIndex: "11" }}>
                            <Link href="#">
                                <Image
                                    src={creatorImage}
                                    className='h-[30px] w-[30px]'
                                    alt="img" />
                            </Link>
                        </div>
                        <div className="avatar-name">
                            <h5 className="name" style={{ zIndex: "11" }}>
                                <Link href="#" style={{ textDecoration: "none", fontSize: "15px" }}>
                                    {creatorName}
                                </Link>
                            </h5>
                            <span className="designation">{videoDate}</span>
                            <span className="designation">No views</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard