import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Head from "next/head";

const NftPage = ({ fetch_NFT_info, list_nft, signerAddress, executeSale }) => {
  const [loading, isLoading] = useState(true);
  const [compLoading, isCompLoading] = useState(false);
  const [props, showProps] = useState(true);
  const [otherInfo, showOtherInfo] = useState(false);
  const [nft_data, set_nft_data] = useState({});

  const [listing_price, set_listing_price] = useState(0);

  const router = useRouter();
  const { slug, tokenid } = router.query;

  const fetch_nft_data = async () => {
    isLoading(true);
    const res = await fetch_NFT_info(slug, tokenid);
    console.log({ singleNFTDATA: res });
    set_nft_data(res);
    isLoading(false);
  };

  const sell_nft = async (tokenId, price, collection_address) => {
    isCompLoading(true);
    const res = await list_nft(tokenId, listing_price, collection_address);
    isCompLoading(false);
    // router.reload();
  };

  const buy_nft = async () => {
    isCompLoading(true);
    const res = await executeSale(tokenid, slug, nft_data.listingPrice);
    isCompLoading(false);
    router.reload();
  };

  useEffect(() => {
    if (!slug) return;
    fetch_nft_data();
  }, [slug]);

  return (
    <section className="shop-area shop-details-area" id="pageBG">
      <Head>
        <title>NFT - GamerX</title>
        <meta name="description" content="NFTs GamerX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {loading ? (
        <div className="pt-[300px] pb-[300px]" id="pageBG">
          <Loader />
        </div>
      ) : (
        <div className="container">
          <div className="flex flex-wrap pt-30">
            <div className="shop__details-images-wrap">
              <div className="tab-content" style={{ width: "90%" }}>
                <div className="tab-pane show active">
                  <Image
                    src={nft_data?.ipfsData?.image.replace(
                      "ipfs://",
                      "https://gateway.ipfscdn.io/ipfs/"
                    )}
                    height={100}
                    width={100}
                    alt="img"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className="shop__details-content">
              <h2 className="mb-2 text-[15px] text-[#45f882]">
                <a href={`/collection/${nft_data?.collection_id}`} style={{ textDecoration: "none" }}>
                  {nft_data?.collection_name}
                </a>
              </h2>

              <h2 className="title">{nft_data?.ipfsData?.title}</h2>

              <div className="shop__details-short-description">
                <p>{nft_data?.ipfsData?.description}</p>
              </div>
              <div className="shop__details-model d-flex align-items-center">
                <p className="model m-0">Tags:</p>
                <ul className="list-wrap d-flex align-items-center">
                  <li className="active">{nft_data?.ipfsData.tag}</li>
                </ul>
              </div>
              <div className="trendingNft__item-avatar mb-4">
                {/* owner  */}
                <div className="image">
                  <a href={`/profile/${nft_data?.nft_owner}`}>
                    <img src="../../nft_avatar01.png" alt="img" />
                  </a>
                </div>
                <div className="info">
                  <h6 className="name">Owner</h6>
                  <a
                    href={`/profile/${nft_data?.nft_owner}`}
                    className="userName"
                    style={{ textDecoration: "none" }}
                  >
                    {nft_data?.nft_owner.slice(0, 5) +
                      "..." +
                      nft_data?.nft_owner.slice(38)}
                  </a>
                </div>

                {/* creator  */}
                <div className="phoneGayab image ml-10">
                  <a href={`/profile/${nft_data?.user_id}`}>
                    <img src="../../nft_avatar01.png" alt="img" />
                  </a>
                </div>
                <div className="phoneGayab info">
                  <h6 className="name">Creator</h6>
                  <a
                    href={`/profile/${nft_data?.user_id}`}
                    className="userName"
                    style={{ textDecoration: "none" }}
                  >
                    {nft_data?.user_id.slice(0, 5) +
                      "..." +
                      nft_data?.user_id.slice(38)}
                  </a>
                </div>
              </div>

              {/* action div  */}
              <div className="shop__details-qty">
                {nft_data?.isListed && (
                  <div className="shop__details-price">
                    <span className="amount">
                      {nft_data?.listingPrice}{" "}
                      <span className="stock-status">TFUEL</span>
                    </span>
                  </div>
                )}

                {nft_data?.isListed && nft_data?.user_id != signerAddress && (
                  <div className="cart-plus-minus d-flex flex-wrap align-items-center">
                    {compLoading ? (
                      <button
                        className="shop__details-cart-btn"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Buying
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 mr-2 ml-2 mt-1 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={buy_nft}
                        className="shop__details-cart-btn"
                      >
                        Buy
                      </button>
                    )}
                  </div>
                )}

                {nft_data?.isListed == false &&
                  nft_data?.user_id != signerAddress && (
                    <div className="cart-plus-minus d-flex flex-wrap align-items-center">
                      <button className="shop__details-cart-btn">
                        Not Listed
                      </button>
                    </div>
                  )}

                {nft_data?.user_id == signerAddress && (
                  <div>
                    <div className="mt-[-15px] mb-16">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-100"
                      >
                        List NFT for sale
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
                          step="any"
                          required
                          name="listing_price"
                          onChange={(e) => set_listing_price(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          {compLoading ? (
                            <button className="flex bg-[#68fb9a] text-[black] font-semibold hover:text-black py-[5px] px-4 border border-blue-500 hover:border-transparent rounded mt-2 mb-2">
                              Listing
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5 mr-2 ml-2 mt-1 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                sell_nft(tokenid, listing_price, slug)
                              }
                              className="bg-[#68fb9a] text-[black] font-semibold hover:text-black py-[5px] px-4 border border-blue-500 hover:border-transparent rounded mt-2 mb-2"
                            >
                              List NFT
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {nft_data?.isListed && nft_data?.user_id == signerAddress && (
                  <div className="cart-plus-minus d-flex flex-wrap align-items-center">
                    <button className="shop__details-cart-btn">
                      Listed For Sale
                    </button>
                  </div>
                )}
              </div>

              {/* share  */}
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
              <div
                className="product__desc-wrap"
                style={{ overflow: "hidden" }}
              >
                <ul className="nav nav-tabs" id="descriptionTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    {props ? (
                      <button
                        className="nav-link active"
                        style={{
                          backgroundColor: "#1b242e",
                          border: "1px solid #22292f",
                          color: "#45f882",
                        }}
                      >
                        Properties
                      </button>
                    ) : (
                      <button
                        className="nav-link"
                        onClick={() => (showOtherInfo(false), showProps(true))}
                      >
                        Properties
                      </button>
                    )}
                  </li>
                  <li className="nav-item" role="presentation">
                    {otherInfo ? (
                      <button
                        className="nav-link active"
                        style={{
                          backgroundColor: "#1b242e",
                          border: "1px solid #22292f",
                          color: "#45f882",
                        }}
                      >
                        Other Information
                      </button>
                    ) : (
                      <button
                        className="nav-link"
                        onClick={() => (showProps(false), showOtherInfo(true))}
                      >
                        Other Information
                      </button>
                    )}
                  </li>
                </ul>

                <div className="tab-content">
                  <div className={`tab-pane ${props && "active"}`}>
                    <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
                      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                        {nft_data?.ipfsData?.properties.map(
                          (e) =>
                            e.type && (
                              <a
                                style={{
                                  textDecoration: "none",
                                  color: "#198754",
                                }}
                                className="imageBck flex flex-col rounded-lg p-3 py-4 text-center transition-shadow hover:shadow-xl"
                              >
                                <span className="text-sm uppercase text-accent">
                                  {e.type}
                                </span>
                                <span className="text-base text-jacarta-700 dark:text-white pt-[5px]">
                                  {e.value}
                                </span>
                              </a>
                            )
                        )}
                      </div>
                      {nft_data?.ipfsData?.properties.length <= 0 && (
                        <h5 scope="row" style={{ color: "#adb0bc" }}>
                          No Properties
                        </h5>
                      )}
                    </div>
                  </div>
                  <div className={`tab-pane ${otherInfo && "active"}`}>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Contract Address</th>
                          <td>
                            <a
                              href={`https://testnet-explorer.thetatoken.org/account/${slug}`}
                              target="_blank"
                              style={{
                                textDecoration: "none",
                                color: "#198754",
                              }}
                            >
                              {slug}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Token ID</th>
                          <td>
                            <a
                              href={`https://testnet-explorer.thetatoken.org/account/${slug}/${tokenid}`}
                              target="_blank"
                              style={{
                                textDecoration: "none",
                                color: "#198754",
                              }}
                            >
                              {tokenid}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Token Standard</th>
                          <td>TNT-721</td>
                        </tr>
                        <tr>
                          <th scope="row">Blockchain</th>
                          <td>Theta</td>
                        </tr>
                      </tbody>
                    </table>
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

export default NftPage;
