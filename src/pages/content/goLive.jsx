import Loader from "@/components/Loader";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const GoLive = ({ go_live, get_user_data, signerAddress }) => {
  const [loading, isLoading] = useState(false);
  const [data, set_data] = useState({
    thumbnail: "",
    stream_id: "",
    title: "",
    description: "",
    tag: "Gameplay",
  });

  const router = useRouter();

  const handle_change = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };
  const handle_submit = async (e) => {
    isLoading(true);
    e.preventDefault();
    const res = await get_user_data(signerAddress);
    if (!res.username) {
      alert("Please Create Your Profile To Go Live");
      router.push(`/profile/editGamerProfile`);
      return;
    }
    await go_live(data);
    isLoading(false);
    // setTimeout(() => {
    router.replace(`/content/live/exploreLiveContent`);
    // }, 1000);
  };

  return (
    <div id="pageBG">
      <Head>
        <title>Go Live - GamerX</title>
        <meta name="description" content="Go Live On GamerX" />
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
                  <h3 className="comment-reply-title">Go Live</h3>
                  <form
                    onSubmit={handle_submit}
                    className="comment-form"
                    action="#"
                  >
                    <p className="comment-notes pb-4">
                      Go live on gamerX in few easy steps,{" "}
                      <Link style={{ textDecoration: "none" }} href="/help">
                        click here
                      </Link>{" "}
                      to view the steps
                    </p>
                    <div className="row">
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
                            fontWeight: "bold",
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
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Stream ID*{" "}
                          <Link style={{ textDecoration: "none" }} href="/help">
                            ➡
                          </Link>
                        </span>
                      </div>

                      {/* title  */}
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
                            fontWeight: "bold",
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
                          onChange={handle_change}
                          placeholder="Add a description for your live"
                        ></textarea>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "-30px",
                          color: "white",
                          fontWeight: "bold",
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
                          onChange={(e) =>
                            set_data({
                              ...data,
                              tag: e.target.value,
                            })
                          }
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
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Stream Tag*{" "}
                      </span>
                    </div>

                    <button type="submit">Start Streaming</button>
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

export default GoLive;
