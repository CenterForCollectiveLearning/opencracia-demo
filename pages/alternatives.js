import React, {useEffect, useState} from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProposalPanel from "../components/ProposalPanel";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";

export default function Proposals(props) {
  const {data} = props;
  const {t, lang} = useTranslation("translation");

  const title = <h1 className="title">{t("menu.alternatives")}</h1>;
  const nav =<Navbar
    hmTitle={`${t("menu.alternatives")} / ${t("website.name")}`}
    selected="alternatives" />;
  
  console.log(data);

  return <>
    {nav}
    {title}
    <div className="container">
      <div className="columns">
        <div className="column">
          <ProposalPanel
            lang={lang}
            data={data}
          />
        </div>
      </div>
    </div>
    <Footer />
  </>;
}

export async function getInitialProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const resp = await fetch("http://localhost:3002/api/alternatives");
  const data = await resp.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data
    }
  };
}