import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";

const CollectionPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [share, setShare] = useState(false);
  useEffect(() => {}, []);
  return (
    <>
      {/* <!-- Banner IMG--> */}
      <div className="relative mt-24" id="pageBG">
        <Image
          // src={collection.coverImage?.replace(
          //     "ipfs://",
          //     "https://gateway.ipfscdn.io/ipfs/"
          // )}
          src="../../nftCard1.jpg"
          width={100}
          height={100}
          alt="banner"
          className="h-[18.75rem] w-[100%] object-cover"
        />
      </div>

      {/* <!-- Collection Section --> */}
      <section className="relative pb-12 pt-28 dark:bg-jacarta-800" id="pageBG">
        <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="relative">
            <Image
              // src={collection.logo?.replace(
              //     "ipfs://",
              //     "https://gateway.ipfscdn.io/ipfs/"
              // )}
              src="../../nftCard1.jpg"
              width={100}
              height={100}
              alt="collection avatar"
              className="rounded-xl border-[5px] border-white dark:border-jacarta-600 h-[130px] w-[auto]"
            />
            <div className="absolute -right-3 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white border-white dark:border-jacarta-600">
              <MdVerified
                style={{ color: "#4f87ff", cursor: "pointer" }}
                size={30}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-jacarta-100  py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
              <a
                href="#"
                target="_blank"
                className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap "
                style={{ textDecoration: "none" }}
              >
                <span>{slug}</span>
              </a>
            </div>
            <h2 className="mb-2 mt-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              col name
            </h2>
            <div className="mb-4"></div>

            {/* desc  */}
            <p className="mx-auto mb-14 max-w-xl text-lg dark:text-jacarta-300">
              col desc
            </p>

            {/* stats  */}
            <div className="mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border border-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-800">
              <a
                href="#"
                className="w-1/2 rounded-l-xl border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
                style={{ textDecoration: "none" }}
              >
                <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                  {/* {nfts ? nfts?.length : "0"} */}2
                </div>
                <div className="text-2xs font-medium tracking-tight ">
                  Items
                </div>
              </a>
              <a
                href="#"
                style={{ textDecoration: "none" }}
                className="w-1/2 border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32 sm:border-r"
              >
                <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                  {/* {nfts ? nfts?.length : "0"} */}2
                </div>
                <div className="text-2xs font-medium tracking-tight ">
                  Owners
                </div>
              </a>
              <a
                href="#"
                style={{ textDecoration: "none" }}
                className="w-1/2 border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
              >
                <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                  <span className="font-bold mr-2">0.5</span>
                  <Image src="../../tfuel.png" height={18} width={18} />
                </div>
                <div className="text-2xs font-medium tracking-tight ">
                  Floor Price
                </div>
              </a>
              <a
                href="#"
                style={{ textDecoration: "none" }}
                className="w-1/2 rounded-r-xl border-jacarta-100 py-4 hover:shadow-md sm:w-32"
              >
                <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                  <span className="font-bold mr-2">22</span>
                  <Image src="../../tfuel.png" height={18} width={18} />
                </div>
                <div className="text-2xs font-medium tracking-tight ">
                  Volume Traded
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* nft section  */}
      <section className="relative py-24 pt-20" id="pageBG">
        <div className="container">
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="on-sale"
              role="tabpanel"
              aria-labelledby="on-sale-tab"
            >
              <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                {/* {nfts?.map((e, index) => {
                                    return (
                                        <NftCard
                                            key={index}
                                            ImageSrc={e.ipfsData.image.replace(
                                                "ipfs://",
                                                "https://gateway.ipfscdn.io/ipfs/"
                                            )}
                                            Name={e.ipfsData.name}
                                            Description={e.ipfsData.description}
                                            Address={e.ipfsData.collection}
                                            tokenId={e.tokenId}
                                            listedBool={e.isListed}
                                            listingPrice={e.listingPrice}
                                            chainImgPre={"../"}
                                            chain_image={e.chain_image}
                                            chain_symbol={e.chain_symbol}
                                        />
                                    );
                                })} */}
              </div>
              <div className="flex justify-center">
                {/* {nfts?.length <= 0 && (
                                    <h2 className="text-xl font-display font-thin">
                                        This collection has no NFTs !!
                                    </h2>
                                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollectionPage;
