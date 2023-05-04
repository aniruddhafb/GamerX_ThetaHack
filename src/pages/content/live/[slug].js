import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdSend } from "react-icons/md";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import Link from "next/link";
import Loader from "@/components/Loader";
import Head from "next/head";

const LiveStream = ({
  get_liveStream_data,
  db,
  signerAddress,
  fetch_videos,
  get_user_data,
}) => {
  const router = useRouter();
  const { slug } = router.query;

  const [data, set_data] = useState();
  const [videoData, setVideoData] = useState([]);
  const [loading, isLoading] = useState(false);
  const [messages, set_messages] = useState([]);
  const [new_message, set_message_data] = useState("");

  const messagesRef = collection(db, "messages");

  const stream_video = async () => {
    isLoading(true);
    const res = await get_liveStream_data(slug);
    set_data(res);
    const videoRes = await fetch_videos();
    setVideoData(videoRes);
    isLoading(false);
  };

  const send_message = async () => {
    if (new_message.trim() == "") return;
    await addDoc(messagesRef, {
      text: new_message,
      createdAt: serverTimestamp(),
      user: signerAddress,
      room: slug,
    });

    set_message_data("");
  };

  const user_info = async (user_id) => {
    const res = await get_user_data(user_id);
    return res;
  };

  useEffect(() => {
    if (!slug) return;
    stream_video();

    const queryMessages = query(
      messagesRef,
      where("room", "==", slug),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      set_messages(messages);
    });

    // if(signerAddress === )
    // router.events.on("routeChangeStart", () => {
    //   alert("are you sure you wanna exit?");
    // });
    return () => unsubscribe();
  }, [slug]);

  return (
    <section className="blog-area blog-details-area" id="pageBG">
      <Head>
        <title>{data?.stream_data.title} - GamerX</title>
        <meta name="description" content="About GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ? (
        <div className="pt-[300px] pb-[300px]">
          <Loader />
        </div>
      ) : (
        <div className="container">
          <div className="justify-content-center my-6" id="flexCOL">
            <div className="blog-post-wrapper mr-4">
              {/* blog main section  */}
              <div className="blog-post-item">
                <div className="blog-post-thumb">
                  <iframe
                    width="100%"
                    height="500px"
                    src={`https://edge-player-beta.thetatoken.org/?streamId=${slug}`}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="blog-post-content blog-details-content">
                  <div className="blog-post-meta">
                    <ul className="list-wrap">
                      <li style={{ color: "white" }}>
                        By{" "}
                        <Link
                          href={`/profile/${data?.owner.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {data?.owner.username}
                        </Link>
                      </li>
                      <li style={{ color: "white" }}>
                        <i className="far fa-calendar-alt"></i> Aug 16, 2023
                      </li>
                    </ul>
                  </div>
                  <h2 className="title">{data?.stream_data.title}</h2>
                  <p>{data?.stream_data.description}</p>
                  <div className="blog-details-bottom">
                    <div className="row">
                      <div className="col-xl-6 col-md-7">
                        <div className="tg-post-tags">
                          <h5 className="tags-title">tags :</h5>
                          <ul className="list-wrap d-flex flex-wrap align-items-center m-0">
                            <li>
                              <a href="#" style={{ textDecoration: "none" }}>
                                Esports
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xl-6 col-md-5">
                        <div className="blog-post-share justify-content-start justify-content-md-end">
                          <h5 className="share">share :</h5>
                          <ul className="list-wrap">
                            <li>
                              <a href="#">
                                <i className="fab fa-facebook-f"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fab fa-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fab fa-linkedin-in"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* live by  */}
              <div className="blog__avatar-wrap mb-65">
                <div className="blog__avatar-img">
                  <Link href={`/profile/${data?.owner.id}`}>
                    <Image
                      src={data?.owner.profile_image?.replace(
                        "ipfs://",
                        "https://gateway.ipfscdn.io/ipfs/"
                      )}
                      alt="img"
                      height={100}
                      width={100}
                      className="h-[300px] w-[300px]"
                    />
                  </Link>
                </div>
                <div className="blog__avatar-info">
                  <span className="designation">Streamer</span>
                  <h4 className="name">
                    <Link
                      href={`/profile/${data?.owner.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {data?.owner.username}
                    </Link>
                  </h4>
                  <p>{data?.owner.bio}</p>
                </div>
              </div>

              {/* comments  */}
              {/* <div className="comments-wrap">
              <h4 className="comments-wrap-title">3 Comments</h4>
              <div className="latest-comments">
                <ul className="list-wrap">
                  <li>
                    <div className="comments-box">
                      <div className="comments-avatar">
                        <img src="./#/comment03.png" alt="img" />
                      </div>
                      <div className="comments-text">
                        <div className="avatar-name">
                          <h6 className="name">Luna Rose <a href="#" className="comment-reply-link"><i className="fas fa-reply"></i> Reply</a></h6>
                          <span className="date">September 6, 2023</span>
                        </div>
                        <p>Axcepteur sint occaecat atat non proident, sunt culpa officia deserunt mollit anim id est labor umLor emdolor eam enim ad minim veniam quis nostrud today.</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="comment-respond">
              <h3 className="comment-reply-title">Leave a Comment</h3>
              <form className="comment-form" action="#">
                <p className="comment-notes">The comments are visible event after live stream ends *</p>
                <div className="form-grp">
                  <textarea
                    name="message"
                    onChange={(e) => set_comment(e.target.value)}
                    placeholder="Write a Comment *"
                    spellCheck="false"
                  ></textarea>
                </div>
                <button type="submit">Post Comment</button>
              </form>
            </div> */}
            </div>

            {/* right section  */}
            <div className="blog-post-sidebar">
              <aside className="blog-sidebar">
                {/* live chat  */}
                <div className="flex flex-col flex-grow w-full max-w-xl bg-[#182029] shadow-xl rounded-lg overflow-hidden h-[500px] mb-12">
                  <div className="m-3">
                    <h4 className=" text-lg">
                      <i className="far fa-comments"></i> Live Chat
                    </h4>
                  </div>
                  <hr className="h-2 bg-white mt-[-20px]" />
                  <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    {/* single comment  */}
                    {messages.map((e, index) => {
                      return (
                        <div
                          key={e.id}
                          className={`flex w-full mt-2 space-x-3 max-w-xs ${e.user === signerAddress && "ml-auto justify-end"
                            }`}
                        >
                          {/* <Image
                            // src={e.profile_image?.replace(
                            //   "ipfs://",
                            //   "https://gateway.ipfscdn.io/ipfs/"
                            // )}
                            src="../../team02.png"
                            width={100}
                            height={100}
                            className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 mt-4"
                          ></Image> */}
                          <div>
                            <Link
                              href={`/profile/${e.user}`}
                              style={{ textDecoration: "none" }}
                              className="text-xs text-gray-500 leading-none"
                            >
                              {e.user.slice(0, 5) + "..." + e.user.slice(38)}
                            </Link>
                            <div
                              className={`bg-gray-300 p-3 rounded-r-lg rounded-bl-lg ${e.user === signerAddress && "bg-green-600"
                                }`}
                            >
                              <p className="text-sm text-black">{e.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* current user comment  */}
                  </div>

                  <div
                    className="bg-[#182029] p-4 flex"
                    style={{ position: "relative" }}
                  >
                    <input
                      onChange={(e) => set_message_data(e.target.value)}
                      className="flex items-center h-10 w-full rounded px-3 text-sm text-[black]"
                      type="text"
                      placeholder="Say something…"
                    />
                    <div
                      className="absolute right-[24.5px] bg-green-500 p-[9px] rounded-r-sm cursor-pointer hover:bg-green-600"
                      onClick={send_message}
                    >
                      <MdSend className="text-[23px] text-gray-200" />
                    </div>
                  </div>
                </div>

                {/* recent videos  */}
                <div className="blog-widget">
                  <h4 className="fw-title">Recent Videos</h4>
                  <div className="rc__post-wrapper">
                    {videoData.map((e, index) => {
                      return (
                        index < 5 && (
                          <div className="rc__post-item" key={index}>
                            <div className="rc__post-thumb">
                              <Link href={`/content/videos/${e.video.id}`}>
                                <Image
                                  src={e.video.thumbnail?.replace(
                                    "ipfs://",
                                    "https://gateway.ipfscdn.io/ipfs/"
                                  )}
                                  height={100}
                                  width={100}
                                  alt="img"
                                />
                              </Link>
                            </div>
                            <div className="rc__post-content">
                              <h6 className="title">
                                <Link
                                  href={`/content/videos/${e.video.id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  {e.video.name}
                                </Link>
                              </h6>
                              <span className="date">aug 19, 2023</span>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LiveStream;
