import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
// styles
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import "@/styles/plugins.css";
import "@/styles/custom.css";

//polybasE
import { Polybase } from "@polybase/client";
import { ethers } from "ethers";

export default function App({ Component, pageProps }) {
  const [signer, set_signer] = useState();
  const db = new Polybase({
    defaultNamespace: process.env.NEXT_PUBLIC_NAMESPACE,
  });

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
        const signer_address = await signer.getAddress();
        console.log({ signer_address });
        const check_user = await db
          .collection("User")
          .where("id", "==", signer_address)
          .get();
        if (!check_user) {
          db.collection("User").create([signer_address]);
        }
      }
    } catch (error) {
      console.log({ connect_wallet: error.message });
    }
  };

  const upload_video = async (e, file) => {
    e.preventDefault();

    try {
      const res = await axios({
        url: "https://api.thetavideoapi.com/upload",
        method: "POST",
        headers: {
          "x-tva-sa-id": "srvacc_sqc1y5hhxz838uune4zh519a3",
          "x-tva-sa-secret": "hcj34emsvgy9xmtuau31n5ab53624px3",
        },
      });
      console.log(res.data.body.uploads[0].id);
      console.log(res.data.body.uploads[0]);

      const res2 = await axios({
        url: res.data.body.uploads[0].presigned_url,
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        data: file,
      });

      console.log(res2);

      //GET VIDEO ID
      const res3 = await axios({
        method: "POST",
        url: "https://api.thetavideoapi.com/video",
        headers: {
          "x-tva-sa-id": "srvacc_sqc1y5hhxz838uune4zh519a3",
          "x-tva-sa-secret": "hcj34emsvgy9xmtuau31n5ab53624px3",
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
          "x-tva-sa-id": "srvacc_sqc1y5hhxz838uune4zh519a3",
          "x-tva-sa-secret": "hcj34emsvgy9xmtuau31n5ab53624px3",
        },
      });

      console.log(res4.data);

      const res5 = await axios({
        url: `https://api.thetavideoapi.com/video/srvacc_sqc1y5hhxz838uune4zh519a3/list?page=1&number=100`,
        method: "GET",
        headers: {
          "x-tva-sa-id": "srvacc_sqc1y5hhxz838uune4zh519a3",
          "x-tva-sa-secret": "hcj34emsvgy9xmtuau31n5ab53624px3",
        },
      });

      console.log(res5.data);
    } catch (error) {
      console.log(error.message);
    }
    // videojs("my-player", {
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

  useEffect(() => {
    connect_wallet();
  }, []);
  return (
    <>
      <Navbar connect_wallet={connect_wallet} />
      <Component {...pageProps} upload_video={upload_video} />
      <Footer />
    </>
  );
}
