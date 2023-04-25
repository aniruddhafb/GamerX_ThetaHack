import React from 'react'

const createCollection = () => {
    return (
        <div id="pageBG">
            <section className="blog-area blog-details-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="blog-post-wrapper">
                            <div className="comment-respond" style={{ marginTop: "30px" }}>
                                <div>
                                    <h3 className="comment-reply-title">Create Collection</h3>
                                    <p className="comment-notes pb-4">
                                        Lauch your own NFT Collection on GamerX
                                    </p>
                                </div>
                                <form
                                    className="comment-form"
                                    action="#"
                                >
                                    <div className="row">
                                        <div className="col-sm-6 relative">
                                            <div className="form-grp">
                                                <input
                                                    name="file"
                                                    type="file"
                                                    required
                                                />
                                            </div>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "-30px",
                                                    color: "white",
                                                    fontFamily: "berlin_sans_fb_demibold",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Logo*
                                            </span>
                                        </div>
                                        <div className="col-sm-6 relative">
                                            <div className="form-grp ">
                                                <input
                                                    name="thumbnail"
                                                    type="file"
                                                    required
                                                />
                                            </div>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "-30px",
                                                    color: "white",
                                                    fontFamily: "berlin_sans_fb_demibold",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Cover Image*
                                            </span>
                                        </div>
                                        <div className="relative mt-4">
                                            <div className="form-grp">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    placeholder="Eg - Gamer Five"
                                                    required
                                                />
                                            </div>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "-30px",
                                                    color: "white",
                                                    fontFamily: "berlin_sans_fb_demibold",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Collection Name*
                                            </span>
                                        </div>
                                        <div className="relative mt-4">
                                            <div className="form-grp">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    placeholder="Eg - GMRF"
                                                    required
                                                />
                                            </div>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "-30px",
                                                    color: "white",
                                                    fontFamily: "berlin_sans_fb_demibold",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Symbol*
                                            </span>
                                        </div>
                                    </div>
                                    <div className=" relative mt-4">
                                        <div className="form-grp">
                                            <textarea
                                                name="description"
                                                placeholder="Provide a detailed description of your collection"
                                            ></textarea>
                                        </div>
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "-30px",
                                                color: "white",
                                                fontFamily: "berlin_sans_fb_demibold",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Description*
                                        </span>
                                    </div>
                                    <button type="submit">Create Collection</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default createCollection