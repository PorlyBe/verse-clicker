import React, { FC, Suspense, lazy } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import Layout from "../components/Layout";
import PrestigeInfo from "../components/PrestigeInfo";

const Particles = lazy(() => import("../components/Particles"));

const Prestige: FC = () => {
  return (
    <Layout>
      <Suspense>
        <Particles />
      </Suspense>
      <Header />
      <PrestigeInfo />
      <Footer />
    </Layout>
  );
};

export default Prestige;
