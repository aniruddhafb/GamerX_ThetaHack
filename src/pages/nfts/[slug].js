import React from "react";

const nftPage = () => {
  return (
    <section className="shop-area shop-details-area" id="pageBG">
      <div className="container">
        <div className="flex flex-wrap pt-30">
          <div className="shop__details-images-wrap">
            <div className="tab-content" id="imageTabContent">
              <div
                className="tab-pane show active"
                id="one"
                role="tabpanel"
                aria-labelledby="one-tab"
              >
                <a
                  href="./nftpage_files/shop_details01.jpg"
                  className="popup-image"
                >
                  <img src="./nftpage_files/shop_details01.jpg" alt="img" />
                </a>
              </div>
            </div>
          </div>
          <div className="shop__details-content">
            <h2 className="title">game controller</h2>
            <div className="shop__details-price">
              <span className="amount">
                106 <span className="stock-status">TFUEL</span>
              </span>
            </div>
            <div className="shop__details-short-description">
              <p>
                Lorem ipsum dolor sit amet, consteur adipiscing Duis elementum
                solliciin is yaugue euismods Nulla ullaorper.
              </p>
            </div>
            <div className="shop__details-model d-flex align-items-center">
              <p className="model m-0">Tags:</p>
              <ul className="list-wrap d-flex align-items-center">
                <li className="active">Esports</li>
              </ul>
            </div>
            <div className="shop__details-qty">
              <div className="cart-plus-minus d-flex flex-wrap align-items-center">
                <button
                  className="shop__details-cart-btn"
                  fdprocessedid="6l3zsn"
                >
                  Buy
                </button>
              </div>
            </div>
            <div className="shop__details-bottom">
              <div className="product_share">
                <b>Share :</b>
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="product__desc-wrap">
              <ul className="nav nav-tabs" id="descriptionTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="description-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#description"
                    type="button"
                    role="tab"
                    aria-controls="description"
                    aria-selected="true"
                    fdprocessedid="tke65y"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="info-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#info"
                    type="button"
                    role="tab"
                    aria-controls="info"
                    aria-selected="false"
                    fdprocessedid="lkxd8"
                  >
                    Other Information
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="descriptionTabContent">
                <div
                  className="tab-pane animation-none fade active show"
                  id="description"
                  role="tabpanel"
                  aria-labelledby="description-tab"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consteur adipiscing Duis
                    elementum solliciin is yaugue euismods Nulla ullaorper.
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                  <p>
                    Don't look even slightly believable. If you are going to use
                    a passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first true
                    generator on the Internet. It uses a dictionary of over 200
                    Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable.
                    The generated Lorem Ipsum is therefore always free from
                    repetition, injected humour.
                  </p>
                </div>
                <div
                  className="tab-pane animation-none fade"
                  id="info"
                  role="tabpanel"
                  aria-labelledby="info-tab"
                >
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <th scope="row">General</th>
                        <td>PS5 Digital Platform</td>
                      </tr>
                      <tr>
                        <th scope="row">Technical Information</th>
                        <td>Qualcomm Snapdragon XR2</td>
                      </tr>
                      <tr>
                        <th scope="row">Display</th>
                        <td>3664 x 1920</td>
                      </tr>
                      <tr>
                        <th scope="row">RAM &amp; Storage</th>
                        <td>8GB/256GB</td>
                      </tr>
                      <tr>
                        <th scope="row">Included</th>
                        <td>PS5 VR Streaming Assistant</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="related__product-area">
          <div className="related__product-wrapper">
            <h2 className="related-title">Similar NFTs</h2>
            <div className="row justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default nftPage;
