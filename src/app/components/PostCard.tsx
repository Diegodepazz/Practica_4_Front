"use client";

import { useRouter } from "next/navigation";
import { PostT } from "@/types/Post";
import { retweetPost, toggleLikePost } from "@/api/api";

type Props = {
  post: PostT;
  refreshPosts?: () => void;
};

const PostCard = ({ post, refreshPosts }: Props) => {
  const router = useRouter();

  const postId = post.id || (post as any)._id;

  const username =
    post.author?.username ||
    (post as any).author?.usuario ||
    (post as any).user?.username ||
    (post as any).usuario?.username ||
    (post as any).usuario ||
    "Usuario";

  const content =
    post.content ||
    (post as any).contenido ||
    (post as any).text ||
    "";

  const fecha =
    post.createdAt ||
    (post as any).fecha ||
    "";

  const getCount = (value: any) => {
    if (typeof value === "number") return value;
    if (Array.isArray(value)) return value.length;
    if (typeof value === "object" && value !== null) return 1;
    return 0;
  };

  const likes = getCount(
    post.likesCount ??
      (post as any).likes ??
      (post as any).likesCount
  );

  const retweets = getCount(
    post.retweetsCount ??
      (post as any).retweets ??
      (post as any).retweetsCount
  );

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      await toggleLikePost(postId);
      refreshPosts?.();
    } catch (error) {
      console.log(error);
      alert("Error al dar like");
    }
  };

  const handleRetweet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      await retweetPost(postId);
      refreshPosts?.();
    } catch (error) {
      console.log(error);
      alert("Error al hacer retweet");
    }
  };

  return (
    <article className="postCard" onClick={() => router.push(`/post/${postId}`)}>
      <div className="postTop">
        <h3>@{String(username)}</h3>
        <span>{fecha ? new Date(fecha).toLocaleString() : "Sin fecha"}</span>
      </div>

      <p className="postContent">{content || "Sin contenido"}</p>

      <div className="postActions">
        <button onClick={handleLike}>Like {likes}</button>
        <button onClick={handleRetweet}>Retweet {retweets}</button>
      </div>
    </article>
  );
};

export default PostCard;