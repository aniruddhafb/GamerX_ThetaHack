import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment/moment";
import Loader from "@/components/Loader";
import Head from "next/head";

const Video = ({
  get_video_data,
  post_comment,
  tip_video,
  fetch_video_tips,
}) => {
  const router = useRouter();
  const { slug } = router.query;
  const [comments_length, set_comments_length] = useState(0);
  const [tip_amount, set_tip_amount] = useState(0);
  const [tips, set_tips] = useState([]);

  const [loading, isLoading] = useState();
  const [data, set_data] = useState();
  const [comment, set_comment] = useState();

  const do_comment = async (e) => {
    e.preventDefault();
    await post_comment(slug, comment);
  };

  const make_tip = async () => {
    await tip_video(slug, tip_amount, data.owner.id);
  };

  const get_tips = async () => {
    const tips = await fetch_video_tips();
    set_tips(tips);
  };

  useEffect(() => {
    const video_data = async () => {
      isLoading(true);
      const res = await get_video_data(slug);
      set_data(res);
      isLoading(false);
    };

    if (!slug) return;
    video_data();
    get_tips();
  }, [slug]);

  return (
    <main className="main--area" id="pageBG">
      <Head>
        <title>{data?.name}- GamerX</title>
        <meta name="description" content="About GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ? (
        <div className="pt-[300px] pb-[300px]">
          <Loader />
        </div>
      ) : (
        <section className="blog-area blog-details-area">
          <div className="container">
            <div className="row justify-content-center">
              <form
                onSubmit={do_comment}
                className="blog-post-wrapper"
                style={{ marginBottom: "30px" }}
              >
                <div className="blog-post-item">
                  <div
                    className="blog-post-thumb"
                    style={{
                      marginTop: "60px",
                      marginBottom: "40px",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {data?.id ? (
                      <iframe
                        src={`https://player.thetavideoapi.com/video/${data?.id}`}
                        border="0"
                        width="100%"
                        height="100%"
                        allowFullScreen
                        className="h-[400px] w-[100%]"
                      />
                    ) : (
                      <div className="text-white text-2xl">{data?.state}</div>
                    )}
                  </div>
                  <div className="blog-post-content blog-details-content">
                    <div className="blog-post-meta">
                      <ul className="list-wrap" style={{ color: "white" }}>
                        <li>
                          By
                          <a href="#" style={{ textDecoration: "none" }}>
                            {data?.owner.username}
                          </a>
                        </li>
                        <li>
                          <i className="far fa-calendar-alt"></i> Aug 16, 2023
                        </li>
                        <li>
                          <i className="far fa-comments"></i>
                          {data?.comments.length - 1} comments
                        </li>
                        <li>
                          <i className="far fa-comments"></i>
                          <input
                            type="number"
                            name="tip"
                            id="tip"
                            step="any"
                            onChange={(e) => set_tip_amount(e.target.value)}
                          />
                          <button onClick={make_tip}>tip</button>
                        </li>
                      </ul>
                    </div>
                    {/* tip video  */}
                    <button class=" hover:bg-[#198754] text-[#68fb9a] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2 mb-2">
                      Tip Video
                    </button>
                    <h2 className="title">{data?.name}</h2>
                    <p>{data?.description}</p>

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
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* comments  */}
                <div className="comments-wrap">
                  <h4 className="comments-wrap-title">
                    {data?.comments.length - 1} Comments
                  </h4>
                  {data?.comments.map((e, index) => {
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
                                    <h6 className="name">
                                      {e.owner.data?.username}
                                    </h6>
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
                </div>

                {/* post a comment  */}
                <div className="comment-respond">
                  <h3 className="comment-reply-title">Post a comment</h3>
                  <div className="comment-form" action="#">
                    <div className="form-grp">
                      <textarea
                        name="message"
                        onChange={(e) => set_comment(e.target.value)}
                        placeholder="Write a Comment *"
                        spellCheck="false"
                        required
                      ></textarea>
                    </div>
                    <button type="submit">Post Comment</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Video;
