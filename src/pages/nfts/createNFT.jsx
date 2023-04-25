import React, { useEffect, useState } from "react";

const CreateNFT = ({ default_nft_collection, create_token }) => {
  const [data, set_data] = useState({
    title: "",
    description: "",
    image: "",
    collection_address: default_nft_collection,
    properties: [],
  });
  const handle_change = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };

  const handle_submit = (e) => {
    e.preventDefault();
    console.log(data);
    create_token(data);
  };

  return (
    <div id="pageBG">
      <section className="blog-area blog-details-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="blog-post-wrapper">
              <div className="comment-respond" style={{ marginTop: "30px" }}>
                <h3 className="comment-reply-title">Create NFT</h3>
                <form
                  onSubmit={handle_submit}
                  className="comment-form"
                  action="#"
                >
                  <p className="comment-notes pb-4">
                    Launch your NFTs on GamerX Platform
                  </p>
                  <div className="row">
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
                        Select Image or GIF*
                      </span>
                    </div>
                    <div className="relative mt-4">
                      <div className="form-grp">
                        <input
                          type="text"
                          name="title"
                          onChange={handle_change}
                          placeholder="Give a name to your NFT"
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
                        Name*
                      </span>
                    </div>
                  </div>
                  <div className=" relative mt-4">
                    <div className="form-grp">
                      <textarea
                        name="description"
                        onChange={handle_change}
                        placeholder="Add a description for your NFT"
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
                    <div>
                      <h1>Collection</h1>
                      <select
                        name="collection"
                        className="dropdown my-1 cursor-pointer w-[100%]"
                        onChange={handle_change}
                        required
                      >
                        <option
                          value={default_nft_collection}
                          defaultChecked={true}
                        >
                          GamerX Marketplace Collection
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit">Create NFT</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateNFT;
