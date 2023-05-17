import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const help = () => {
    return (
        <section class="blog-area blog-details-area" id='pageBG'>
            <Head>
                <title>Live Setup Help - GamerX</title>
                <meta
                    name="description"
                    content="Live Setup Help"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="blog-post-wrapper">
                        <div class="blog-post-item">
                            <div class="blog-post-content blog-details-content" style={{ marginTop: "50px" }}>
                                <h2 class="title">Steps to starm streaming on GamerX</h2>
                                <h4 class="title" style={{ fontSize: "22px" }}>Step 1</h4>
                                <p>Download the <a href="https://docs.thetatoken.org/docs/setup-theta-edge-node" target='_blank' style={{ textDecoration: "none" }}>Theta Edge Node</a> software and get your stream ID and ingest URL (needed for OBS) from the broadcast section. You don't need to fill any other details on the broadcast page.</p>
                                <div class="blog-details-inner-img">
                                    <Image src="../../sc1.png" height={100} width={100} alt="img" style={{ height: "auto", width: "auto" }} />
                                </div>
                                <div class="blog-details-inner">
                                    <h4 class="title" style={{ fontSize: "22px" }}>Step 2</h4>
                                    <p>To start streaming you first need any live streaming software like OBS studio. Download <a href="https://obsproject.com/" target='_blank' style={{ textDecoration: "none" }}>OBS studio</a> and in settings section update your live stream settings in the following way showed in the below screenshot. </p>
                                </div>
                                <div class="blog-details-inner-img">
                                    <Image src="../../sc2.png" height={100} width={100} alt="img" style={{ height: "auto", width: "auto" }} />
                                </div>
                                <div class="blog-details-inner">
                                    <h4 class="title" style={{ fontSize: "22px" }}>Step 3</h4>
                                    <p>Now you are ready to go, to start streaming first start streaming via OBS studio and then go live on GamerX by filling the appropiate details. <Link style={{ textDecoration: "none" }} href="/content/goLive">Click Here</Link> to visit the go live page.</p>
                                </div>
                                <Link href={`/content/goLive`} class="blog-details-inner-img">
                                    <Image src="../../sc3.png" height={100} width={100} alt="img" style={{ height: "auto", width: "auto" }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default help