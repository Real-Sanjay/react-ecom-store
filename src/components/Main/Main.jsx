import { useEffect, useState } from "react";
import Router from "../Router/Router";
import { getItem } from "../../util/StorageUtil";

const Main = () => {

  return (
    <main className="main">
      <Router/>
    </main>
  );
};

export default Main;
