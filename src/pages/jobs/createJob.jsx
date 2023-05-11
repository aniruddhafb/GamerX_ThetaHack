import Loader from "@/components/Loader";
import Head from "next/head";
import React, { useState } from "react";

const CreateJob = () => {
  const [loading, isLoading] = useState(false);

  return (
    <div id="pageBG">
      <Head>
        <title>Post a Job - GamerX</title>
        <meta
          name="description"
          content="Go Live On GamerX"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ?
        <div className="pt-[300px] pb-[300px]" id="pageBG">
          <Loader />
        </div>
        :
        <section className="blog-area blog-details-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="blog-post-wrapper">
                <div className="comment-respond" style={{ marginTop: "30px" }}>
                  <h3 className="comment-reply-title">Post Job Request</h3>
                  <form
                    className="comment-form"
                    action="#"
                  >
                    <p className="comment-notes pb-4">
                      Post a gaming job opportunity on GamerX platform and hire top gamers and creators..
                    </p>
                    <div className="row">
                      <div className="col-sm-6 relative">
                        <div className="form-grp">
                          <input
                            name="logo"
                            type="file"
                            required
                          />
                        </div>
                        <span
                          style={{
                            position: "absolute",
                            top: "-30px",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Company Logo*
                        </span>
                      </div>

                      {/* company name  */}
                      <div className="col-sm-6 relative">
                        <div className="form-grp">
                          <input
                            type="text"
                            name="companyName"
                            placeholder="Enter your company name"
                            required
                          />
                        </div>
                        <span
                          style={{
                            position: "absolute",
                            top: "-30px",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Company Name*
                        </span>
                      </div>

                      {/* job location */}
                      <div className="col-sm-6 relative" style={{ marginTop: "20px" }}>
                        <div className="form-grp">
                          <input
                            type="text"
                            name="jobLocation"
                            placeholder="Enter your company location"
                            required
                          />
                        </div>
                        <span
                          style={{
                            position: "absolute",
                            top: "-30px",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Job Location*
                        </span>
                      </div>

                      {/* Job Type  */}
                      <div className="col-sm-6 relative" style={{ marginTop: "20px" }}>
                        <div className="form-grp">
                          <select
                            name="jobType"
                          >
                            <option value="Remote" className="bg-gray-800">
                              Remote
                            </option>
                            <option value="inPerson" className="bg-gray-800">
                              In-Person
                            </option>
                            <option value="Flexible" className="bg-gray-800">
                              Flexible
                            </option>
                          </select>
                        </div>
                        <span
                          style={{
                            position: "absolute",
                            top: "-30px",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Job Type*{" "}
                        </span>
                      </div>

                      {/* job salary */}
                      <div className="col-sm-6 relative" style={{ marginTop: "20px" }}>
                        <div className="form-grp">
                          <input
                            type="text"
                            name="jobSalary"
                            placeholder="Payout Package"
                            required
                          />
                        </div>
                        <span
                          style={{
                            position: "absolute",
                            top: "-30px",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Job Package*
                        </span>
                      </div>

                      {/* Job Contract  */}
                      <div className="col-sm-6 relative" style={{ marginTop: "20px" }}>
                        <div className="form-grp">
                          <select
                            name="contractDuration"
                          >
                            <option value="1 Year" className="bg-gray-800">
                              1 Year
                            </option>
                            <option value="2 Year" className="bg-gray-800">
                              2 Year
                            </option>
                            <option value="3 Year" className="bg-gray-800">
                              3 Year
                            </option>
                            <option value="No Contract" className="bg-gray-800">
                              No Contract
                            </option>
                          </select>
                        </div>
                        <span
                          style={{
                            position: "absolute",
                            top: "-30px",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Contract Duration*{" "}
                        </span>
                      </div>

                      {/* title  */}
                      <div className="relative mt-4">
                        <div className="form-grp">
                          <input
                            type="text"
                            name="jobTitle"
                            placeholder="Give a title to your Job"
                            required
                          />
                        </div>
                        <span
                          style={{
                            position: "absolute",
                            top: "-30px",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Job Title*
                        </span>
                      </div>
                    </div>

                    {/* desc  */}
                    <div className=" relative mt-4">
                      <div className="form-grp">
                        <textarea
                          name="description"
                          placeholder="Add a long description explaining the work, office culture"
                        ></textarea>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "-30px",
                          color: "white",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Job Description*
                      </span>
                    </div>

                    {/* requirements  */}
                    <div className="relative mt-4">
                      <div className="form-grp">
                        <textarea
                          name="jobRequirements"
                          placeholder="Add few requirements and tech stack"
                        ></textarea>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "-30px",
                          color: "white",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Job Requirements / TechStack*
                      </span>
                    </div>

                    {/* stream tag  */}
                    <div className="col-sm-6 relative">
                      <div className="form-grp">
                        <select
                          name="jobRole"
                          style={{ marginTop: "55px" }}
                        >
                          <option value="Blockchain Developer" className="bg-gray-800">
                            Blockchain Developer
                          </option>
                        </select>
                      </div>
                      <span
                        style={{
                          position: "absolute",
                          top: "-30px",
                          color: "white",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Job Role*{" "}
                      </span>
                    </div>

                    <button type="submit">Post Request</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  );
};

export default CreateJob;
