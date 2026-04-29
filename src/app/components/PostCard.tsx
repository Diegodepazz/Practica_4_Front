"use client";

import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function PostCard({ post, refrescar }: any) {
  const router = useRouter();

  const darLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    api
      .post("/api/posts/" + post._id + "/like")
      .then(() => {
        if (refrescar) refrescar();
      })
      .catch((err) => console.log(err.response?.data));
  };

  const retweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    api
      .post("/api/posts/" + post._id + "/retweet")
      .then(() => {
        if (refrescar) refrescar();
      })
      .catch((err) => console.log(err.response?.data));
  };

  return (
    <div className="post" onClick={() => router.push("/post/" + post._id)}>
      <p>{post.contenido}</p>

      <p>
        Autor: {post.autor ? post.autor.username : "Sin autor"}
      </p>

      <p>
        Likes: {post.likes ? post.likes.length : 0} | Retweets:{" "}
        {post.retweets ? post.retweets.length : 0}
      </p>

      <button onClick={darLike}>Like</button>
      <button onClick={retweet}>Retweet</button>
    </div>
  );
}