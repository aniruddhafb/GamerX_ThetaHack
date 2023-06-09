import React, { useEffect, useState } from "react";
import gamerXlogo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useRouter } from "next/router";
import * as PushAPI from "@pushprotocol/restapi";
import { MdOutlineWorkOutline } from "react-icons/md";

const Navbar = ({
  connect_wallet,
  signer,
  signerAddress,
  signer_bal,
  chainID,
  setChainID,
  GAMERX_CHANNEL_ADDRESS,
  user_data,
}) => {
  const router = useRouter();
  const [notificationData, setNotificationData] = useState();
  const [nullNotification, setNullNotification] = useState(true);
  const [optedIn, setOptedIn] = useState(false);
  const [showNotifications, SetShowNotifications] = useState(false);

  const [showProfileDrop, setShowProfileDrop] = useState(false);
  const [showNavDrop, setNavDrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const chainSwitchReload = async () => {
    try {
      setChainID();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // switch chain
  const switchThetaChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x16d" }],
      });
      chainSwitchReload("365");
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x16d",
                chainName: "Theta",
                nativeCurrency: {
                  name: "Theta",
                  symbol: "TFUEL",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://testnet-explorer.thetatoken.org/"],
                rpcUrls: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],
              },
            ],
          });
          chainSwitchReload("365");
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  const switchPolygonChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      chainSwitchReload("80001");
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Mumbai",
                nativeCurrency: {
                  name: "Polygon",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com/"],
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
              },
            ],
          });
          chainSwitchReload("80001");
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  // optin for push noti
  const optInToChannel = async () => {
    await switchPolygonChain();
    await PushAPI.channels.subscribe({
      env: "staging",
      signer: signer,
      channelAddress: `eip155:${chainID}:${GAMERX_CHANNEL_ADDRESS}`,
      userAddress: `eip155:${chainID}:${signerAddress}`,
      onSuccess: () => {
        setOptedIn(true);
      },
      onError: (err) => {
        console.error("opt-in error", err);
      },
    });
  };

  // push get noti
  const getNotifications = () => {
    PushAPI.user
      .getFeeds({
        user: `eip155:${chainID}:${signerAddress}`,
        env: "staging",
        page: 1,
        limit: 10,
      })
      .then((feeds) => {
        console.log({ notis: feeds });
        setNotificationData(feeds);
        if (feeds[0]?.app != "RarX Marketplace") {
          setNullNotification(false);
        }
      })
      .catch((err) => {
        console.error("failed to get user notifications: ", err);
      });
  };

  useEffect(() => {
    getNotifications();
    setShowProfileDrop(false);
    setNavDrop(false);
    SetShowNotifications(false);
    setShowMobileNav(false);
  }, [router.pathname]);

  return (
    <header className={`${showMobileNav && "mobile-menu-visible"}`}>
      <div
        id="sticky-header"
        className="navHeadCustom tg-header__area transparent-header"
        style={{
          backgroundColor: "#182029",
          zIndex: "12",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <div className="flex justify-center align-middle">
          <div className="row">
            <div className="col-12">
              <div
                className="faviconCustom mobile-nav-toggler"
                onClick={() => setShowMobileNav(true)}
              >
                <i className="fas fa-bars"></i>
              </div>
              <div className="tgmenu__wrap">
                <nav className="tgmenu__nav">
                  {/* logo  */}
                  <div className="logo">
                    <Link href="/">
                      <Image src={gamerXlogo} alt="Logo" />
                    </Link>
                  </div>

                  {/* middle nav  */}
                  <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                    <ul className="navigation">
                      <li>
                        <Link
                          href="/profile/exploreGamers"
                          style={{ textDecoration: "none" }}
                        >
                          Top Gamers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/content/live/exploreLiveContent"
                          style={{ textDecoration: "none" }}
                        >
                          Watch Live
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link
                          href="#!"
                          onClick={() => setNavDrop(!showNavDrop)}
                          style={{ textDecoration: "none", display: "flex" }}
                        >
                          Explore <AiOutlineCaretDown className="ml-1" />
                        </Link>
                        {showNavDrop && (
                          <ul className="sub-menu">
                            <li>
                              <Link
                                href="/nfts/exploreNFTs"
                                style={{ textDecoration: "none" }}
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M18 22C15.8082 21.9947 14.0267 20.2306 14 18.039V16H9.99996V18.02C9.98892 20.2265 8.19321 22.0073 5.98669 22C3.78017 21.9926 1.99635 20.1999 2.00001 17.9934C2.00367 15.7868 3.79343 14 5.99996 14H7.99996V9.99999H5.99996C3.79343 9.99997 2.00367 8.21315 2.00001 6.00663C1.99635 3.8001 3.78017 2.00736 5.98669 1.99999C8.19321 1.99267 9.98892 3.77349 9.99996 5.97999V7.99999H14V5.99999C14 3.79085 15.7908 1.99999 18 1.99999C20.2091 1.99999 22 3.79085 22 5.99999C22 8.20913 20.2091 9.99999 18 9.99999H16V14H18C20.2091 14 22 15.7909 22 18C22 20.2091 20.2091 22 18 22ZM16 16V18C16 19.1046 16.8954 20 18 20C19.1045 20 20 19.1046 20 18C20 16.8954 19.1045 16 18 16H16ZM5.99996 16C4.89539 16 3.99996 16.8954 3.99996 18C3.99996 19.1046 4.89539 20 5.99996 20C6.53211 20.0057 7.04412 19.7968 7.42043 19.4205C7.79674 19.0442 8.00563 18.5321 7.99996 18V16H5.99996ZM9.99996 9.99999V14H14V9.99999H9.99996ZM18 3.99999C17.4678 3.99431 16.9558 4.2032 16.5795 4.57952C16.2032 4.95583 15.9943 5.46784 16 5.99999V7.99999H18C18.5321 8.00567 19.0441 7.79678 19.4204 7.42047C19.7967 7.04416 20.0056 6.53215 20 5.99999C20.0056 5.46784 19.7967 4.95583 19.4204 4.57952C19.0441 4.2032 18.5321 3.99431 18 3.99999ZM5.99996 3.99999C5.4678 3.99431 4.95579 4.2032 4.57948 4.57952C4.20317 4.95583 3.99428 5.46784 3.99996 5.99999C3.99428 6.53215 4.20317 7.04416 4.57948 7.42047C4.95579 7.79678 5.4678 8.00567 5.99996 7.99999H7.99996V5.99999C8.00563 5.46784 7.79674 4.95583 7.42043 4.57952C7.04412 4.2032 6.53211 3.99431 5.99996 3.99999Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>{" "}
                                Explore NFTs
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/collection/exploreCollections"
                                style={{ textDecoration: "none" }}
                              >
                                {" "}
                                <i
                                  className="flaticon-ethereum"
                                  style={{
                                    marginRight: "5px",
                                    fontSize: "17px",
                                  }}
                                ></i>{" "}
                                NFT Collections
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/content/live/exploreLiveContent"
                                style={{ textDecoration: "none" }}
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21 19H3C1.89543 19 1 18.1046 1 17V16H3V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V16H23V17C23 18.1046 22.1046 19 21 19ZM5 7V16H19V7H5Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                                Watch Live
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/content/videos/exploreContent"
                                style={{ textDecoration: "none" }}
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                                    fill="currentColor"
                                  ></path>
                                  <path
                                    d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                                Explore Content
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/jobs/postedJobs"
                                style={{ textDecoration: "none" }}
                              >
                                <MdOutlineWorkOutline className="ml-[6px] mr-[5px] text-[18px]" />
                                Posted Jobs
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                        <Link href="/about" style={{ textDecoration: "none" }}>
                          About us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* network nav div  */}
                  <div className="networkCustom relative mt-[12px]">
                    <button className="relative hidden sm:block">
                      <div className="flex flex-row justify-center align-middle w-[200px] ">
                        {chainID == 365 && (
                          <>
                            <Image
                              src="../../theta.png"
                              height={25}
                              width={25}
                              alt="theta"
                              className="h-[25px] w-[26px] mt-[5px]"
                            />
                            <p className="pl-2 pr-2 mt-1 font-bold ">
                              Theta Testnet
                            </p>
                          </>
                        )}

                        {/* unsupported chains  */}
                        {chainID != 365 && (
                          <>
                            <p
                              className="pl-2 pr-2 mt-1 font-bold"
                              onClick={() => switchThetaChain()}
                            >
                              Unsupported Chain
                            </p>
                          </>
                        )}
                      </div>
                    </button>
                  </div>

                  {signerAddress && signerAddress ? (
                    <>
                      {/* Notifications  */}
                      <div className="relative">
                        <div className="notifiCustom relative mr-2 mb-[4px]">
                          <button
                            onClick={() => (
                              getNotifications(),
                              setShowProfileDrop(false),
                              SetShowNotifications(!showNotifications)
                            )}
                            className="hidden text-gray-400 mt-[5px] transition-colors duration-300 transform lg:block hover:text-gray-600 text-base text-jacarta-700"
                          >
                            <svg
                              className="w-7 h-7"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>

                        {showNotifications && (
                          <div className="notifiBackMain absolute left-[-140px] z-20 w-64 mt-6 overflow-hidden origin-top-right bg-white shadow-xl sm:w-80 dark:bg-gray-800">
                            {notificationData &&
                              notificationData?.map((e, i) => {
                                return (
                                  i < 4 &&
                                  e.app === "GamerX" && (
                                    <div key={e.sid} className="notifiBack">
                                      <a
                                        href={e.cta}
                                        rel="noreferrer"
                                        target="_blank"
                                        className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-100"
                                      >
                                        <Image
                                          className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                                          src={e.icon}
                                          alt="avatar"
                                          height={100}
                                          width={100}
                                        />
                                        <p className="mx-2 text-sm text-black flex flex-col">
                                          <a
                                            className="font-bold text-[12px]"
                                            href={e.cta}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            {e.notification.title}
                                          </a>
                                          <span className="font-mono text-[10px]">
                                            {e.notification.body}
                                          </span>
                                        </p>
                                      </a>
                                    </div>
                                  )
                                );
                              })}
                            {notificationData &&
                              notificationData[0]?.app != "GamerX" && (
                                <div className="notifiBack h-[175px]">
                                  <a
                                    href="#"
                                    rel="noreferrer"
                                    className="flex items-center px-4 py-3 transition-colors duration-300 transform border-gray-100"
                                  >
                                    <p className="mx-2 text-sm text-black flex flex-col">
                                      <a
                                        className="font-bold text-[12px]"
                                        href="#"
                                        rel="noreferrer"
                                      >
                                        No Notifications yet! click below button
                                        to subscribe the GamerX notification
                                        channel, ignore if already subscribed
                                      </a>
                                      {optedIn ? (
                                        <button
                                          type="button"
                                          className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-4"
                                          style={{ backgroundColor: "#6D3EEE" }}
                                        >
                                          Subscribed 🎉
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => optInToChannel()}
                                          type="button"
                                          className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-4"
                                          style={{ backgroundColor: "#6D3EEE" }}
                                        >
                                          Subscribe
                                        </button>
                                      )}
                                    </p>
                                  </a>
                                </div>
                              )}
                            {notificationData &&
                              notificationData.length === 0 &&
                              nullNotification == true && (
                                <div className="notifiBack h-[165px]">
                                  <a
                                    href="#"
                                    rel="noreferrer"
                                    className="flex items-center px-4 py-3 transition-colors duration-300 transform border-gray-100"
                                  >
                                    <p className="mx-2 text-sm text-black flex flex-col">
                                      <a
                                        className="font-bold text-[12px]"
                                        href="#"
                                        rel="noreferrer"
                                      >
                                        No Notifications yet! click below button
                                        to subscribe the GamerX notification
                                        channel, ignore if already subscribed
                                      </a>
                                      {optedIn ? (
                                        <button
                                          type="button"
                                          className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-4"
                                          style={{ backgroundColor: "#6D3EEE" }}
                                        >
                                          Subscribed 🎉
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => optInToChannel()}
                                          type="button"
                                          className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mt-4"
                                          style={{ backgroundColor: "#6D3EEE" }}
                                        >
                                          Subscribe
                                        </button>
                                      )}
                                    </p>
                                  </a>
                                </div>
                              )}
                          </div>
                        )}
                      </div>

                      {/* // profile dropdown */}
                      <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                        <ul className="navigation">
                          <li className="menu-item-has-children">
                            {user_data?.profile_image ?
                              <Image
                                onClick={() => (
                                  SetShowNotifications(false),
                                  setShowProfileDrop(!showProfileDrop)
                                )}
                                className="h-10 w-10 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white "
                                src={user_data?.profile_image.replace(
                                  "ipfs://",
                                  "https://gateway.ipfscdn.io/ipfs/"
                                )}
                                alt="jane avatar"
                                height={100}
                                width={100}
                                style={{ borderRadius: "50%", cursor: "pointer", border: "1px solid gray" }}
                              />
                              :
                              <div
                                className="bg-slate-700 p-[10px] rounded-[50%] cursor-pointer border-1 border-green-400"
                                onClick={() => (
                                  SetShowNotifications(false),
                                  setShowProfileDrop(!showProfileDrop)
                                )}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
                                </svg>
                              </div>
                            }
                            {showProfileDrop && (
                              <ul
                                className="sub-menu"
                                style={{
                                  overflow: "hidden",
                                  marginTop: "22px",
                                }}
                              >
                                <li>
                                  <Link
                                    href="#"
                                    className="flex items-center text-sm text-gray-600 transition-colors duration-300 transform ml-[-20px]"
                                    style={{ textDecoration: "none" }}
                                  >
                                    {user_data?.profile_image ? (
                                      <Image
                                        className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 mb-3"
                                        src={user_data?.profile_image.replace(
                                          "ipfs://",
                                          "https://gateway.ipfscdn.io/ipfs/"
                                        )}
                                        alt="jane avatar"
                                        height={100}
                                        width={100}
                                      />
                                    ) : (
                                      <Image
                                        className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 mb-3"
                                        src="../../dislogo.png"
                                        alt="jane avatar"
                                        height={100}
                                        width={100}
                                      />
                                    )}
                                    <div className="mx-1">
                                      <span
                                        className="max-w-[30px] overflow-hidden text-ellipsis"
                                        style={{ textTransform: "lowercase" }}
                                      >
                                        {signerAddress.slice(0, 5) +
                                          "..." +
                                          signerAddress.slice(38)}
                                      </span>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap flex mt-2">
                                        Balance : {signer_bal}
                                        <Image
                                          src="../../tfuel.png"
                                          height={20}
                                          width={20}
                                          className="ml-1"
                                        />
                                      </p>
                                    </div>
                                  </Link>
                                </li>
                                <hr className="text-[white] my-[4px] mt-[-8px]" />
                                <li>
                                  <Link
                                    href={`/profile/${signerAddress}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <svg
                                      className="w-5 h-5 mx-1"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                                        fill="currentColor"
                                      ></path>
                                      <path
                                        d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                    View Profile
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/profile/editGamerProfile"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <svg
                                      className="w-5 h-5 mx-1"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                    Edit Profile
                                  </Link>
                                </li>
                                <hr className="text-[white] my-[4px] mx-[10px]" />
                                <li>
                                  <Link
                                    href="/content/uploadVideo"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <svg
                                      className="w-5 h-5 mx-1"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                    Upload Video
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/content/goLive"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <svg
                                      className="w-5 h-5 mx-1"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M21 19H3C1.89543 19 1 18.1046 1 17V16H3V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V16H23V17C23 18.1046 22.1046 19 21 19ZM5 7V16H19V7H5Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                    Go Live
                                  </Link>
                                </li>
                                <hr className="text-[white] my-[4px] mx-[10px]" />
                                <li>
                                  <Link
                                    href="/nfts/createNFT"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <svg
                                      className="w-5 h-5 mx-1"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M18 22C15.8082 21.9947 14.0267 20.2306 14 18.039V16H9.99996V18.02C9.98892 20.2265 8.19321 22.0073 5.98669 22C3.78017 21.9926 1.99635 20.1999 2.00001 17.9934C2.00367 15.7868 3.79343 14 5.99996 14H7.99996V9.99999H5.99996C3.79343 9.99997 2.00367 8.21315 2.00001 6.00663C1.99635 3.8001 3.78017 2.00736 5.98669 1.99999C8.19321 1.99267 9.98892 3.77349 9.99996 5.97999V7.99999H14V5.99999C14 3.79085 15.7908 1.99999 18 1.99999C20.2091 1.99999 22 3.79085 22 5.99999C22 8.20913 20.2091 9.99999 18 9.99999H16V14H18C20.2091 14 22 15.7909 22 18C22 20.2091 20.2091 22 18 22ZM16 16V18C16 19.1046 16.8954 20 18 20C19.1045 20 20 19.1046 20 18C20 16.8954 19.1045 16 18 16H16ZM5.99996 16C4.89539 16 3.99996 16.8954 3.99996 18C3.99996 19.1046 4.89539 20 5.99996 20C6.53211 20.0057 7.04412 19.7968 7.42043 19.4205C7.79674 19.0442 8.00563 18.5321 7.99996 18V16H5.99996ZM9.99996 9.99999V14H14V9.99999H9.99996ZM18 3.99999C17.4678 3.99431 16.9558 4.2032 16.5795 4.57952C16.2032 4.95583 15.9943 5.46784 16 5.99999V7.99999H18C18.5321 8.00567 19.0441 7.79678 19.4204 7.42047C19.7967 7.04416 20.0056 6.53215 20 5.99999C20.0056 5.46784 19.7967 4.95583 19.4204 4.57952C19.0441 4.2032 18.5321 3.99431 18 3.99999ZM5.99996 3.99999C5.4678 3.99431 4.95579 4.2032 4.57948 4.57952C4.20317 4.95583 3.99428 5.46784 3.99996 5.99999C3.99428 6.53215 4.20317 7.04416 4.57948 7.42047C4.95579 7.79678 5.4678 8.00567 5.99996 7.99999H7.99996V5.99999C8.00563 5.46784 7.79674 4.95583 7.42043 4.57952C7.04412 4.2032 6.53211 3.99431 5.99996 3.99999Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                    Create NFT
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`/jobs/createJob`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <MdOutlineWorkOutline className="ml-[6px] mr-[5px] text-[18px]" />
                                    Post A Job
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    // connect wallet
                    <div className="tgmenu__action d-none d-md-block">
                      <ul className="list-wrap">
                        <li className="header-btn">
                          <button
                            onClick={connect_wallet}
                            className="tg-border-btn"
                          >
                            Connect Wallet
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </nav>
              </div>

              {/* <!-- Mobile Menu  --> */}
              <div className="tgmobile__menu">
                <nav className="tgmobile__menu-box">
                  {/* close btn  */}
                  <div
                    className="close-btn"
                    onClick={() => setShowMobileNav(false)}
                  >
                    <i className="flaticon-swords-in-cross-arrangement"></i>
                  </div>

                  {/* logo */}
                  <div className="nav-logo">
                    <Link href="/">
                      <Image src={gamerXlogo} alt="Logo" />
                    </Link>
                  </div>

                  {/* search  */}
                  <div className="tgmobile__search">
                    <form action="#!">
                      <input type="text" placeholder="Search here..." />
                      <button>
                        <i className="flaticon-loupe"></i>
                      </button>
                    </form>
                  </div>

                  {/* middle nav  */}
                  <div className="tgmobile__menu-outer">
                    <ul className="navigation">
                      <li>
                        <Link
                          href="/profile/exploreGamers"
                          style={{ textDecoration: "none" }}
                        >
                          Top Gamers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/content/live/exploreLiveContent"
                          style={{ textDecoration: "none" }}
                        >
                          Watch Live
                        </Link>
                      </li>
                      <li>
                        <Link href="/nfts/exploreNFTs" style={{ textDecoration: "none" }}>
                          Explore NFTs
                        </Link>
                      </li>
                      <li>
                        <Link href="/collection/exploreCollections" style={{ textDecoration: "none" }}>
                          Explore Collections
                        </Link>
                      </li>
                      <li>
                        <Link href="/content/videos/exploreContent" style={{ textDecoration: "none" }}>
                          Explore Videos
                        </Link>
                      </li>
                      <li>
                        <Link href="/jobs/postedJobs" style={{ textDecoration: "none" }}>
                          Posted Jobs
                        </Link>
                      </li>
                      <li>
                        <Link href="/about" style={{ textDecoration: "none" }}>
                          About us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* socials  */}
                  <div className="social-links">
                    <ul className="list-wrap">
                      <li>
                        <Link
                          href="https://twitter.com/platform28465"
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://github.com/aniruddhafb/GamerX_ThetaHack"
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <i className="fab fa-github"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="tgmobile__menu-backdrop"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
