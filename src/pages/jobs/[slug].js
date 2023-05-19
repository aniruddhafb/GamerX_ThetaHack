import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const JobID = ({ get_job_byId, apply_to_job, get_all_jobs }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [job, set_job] = useState({});
  const [jobs, set_jobs] = useState([]);
  const [loading, isLoading] = useState(false);

  const [apply_job, set_apply_job] = useState({
    name: "",
    email: "",
    resume: "",
  });

  const get_job_data = async () => {
    isLoading(true);
    const res = await get_job_byId(slug);
    set_job(res);
    isLoading(false);
  };

  const handle_submit = async (e) => {
    isLoading(true);
    e.preventDefault();
    await apply_to_job(slug, apply_job);
    isLoading(false);
  };

  const get_jobs = async () => {
    isLoading(true);
    const jobs = await get_all_jobs();
    console.log({ jobslist: jobs })
    set_jobs(jobs);
    isLoading(false);
  };

  useEffect(() => {
    if (!slug) return;
    get_job_data();
    get_jobs();
  }, [slug]);

  return (
    <section className="tournament__details-area" id="pageBG">
      <Head>
        <title>Gaming Job - GamerX</title>
        <meta name="description" content="Job On GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ? (
        <div className="pt-[300px] pb-[300px]" id="pageBG">
          <Loader />
        </div>
      ) : (
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
                      <Link href={`/profile/${job?.owner?.id}`} style={{ textDecoration: "none" }}>
                        {job?.company_name}
                      </Link>
                    </li>
                    <li>
                      <i className="far fa-calendar-alt"></i> Aug 16, 2023
                    </li>
                    <li>
                      Min Payout :{" "}
                      <a
                        href="#!"
                        style={{ textDecoration: "none", color: "#68fb9a" }}
                      >
                        {job?.min_salary}$
                      </a>
                    </li>
                    <li>
                      Max Payout :{" "}
                      <a
                        href="#!"
                        style={{ textDecoration: "none", color: "#68fb9a" }}
                      >
                        {job?.max_salary}$
                      </a>
                    </li>
                  </ul>
                </div>

                <p style={{ marginBottom: "15px" }}>Hiring for the role of {job?.job_role}</p>

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
                    <label htmlFor="resume" style={{ marginLeft: "6px" }}>Your Name</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        set_apply_job({ ...apply_job, name: e.target.value })
                      }
                      placeholder="Full Name *"
                      required
                    />
                    <label htmlFor="resume" style={{ marginLeft: "6px" }}>Your Email</label>
                    <input
                      type="email"
                      onChange={(e) =>
                        set_apply_job({ ...apply_job, email: e.target.value })
                      }
                      placeholder="Vaild Email *"
                      required
                    />
                    <label htmlFor="resume" style={{ marginLeft: "6px" }}>Your Resume</label>
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
                              {job?.job_role}
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
                      {jobs?.map((e) => (
                        <div className="trending__matches-item" key={e.data.id}>
                          <div className="trending__matches-thumb">
                            <Link href={e.data.id} target="_blank" style={{ textDecoration: "none" }}>
                              <Image
                                src={e.data.company_logo.replace(
                                  "ipfs://",
                                  "https://gateway.ipfscdn.io/ipfs/"
                                )}
                                height={100}
                                width={100}
                                alt="img"
                                style={{ height: "60px", width: '100%' }}
                              />
                            </Link>
                          </div>
                          <div className="trending__matches-content">
                            <div className="info">
                              <h5 className="title">
                                <Link href={e.data.id} target="_blank" style={{ textDecoration: "none" }}>
                                  {e.data.title}
                                </Link>
                              </h5>
                              <div className="flex justify-center align-middle">
                                <span className="price">{e.data.max_salary}$</span>
                                <span className="ml-[6px] text-[white] text-[15px]">
                                  {e.data.job_role}
                                </span>
                              </div>
                            </div>
                            <div className="play">
                              <Link href={e.data.id} target="_blank" className="popup-video">
                                <i className="far fa-play-circle"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default JobID;
