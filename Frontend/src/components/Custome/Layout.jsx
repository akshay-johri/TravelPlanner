import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header /> {/* Header will be displayed on all pages */}
      <main>
        <Outlet /> {/* Renders the matched route's component */}
      </main>
    </div>
  );
};

export default Layout;
