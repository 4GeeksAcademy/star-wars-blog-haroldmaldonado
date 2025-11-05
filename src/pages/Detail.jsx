import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Detail = () => {
  const { type, uid } = useParams();
  const { dispatch } = useGlobalReducer();
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const data = await res.json();
      setEntity(data.result.properties);
    };
    loadDetail();
  }, [type, uid]);

  const imgSrc = `/src/assets/img/${type}/${uid}.jpg`;

  if (!entity) return <p>Cargando...</p>;

  return (
    <div className="detail-container">
      <div className="img-column">
        <img src={imgSrc} className="detail-image" alt={entity.name} />
      </div>
      <div className="info-column">
        <h1 className="entity-name">{entity.name}</h1>

        <ul className="detail-list">
          {Object.entries(entity).map(([key, value]) => (
            <li key={key}>
              <strong>{key.replace("_", " ")}:</strong> {value}
            </li>
          ))}
        </ul>

        <Link to="/" className="btn btn-outline-warning mt-3">
          ← Volver
        </Link>
      </div>
    </div>
  );
};
