import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
  const { dispatch, store } = useGlobalReducer();
  const { uid, name } = item;
  const imgSrc = `/src/assets/img/${type}/${uid}.jpg`;

  const isFav = store.favorites.some((f) => f.uid === uid && f.type === type);

  return (
    <div className="sw-card">
      <img src={imgSrc} alt={name} />
      <div className="card-body-fixed">
        <h5>{name}</h5>

        <div className="card-actions-fixed">
          <Link to={`/${type}/${uid}`} className="btn-blue">
            Ver más
          </Link>

          <button
            className={`btn-star ${isFav ? "active" : ""}`}
            onClick={() =>
              dispatch({
                type: "toggle_favorite",
                payload: { type, uid, name },
              })
            }
          >
            ★
          </button>
        </div>
      </div>
    </div>
  );
};
