import Link from "next/link";
import { React, useState, useEffect } from "react";

const createNFT = ({
  default_nft_collection,
  create_token,
  get_my_collections,
}) => {
  const [propModel, setPropModel] = useState(false);

  const [data, set_data] = useState({
    title: "",
    description: "",
    image: "",
    collection_address: default_nft_collection,
    properties: [{ type: "", value: "" }],
  });

  const handle_change_input = (index, e) => {
    const values = [...data.properties];
    values[index][e.target.name] = e.target.value;
    set_data({ ...data, properties: values });
  };

  const handle_add_field = () => {
    set_data({
      ...data,
      properties: [...data.properties, { type: "", value: "" }],
    });
  };

  const handle_remove_field = (index) => {
    const values = [...data.properties];
    values.splice(index, 1);
    set_data({ ...data, properties: values });
  };

  const handle_change = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };

  const handle_submit = (e) => {
    e.preventDefault();
    console.log(data);

    create_token(data);
  };

  useEffect(() => {
    const collections = async () => {
      const res = await get_my_collections();
      console.log({ res });
    };
    collections();
  }, []);

  return (
    <div id="pageBG">
      <section className="blog-area blog-details-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="blog-post-wrapper">
              <div className="comment-respond" style={{ marginTop: "30px" }}>
                <h3 className="comment-reply-title">Create NFT</h3>
                <form className="comment-form" action="#">
                  <p className="comment-notes pb-4">
                    Launch your NFTs on GamerX Platform
                  </p>
                  <div className="row">
                    <div className="col-sm-6 relative">
                      <div className="form-grp">
                        <input name="thumbnail" type="file" required />
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
                    <div className="col-sm-6 relative">
                      <div className="form-grp ">
                        <select name="collection">
                          <option className="bg-gray-800" value="">
                            Default Collection
                          </option>
                          <option className="bg-gray-800" value="">
                            GamerX Main
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
                        Select Collection*{" "}
                        <Link
                          href="/collection/createCollection"
                          target="_blank"
                          className="text-gray-400 text-sm hover:text-gray-300"
                          style={{ textTransform: "lowercase" }}
                        >
                          [Create your collection ➚]
                        </Link>
                      </span>
                    </div>
                    <div className="relative mt-4">
                      <div className="form-grp">
                        <input
                          type="text"
                          name="title"
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
                  </div>

                  {/* properties  */}
                  <div className="relative border-b border-gray-700 py-6 mb-6 mt-8">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="mr-2 mt-px h-4 w-4 shrink-0 fill-jacarta-700 dark:fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
                        </svg>

                        <div>
                          <span
                            style={{
                              color: "white",
                              fontFamily: "berlin_sans_fb_demibold",
                              textTransform: "uppercase",
                            }}
                          >
                            Properties
                          </span>
                          <p className="dark:text-jacarta-300">
                            Textual traits that show up as rectangles.
                          </p>
                        </div>
                      </div>
                      <button
                        className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent bg-transparent hover:border-transparent hover:bg-accent dark:bg-jacarta-700"
                        type="button"
                        id="item-properties"
                        data-bs-toggle="modal"
                        data-bs-target="#propertiesModal"
                        onClick={() => setPropModel(!propModel)}
                      >
                        {!propModel ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="fill-white"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="h-6 w-6 fill-white "
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* prop model  */}
                  {propModel && (
                    <div>
                      <div className="max-w-2xl mb-4">
                        <div className="">
                          <div className=" p-6">
                            {data.properties.map((e, index) => (
                              <div
                                key={index}
                                className="relative my-3 flex items-center"
                              >
                                <button
                                  type="button"
                                  onClick={() => handle_remove_field(index)}
                                  className="flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-l-lg border border-r-0 border-jacarta-100 bg-jacarta-50 hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="h-6 w-6 fill-white dark:fill-jacarta-300"
                                  >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                                  </svg>
                                </button>

                                <div className="flex-1">
                                  <input
                                    onChange={(e) =>
                                      handle_change_input(index, e)
                                    }
                                    value={data.properties[index].type}
                                    name="type"
                                    type="text"
                                    className="h-12 w-full border border-r-0 border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 bg-transparent p-2"
                                    placeholder="Type"
                                  />
                                </div>

                                <div className="flex-1">
                                  <input
                                    onChange={(e) =>
                                      handle_change_input(index, e)
                                    }
                                    value={data.properties[index].value}
                                    name="value"
                                    type="text"
                                    className="h-12 w-full rounded-r-lg border border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 bg-transparent p-2"
                                    placeholder="Value"
                                  />
                                </div>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={handle_add_field}
                              className="mt-2 rounded-full border-2 border-accent py-2 px-8 text-center text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-white text-white"
                            >
                              Add More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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

export default createNFT;
