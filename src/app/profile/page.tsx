"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyProfile } from "@/api/api";
import { PostT, UserT } from "../types/Post";

import PostCard from "../components/PostCard";

const ProfilePage = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserT | null>(null);
  const [posts, setPosts] = useState<PostT[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getMyProfile();

      setUser(data.user);
      setPosts(data.posts || []);
    } catch (error) {
      console.log(error);
      alert("Error al cargar el perfil");
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

    fetchProfile();
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (!user) return <p>No se ha podido cargar el perfil.</p>;

  return (
    <section className="pageSection">
      <div className="profileCard">
        <h2>{user.username || "Usuario"}</h2>

        <p>{user.bio || "Sin bio"}</p>

        <div className="profileStats">
          <p><strong>{user.followersCount ?? 0}</strong> seguidores</p>
          <p><strong>{user.followingCount ?? 0}</strong> seguidos</p>
        </div>
      </div>

      <h2>Mis posts</h2>

      <div className="postsList">
        {posts.map((post, index) => (
          <PostCard
            key={post.id || (post as any)._id || index}
            post={post}
            refreshPosts={fetchProfile}
          />
        ))}
      </div>
    </section>
  );
};

export default ProfilePage;