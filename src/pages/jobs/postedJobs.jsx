import Loader from "@/components/Loader";
import JobCard from "@/components/cards/JobCard";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const PostedJobs = ({ get_all_jobs }) => {
  const [loading, setLoading] = useState(false);
  const [jobs, set_jobs] = useState([]);

  const get_jobs = async () => {
    setLoading(true);
    const jobs = await get_all_jobs();
    set_jobs(jobs);
    setLoading(false);
  };

  useEffect(() => {
    get_jobs();
  }, []);

  return (
    <section className="shop-area" id="pageBG">
      <Head>
        <title>Explore Posted Jobs - GamerX</title>
        <meta name="description" content="About GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container mt-12">
        <div className="row justify-content-center">
          <div>
            <div className="shop__top-wrap">
              <div className="row align-items-center">
                <div className="col-lg-8 col-sm-6">
                  <div className="shop__showing-result">
                    <p style={{ fontSize: "25px" }}>Posted Jobs</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="shop__ordering">
                    <select
                      name="orderby"
                      className="orderby"
                      fdprocessedid="8pe1d8"
                    >
                      <option value="Default sorting">Default sorting</option>
                      <option value="Sort by latest">Sort by latest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <section className="tournament__list-area section-pb-120 section-pt-120">
                <div className="container">
                  <div className="tournament__wrapper">
                    <div className="row">
                      <div className="col-12">
                        <div className="tournament__list-item-wrapper">
                          {/* loop here  */}
                          {jobs?.map((e) => (
                            <JobCard
                              key={e.data.id}
                              company_logo={e.data.company_logo}
                              job_role={e.data.job_role}
                              min_salary={e.data.min_salary}
                              max_salary={e.data.max_salary}
                              job_type={e.data.job_type}
                              dataID={e.data.id}
                            />
                          ))}
                          {jobs?.length <= 0 &&
                            <p style={{ marginTop: "52px", fontSize: "20px" }}>No Active Jobs Found</p>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostedJobs;
