import Loader from '@/components/Loader'
import Head from 'next/head'
import React, { useState } from 'react'

const postedJobs = () => {
    const [loading, setLoading] = useState(false);

    return (
        <section className="shop-area" id="pageBG">
            <Head>
                <title>Explore Posted Jobs - GamerX</title>
                <meta
                    name="description"
                    content="About GamerX"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className="container mt-12">
                <div className="row justify-content-center">
                    <div>
                        <div className="shop__top-wrap">
                            <div className="row align-items-center">
                                <div className="col-lg-8 col-sm-6">
                                    <div className="shop__showing-result">
                                        <p style={{ fontSize: "25px" }}>Posted Jobs</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                    <div className="shop__ordering">
                                        <select
                                            name="orderby"
                                            className="orderby"
                                            fdprocessedid="8pe1d8"
                                        >
                                            <option value="Default sorting">Default sorting</option>
                                            <option value="Sort by latest">Sort by latest</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            // <div
                            //     className="flex justify-center w-full"
                            //     style={{ display: "flex", flexWrap: "wrap" }}
                            // >
                            //     {/* loop here  */}
                            //     <div className="grid grid-cols-3 justify-center w-full">

                            //     </div>
                            // </div>

                            <section className="tournament__list-area section-pb-120 section-pt-120">
                                <div className="container">
                                    <div className="tournament__wrapper">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="tournament__list-item-wrapper">
                                                    <div className="tournament__list-item wow fadeInUp">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1116.562" height="163.37" viewBox="0 0 1116.562 163.37">
                                                            <path className="background-path" d="M708,1784l28-27s4.11-5.76,18-6,702-1,702-1a37.989,37.989,0,0,1,16,9c7.47,7.08,37,33,37,33s9.02,9.47,9,18,0,42,0,42-0.19,9.43-11,19-32,30-32,30-5.53,11.76-21,12-985,0-985,0a42.511,42.511,0,0,1-26-13c-11.433-12.14-34-32-34-32s-6.29-5.01-7-17,0-43,0-43-1-5.42,12-18,34-32,34-32,10.4-8.28,19-8,76,0,76,0a44.661,44.661,0,0,1,21,11c9.268,8.95,22,22,22,22Z" transform="translate(-401.563 -1749.875)"></path>
                                                        </svg>
                                                        <div className="tournament__list-content">
                                                            <div className="tournament__list-thumb">
                                                                <a href="tournament-details.html"><img src="./MYKD - eSports and Gaming NFT Template_files/tournament_thumb01.png" alt="thumb" /></a>
                                                            </div>
                                                            <div className="tournament__list-name">
                                                                <h5 className="team-name">FoxTie Max</h5>
                                                                <span className="status">Online</span>
                                                            </div>
                                                            <div className="tournament__list-prize">
                                                                <h6 className="title">Prize</h6>
                                                                <i className="fas fa-trophy"></i>
                                                                <span>$75000</span>
                                                            </div>
                                                            <div className="tournament__list-time">
                                                                <h6 className="title">Time</h6>
                                                                <i className="fas fa-clock"></i>
                                                                <span>10h : 15m</span>
                                                            </div>
                                                            <div className="tournament__list-live">
                                                                <a href="https://www.twitch.tv/videos/1726788358" target="_blank">Live now <i className="far fa-play-circle"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tournament__list-item wow fadeInUp">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1116.562" height="163.37" viewBox="0 0 1116.562 163.37">
                                                            <path className="background-path" d="M708,1784l28-27s4.11-5.76,18-6,702-1,702-1a37.989,37.989,0,0,1,16,9c7.47,7.08,37,33,37,33s9.02,9.47,9,18,0,42,0,42-0.19,9.43-11,19-32,30-32,30-5.53,11.76-21,12-985,0-985,0a42.511,42.511,0,0,1-26-13c-11.433-12.14-34-32-34-32s-6.29-5.01-7-17,0-43,0-43-1-5.42,12-18,34-32,34-32,10.4-8.28,19-8,76,0,76,0a44.661,44.661,0,0,1,21,11c9.268,8.95,22,22,22,22Z" transform="translate(-401.563 -1749.875)"></path>
                                                        </svg>
                                                        <div className="tournament__list-content">
                                                            <div className="tournament__list-thumb">
                                                                <a href="tournament-details.html"><img src="./MYKD - eSports and Gaming NFT Template_files/tournament_thumb02.png" alt="thumb" /></a>
                                                            </div>
                                                            <div className="tournament__list-name">
                                                                <h5 className="team-name">Hatlax TM.</h5>
                                                                <span className="status">Online</span>
                                                            </div>
                                                            <div className="tournament__list-prize">
                                                                <h6 className="title">Prize</h6>
                                                                <i className="fas fa-trophy"></i>
                                                                <span>$85000</span>
                                                            </div>
                                                            <div className="tournament__list-time">
                                                                <h6 className="title">Time</h6>
                                                                <i className="fas fa-clock"></i>
                                                                <span>12h : 10m</span>
                                                            </div>
                                                            <div className="tournament__list-live">
                                                                <a href="https://www.twitch.tv/videos/1726788358" target="_blank">Live now <i className="far fa-play-circle"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tournament__list-item wow fadeInUp">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1116.562" height="163.37" viewBox="0 0 1116.562 163.37">
                                                            <path className="background-path" d="M708,1784l28-27s4.11-5.76,18-6,702-1,702-1a37.989,37.989,0,0,1,16,9c7.47,7.08,37,33,37,33s9.02,9.47,9,18,0,42,0,42-0.19,9.43-11,19-32,30-32,30-5.53,11.76-21,12-985,0-985,0a42.511,42.511,0,0,1-26-13c-11.433-12.14-34-32-34-32s-6.29-5.01-7-17,0-43,0-43-1-5.42,12-18,34-32,34-32,10.4-8.28,19-8,76,0,76,0a44.661,44.661,0,0,1,21,11c9.268,8.95,22,22,22,22Z" transform="translate(-401.563 -1749.875)"></path>
                                                        </svg>
                                                        <div className="tournament__list-content">
                                                            <div className="tournament__list-thumb">
                                                                <a href="tournament-details.html"><img src="./MYKD - eSports and Gaming NFT Template_files/tournament_thumb03.png" alt="thumb" /></a>
                                                            </div>
                                                            <div className="tournament__list-name">
                                                                <h5 className="team-name">Spartan iv</h5>
                                                                <span className="status">Online</span>
                                                            </div>
                                                            <div className="tournament__list-prize">
                                                                <h6 className="title">Prize</h6>
                                                                <i className="fas fa-trophy"></i>
                                                                <span>$45000</span>
                                                            </div>
                                                            <div className="tournament__list-time">
                                                                <h6 className="title">Time</h6>
                                                                <i className="fas fa-clock"></i>
                                                                <span>10h : 15m</span>
                                                            </div>
                                                            <div className="tournament__list-live">
                                                                <a href="https://www.twitch.tv/videos/1726788358" target="_blank">Live now <i className="far fa-play-circle"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default postedJobs