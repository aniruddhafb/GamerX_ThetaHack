import React, { useState } from "react";
import axios from "axios";

const uploadVideo = ({ upload_video }) => {
  const [data, set_data] = useState({
    file: "",
    title: "",
    description: "",
    thumbnail: "",
  });
  const onChange = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    await upload_video(data);
  };

  return (
    <div id="pageBG">
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
                            set_data({ ...data, thumbnail: e.target.files[0] })
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
                    <div className="relative mt-4">
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
                  <div className=" relative mt-4">
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
                  <button type="submit">Upload</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default uploadVideo;
