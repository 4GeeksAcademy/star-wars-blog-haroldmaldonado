import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="navbar navbar-dark bg-black">
      <div className="container d-flex align-items-center gap-3">
        <Link to="/" className="navbar-brand text-warning">
          Star Wars Blog
        </Link>

        <div className="d-none d-md-flex align-items-center gap-3 ms-auto me-2">
          <button
            className="btn btn-link nav-link-btn"
            onClick={() => scrollToId("people-section")}
          >
            Personajes
          </button>
          <button
            className="btn btn-link nav-link-btn"
            onClick={() => scrollToId("planets-section")}
          >
            Planetas
          </button>
          <button
            className="btn btn-link nav-link-btn"
            onClick={() => scrollToId("starships-section")}
          >
            Naves
          </button>
        </div>

        <div className="search-wrap">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Buscar..."
            value={store.query}
            onChange={(e) =>
              dispatch({ type: "set_query", payload: e.target.value })
            }
          />
        </div>

        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Favoritos ({store.favorites.length})
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 && (
              <li className="dropdown-item text-muted">Vacío</li>
            )}
            {store.favorites.map((f) => (
              <li
                key={`${f.type}-${f.uid}`}
                className="d-flex align-items-center px-2"
              >
                <Link
                  to={`/${f.type}/${f.uid}`}
                  className="dropdown-item flex-grow-1"
                >
                  {f.name} <span className="text-muted">({f.type})</span>
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger ms-2"
                  onClick={() =>
                    dispatch({ type: "toggle_favorite", payload: f })
                  }
                  title="Eliminar"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
