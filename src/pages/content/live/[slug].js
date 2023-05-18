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
  end_livestream,
  send_superchat,
}) => {
  const router = useRouter();
  const { slug } = router.query;

  const [data, set_data] = useState();
  const [videoData, setVideoData] = useState([]);
  const [loading, isLoading] = useState(false);
  const [streamStatusLoading, isStreamStatusLoading] = useState(false);
  const [messages, set_messages] = useState([]);
  const [new_message, set_message_data] = useState("");
  const [superchat_data, set_superchat_data] = useState({
    token: "",
    message: "",
    can_show: false,
  });
  const messagesRef = collection(db, "messages");

  const stream_video = async () => {
    isLoading(true);
    const res = await get_liveStream_data(slug);
    console.log({ res });
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

  const end_stream = async () => {
    isStreamStatusLoading(true);
    await end_livestream(slug);
    isStreamStatusLoading(false);
    router.reload();
  };

  const make_superchat = async () => {
    await send_superchat(
      slug,
      data?.owner.id,
      superchat_data.token,
      superchat_data.message
    );
    set_superchat_data({ ...superchat_data, can_show: true });
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
                  {data?.stream_data?.isActive ? (
                    <iframe
                      width="100%"
                      height="500px"
                      src={`https://edge-player-beta.thetatoken.org/?streamId=${slug}`}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <iframe
                      width="100%"
                      height="500px"
                      src={`https://player.thetavideoapi.com/video/video_mi79cukj468ps518fbsvnkf81q`}
                      allowFullScreen
                    ></iframe>
                  )}
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
                  {data?.owner.id === signerAddress &&
                    (streamStatusLoading ? (
                      <button className=" hover:bg-[#198754] text-[#68fb9a] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-8 mb-8">
                        Ending Stream
                      </button>
                    ) : (
                      <button
                        onClick={end_stream}
                        className=" hover:bg-[#198754] text-[#68fb9a] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-8 mb-8"
                      >
                        {data?.stream_data?.isActive
                          ? "End Live Stream"
                          : "You Have Ended This Stream"}
                      </button>
                    ))}
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

              {/* fetch superchats  */}
              {/* <div className="comments-wrap">
                <h4 className="comments-wrap-title">
                  {data?.comments?.length} Comments
                </h4>
                {super.map((e, index) => {
                  const date = new Date(parseInt(e.comment.data?.date));
                  const year = date.getFullYear(); // returns the year (e.g. 2023)
                  const month = date.getMonth(); // returns the month (0-11; 0=January, 1=February, etc.)
                  const day = date.getDate();

                  const time = `${day}/${month}/${year}`;
                  return (
                    e.owner && (
                      <div key={index} className="latest-comments">
                        <ul className="list-wrap">
                          <li>
                            <div className="comments-box">
                              <div className="comments-avatar">
                                <Image
                                  src={e.owner.data?.profile_image.replace(
                                    "ipfs://",
                                    "https://gateway.ipfscdn.io/ipfs/"
                                  )}
                                  alt="img"
                                  width={100}
                                  height={100}
                                  className="h-[100px] w-[100px]"
                                />
                              </div>
                              <div className="comments-text">
                                <div className="avatar-name">
                                  <Link
                                    href={`/profile/${e.comment.data?.owner.id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <h6 className="name">
                                      {e.owner.data?.username}
                                    </h6>
                                  </Link>
                                  <span
                                    className="date text-white"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {time}
                                  </span>
                                </div>
                                <p>{e.comment.data?.comment_data}</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )
                  );
                })}
              </div> */}

              {/* post superchat  */}
              <div className="comment-respond">
                <h3 className="comment-reply-title">Send a superchat</h3>
                <div className="comment-form" action="#!">
                  <div className="form-grp">
                    <input
                      placeholder="Amount In TFUEL Tokens *"
                      type="number"
                      name="superchatAmount"
                      step="any"
                      onChange={(e) =>
                        set_superchat_data({
                          ...superchat_data,
                          token: e.target.value,
                        })
                      }
                      required
                    />
                    <textarea
                      name="message"
                      onChange={(e) =>
                        set_superchat_data({
                          ...superchat_data,
                          message: e.target.value,
                        })
                      }
                      placeholder="Write a Comment *"
                      spellCheck="false"
                      required
                    ></textarea>
                  </div>
                  {loading ? (
                    <button type="button" className="flex">
                      Sending
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 mr-2 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button onClick={make_superchat} type="submit">
                      Send Superchat{" "}
                    </button>
                  )}
                </div>
              </div>
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
                          className={`flex w-full mt-2 space-x-3 max-w-xs ${
                            e.user === signerAddress && "ml-auto justify-end"
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
                              className={`bg-gray-300 p-3 rounded-r-lg rounded-bl-lg ${
                                e.user === signerAddress && "bg-green-600"
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
