import React, { useState } from "react";
const goLive = ({ go_live }) => {
  const [data, set_data] = useState({
    thumbnail: "",
    stream_id: "",
    title: "",
    description: "",
  });

  const handle_change = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const handle_submit = async (e) => {
    e.preventDefault();
    go_live(data);
  };
  return (
    <div id="pageBG">
      <section className="blog-area blog-details-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="blog-post-wrapper">
              <div className="comment-respond" style={{ marginTop: "30px" }}>
                <h3 className="comment-reply-title">Go Live</h3>
                <form
                  onSubmit={handle_submit}
                  className="comment-form"
                  action="#"
                >
                  <p className="comment-notes pb-4">
                    Go live on gamerX in few easy steps
                  </p>
                  <div className="row">
                    <div className="col-sm-6 relative">
                      <div className="form-grp ">
                        <input
                          name="thumbnail"
                          onChange={(e) =>
                            set_data({ thumbnail: e.target.files[0] })
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
                        Live Thumbnail*
                      </span>
                    </div>
                    <div className="col-sm-6 relative">
                      <div className="form-grp">
                        <input
                          type="text"
                          name="stream_id"
                          onChange={handle_change}
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
                    <div className="relative mt-4">
                      <div className="form-grp">
                        <input
                          type="text"
                          name="title"
                          onChange={handle_change}
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
                  <div className=" relative mt-4">
                    <div className="form-grp">
                      <textarea
                        name="description"
                        onChange={handle_change}
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
                  <button type="submit">Start Streaming</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default goLive;
