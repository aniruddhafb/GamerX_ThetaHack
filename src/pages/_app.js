import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { v4 as uuidv4 } from "uuid";
// import * as PushAPI from "@pushprotocol/restapi";

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
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

// import "react-toastify/dist/ReactToastify.css";

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
const marketplace_address = "0x29dB031d70B16837e8a0C922603A918C35cCF95A";

export default function App({ Component, pageProps }) {
  const GAMERX_CHANNEL_ADDRESS = "0x392021135a39786167d85a4BFDAa791fea7877Db";
  const [provider, set_provider] = useState("");
  const [signer, set_signer] = useState("");
  const [signerAddress, setSignerAddress] = useState();
  const [signer_bal, set_signer_bal] = useState(0);
  const [format_signer_bal, set_format_signer_bal] = useState(0);
  const [current_chainId, set_current_chainId] = useState("");

  const [user_data, set_user_data] = useState();
  const storage = new ThirdwebStorage();
  const router = useRouter();

  let wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY);

  const connect_wallet = async () => {
    // delete_users("0x7671A05D4e947A7E991a8e2A92EEd7A3a9b9A861");
    // delete_video("video_y4wtagafu2vvy1tzascigwca3k");
    // create_user();
    // create_default_collection();

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

  const create_user = async () => {
    const db = polybase();
    const res = await db
      .collection("User")
      .create([marketplace_address, "", "", "", "", "", [], ""]);
    // console.log(res.data);
  };

  const delete_video = async (video) => {
    const db = polybase();
    const res = await db.collection("Video").record(video).call("del");
    // console.log(res.data);
  };

  const delete_users = async (address) => {
    const db = polybase();
    const res = await db.collection("User").record(address).call("del");
    // console.log({ res });
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
      ]);
  };

  const tip_video = async (video_id, tip_amount, recipient) => {
    try {
      const contract = marketplace();
      const db = polybase();
      const res = await contract.tip_creator(video_id, recipient, {
        value: ethers.utils.parseEther(tip_amount),
      });
      const tip_res = await contract.tips(video_id);
      const db_tip = await db
        .collection("Tip")
        .create([
          uuidv4(),
          db.collection("User").record(signerAddress),
          ethers.utils.parseEther(tip_amount).toString(),
          db.collection("Video").record(video_id),
        ]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetch_video_tips = async (video_id) => {
    try {
      const db = polybase();
      const res = await db
        .collection("Tip")
        .where("videoId", "==", {
          collectionId: `${process.env.NEXT_PUBLIC_NAMESPACE}/Video`,
          id: video_id,
        })
        .get();
      return res.data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const gamerX_collection = (collection_address, signer) => {
    if (!collection_address) return;
    try {
      const collection_contract = new ethers.Contract(
        collection_address,
        NFTCollection.abi,
        signer
      );
      return collection_contract;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const create_token = async (_tokenURI) => {
    try {
      const tokenURI = await storage.upload(_tokenURI);
      const gamerX = gamerX_collection(_tokenURI.collection_address, signer);
      const network = await provider.getNetwork();

      gamerX.on("TokenCreated", async (ipfsURL, tokenId) => {
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
            _tokenURI.tag,
          ]);
      });

      const txn = await gamerX.createToken(tokenURI);
      await txn.wait();
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
          data.tag,
        ]);

      router.push(`/content/videos/${res3.data.body.videos[0].id}`);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const update_profile = async (data) => {
    try {
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
          data.favourite_game,
        ]);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_user_data = async (signer_address) => {
    try {
      const db = polybase();
      const res = await db.collection("User").record(signer_address).get();
      set_user_data(res.data);
      return res.data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_video_data = async (id) => {
    try {
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

      let comments = [];
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
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const go_live = async (data) => {
    try {
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
          data.tag,
        ]);
      router.push(`/content/live/${res.data.stream_id}`);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const end_livestream = async (stream_id) => {
    try {
      const db = polybase();
      const res = await db
        .collection("LiveStream")
        .where("stream_id", "==", stream_id)
        .get();

      const end_stream = await db
        .collection("LiveStream")
        .record(res.data[0].data.id)
        .call("deactivate_livestream");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_user_livestream = async (user_id) => {
    try {
      const db = polybase();
      const res = await db
        .collection("LiveStream")
        .where("owner", "==", {
          collectionId: `${process.env.NEXT_PUBLIC_NAMESPACE}/User`,
          id: user_id,
        })
        .get();

      const livestreams = [];
      for (const e of res.data) {
        let obj = {};
        const owner = await db.collection("User").record(e.data.owner.id).get();
        obj = { owner: owner.data, livestream: e.data };
        livestreams.push(obj);
      }

      return livestreams;
    } catch (error) {
      console.log(error.message);
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_liveStream_data = async (stream_id) => {
    console.log({ stream_id });
    try {
      const db = polybase();
      const res = await db.collection("LiveStream").record(stream_id).get();
      // .where("stream_id", "==", stream_id)
      console.log({ res });
      if (!res.data) return;
      const owner = await db.collection("User").record(res.data.owner.id).get();
      let obj = { owner: owner.data, stream_data: res.data };
      return obj;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_all_livestreams = async () => {
    try {
      const db = polybase();
      const res = await db.collection("LiveStream").get();
      const livestreams = [];
      for (const e of res.data) {
        let obj = {};
        // if (e.data.isActive) {
        const owner = await db.collection("User").record(e.data.owner.id).get();
        obj = { owner, livestream: e.data };
        livestreams.push(obj);
        // }
      }
      return livestreams;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const fetch_gamers = async () => {
    try {
      const db = polybase();
      const res = await db.collection("User").get();
      return res.data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_gamer = async (userId) => {
    try {
      const db = polybase();
      const res = await db.collection("User").record(userId).get();
      return res.data;
    } catch (error) {
      console.log(error.message);
      console.log(error.message);
    }
  };

  const get_user_videos = async (user_id) => {
    if (!user_id) return;
    try {
      const db = polybase();
      const res = await db
        .collection("Video")
        .where("owner", "==", {
          collectionId: `${process.env.NEXT_PUBLIC_NAMESPACE}/User`,
          id: user_id,
        })
        .get();
      let videos = [];
      for (const e of res.data) {
        console.log(e);
        let obj = {};
        let owner = await db.collection("User").record(e.data.owner.id).get();
        obj = { owner: owner.data, video: e.data };
        videos.push(obj);
      }
      return videos;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const post_comment = async (video_id, comment) => {
    try {
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

      const save_comment = await db
        .collection("Video")
        .record(video_id)
        .call("post_comment", [
          db.collection("Comment").record(upload_comment.data.id),
        ]);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const fetch_videos = async () => {
    try {
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
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
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
      alert(error.message);
    }
  };

  const get_all_collections = async () => {
    try {
      const db = polybase();
      const collections = await db.collection("NFTCollection").get();
      const allCollections = [];
      collections.data.map((e) => {
        const { data } = e;
        allCollections.push(data);
      });
      return allCollections;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  // deploy collections
  const collection_contract_factory = (signer) => {
    try {
      const collection_factory = new ethers.Contract(
        default_collection_factory,
        Collection_Factory.abi,
        signer
      );

      return collection_factory;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const fetch_NFT_info = async (collection_address, tokenId) => {
    try {
      const db = polybase();
      let obj = {};
      const res = await db
        .collection("NFT")
        .record(`${collection_address}/${tokenId}`)
        .get();
      const collectionInfo = await db
        .collection("NFTCollection")
        .record(collection_address)
        .get();
      const ownerInfo = await db
        .collection("User")
        .record(res.data.owner.id)
        .get();
      obj.nft_properties = res.data.properties
        ? JSON.parse(res.data.properties)
        : [];
      // COLLECTION INFO
      obj.collectionLogo = collectionInfo.data.logo;
      obj.collection_name = collectionInfo.data.name;
      obj.collection_id = collectionInfo.data.id;
      obj.collection_owner = collectionInfo.data.owner.id;
      obj.collection_symbol = collectionInfo.data.symbol;
      //OWNER INFO
      obj.ownerImage = ownerInfo.data.profileImage;
      obj.owner_username = res.data.username;
      obj.seller = res.data.seller?.id;
      obj.user_id = ownerInfo.data.id;
      // NFT INFO
      obj.chainId = res.data.chainId;
      obj.isListed = res.data.isListed;
      obj.listingPrice = res.data.listingPrice
        ? ethers.utils.formatEther(res.data.listingPrice)
        : "";
      obj.nft_owner = res.data.owner.id;
      obj.chain_block = res.data.chain_block;
      obj.chain_image = res.data.chain_image;
      obj.chain_symbol = res.data.chain_symbol;
      const parsed_nft = await axios.get(
        res.data.ipfsURL.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/")
      );
      obj.ipfsData = parsed_nft.data;
      return obj;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
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
      console.log(error.message);
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
      alert(error.message);
    }
  };

  const toggle_follow = async (userId) => {
    try {
      const db = polybase();
      const res = await db
        .collection("User")
        .record(userId)
        .call("handle_unfollow", [db.collection("User").record(signerAddress)]);

      const res2 = await db
        .collection("User")
        .record(signerAddress)
        .call("handle_follow", [db.collection("User").record(userId)]);

      return { user: res.data, signer: res2.data };
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const is_following = async (user_id) => {
    if (!signerAddress) return;
    try {
      const db = polybase();
      const res = await db
        .collection("User")
        .record(signerAddress)
        .call("is_following", [db.collection("User").record(user_id)]);
      const follow_status = res.data.is_following;

      return follow_status;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  //FETCHES NFTS BY USER FROM POLYBASE
  const fetch_nfts_from_user_wallet = async (user_id) => {
    try {
      if (!user_id) return;
      let nfts = [];
      const db = polybase();
      const res = await db
        .collection("NFT")
        .where("owner", "==", {
          collectionId: `${process.env.NEXT_PUBLIC_NAMESPACE}/User`,
          id: user_id,
        })
        .get();

      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
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
      console.log(error.message);
      alert(error.message);
    }
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

  const fetch_collection_data = async (collection_address) => {
    try {
      const db = polybase();
      const res = await db
        .collection("NFTCollection")
        .where("id", "==", collection_address)
        .get();
      return res;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const marketplace = () => {
    const marketplace_contract = new ethers.Contract(
      marketplace_address,
      NFTMarketplace.abi,
      signer
    );
    return marketplace_contract;
  };

  // lsit nft for sale
  const list_nft = async (tokenId, price, collection_address) => {
    const collection_contract = gamerX_collection(collection_address, signer);
    try {
      const txnApproval = await collection_contract.setApprovalForAll(
        marketplace_address,
        true
      );
      await txnApproval.wait();
      const contract = marketplace();

      const txn = await contract.ListToken(
        tokenId,
        ethers.utils.parseEther(price),
        collection_address,
        {
          value: ethers.utils.parseEther("0.01"),
        }
      );
      await txn.wait();

      const nftRec = await contract.nft_record(collection_address, tokenId);
      if (txn.hash) {
        const db = polybase();
        const res = await db
          .collection("NFT")
          .record(`${collection_address}/${tokenId}`)
          .call("listNFT", [
            ethers.utils.parseEther(price).toString(),
            db.collection("User").record(marketplace_address),
          ]);
        sendNFTListNoti(tokenId, price);
        // router.reload();
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const create_job = async (data) => {
    try {
      const db = polybase();
      const logo_url = await storage.upload(data.logo);
      const res = await db
        .collection("Job")
        .create([
          uuidv4(),
          db.collection("User").record(signerAddress),
          logo_url,
          data.name,
          data.location,
          data.type,
          data.duration,
          data.title,
          data.description,
          data.min_salary,
          data.max_salary,
          data.role,
          data.requirements,
        ]);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_all_jobs = async () => {
    try {
      const db = polybase();
      const res = await db.collection("Job").get();
      return res.data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_posted_jobs = async (user_id) => {
    try {
      if (!user_id) return;
      const db = polybase();
      const res = await db
        .collection("Job")
        .where("owner", "==", {
          collectionId: `${process.env.NEXT_PUBLIC_NAMESPACE}/User`,
          id: user_id,
        })
        .get();
      return res.data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const get_job_byId = async (id) => {
    const db = polybase();
    try {
      const res = await db.collection("Job").record(id).get();
      return res.data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const apply_to_job = async (job_id, data) => {
    try {
      const resume = await storage.upload(data.resume);
      const db = polybase();
      const res = await db
        .collection("ApplyJob")
        .create([
          uuidv4(),
          db.collection("Job").record(job_id),
          data.name,
          data.email,
          resume,
        ]);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  // execute sales
  const executeSale = async (tokenId, collection_address, listing_price) => {
    const db = polybase();

    try {
      const res = await db
        .collection("NFT")
        .record(`${collection_address}/${tokenId}`)
        .get();
      const contract = marketplace();
      const txn = await contract.executeSale(tokenId, collection_address, {
        value: ethers.utils.parseEther(listing_price),
      });
      await txn.wait();
      if (txn.hash) {
        const res = await db
          .collection("NFT")
          .record(`${collection_address}/${tokenId}`)
          .call("executeSale", [db.collection("User").record(signerAddress)]);
      }
      // sendNFTSaleNoti(tokenId, listing_price);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const send_superchat = async (video_id, recipient, amount, message) => {
    try {
      const contract = marketplace();
      const res = await contract.tip_creator(video_id, recipient, {
        value: ethers.utils.parseEther(amount),
      });
      const db = polybase();
      const db_res = await db
        .collection("Superchat")
        .create([
          uuidv4(),
          db.collection("LiveStream").record(video_id),
          db.collection("User").record(signerAddress),
          message,
          ethers.utils.parseEther(amount).toString(),
        ]);

      return db_res.data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const fetch_superchats = async (video_id) => {
    try {
      if (!video_id) return;
      const db = polybase();
      const res = await db
        .collection("Superchat")
        .where("live_stream", "==", {
          collectionId: `${process.env.NEXT_PUBLIC_NAMESPACE}/LiveStream`,
          id: video_id,
        })
        .get();

      let superchats = [];
      for (const e of res.data) {
        let obj = {};
        obj.amount = ethers.utils.formatEther(e.data.amount).toString();
        obj.tipper = e.data.tipper.id;
        obj.message = e.data.message;
        const owner = await db
          .collection("User")
          .record(e.data.tipper.id)
          .get();
        obj.tipper_username = owner.data.username;
        obj.tipper_bio = owner.data.bio;
        obj.tipper_profile_image = owner.data.profile_image;

        superchats.push(obj);
      }

      return superchats;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  // const sendNFTListNoti = async ({ tokenId, signer_address }) => {
  //   const signer = new ethers.Wallet(`${process.env.NEXT_PUBLIC_PRIVATE_KEY}`);
  //   try {
  //     const apiResponse = await PushAPI.payloads.sendNotification({
  //       signer,
  //       type: 3,
  //       identityType: 2,
  //       notification: {
  //         title: `Your NFT with token ID ${tokenId} is listed for sale on GamerX`,
  //         body: `Congratulations, you have successfully listed your NFT for sale`,
  //       },
  //       payload: {
  //         title: `Your NFT with token ID ${tokenId} is listed for sale on GamerX`,
  //         body: `Congratulations, you have successfully listed your NFT for sale`,
  //       },
  //       recipients: `eip155:80001:${signer_address}`,
  //       channel: `eip155:80001:${GAMERX_CHANNEL_ADDRESS}`,
  //       env: "staging",
  //     });
  //   } catch (err) {
  //     console.error("Error: ", err);
  //   }

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
        chainID={current_chainId}
        setChainID={set_current_chainId}
        user_data={user_data}
        GAMERX_CHANNEL_ADDRESS={GAMERX_CHANNEL_ADDRESS}
      />
      <Component
        {...pageProps}
        get_posted_jobs={get_posted_jobs}
        is_following={is_following}
        fetch_superchats={fetch_superchats}
        send_superchat={send_superchat}
        apply_to_job={apply_to_job}
        get_job_byId={get_job_byId}
        get_all_jobs={get_all_jobs}
        create_job={create_job}
        toggle_follow={toggle_follow}
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
        get_all_collections={get_all_collections}
        fetch_NFT_info={fetch_NFT_info}
        fetch_collection_data={fetch_collection_data}
        polybase={polybase}
        fetch_nfts_from_user_wallet={fetch_nfts_from_user_wallet}
        get_user_videos={get_user_videos}
        list_nft={list_nft}
        get_user_livestream={get_user_livestream}
        executeSale={executeSale}
        tip_video={tip_video}
        fetch_video_tips={fetch_video_tips}
        end_livestream={end_livestream}
      />
      <Footer />
    </>
  );
}
