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

//CONTRACTS
import NFTCollection from "../../artifacts/contracts/NFTCollection.sol/NFTCollection.json";
import Collection_Factory from "../../artifacts/contracts/CollectionFactory.sol/CollectionFactory.json";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
  authDomain: "gamerx-85d5f.firebaseapp.com",
  projectId: "gamerx-85d5f",
  storageBucket: "gamerx-85d5f.appspot.com",
  messagingSenderId: "45031986007",
  appId: "1:45031986007:web:bf398bafc9dc8d4f23a412",
  measurementId: "G-Q06CCYY0T5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const default_nft_collection = "0x6E3249530dd3791Eafc61e320ebCef04116714cb";
const default_collection_factory = "0xFCc8CD91A7d33fbD484c2170dc000D9aae27CC87";
const marketplace = "0xA24495bfa8dE0BDC7cAF75AE0208338ac0F0a4D4";

export default function App({ Component, pageProps }) {
  const [provider, set_provider] = useState("");
  const [signer, set_signer] = useState("");
  const [signerAddress, setSignerAddress] = useState();
  const [signer_bal, set_signer_bal] = useState(0);
  const [format_signer_bal, set_format_signer_bal] = useState(0);
  const [current_chainId, set_current_chainId] = useState(0);

  const [user_data, set_user_data] = useState();
  const storage = new ThirdwebStorage();
  const router = useRouter();

  let wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY);

  const connect_wallet = async () => {
    // delete_users("0xfD2958c381aE4fAaF77ed06F619d2246a8a3dB60");
    // delete_video("video_y4wtagafu2vvy1tzascigwca3k");
    try {
      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
      } else {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        set_provider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        set_signer(signer);

        const signer_address = await signer.getAddress();
        setSignerAddress(signer_address);

        const user_balance = await signer.getBalance();
        const signerToStr = ethers.utils.formatEther(user_balance.toString());
        set_signer_bal(signerToStr);

        const formatBalance = parseFloat(signerToStr).toFixed(2);
        set_format_signer_bal(formatBalance);

        const { chainId } = await provider.getNetwork();
        set_current_chainId(chainId);

        const db = polybase();
        const check_user = await db
          .collection("User")
          .where("id", "==", signer_address)
          .get();
        if (check_user.data.length == 0) {
          await db
            .collection("User")
            .create([signer_address, "", "", "", "", "", [], ""]);
        }
        get_user_data(signer_address);
      }
    } catch (error) {
      console.log({ connect_wallet: error.message });
    }
  };

  const delete_video = async (video) => {
    const db = polybase();
    const res = await db.collection("Video").record(video).call("del");
    console.log(res.data);
  };

  const delete_users = async (address) => {
    const db = polybase();
    const res = await db.collection("User").record(address).call("del");
    console.log({ res });
  };

  //USE ONLY FOR CREATING DEFAULT NFT COLLECTION
  const create_default_collection = async () => {
    const db = polybase();
    const res = await db
      .collection("NFTCollection")
      .create([
        default_nft_collection,
        db.collection("User").record(signerAddress),
        "gamerx cover image",
        "gamerx logo image",
        "GamerX",
        "GamerX",
        "GamerX is a platform for gamer",
        "Theta Chain Image",
        "365",
      ]);
  };

  const gamerX_collection = (collection_address, signer) => {
    if (!collection_address) return;
    const collection_contract = new ethers.Contract(
      collection_address,
      NFTCollection.abi,
      signer
    );
    return collection_contract;
  };

  const create_token = async (_tokenURI) => {
    try {
      const tokenURI = await storage.upload(_tokenURI);
      const gamerX = gamerX_collection(_tokenURI.collection_address, signer);
      const network = await provider.getNetwork();

      gamerX.on("TokenCreated", async (ipfsURL, tokenId) => {
        // console.log({ ipfsURL, tokenId });
        const db = polybase();
        const res = await db
          .collection("NFT")
          .create([
            `${_tokenURI.collection_address}/${tokenId.toString()}`,
            tokenId.toString(),
            network.chainId.toString(),
            tokenURI,
            db.collection("User").record(signerAddress),
            db.collection("NFTCollection").record(_tokenURI.collection_address),
            _tokenURI.properties.length
              ? JSON.stringify(_tokenURI.properties)
              : "[]",
            _tokenURI.title,
          ]);
      });

      const txn = await gamerX.createToken(tokenURI);
      await txn.wait();
      // console.log({ txn });
    } catch (error) {
      console.log(error);
    }
  };

  const upload_video = async (data) => {
    try {
      const thumbnail_ipfs = await storage.upload(data.thumbnail);
      const res = await axios({
        url: "https://api.thetavideoapi.com/upload",
        method: "POST",
        headers: {
          "x-tva-sa-id": process.env.NEXT_PUBLIC_THETA_ID,
          "x-tva-sa-secret": process.env.NEXT_PUBLIC_THETA_SECRET,
        },
      });
      const signer_address = await signer.getAddress();

      const res2 = await axios({
        url: res.data.body.uploads[0].presigned_url,
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        data: data.file,
      });

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

      //GET VIDEO STATUS
      const res4 = await axios({
        url: `https://api.thetavideoapi.com/video/${res3.data.body.videos[0].id}`,
        method: "GET",
        headers: {
          "x-tva-sa-id": process.env.NEXT_PUBLIC_THETA_ID,
          "x-tva-sa-secret": process.env.NEXT_PUBLIC_THETA_SECRET,
        },
      });

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
          Date.now().toString(),
        ]);

      router.push(`/content/videos/${res3.data.body.videos[0].id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const update_profile = async (data) => {
    let ipfs_cover = data.cover_image ? data.cover_image : "";
    let ipfs_profile = data.profile_image ? data.profile_image : "";
    if (typeof data.cover_image === "object") {
      ipfs_cover = await storage.upload(data.cover_image);
    }
    if (typeof data.profile_image === "object") {
      ipfs_profile = await storage.upload(data.profile_image);
    }

    const signer_address = await signer.getAddress();
    const db = polybase();
    const res = await db
      .collection("User")
      .record(signer_address)
      .call("update_profile", [
        data.username,
        data.bio,
        data.email,
        [data.instagram || "", data.twitter || "", data.link || ""],
        ipfs_cover,
        ipfs_profile,
        data.role,
      ]);
  };

  const get_user_data = async (signer_address) => {
    const db = polybase();
    const res = await db.collection("User").record(signer_address).get();
    set_user_data(res.data);
  };

  const get_video_data = async (id) => {
    const db = polybase();
    const res = await db.collection("Video").where("id", "==", id).get();
    const res4 = await axios({
      url: `https://api.thetavideoapi.com/video/${id}`,
      method: "GET",
      headers: {
        "x-tva-sa-id": process.env.NEXT_PUBLIC_THETA_ID,
        "x-tva-sa-secret": process.env.NEXT_PUBLIC_THETA_SECRET,
      },
    });

    // res4.data.body.videos[0].id
    const polybase_video = await db
      .collection("Video")
      .record(res4.data.body.videos[0].id)
      .get();

    const video_owner = await db
      .collection("User")
      .record(polybase_video.data.owner.id)
      .get();

    let comments = [{ owner: "", comment: "" }];
    for (const e of res.data[0].data.comments) {
      const comment = await db.collection("Comment").record(e.id).get();
      const owner = await db
        .collection("User")
        .record(comment.data.owner.id)
        .get();
      comments.push({ owner, comment });
    }
    let obj = {
      ...res.data[0].data,
      ...res4.data.body.videos[0],
      comments,
      owner: video_owner.data,
    };
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
        Date.now().toString(),
      ]);
    router.push(`/content/live/${res.data.stream_id}`);
  };

  const get_liveStream_data = async (stream_id) => {
    const db = polybase();
    const res = await db
      .collection("LiveStream")
      .where("stream_id", "==", stream_id)
      .get();
    const owner = await db
      .collection("User")
      .record(res.data[0].data.owner.id)
      .get();
    let obj = { owner: owner.data, stream_data: res.data[0].data };
    return obj;
  };

  const get_all_livestreams = async () => {
    const db = polybase();
    const res = await db.collection("LiveStream").get();
    const livestreams = [];
    for (const e of res.data) {
      let obj = {};
      if (e.data.isActive) {
        const owner = await db.collection("User").record(e.data.owner.id).get();
        obj = { owner, livestream: e.data };
        livestreams.push(obj);
      }
    }
    return livestreams;
  };

  const fetch_gamers = async () => {
    const db = polybase();
    const res = await db.collection("User").get();
    return res.data;
  };

  const get_gamer = async (userId) => {
    const db = polybase();
    const res = await db.collection("User").record(userId).get();
    return res.data;
  };

  const post_comment = async (video_id, comment) => {
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

    const save_comment = db
      .collection("Video")
      .record(video_id)
      .call("post_comment", [
        db.collection("Comment").record(upload_comment.data.id),
      ]);
  };

  const fetch_videos = async () => {
    const db = polybase();
    const res = await db.collection("Video").get();
    const videos = [];
    for (const e of res.data) {
      let obj = {};
      const owner = await db.collection("User").record(e.data.owner.id).get();
      if (owner) {
        obj = { owner: { ...owner.data }, video: e.data };
        videos.push(obj);
      }
    }
    return videos;
  };

  const fetch_all_nfts = async () => {
    try {
      const db = polybase();
      const res = await db.collection("NFT").get();
      let nfts = [];
      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.listingPrice = e.data.listingPrice
          ? ethers.utils.formatEther(e.data.listingPrice)
          : "";
        obj.nft_name = e.data?.nft_name ? e.data?.nft_name : "";
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        const url = e.data.ipfsURL.replace(
          "ipfs://",
          "https://gateway.ipfscdn.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  // deploy collections
  const collection_contract_factory = (signer) => {
    const collection_factory = new ethers.Contract(
      default_collection_factory,
      Collection_Factory.abi,
      signer
    );

    return collection_factory;
  };

  const create_collection = async (data) => {
    try {
      const collection_logo = await storage.upload(data.logo);
      const collection_image = await storage.upload(data.image);
      const collection_factory = collection_contract_factory(signer);

      collection_factory.on(
        "CollectionCreated",
        async (
          collectionId,
          name,
          symbol,
          description,
          image,
          logo,
          owner,
          collection_address
        ) => {
          const db = polybase();
          const res = await db
            .collection("NFTCollection")
            .create([
              collection_address,
              db.collection("User").record(signerAddress),
              image,
              logo,
              name,
              symbol,
              description,
            ]);
        }
      );
      const txn = await collection_factory.create_collection(
        data.name,
        data.symbol,
        collection_image,
        collection_logo,
        data.description
      );
      await txn.wait();
      // sendCollectionNoti({ collectionName: data.name });
    } catch (error) {
      alert(error.message);
    }
  };

  const get_my_collections = async () => {
    if (!signer) return;
    try {
      const collection = collection_contract_factory(signer);
      const my_collections = await collection.getMyCollections();
      return my_collections;
    } catch (error) {
      console.log(error.message);
    }
  };

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
        fetch_videos={fetch_videos}
        fetch_gamers={fetch_gamers}
        get_gamer={get_gamer}
        get_all_livestreams={get_all_livestreams}
        create_token={create_token}
        default_nft_collection={default_nft_collection}
        create_collection={create_collection}
        get_my_collections={get_my_collections}
        signer={signer}
        fetch_all_nfts={fetch_all_nfts}
      />
      <Footer />
    </>
  );
}
