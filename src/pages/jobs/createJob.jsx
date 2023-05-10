import Loader from "@/components/Loader";
import Head from "next/head";
import React, { useState } from "react";

const CreateJob = () => {
  const [loading, isLoading] = useState(false);

  return (
    <div id="pageBG">
      <Head>
        <title>Post a Job - GamerX</title>
        <meta
          name="description"
          content="Go Live On GamerX"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ?
        <div className="pt-[300px] pb-[300px]" id="pageBG">
          <Loader />
        </div>
        :
        <section className="blog-area blog-details-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="blog-post-wrapper">
                <div className="comment-respond" style={{ marginTop: "30px" }}>
                  <h3 className="comment-reply-title">Post Job Request</h3>
                  <form
                    className="comment-form"
                    action="#"
                  >
                    <p className="comment-notes pb-4">
                      Post a gaming job opportunity on GamerX platform and hire top gamers and creators..
                    </p>
                    <div className="row">
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
                          Live Thumbnail*
                        </span>
                      </div>

                      {/* stream id  */}
                      <div className="col-sm-6 relative">
                        <div className="form-grp">
                          <input
                            type="text"
                            name="stream_id"
                            placeholder="Enter your stream ID"
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
                          Stream ID*
                        </span>
                      </div>

                      {/* title  */}
                      <div className="relative mt-4">
                        <div className="form-grp">
                          <input
                            type="text"
                            name="title"
                            placeholder="Give a title to your live"
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
                          Stream Title*
                        </span>
                      </div>
                    </div>

                    {/* desc  */}
                    <div className=" relative mt-4">
                      <div className="form-grp">
                        <textarea
                          name="description"
                          placeholder="Add a description for your live"
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
                        Stream Description*
                      </span>
                    </div>

                    {/* stream tag  */}
                    <div className="col-sm-6 relative">
                      <div className="form-grp">
                        <select
                          name="Tag"
                          style={{ marginTop: "55px" }}
                        >
                          <option value="Gameplay" className="bg-gray-800">
                            Gameplay
                          </option>
                          <option value={"Reaction"} className="bg-gray-800">
                            Reaction
                          </option>
                          <option value={"Informative"} className="bg-gray-800">
                            Informative
                          </option>
                          <option value={"Esports"} className="bg-gray-800">
                            Esports
                          </option>
                        </select>
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
                        Stream Tag*{" "}
                      </span>
                    </div>

                    <button type="submit">Post Request</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  );
};

export default CreateJob;
