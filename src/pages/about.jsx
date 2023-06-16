import React from 'react'
import Image from 'next/image'

import mask1 from "../../public/mask_img01.jpg"
import mask2 from "../../public/mask_img02.jpg"

import push from "../../public/tech/push.png"
import superfluid from "../../public/tech/superfluid.png"
import lens from "../../public/tech/lens.jpg"
import theta from "../../public/tech/theta.png"
import polybase from "../../public/tech/polybase.jpeg"

import ani from "../../public/ani.jpg"
import shravan from "../../public/srhavan.jpeg"
import Link from 'next/link'
import Head from 'next/head'

const about = () => {
    return (
        <>
            <Head>
                <title>About - GamerX</title>
                <meta
                    name="description"
                    content="About GamerX"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {/* intro  */}
            <section className="about__area-three section-pt-130 section-pb-130 ">
                <div className="container mt-12">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-10">
                            <div className="section__title text-center mb-60">
                                <h3 className="title">ABOUT US</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="about__title-wrap">
                                <h2 className="title" style={{ display: "flex", flexDirection: "column" }}>
                                    <i>WE ARE</i>
                                    <span>Platform</span>
                                    <i>For</i>
                                    <i>Gam<b>ers</b></i>
                                </h2>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="about__three-images">
                                <Image src={mask1} alt="img" className="left" />
                                <Image src={mask2} alt="img" className="right" />
                                <div className="about__dots">
                                    <svg width="109" height="35" viewBox="0 0 109 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 0H0V7H9V0Z" fill="currentcolor"></path>
                                        <path d="M24 0H15V7H24V0Z" fill="currentcolor"></path>
                                        <path d="M38 0H29V7H38V0Z" fill="currentcolor"></path>
                                        <path d="M53 0H44V7H53V0Z" fill="currentcolor"></path>
                                        <path d="M67 0H58V7H67V0Z" fill="currentcolor"></path>
                                        <path d="M80 0H71V7H80V0Z" fill="currentcolor"></path>
                                        <path d="M9 14H0V21H9V14Z" fill="currentcolor"></path>
                                        <path d="M24 14H15V21H24V14Z" fill="currentcolor"></path>
                                        <path d="M38 14H29V21H38V14Z" fill="currentcolor"></path>
                                        <path d="M53 14H44V21H53V14Z" fill="currentcolor"></path>
                                        <path d="M67 14H58V21H67V14Z" fill="currentcolor"></path>
                                        <path d="M80 14H71V21H80V14Z" fill="currentcolor"></path>
                                        <path d="M95 14H86V21H95V14Z" fill="currentcolor"></path>
                                        <path d="M109 14H100V21H109V14Z" fill="currentcolor"></path>
                                        <path d="M9 28H0V35H9V28Z" fill="currentcolor"></path>
                                        <path d="M24 28H15V35H24V28Z" fill="currentcolor"></path>
                                        <path d="M38 28H29V35H38V28Z" fill="currentcolor"></path>
                                        <path d="M53 28H44V35H53V28Z" fill="currentcolor"></path>
                                        <path d="M67 28H58V35H67V28Z" fill="currentcolor"></path>
                                        <path d="M80 28H71V35H80V28Z" fill="currentcolor"></path>
                                        <path d="M95 28H86V35H95V28Z" fill="currentcolor"></path>
                                        <path d="M109 28H100V35H109V28Z" fill="currentcolor"></path>
                                    </svg>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "#10181F", marginTop: "15px" }}>
                                <p>GamerX is a platform which is build by gamers for gamers. Connect with other gamers, generate revenue by sharing content and live streaming, launch your official NFT collections, post your gaming jobs or get other jobs done, and many other things at one place. In short words GamerX is an ultimate platform for gamers...</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="big-title">GAMERX</h2>
            </section>


            {/* services  */}
            <section className="services-area services__bg-color section-pt-120 section-pb-120">
                <div className="container">
                    <div className="row align-items-end align-items-xl-start">
                        <div className="col-lg-6">
                            <div className="section__title text-start mb-65">
                                <h3 className="title">Services we offer</h3>
                            </div>
                            <div className="services__wrapper">
                                <div className="services__item">
                                    <div className="services__icon">
                                        <i className="flaticon-diamond"></i>
                                    </div>
                                    <div className="services__content">
                                        <h4 className="title"><Link href="/content/uploadVideo" style={{ textDecoration: "none" }}>Stream Gaming Content</Link></h4>
                                        <p>Upload and stream your gaming content on GamerX to gain followers and earn TFUEL tokens</p>
                                    </div>
                                </div>
                                <div className="services__item">
                                    <div className="services__icon">
                                        <i className="flaticon-user-profile"></i>
                                    </div>
                                    <div className="services__content">
                                        <h4 className="title"><Link href="/content/goLive" style={{ textDecoration: "none" }}>Find Jobs</Link></h4>
                                        <p>Find suitable gaming jobs for you on GamerX, you can also post jobs and make people work for you </p>
                                    </div>
                                </div>
                                <div className="services__item">
                                    <div className="services__icon">
                                        <i className="flaticon-ethereum"></i>
                                    </div>
                                    <div className="services__content">
                                        <h4 className="title"><Link href="/nfts/createNFT" style={{ textDecoration: "none" }}>Sell Gaming NFTs</Link></h4>
                                        <p>Launch your official gaming NFT collections, let your followers trade your NFTs</p>
                                    </div>
                                </div>
                                <div className="services__item active">
                                    <div className="services__icon">
                                        <i className="flaticon-settings-1"></i>
                                    </div>
                                    <div className="services__content">
                                        <h4 className="title"><Link href="/profile/exploreGamers" style={{ textDecoration: "none" }}>Connect With Gamers</Link></h4>
                                        <p>Chat with other gamers, get teammates, collab and create awesome content</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* youtube vid  */}
                        <div className="col-lg-6" style={{ height: "600px" }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="ratio ratio-16x9 before:bg-jacarta-900">
                                            <iframe width="560" height="315" src="https://www.youtube.com/embed/3F5VCg7ciEk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* team  */}
            <section className="team__area team-bg section-pt-130 section-pb-100" id='pageBG'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-10">
                            <div className="section__title text-center mb-60">
                                <h3 className="title">TEAM BEHIND GAMERX</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* shravan  */}
                        <div className="col-xl-3 col-lg-4 col-sm-6 wow fadeInUp">
                            <div className="team__item">
                                <div className="team__thumb">
                                    <Image src={shravan} alt="img" className='h-[150px] w-[150px] ml-12' />
                                </div>
                                <div className="team__content">
                                    <h4 className="name" style={{ fontSize: "17px" }}>Shravan Yogendra Andoria</h4>
                                    <span className="designation">Full Stack Developer</span>
                                </div>
                                <div className="team__content mt-4">
                                    <span className="flex justify-center align-middle">
                                        <a
                                            href="https://www.linkedin.com/in/shravan-andoria-728290170/?originalSubdomain=in"
                                            target="_blank"
                                            className="group"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="linkedin"
                                                className="h-4 w-4 fill-white group-hover:fill-accent dark:group-hover:fill-green-500 mr-4"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="https://twitter.com/AndoriaShravan"
                                            target="_blank"
                                            className="group"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="twitter"
                                                className="h-4 w-4 fill-white group-hover:fill-accent dark:group-hover:fill-green-500"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* aniruddha  */}
                        <div className="col-xl-3 col-lg-4 col-sm-6 wow fadeInUp">
                            <div className="team__item">
                                <div className="team__thumb">
                                    <Image src={ani} alt="img" className='h-[150px] w-[150px] ml-12' />
                                </div>
                                <div className="team__content">
                                    <h4 className="name" style={{ fontSize: "17px" }}>Aniruddha Vikharankar</h4>
                                    <span className="designation">Full Stack Developer</span>
                                </div>
                                <div className="team__content mt-4">
                                    <span className="flex justify-center align-middle">
                                        <a
                                            href="https://www.linkedin.com/in/aniruddha-vikharankar-374296208/"
                                            target="_blank"
                                            className="group"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="linkedin"
                                                className="h-4 w-4 fill-white group-hover:fill-accent dark:group-hover:fill-green-500 mr-4"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="https://twitter.com/Aniruddha2000"
                                            target="_blank"
                                            className="group"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="twitter"
                                                className="h-4 w-4 fill-white group-hover:fill-accent dark:group-hover:fill-green-500"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* tech  */}
            <section className="team__area team-bg section-pt-130 section-pb-100" id='pageBG'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-10">
                            <div className="section__title text-center mb-60">
                                <h3 className="title">INTEGRATED TECHNOLOGIES</h3>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 py-8 sm:grid-cols-5 text-center">
                        <a href="https://www.superfluid.finance/" target="_blank" className="flex flex-col justify-center" style={{ textDecoration: "none" }}>
                            <Image
                                src={superfluid}
                                alt="superfluid"
                                className="h-[150px] w-[150px] m-6 self-center"
                                height={100}
                                width={100}
                                style={{ borderRadius: "50%" }}
                            />
                            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                Superfluid
                            </h3>
                        </a>
                        <a href="https://www.lens.xyz/" target="_blank" className="flex flex-col justify-center mt-4" style={{ textDecoration: "none" }}>
                            <Image
                                src={lens}
                                alt="lens"
                                className="h-[120px]  w-[120px] m-6 self-center"
                                height={100}
                                width={100}
                                style={{ borderRadius: "50%" }}
                            />
                            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                Lens Protocol
                            </h3>
                        </a>
                        <a href="https://push.org/" target="_blank" className="flex flex-col justify-center" style={{ textDecoration: "none" }}>
                            <Image
                                src={push}
                                alt="push"
                                className="h-[150px]  w-[150px] m-6 self-center"
                                height={100}
                                width={100}
                            />
                            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                Push Protocol
                            </h3>
                        </a>
                        <a href="https://thetatoken.org" target="_blank" className="flex flex-col justify-center mt-4" style={{ textDecoration: "none" }}>
                            <Image
                                src={theta}
                                alt="theta"
                                className="h-[120px]  w-[120px] m-6 self-center"
                                height={100}
                                width={100}
                            />
                            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                Theta Video
                            </h3>
                        </a>
                        <a href="https://polybase.xyz" target="_blank" className="flex flex-col justify-center mt-4" style={{ textDecoration: "none" }}>
                            <Image
                                src={polybase}
                                alt="theta"
                                className="h-[120px]  w-[120px] m-6 self-center"
                                height={100}
                                width={100}
                                style={{ borderRadius: "50%" }}
                            />
                            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                polybase
                            </h3>
                        </a>
                    </div>
                </div>
            </section>

        </>
    )
}

export default about