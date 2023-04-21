import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const exploreLiveContent = () => {
  return (
    <section className="shop-area" id='pageBG'>
      <div className="container mt-12">
        <div className="row justify-content-center">
          <div>
            <div className="shop__top-wrap">
              <div className="row align-items-center">
                <div className="col-lg-8 col-sm-6">
                  <div className="shop__showing-result">
                    <p style={{ fontSize: "25px" }}>Explore Live</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="shop__ordering">
                    <select name="orderby" className="orderby" fdprocessedid="8pe1d8">
                      <option value="Default sorting">Default sorting</option>
                      <option value="Sort by popularity">Sort by popularity</option>
                      <option value="Sort by average rating">Sort by average rating</option>
                      <option value="Sort by latest">Sort by latest</option>
                      <option value="Sort by latest">Sort by latest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap justify-around align-middle'>
              {/* loop here  */}
              <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9">
                <div className="nft-item__box" style={{ backgroundColor: "transparent" }}>
                  <div className="nft-item__content">
                    <Link href="/content/videos" style={{ textDecoration: "none", position: "relative", zIndex: "10" }}>
                      <Image
                        className='w-[100%] h-[200px] rounded-md'
                        src="../../../nft_img01.jpg"
                        height={100}
                        width={100}
                        alt="img" />
                      <div className='absolute top-[30%] right-[46%]'>
                        <i className="flaticon-play text-white text-4xl hover:text-green-500"></i>
                      </div>
                      <h4 className="title mt-4">
                        wolf gaming is a perfect gameplay and on so..
                      </h4>
                    </Link>

                    <div className="nft-item__avatar">
                      <div className="avatar-img" style={{ zIndex: "11" }}>
                        <Link href="#">
                          <Image
                            src="../../../nft_avatar01.png"
                            height={100}
                            width={100}
                            className='h-[30px] w-[30px]'
                            alt="img" />
                        </Link>
                      </div>
                      <div className="avatar-name">
                        <h5 className="name" style={{ zIndex: "11" }}>
                          <Link href="#" style={{ textDecoration: "none", fontSize: "15px" }}>
                            Alax Max
                          </Link>
                        </h5>
                        <span className="designation">4/12/2023</span>
                        <span className="designation">No views</span>
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
  )
};

export default exploreLiveContent;
