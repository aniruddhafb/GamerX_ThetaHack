import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import videojs from "video.js";
const liveStream = ({ get_liveStream_data }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, set_data] = useState();
  const stream_video = async () => {
    if (!slug) return;
    const res = await get_liveStream_data(slug);
    console.log(res);
    set_data(res);
  };
  useEffect(() => {
    stream_video();
  }, [slug]);
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://edge-player-beta.thetatoken.org/?streamId=${slug}`}
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default liveStream;
