import Loader from "@/components/Loader";
import Head from "next/head";
import React, { useState, useEffect } from "react";

const CreateCollection = ({ create_collection }) => {

  const [loading, isLoading] = useState(false);
  const [data, set_data] = useState({
    name: "",
    symbol: "",
    logo: "",
    image: "",
    description: "",
  });
  const handleChange = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    isLoading(true);
    e.preventDefault();
    await create_collection(data);
    isLoading(false);
    setTimeout(() => {
      router.push(`/collection/exploreCollections`);
    }, 1000);
  };

  return (
    <div id="pageBG">
      <Head>
        <title>Create NFT Collection - GamerX</title>
        <meta
          name="description"
          content="About GamerX"
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
                  <div>
                    <h3 className="comment-reply-title">Create Collection</h3>
                    <p className="comment-notes pb-4">
                      Lauch your own NFT Collection on GamerX
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="comment-form"
                    action="#"
                  >
                    <div className="row">
                      <div className="col-sm-6 relative">
                        <div className="form-grp">
                          <input
                            name="file"
                            type="file"
                            onChange={(e) =>
                              set_data({ ...data, logo: e.target.files[0] })
                            }
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
                            onChange={(e) =>
                              set_data({ ...data, image: e.target.files[0] })
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
                          Cover Image*
                        </span>
                      </div>
                      <div className="relative mt-4">
                        <div className="form-grp">
                          <input
                            type="text"
                            onChange={handleChange}
                            name="name"
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
                            name="symbol"
                            onChange={handleChange}
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
                          onChange={handleChange}
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
      }
    </div>
  );
};

export default CreateCollection;
