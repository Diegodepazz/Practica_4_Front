"use client";

type Props = {
  pagina: number;
  totalPaginas: number;
  setPagina: (pagina: number) => void;
};

export default function Paginador({
  pagina,
  totalPaginas,
  setPagina,
}: Props) {
  return (
    <div className="paginador">
      <button
        disabled={pagina === 1}
        onClick={() => setPagina(pagina - 1)}
      >
        Anterior
      </button>

      <span>
        Página {pagina} de {totalPaginas}
      </span>

      <button
        disabled={pagina === totalPaginas}
        onClick={() => setPagina(pagina + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}