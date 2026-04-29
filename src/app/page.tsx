"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import PostCard from "./components/PostCard";
import Paginador from "./components/Paginador";

export default function HomePage() {
  const router = useRouter();

  const [posts, setPosts] = useState<any[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(5);
  const [contenido, setContenido] = useState("");
  const [cargando, setCargando] = useState(true);

  const cargarPosts = () => {
    setCargando(true);

    api
      .get("/api/home?page=" + pagina)
      .then((res) => {
        console.log("RESPUESTA HOME:", res.data);

        const datos =
          res.data.posts ||
          res.data.data ||
          res.data.results ||
          [];

        setPosts(datos);

        setTotalPaginas(
          res.data.totalPages ||
            res.data.totalPaginas ||
            res.data.pages ||
            5
        );
      })
      .catch((err) => {
        console.log(err.response?.data);
        alert("Error al cargar los posts");
      })
      .finally(() => {
        setCargando(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      router.push("/login");
      return;
    }

    cargarPosts();
  }, [pagina]);

  const publicarPost = () => {
    if (contenido.trim() === "") {
      alert("Escribe algo");
      return;
    }

    api
      .post("/api/posts", {
        contenido: contenido,
      })
      .then(() => {
        setContenido("");
        setPagina(1);
        cargarPosts();
      })
      .catch((err) => {
        console.log(err.response?.data);
        alert("Error al publicar");
      });
  };

  return (
    <main>
      <h1>Home</h1>

      <div className="caja">
        <input
          placeholder="¿Qué está pasando?"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        <button onClick={publicarPost}>Publicar</button>
      </div>

      <h2>Últimos posts</h2>

      <Paginador
        pagina={pagina}
        totalPaginas={totalPaginas}
        setPagina={setPagina}
      />

      {cargando ? (
        <p>Cargando posts...</p>
      ) : (
        <>
          {posts.length === 0 && <p>No hay posts</p>}

          {posts.map((post, index) => (
            <PostCard
              key={post._id || post.id || index}
              post={post}
              refrescar={cargarPosts}
            />
          ))}
        </>
      )}

      <Paginador
        pagina={pagina}
        totalPaginas={totalPaginas}
        setPagina={setPagina}
      />
    </main>
  );
}