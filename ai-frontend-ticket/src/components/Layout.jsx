import Navbar from "../components/navbar.jsx";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="p-6">{children}</div>
    </>
  );
}

export default Layout;
