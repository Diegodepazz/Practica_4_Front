"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, getHomePosts } from "@/api/api";
import { PostT } from "@/types/Post";
import PostCard from "./components/PostCard";
import Paginador from "./components/Paginador";

const HomePage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<PostT[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getHomePosts(page);

      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.log(error);
      alert("Error al cargar los posts");
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

    fetchPosts();
  }, [page]);

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      await createPost(content);
      setContent("");
      fetchPosts();
    } catch (error) {
      console.log(error);
      alert("Error al crear el post");
    }
  };

  return (
    <section className="pageSection">
      <h2 className="pageTitle">Últimos posts</h2>

      <form onSubmit={handleCreatePost} className="createPostForm">
        <textarea
          placeholder="¿Qué está pasando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Publicar</button>
      </form>

      {loading ? (
        <p>Cargando posts...</p>
      ) : (
        <>
          <div className="postsList">
            {posts.map((post, index) => (
              <PostCard
                key={post.id || (post as any)._id || index}
                post={post}
                refreshPosts={fetchPosts}
              />
            ))}
          </div>

          <Paginador page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </section>
  );
};

export default HomePage;