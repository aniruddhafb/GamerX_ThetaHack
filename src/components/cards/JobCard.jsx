import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const JobCard = ({ company_logo, job_role, min_salary, max_salary, job_type, dataID }) => {
    return (
        <div className="tournament__list-item wow fadeInUp">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1116.562"
                height="163.37"
                viewBox="0 0 1116.562 163.37"
            >
                <path
                    className="background-path"
                    d="M708,1784l28-27s4.11-5.76,18-6,702-1,702-1a37.989,37.989,0,0,1,16,9c7.47,7.08,37,33,37,33s9.02,9.47,9,18,0,42,0,42-0.19,9.43-11,19-32,30-32,30-5.53,11.76-21,12-985,0-985,0a42.511,42.511,0,0,1-26-13c-11.433-12.14-34-32-34-32s-6.29-5.01-7-17,0-43,0-43-1-5.42,12-18,34-32,34-32,10.4-8.28,19-8,76,0,76,0a44.661,44.661,0,0,1,21,11c9.268,8.95,22,22,22,22Z"
                    transform="translate(-401.563 -1749.875)"
                ></path>
            </svg>
            <div className="tournament__list-content">
                <div className="tournament__list-thumb">
                    <Link href="#!">
                        <Image
                            src={company_logo.replace(
                                "ipfs://",
                                "https://gateway.ipfscdn.io/ipfs/"
                            )}
                            height={100}
                            width={100}
                            alt="thumbMain"
                            style={{
                                borderRadius: "50%",
                                height: "74px",
                                width: "80px",
                            }}
                        />
                    </Link>
                </div>
                <div className="tournament__list-name">
                    <h6 className="title">Role</h6>
                    <span className="status">
                        {job_role}
                    </span>
                </div>
                <div className="tournament__list-prize">
                    <h6 className="title">Payout</h6>
                    <span>{min_salary}$</span>
                    <span>-</span>
                    <span>{max_salary}$</span>
                </div>
                <div className="tournament__list-time">
                    <h6 className="title">Work Type</h6>
                    <i className="fas fa-clock text-[white]"></i>
                    <span>{job_type}</span>
                </div>
                <div className="tournament__list-live">
                    <Link
                        href={`/jobs/${dataID}`}
                        style={{
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Apply Now{" "}
                        <i className="far fa-play-circle ml-[15px]"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default JobCard