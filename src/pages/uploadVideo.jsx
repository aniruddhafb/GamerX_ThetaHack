import React from 'react'

const uploadVideo = () => {
    return (
        <>
            <div id='pageBG'>
                <section className="blog-area blog-details-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="blog-post-wrapper">
                                <div className="comment-respond" style={{ marginTop: "30px" }}>
                                    <h3 className="comment-reply-title">Upload Video</h3>
                                    <form className="comment-form" action="#">
                                        <p className="comment-notes">Fill the details and upload your content on gamerX</p>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-grp">
                                                    <input type="file" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-grp">
                                                    <input type="text" placeholder="Video Title *" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-grp">
                                            <textarea name="message" placeholder="Video Description *" ></textarea>
                                        </div>
                                        <button type="submit" fdprocessedid="x7by38">Upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default uploadVideo