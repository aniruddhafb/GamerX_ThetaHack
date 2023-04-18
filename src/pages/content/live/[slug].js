import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import videojs from "video.js";

const liveStream = ({ get_liveStream_data }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, set_data] = useState();
  const stream_video = async () => {
    if (!slug) return;
    const res = await get_liveStream_data(slug);
    console.log(res);
    set_data(res);
  };
  useEffect(() => {
    stream_video();
  }, [slug]);
  return (
    <section className="blog-area blog-details-area" id="pageBG">
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
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="blog-post-content blog-details-content">
                <div className="blog-post-meta">
                  <ul className="list-wrap">
                    <li>By<a href="#">Admin</a></li>
                    <li><i className="far fa-calendar-alt"></i> Aug 16, 2023</li>
                  </ul>
                </div>
                <h2 className="title">play to earn crypto games place</h2>
                <p>Excepteur sint occaecat atat non proident, sunt in culpa qui officia deserunt mollit anim id est labor umLor em ipsum dolor amet, consteur adiscing Duis elentum solliciin is yaugue euismods Nulla ullaorper. Ipsum is simply dummy text of  printing and typeetting industry. Lorem Ipsum has been the industry's standsaard sipiscing Duis elementum solliciin. Duis aute irure dolor in repderit in voluptate velit esse cillum dolorliquip ex ea commodo repderit in voluptate consequat nulla ullaorper.</p>
                <div className="blog-details-bottom">
                  <div className="row">
                    <div className="col-xl-6 col-md-7">
                      <div className="tg-post-tags">
                        <h5 className="tags-title">tags :</h5>
                        <ul className="list-wrap d-flex flex-wrap align-items-center m-0">
                          <li><a href="#">Esports</a>,</li>
                          <li><a href="#">Fantasy</a>,</li>
                          <li><a href="#">game</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-5">
                      <div className="blog-post-share justify-content-start justify-content-md-end">
                        <h5 className="share">share :</h5>
                        <ul className="list-wrap">
                          <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                          <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                          <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
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
                <a href="#"><img src="./#/avatar.jpg" alt="img" /></a>
              </div>
              <div className="blog__avatar-info">
                <span className="designation">Live By</span>
                <h4 className="name"><a href="#">Quantum</a></h4>
                <p>Axcepteur sint occaecat atat non proident, sunt culpa officia deserunt mollit anim id est labor umLor emdolor.</p>
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
                  <h4 className=" text-lg"><i className="far fa-comments"></i> Live Chat</h4>
                </div>
                <hr className="h-2 bg-white mt-[-20px]" />
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                  {/* single comment  */}
                  <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                  </div>

                  {/* current user comment  */}
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                </div>

                <div className="bg-[#182029] p-4">
                  <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Say something…" />
                </div>
              </div>

              {/* recent videos  */}
              <div className="blog-widget">
                <h4 className="fw-title">Recent Videos</h4>
                <div className="rc__post-wrapper">
                  <div className="rc__post-item">
                    <div className="rc__post-thumb">
                      <a href=""><img src="./#/rc_post01.jpg" alt="img" /></a>
                    </div>
                    <div className="rc__post-content">
                      <h6 className="title"><a href="">zombie TOURNAMENT
                        land max</a></h6>
                      <span className="date">aug 19, 2023</span>
                    </div>
                  </div>
                  <div className="rc__post-item">
                    <div className="rc__post-thumb">
                      <a href=""><img src="./#/rc_post02.jpg" alt="img" /></a>
                    </div>
                    <div className="rc__post-content">
                      <h6 className="title"><a href="">play to earn crypto games</a></h6>
                      <span className="date">aug 19, 2023</span>
                    </div>
                  </div>
                  <div className="rc__post-item">
                    <div className="rc__post-thumb">
                      <a href=""><img src="./#/rc_post03.jpg" alt="img" /></a>
                    </div>
                    <div className="rc__post-content">
                      <h6 className="title"><a href="">nft games android
                        land max</a></h6>
                      <span className="date">aug 19, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default liveStream;
