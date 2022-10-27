import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/molecules/navBar/index";

export default function Home() {
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <main className="-mt-32 bg-white shadow sm:rounded-lg max-w-4xl mx-auto lg:max-w-7xl p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
