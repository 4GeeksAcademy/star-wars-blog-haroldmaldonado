import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Outlet /> {/* 🔹 Aquí se renderiza la ruta hija */}
      </main>
      <Footer />
    </>
  );
};
