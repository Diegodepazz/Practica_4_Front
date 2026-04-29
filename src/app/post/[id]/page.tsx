"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { commentPost, getPostById, retweetPost, toggleLikePost,} from "@/api/api";
import { PostT } from "@/types/Post";

const PostDetailPage = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [post, setPost] = useState<PostT | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    try {
      setLoading(true);

      const data = await getPostById(id);

      setPost(data);
    } catch (error) {
      console.log(error);
      alert("Error al cargar el post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      router.push("/login");
      return;
    }

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      await toggleLikePost(id);
      fetchPost();
    } catch (error) {
      console.log(error);
      alert("Error al dar like");
    }
  };

  const handleRetweet = async () => {
    try {
      await retweetPost(id);
      fetchPost();
    } catch (error) {
      console.log(error);
      alert("Error al hacer retweet");
    }
  };

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      await commentPost(id, comment);
      setComment("");
      fetchPost();
    } catch (error) {
      console.log(error);
      alert("Error al comentar");
    }
  };

  if (loading) return <p>Cargando post...</p>;
  if (!post) return <p>No se ha encontrado el post.</p>;

  return (
    <section className="pageSection">
      <button className="backButton" onClick={() => router.push("/")}>
        Volver
      </button>

      <article className="detailCard">
        <h2>{post.author?.username || "Usuario"}</h2>

        <p className="detailDate">
          {new Date(post.createdAt).toLocaleString()}
        </p>

        <p className="detailContent">{post.content}</p>

        <div className="postActions">
          <button onClick={handleLike}>Like {post.likesCount ?? 0}</button>
          <button onClick={handleRetweet}>
            Retweet {post.retweetsCount ?? 0}
          </button>
        </div>
      </article>

      <form onSubmit={handleComment} className="createPostForm">
        <textarea
          placeholder="Escribe un comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit">Comentar</button>
      </form>

      <div className="commentsSection">
        <h3>Comentarios</h3>

        {post.comments && post.comments.length > 0 ? (
          post.comments.map((item) => (
            <div className="commentCard" key={item.id}>
              <h4>{item.author?.username || "Usuario"}</h4>
              <p>{item.content}</p>
              <strong>{new Date(item.createdAt).toLocaleString()}</strong>
            </div>
          ))
        ) : (
          <p>No hay comentarios todavía.</p>
        )}
      </div>
    </section>
  );
};

export default PostDetailPage;