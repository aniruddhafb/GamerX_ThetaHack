import React, { useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import Head from "next/head";
import { useRouter } from "next/router";
const uploadVideo = ({ upload_video }) => {
  const router = useRouter();
  const [loading, isLoading] = useState(false);
  const [data, set_data] = useState({
    file: "",
    title: "",
    description: "",
    thumbnail: "",
    tag: "P2E Game",
  });
  const onChange = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };

  const handle_submit = async (e) => {
    isLoading(true);
    e.preventDefault();
    console.log({ data });
    await upload_video(data);
    isLoading(false);
    setTimeout(() => {
      router.push(`/content/videos/exploreContent`);
    }, 1000);
  };

  return (
    <div id="pageBG">
      <Head>
        <title>Upload Video - GamerX</title>
        <meta name="description" content="About GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ? (
        <div className="pt-[300px] pb-[300px]" id="pageBG">
          <Loader />
        </div>
      ) : (
        <section className="blog-area blog-details-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="blog-post-wrapper">
                <div className="comment-respond" style={{ marginTop: "30px" }}>
                  <div>
                    <h3 className="comment-reply-title">Upload Video</h3>
                    <p className="comment-notes pb-4">
                      Fill the details and upload your content on gamerX
                    </p>
                  </div>
                  <form
                    onSubmit={handle_submit}
                    className="comment-form"
                    action="#"
                  >
                    <div className="row">
                      <div className="col-sm-6 relative">
                        <div className="form-grp">
                          <input
                            name="file"
                            onChange={(e) =>
                              set_data({ ...data, file: e.target.files[0] })
                            }
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
                          Video File*
                        </span>
                      </div>
                      <div className="col-sm-6 relative">
                        <div className="form-grp ">
                          <input
                            name="thumbnail"
                            onChange={(e) =>
                              set_data({
                                ...data,
                                thumbnail: e.target.files[0],
                              })
                            }
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
                          Video Thumbnail*
                        </span>
                      </div>

                      {/* vid title  */}
                      <div className="relative mt-4 mb-[-25px]">
                        <div className="form-grp">
                          <input
                            type="text"
                            name="title"
                            onChange={onChange}
                            placeholder="Give a title to your video"
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
                          Video Title*
                        </span>
                      </div>
                    </div>

                    {/* vid desc  */}
                    <div className=" relative mt-16">
                      <div className="form-grp">
                        <textarea
                          name="description"
                          onChange={onChange}
                          placeholder="Add a description for your video content"
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
                        Video Description*
                      </span>
                    </div>

                    {/* tags  */}
                    <div className="col-sm-6 relative">
                      <div className="form-grp">
                        <select
                          onChange={(e) =>
                            set_data({
                              ...data,
                              tag: e.target.value,
                            })
                          }
                          name="Tag"
                          style={{ marginTop: "55px" }}
                        >
                          <option
                            selected={data.tag === "Gameplay"}
                            className="bg-gray-800"
                            value="Gameplay"
                          >
                            Gameplay
                          </option>
                          <option
                            selected={data.tag === "Informative"}
                            className="bg-gray-800"
                            value="Informative"
                          >
                            Informative
                          </option>
                          <option
                            selected={data.tag === "Tips & tricks"}
                            className="bg-gray-800"
                            value="Tips & tricks"
                          >
                            Tips & tricks
                          </option>
                          <option
                            selected={data.tag === "Product Launch"}
                            className="bg-gray-800"
                            value="Product Launch"
                          >
                            Product Launch
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
                        Video Tag*{" "}
                      </span>
                    </div>

                    <button type="submit">Upload</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default uploadVideo;
