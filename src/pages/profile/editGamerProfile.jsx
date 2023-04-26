import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
const EditGamerProfile = ({ update_profile, user_data }) => {
  const [data, set_data] = useState({
    cover_image: "",
    profile_image: "",
    username: "",
    bio: "",
    email: "",
    twitter: "",
    instagram: "",
    link: "",
    role: "Gamer Influencer",
  });

  const [preview_cover, set_cover_preview] = useState("");
  const [preview_profile, set_profile_preview] = useState("");
  const storage = new ThirdwebStorage();

  const handle_change = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    update_profile(data);
  };

  useEffect(() => {
    if (!user_data) return;
    set_data({
      ...user_data,
      twitter: user_data.socials ? user_data.socials[0] : "",
      instagram: user_data.socials ? user_data.socials[1] : "",
      link: user_data.socials ? user_data.socials[2] : "",
      role: user_data.role ? user_data.role : "Gamer Influencer",
      cover_image: user_data.cover_image ? user_data.cover_image : "",
      profile_image: user_data.profile_image ? user_data.profile_image : "",
    });
  }, [user_data]);
  return (
    <main className="pt-[5.5rem] lg:pt-24" id="pageBG">
      <form onSubmit={handle_submit}>
        <div className="relative">
          {preview_cover == "" && data.cover_image == "" ? (
            <Image
              src="../../../slider_bg.jpg"
              alt="banner"
              width={100}
              height={100}
              className="h-[18.75rem] w-[100%] object-cover"
            />
          ) : (
            <Image
              src={
                preview_cover
                  ? preview_cover
                  : user_data?.cover_image
                  ? user_data?.cover_image.replace(
                      "ipfs://",
                      "https://gateway.ipfscdn.io/ipfs/"
                    )
                  : "img/user/banner.jpg"
              }
              height={100}
              width={100}
              alt="banner"
              className="h-[18.75rem] object-cover w-full"
            />
          )}
          <div className="container relative -translate-y-4">
            <div className="group absolute right-0 bottom-4 flex items-center rounded-lg bg-white py-2 px-4 font-display text-sm hover:bg-accent">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  set_cover_preview(URL.createObjectURL(e.target.files[0]));
                  set_data({ ...data, cover_image: e.target.files[0] });
                }}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-4 w-4 fill-jacarta-400 group-hover:fill-jacarta-400"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
              </svg>
              <span className="mt-0.5 block group-hover:text-jacarta-400">
                Edit cover photo
              </span>
            </div>
          </div>
        </div>

        <section className="relative py-16 dark:bg-jacarta-800">
          <div className="container">
            <div className="mx-auto max-w-[48.125rem] md:flex">
              <div className="mb-12 md:w-1/2 md:pr-8">
                <div className="mb-6">
                  <label
                    htmlFor="profile-username"
                    style={{
                      fontFamily: "berlin_sans_fb_demibold",
                      textTransform: "uppercase",
                    }}
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Username<span className="text-red">*</span>
                  </label>
                  <input
                    name="username"
                    onChange={handle_change}
                    type="text"
                    value={data.username}
                    id="profile-username"
                    className="w-full rounded-sm border-jacarta-100 py-2.5 px-2 focus:ring-accent bg-transparent border-2 border-gray-500"
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="profile-bio"
                    style={{
                      fontFamily: "berlin_sans_fb_demibold",
                      textTransform: "uppercase",
                    }}
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Bio<span className="text-red">*</span>
                  </label>
                  <textarea
                    name="bio"
                    onChange={handle_change}
                    id="profile-bio"
                    value={data.bio}
                    className="w-full rounded-sm border-jacarta-100 py-2.5 px-2 focus:ring-accent bg-transparent border-2 border-gray-500"
                    required
                    placeholder="Tell the world your story!"
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="profile-email"
                    style={{
                      fontFamily: "berlin_sans_fb_demibold",
                      textTransform: "uppercase",
                    }}
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Email address<span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="profile-email"
                    name="email"
                    value={data.email}
                    onChange={handle_change}
                    className="w-full rounded-sm border-jacarta-100 py-2.5 px-2 focus:ring-accent bg-transparent border-2 border-gray-500"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="profile-email"
                    style={{
                      fontFamily: "berlin_sans_fb_demibold",
                      textTransform: "uppercase",
                    }}
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Your Role <span className="text-red">*</span>
                  </label>
                  <select
                    onChange={(e) =>
                      set_data({ ...data, role: e.target.value })
                    }
                    className="w-full rounded-sm border-jacarta-100 py-2.5 px-2 focus:ring-accent text-white bg-transparent border-2 border-gray-500"
                  >
                    <option
                      defaultValue={data.role === "Gamer Influencer"}
                      value="Gamer Influencer"
                      className="text-white bg-[#0F161B]"
                    >
                      Gamer Influencer
                    </option>
                    <option
                      defaultValue={data.role === "Esports Player"}
                      value="Esports Player"
                      className="text-white bg-[#0F161B]"
                    >
                      Esports Player
                    </option>
                    <option
                      defaultValue={data.role === "Just a Gamer"}
                      Esports
                      Player
                      value="Gamer"
                      className="text-white bg-[#0F161B]"
                    >
                      Just a Gamer
                    </option>
                    <option
                      defaultValue={data.role === "Tech Brand"}
                      value="Brand"
                      className="text-white bg-[#0F161B]"
                    >
                      Tech Brand
                    </option>
                    <option
                      defaultValue={data.role === "Game Dealer"}
                      value="Dealer"
                      className="text-white bg-[#0F161B]"
                    >
                      Game Dealer
                    </option>
                    <option
                      defaultValue={data.role === "Gaming Coach"}
                      value="Coach"
                      className="text-white bg-[#0F161B]"
                    >
                      Gaming Coach
                    </option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white">
                    Wallet Address
                  </label>
                  <button
                    className="js-copy-clipboard flex w-full select-none items-center rounded-lg border border-jacarta-100 bg-white py-3 px-4 hover:bg-jacarta-50 bg-transparent"
                    data-tippy-content="Copy"
                  >
                    <span className="text-white">
                      0x7a9fe22691c811ea339401bbb2leb
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="ml-auto mb-px h-4 w-4 fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zM4.003 9L4 20h11V9H4.003z"></path>
                    </svg>
                  </button>
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-green-500 py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                  Update Profile
                </button>
              </div>

              <div className="flex flex-col lg:ml-20">
                <div className="flex space-x-5 flex-wrap">
                  <div className="shrink-0">
                    <figure className="relative inline-block">
                      {preview_profile == "" && data.profile_image == "" ? (
                        <Image
                          src="../../../dislogo.png"
                          alt="banner"
                          width={100}
                          height={100}
                          className="rounded-xl border-[1px] border-gray-500 dark:border-jacarta-600 h-[130px] w-[auto]"
                        />
                      ) : (
                        <Image
                          // src={
                          //   user_data?.profile_image
                          //     ? user_data?.profile_image.replace(
                          //         "ipfs://",
                          //         "https://gateway.ipfscdn.io/ipfs/"
                          //       )
                          //     : preview_profile
                          //     ? preview_profile
                          //     : "img/user/user_avatar.gif"
                          // }
                          src={
                            preview_profile
                              ? preview_profile
                              : user_data?.profile_image
                              ? user_data?.profile_image.replace(
                                  "ipfs://",
                                  "https://gateway.ipfscdn.io/ipfs/"
                                )
                              : "img/user/user_avatar.gif"
                          }
                          height={100}
                          width={100}
                          alt="collection avatar"
                          className="rounded-xl border-[3px] border-white dark:border-jacarta-600 w-28 h-28 object-cover"
                        />
                      )}
                      <div className="group absolute -right-3 -bottom-2 h-8 w-8 overflow-hidden rounded-full border border-jacarta-100 bg-white text-center hover:border-transparent hover:bg-accent">
                        <input
                          type="file"
                          onChange={(e) => {
                            set_profile_preview(
                              URL.createObjectURL(e.target.files[0])
                            );
                            set_data({
                              ...data,
                              profile_image: e.target.files[0],
                            });
                          }}
                          accept="image/*"
                          className="absolute top-0 left-0 w-full cursor-pointer opacity-0"
                        />
                        <div className="flex h-full items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="h-4 w-4 fill-jacarta-400 group-hover:fill-jacarta-400 cursor-pointer"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                          </svg>
                        </div>
                      </div>
                    </figure>
                  </div>
                  <div className="mt-4">
                    <span className="mb-3 block font-display text-sm text-jacarta-700 dark:text-white">
                      Profile Image
                    </span>
                    <p className="text-sm leading-normal dark:text-jacarta-300">
                      Max size 5mb.
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="profile-twitter"
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Social Links<span className="text-red">*</span>
                  </label>
                  <div className="relative">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="twitter"
                      className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 fill-white dark:fill-jacarta-400"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                    <input
                      type="text"
                      name="twitter"
                      onChange={handle_change}
                      value={data.twitter}
                      id="profile-twitter"
                      className="w-full rounded-t-lg py-3 pl-10 hover:ring-2 hover:ring-accent/10 focus:ring-inset focus:ring-accent border border-gray-200 bg-transparent text-white"
                      placeholder="@twittername"
                    />
                  </div>
                  <div className="relative">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="instagram"
                      className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 fill-white dark:fill-jacarta-400"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                    <input
                      type="text"
                      id="profile-instagram"
                      value={data.instagram}
                      name="instagram"
                      onChange={handle_change}
                      className="-mt-px w-full border-jacarta-100 py-3 pl-10 hover:ring-2 hover:ring-accent/10 focus:ring-inset focus:ring-accent  border border-gray-200 bg-transparent text-white"
                      placeholder="instagramname"
                    />
                  </div>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 fill-white dark:fill-jacarta-400"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z" />
                    </svg>
                    <input
                      type="url"
                      id="profile-website"
                      name="link"
                      value={data.link}
                      onChange={handle_change}
                      className="-mt-px w-full rounded-b-lg border-jacarta-100 py-3 pl-10 hover:ring-2 hover:ring-accent/10 focus:ring-inset focus:ring-accent border border-gray-200 bg-transparent text-white"
                      placeholder="yoursitename.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
};

export default EditGamerProfile;
