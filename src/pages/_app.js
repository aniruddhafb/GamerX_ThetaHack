import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { v4 as uuidv4 } from "uuid";

//firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// styles
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import "@/styles/plugins.css";
import "@/styles/custom.css";

//polybase
import { Polybase } from "@polybase/client";
import { ethers, Wallet } from "ethers";
import axios from "axios";
import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: "AIzaSyDMdg49PbtU35j4vAjummF-GdrW6Z4ex2A",
  authDomain: "gamerx-85d5f.firebaseapp.com",
  projectId: "gamerx-85d5f",
  storageBucket: "gamerx-85d5f.appspot.com",
  messagingSenderId: "45031986007",
  appId: "1:45031986007:web:bf398bafc9dc8d4f23a412",
  measurementId: "G-Q06CCYY0T5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App({ Component, pageProps }) {
  const [signer, set_signer] = useState("");
  const [signerAddress, setSignerAddress] = useState();
  const [signer_bal, set_signer_bal] = useState(0);
  const [format_signer_bal, set_format_signer_bal] = useState(0);

  const [user_data, set_user_data] = useState();
  const storage = new ThirdwebStorage();
  const router = useRouter();

  let wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY);

  const connect_wallet = async () => {
    let provider;
    let signer;
    try {
      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        set_signer(signer);
        const signer_address = await signer.getAddress();
        setSignerAddress(signer_address);

        const balance = await signer.provider.getBalance(signer_address);
        console.log({ balance: balance.toString() });

        const signerToStr = ethers.utils.formatEther(user_balance.toString());
        set_signer_bal(signerToStr);

        const formatBalance = parseFloat(signerToStr).toFixed(2);
        set_format_signer_bal(formatBalance);

        const db = polybase();
        const check_user = await db
          .collection("User")
          .where("id", "==", signer_address)
          .get();
        if (check_user.data.length == 0) {
          db.collection("User").create([signer_address]);
        }
        get_user_data(signer_address);
      }
    } catch (error) {
      console.log({ connect_wallet: error.message });
    }
  };

  const upload_video = async (data) => {
    try {
      const thumbnail_ipfs = await storage.upload(data.thumbnail);
      console.log({ thumbnail_ipfs });
      const res = await axios({
        url: "https://api.thetavideoapi.com/upload",
        method: "POST",
        headers: {
          "x-tva-sa-id": process.env.NEXT_PUBLIC_THETA_ID,
          "x-tva-sa-secret": process.env.NEXT_PUBLIC_THETA_SECRET,
        },
      });
      console.log(res.data.body.uploads[0].id);
      console.log(res.data.body.uploads[0]);
      const signer_address = await signer.getAddress();

      const res2 = await axios({
        url: res.data.body.uploads[0].presigned_url,
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        data: data.file,
      });

      console.log(res2);

      //GET VIDEO ID
      const res3 = await axios({
        method: "POST",
        url: "https://api.thetavideoapi.com/video",
        headers: {
          "x-tva-sa-id": process.env.NEXT_PUBLIC_THETA_ID,
          "x-tva-sa-secret": process.env.NEXT_PUBLIC_THETA_SECRET,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          source_upload_id: res.data.body.uploads[0].id,
          playback_policy: "public",
        }),
      });

      console.log(res3.data.body.videos[0].id);

      //GET VIDEO STATUS
      const res4 = await axios({
        url: `https://api.thetavideoapi.com/video/${res3.data.body.videos[0].id}`,
        method: "GET",
        headers: {
          "x-tva-sa-id": process.env.NEXT_PUBLIC_THETA_ID,
          "x-tva-sa-secret": process.env.NEXT_PUBLIC_THETA_SECRET,
        },
      });

      console.log(res4.data.body.videos[0].state);

      const db = polybase();

      const db_res = await db
        .collection("Video")
        .create([
          res3.data.body.videos[0].id,
          data.title,
          data.description,
          db.collection("User").record(signer_address),
          res4.data.body.videos[0].state,
          thumbnail_ipfs,
        ]);

      console.log({ db_res });
      router.push(`/content/videos/${res3.data.body.videos[0].id}`);

      // const res5 = await axios({
      //   url: `https://api.thetavideoapi.com/video${process.env.NEXT_PUBLIC_THETA_ID}list?page=1&number=100`,
      //   method: "GET",
      //   headers: {
      //     "x-tva-sa-id": process.env.NEXT_PUBLIC_THETA_ID,
      //     "x-tva-sa-secret": process.env.NEXT_PUBLIC_THETA_SECRET,
      //   },
      // });

      // console.log(res5.data);
    } catch (error) {
      console.log(error.message);
    }
    //   techOrder: ["theta_hlsjs", "html5"],
    //   sources: [
    //     {
    //       src: "https://media.thetavideoapi.com/video_kegqg8x8pz63rxqv650jzh8az6/master.m3u8",
    //       type: "application/vnd.apple.mpegurl",
    //       label: "1080p",
    //     },
    //   ],
    //   theta_hlsjs: {
    //     videoId: "video_kegqg8x8pz63rxqv650jzh8az6",
    //   },
    // });
  };

  const update_profile = async (data) => {
    console.log(data);
    const ipfs_cover = await storage.upload(data.cover_photo);
    const ipfs_profile = await storage.upload(data.profile_photo);
    const signer_address = await signer.getAddress();

    const db = polybase();
    const res = await db
      .collection("User")
      .record(signer_address)
      .call("update_profile", [
        data.username,
        data.bio,
        data.email,
        [data.instagram, data.twitter, data.link],
        ipfs_cover,
        ipfs_profile,
      ]);
    console.log(res.data);
  };

  const get_user_data = async (signer_address) => {
    const db = polybase();
    const res = await db.collection("User").record(signer_address).get();
    set_user_data(res.data);
  };

  const get_video_data = async (id) => {
    const db = polybase();
    const res = await db.collection("Video").where("id", "==", id).get();
    // console.log(res.data[0].data);
    const res4 = await axios({
      url: `https://api.thetavideoapi.com/video/${id}`,
      method: "GET",
      headers: {
        "x-tva-sa-id": process.env.NEXT_PUBLIC_THETA_ID,
        "x-tva-sa-secret": process.env.NEXT_PUBLIC_THETA_SECRET,
      },
    });
    let comments = [{ owner: "", comment: "" }];
    for (const e of res.data[0].data.comments) {
      const comment = await db.collection("Comment").record(e.id).get();
      console.log(comment.data.owner.id);
      const owner = await db
        .collection("User")
        .record(comment.data.owner.id)
        .get();
      console.log({ owner });
      comments.push({ owner, comment });
    }
    let obj = { ...res.data[0].data, ...res4.data.body.videos[0], comments };
    console.log({ obj });
    return obj;
  };

  const go_live = async (data) => {
    const db = polybase();
    const thumbnail_ipfs = await storage.upload(data.thumbnail);
    const res = await db
      .collection("LiveStream")
      .create([
        uuidv4(),
        thumbnail_ipfs,
        data.stream_id,
        data.title,
        data.description,
        db.collection("User").record(signerAddress),
      ]);
    console.log(res.data);
    router.push(`/content/live/${res.data.stream_id}`);
  };

  const get_liveStream_data = async (stream_id) => {
    const db = polybase();
    const res = await db.collection("LiveStream").record(stream_id).get();
    console.log(res.data);
    return res.data;
  };

  const post_comment = async (video_id, comment) => {
    console.log(comment, video_id);
    const db = polybase();
    const signer_address = await signer.getAddress();
    const upload_comment = await db
      .collection("Comment")
      .create([
        uuidv4(),
        comment,
        Date.now().toString(),
        db.collection("User").record(signer_address),
      ]);
    console.log(upload_comment.data);

    const save_comment = db
      .collection("Video")
      .record(video_id)
      .call("post_comment", [
        db.collection("Comment").record(upload_comment.data.id),
      ]);
    console.log((await save_comment).data);
  };

  const create_chat_room = async () => {};

  const test = async () => {
    const db = polybase();
    //FOR FETCHING ALL OF THE VIDEOS
    const res = await db.collection("Video").get();

    //TO FETCH PARTICULAR DATA
    const res2 = await db
      .collection("Video")
      .where("name", "==", "Counter Strike Gameplay")
      .get();
  };

  const polybase = () => {
    const db = new Polybase({
      defaultNamespace: process.env.NEXT_PUBLIC_NAMESPACE,
      signer: async (data) => {
        return {
          h: "eth-personal-sign",
          sig: await wallet.signMessage(data),
        };
      },
    });

    return db;
  };

  useEffect(() => {
    connect_wallet();
    console.log("render");
  }, []);
  return (
    <>
      <Navbar
        connect_wallet={connect_wallet}
        signer={signer}
        signerAddress={signerAddress}
        signer_bal={format_signer_bal}
      />
      <Component
        {...pageProps}
        upload_video={upload_video}
        get_video_data={get_video_data}
        post_comment={post_comment}
        update_profile={update_profile}
        get_user_data={get_user_data}
        user_data={user_data}
        go_live={go_live}
        get_liveStream_data={get_liveStream_data}
        db={db}
        signerAddress={signerAddress}
      />
      <Footer />
    </>
  );
}
