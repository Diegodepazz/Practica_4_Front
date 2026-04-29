type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

const Paginador = ({ page, totalPages, setPage }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <div className="paginador">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginador;