import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment/moment";
import Loader from "@/components/Loader";
import Head from "next/head";
import Link from "next/link";

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
  const [showTip, isShowTip] = useState(false);

  const [loading, isLoading] = useState();
  const [compLoad, isCompLoad] = useState();
  const [data, set_data] = useState();
  const [comment, set_comment] = useState();

  const do_comment = async (e) => {
    isCompLoad(true);
    e.preventDefault();
    await post_comment(slug, comment);
    isCompLoad(false);
    router.reload();
  };

  const make_tip = async () => {
    isCompLoad(true);
    await tip_video(slug, tip_amount, data.owner.id);
    isCompLoad(false);
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
      console.log({ videodata: res })
      isLoading(false);
    };

    if (!slug) return;
    video_data();
    get_tips();
  }, [slug]);

  const date = new Date(parseInt(data?.upload_date));
  const year = date.getFullYear(); // returns the year (e.g. 2023)
  const month = date.getMonth(); // returns the month (0-11; 0=January, 1=February, etc.)
  const day = date.getDate();

  const time = `${day}/${month}/${year}`;

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
                          <i className="far fa-calendar-alt"></i> {time}
                        </li>
                        <li>
                          <i className="far fa-comments"></i>
                          {data?.comments.length - 1} comments
                        </li>
                      </ul>
                    </div>


                    {/* tip video  */}
                    {!showTip ?
                      <button onClick={() => isShowTip(true)} class=" hover:bg-[#198754] text-[#68fb9a] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-8 mb-8">
                        Add a Tip
                      </button>
                      :
                      <div className="mt-8 mb-16">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-100">
                          Price
                        </label>
                        <div className=" w-[250px] relative mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1.5">
                            <span className="text-gray-500 sm:text-sm">
                              <Image
                                src="../../tfuel.png"
                                height={100}
                                width={100}
                                className="h-[18px] w-[18px]"
                              />
                            </span>
                          </div>
                          <input
                            className="block w-[250px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder="0.00"
                            type="number"
                            name="tip"
                            id="tip"
                            step="any"
                            required
                            onChange={(e) => set_tip_amount(e.target.value)}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            {compLoad ?
                              <button class="flex bg-[#198754] text-[white] font-semibold hover:text-white py-[5px] px-4 border border-blue-500 hover:border-transparent rounded mt-2 mb-2">
                                Sending
                                <svg aria-hidden="true" class="w-5 h-5 mr-2 ml-2 mt-1 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                              </button>
                              :
                              <button onClick={make_tip} class="bg-[#198754] text-[white] font-semibold hover:text-white py-[5px] px-4 border border-blue-500 hover:border-transparent rounded mt-2 mb-2">
                                Send Tip
                              </button>
                            }

                          </div>
                        </div>
                      </div>
                    }



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
                                  {data?.tag}
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
                  </div >
                </div >

                {/* comments  */}
                < div className="comments-wrap" >
                  <h4 className="comments-wrap-title">
                    {data?.comments.length - 1} Comments
                  </h4>
                  {
                    data?.comments.map((e, index) => {
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
                                      <Link href={`/profile/${e.comment.data?.owner.id}`} style={{ textDecoration: "none" }}>
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
                    })
                  }
                </div >

                {/* post a comment  */}
                < div className="comment-respond" >
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
                    {compLoad ?
                      <button type="button" className="flex">
                        Posting
                        <svg aria-hidden="true" class="w-6 h-6 mr-2 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                      </button>
                      :
                      <button type="submit">Post Comment </button>
                    }
                  </div>
                </div >
              </form >
            </div >
          </div >
        </section >
      )}
    </main >
  );
};

export default Video;
