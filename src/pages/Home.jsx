import { useEffect } from "react";
import { Card } from "../components/Card";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const loadAll = async () => {
    const getAll = async (url, limit = 1000) => {
      const res = await fetch(`${url}?page=1&limit=${limit}`);
      const data = await res.json();
      return data.results;
    };
    const [people, planets, starships] = await Promise.all([
      getAll("https://www.swapi.tech/api/people"),
      getAll("https://www.swapi.tech/api/planets"),
      getAll("https://www.swapi.tech/api/starships"),
    ]);
    dispatch({ type: "set_data", payload: { people, planets, starships } });
  };

  useEffect(() => {
    loadAll();
  }, []);

  const q = store.query.trim().toLowerCase();
  const filterByQuery = (arr) =>
    q ? arr.filter((i) => i.name.toLowerCase().includes(q)) : arr;

  return (
    <div className="home-container">
      <h1 className="page-title">Star Wars Database</h1>

      <section id="people-section">
        <h2>Personajes</h2>
        <div className="card-list">
          {filterByQuery(store.people).map((p) => (
            <Card key={p.uid} item={p} type="people" />
          ))}
        </div>
      </section>

      <section id="planets-section">
        <h2>Planetas</h2>
        <div className="card-list">
          {filterByQuery(store.planets).map((p) => (
            <Card key={p.uid} item={p} type="planets" />
          ))}
        </div>
      </section>

      <section id="starships-section">
        <h2>Naves</h2>
        <div className="card-list">
          {filterByQuery(store.starships).map((s) => (
            <Card key={s.uid} item={s} type="starships" />
          ))}
        </div>
      </section>
    </div>
  );
};
