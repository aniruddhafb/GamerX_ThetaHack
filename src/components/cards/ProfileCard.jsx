import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileCard = ({ gamerID, coverImage, profileImage, gamerName, gamerBio }) => {
    return (
        <Link
            className="team__item relative"
            href={`/profile/${gamerID}`}
            style={{ textDecoration: "none", margin: "25px" }}
        >
            <div>
                <Image
                    src={coverImage?.replace(
                        "ipfs://",
                        "https://gateway.ipfscdn.io/ipfs/"
                    )}
                    height={100}
                    width={100}
                    alt="img"
                    className="absolute top-0 right-0 h-[110px] w-[100%]"
                />
            </div>

            <div className="team__thumb">
                <Link href={`/profile/${gamerID}`}>
                    <Image
                        src={profileImage?.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        height={100}
                        width={100}
                        alt="img"
                        className="ml-12 mt-4 h-[120px] w-[120px]"
                        style={{ zIndex: "10", position: "relative" }}
                    />
                </Link>
            </div>

            <div className="team__content mt-[-13px] mr-3">
                <h4 className="name">
                    <Link href={`/profile/${gamerID}`} style={{ textDecoration: "none" }}>
                        {gamerName}
                    </Link>
                </h4>
                <span
                    className="designation"
                    style={{ fontSize: "15px" }}
                >
                    {gamerBio}
                </span>
            </div>
        </Link>
    )
}

export default ProfileCard