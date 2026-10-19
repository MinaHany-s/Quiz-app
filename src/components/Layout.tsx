import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="bg-gray-200 min-h-screen flow-root">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}
