import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

const JobID = ({ get_job_byId, apply_to_job }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [job, set_job] = useState({});

  const [apply_job, set_apply_job] = useState({
    name: "",
    email: "",
    resume: "",
  });

  const get_job_data = async () => {
    const res = await get_job_byId(slug);
    console.log(res);
    set_job(res);
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    console.log(apply_job);
    await apply_to_job(slug, apply_job);
    router.push("/");
  };

  useEffect(() => {
    if (!slug) return;
    get_job_data();
  }, [slug]);

  return (
    <section className="tournament__details-area" id="pageBG">
      <Head>
        <title>Gaming Job - GamerX</title>
        <meta name="description" content="Job On GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container mt-[60px]">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="blog-post-wrapper">
            <div
              className="tournament__details-content"
              style={{ marginRight: "32px" }}
            >
              {/* job title  */}
              <h2 className="title">{job?.title}</h2>

              {/* employer data  */}
              <div className="blog-post-meta">
                <ul className="list-wrap" style={{ color: "white" }}>
                  <li>
                    Posted By
                    <a href="#!" style={{ textDecoration: "none" }}>
                      Admin
                    </a>
                  </li>
                  <li>
                    <i className="far fa-calendar-alt"></i> Aug 16, 2023
                  </li>
                  <li>
                    Payout :{" "}
                    <a
                      href="#!"
                      style={{ textDecoration: "none", color: "#68fb9a" }}
                    >
                      $34000
                    </a>
                  </li>
                </ul>
              </div>

              {/* job description  */}
              <h4 className="tournament__details-form-title mt-2">
                Job Description
              </h4>
              <p style={{ marginBottom: "35px" }}>{job?.description}</p>

              {/* job tech stack  */}
              <h4 className="tournament__details-form-title">
                Teck stack and requirements
              </h4>
              <p style={{ marginBottom: "35px" }}>{job?.requirements}</p>

              {/* job company Info  */}
              <h4 className="tournament__details-form-title">Important Info</h4>
              <div className="blog-post-meta">
                <ul
                  className="list-wrap"
                  style={{ color: "white", marginTop: "15px" }}
                >
                  <li>Company Name : {job?.company_name}</li>
                  <li>Job Type : {job?.job_type}</li>
                  <li>Contract : {job?.duration}</li>
                  <li>
                    <i className="far fa-comments"></i>3 Applicants
                  </li>
                </ul>
              </div>

              {/* apply for role  */}
              <div className="tournament__details-form">
                <h4 className="tournament__details-form-title">
                  Apply for this post
                </h4>
                <p>
                  If you think you fit into this job role fill the below form
                  and apply
                </p>
                <form
                  onSubmit={handle_submit}
                  action="tournament-details.html#"
                >
                  <input
                    type="text"
                    onChange={(e) =>
                      set_apply_job({ ...apply_job, name: e.target.value })
                    }
                    placeholder="Your Name *"
                    required
                  />
                  <input
                    type="email"
                    onChange={(e) =>
                      set_apply_job({ ...apply_job, email: e.target.value })
                    }
                    placeholder="Your Email *"
                    required
                  />
                  <label htmlFor="resume">Upload Resume</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      set_apply_job({ ...apply_job, resume: e.target.value })
                    }
                    name="resume"
                    required
                  />
                  <button
                    className="tournament__details-form-btn"
                    fdprocessedid="zi62r"
                    type="submit"
                  >
                    Apply
                  </button>
                </form>
              </div>
              <div className="blog-details-bottom">
                <div className="row">
                  <div className="col-xl-6 col-md-7">
                    <div className="tg-post-tags">
                      {/* job tag */}
                      <h5 className="tags-title">tags :</h5>
                      <ul className="list-wrap d-flex flex-wrap align-items-center m-0">
                        <li>
                          <a href="#!" style={{ textDecoration: "none" }}>
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
                          <a href="#!">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
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
          <div className="blog-post-sidebar">
            <div className="blog-sidebar tournament__sidebar">
              {/* search bar  */}
              <div className="shop__widget">
                <h4 className="shop__widget-title">search</h4>
                <div className="shop__widget-inner">
                  <div className="shop__search">
                    <input type="text" placeholder="Search here" />
                    <button className="p-0 border-0" fdprocessedid="966olh">
                      <i className="flaticon-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* similar jobs  */}
              <div className="shop__widget">
                <h4 className="shop__widget-title">Similar Opportunities</h4>
                <div className="shop__widget-inner">
                  <div className="trending__matches-list">
                    {/* loop other jobs here max 10 */}
                    <div className="trending__matches-item">
                      <div className="trending__matches-thumb">
                        <Link href="#!" style={{ textDecoration: "none" }}>
                          <Image
                            src={`../../nftCard1.jpg`}
                            height={100}
                            width={100}
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="trending__matches-content">
                        <div className="info">
                          <h5 className="title">
                            <Link href="#!" style={{ textDecoration: "none" }}>
                              FoxTie Max
                            </Link>
                          </h5>
                          <div className="flex justify-center align-middle">
                            <span className="price">$ 7500</span>
                            <span className="ml-[6px] text-[white] text-[15px]">
                              Full Stack
                            </span>
                          </div>
                        </div>
                        <div className="play">
                          <Link href="#!" className="popup-video">
                            <i className="far fa-play-circle"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobID;
