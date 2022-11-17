import React, {useState} from "react";
import {useSelector} from "react-redux";
import Navbar from "../components/Navbar";
import useTranslation from "next-translate/useTranslation";
import {Slider} from "@blueprintjs/core";
import store, {properties, users} from "../store/store";
import Router , {useRouter} from "next/router";

import styles from "../styles/Home.module.scss";
import classNames from "classnames";

export default function Create(props) {
  const {
    alternatives,
    ballotSize,
    dataChunks,
    module,
    aggregation,
    collectData,
    memory
  } = useSelector(state => state.properties);

  const [_alternatives, setAlternatives] = useState(alternatives);
  const [_ballotSize, setBallotSize] = useState(ballotSize);
  const [_module, setModule] = useState(undefined);

  const exampleBallot = [];

  const router = useRouter();

  const createInstance = () => {
    store.dispatch(properties.actions.updateAlternatives(_alternatives));
    store.dispatch(properties.actions.updateModule(_module));
    store.dispatch(properties.actions.updateBallotSize(_ballotSize));

    // Redirects to participate page
    router.push("/participate");
  };

  for(let i=0; i < _ballotSize; i++) 
    exampleBallot.push(<div className={styles.ballotAlternative}>Alternative {i + 1}</div>);
  
  return <div className={styles.container}>
    <Navbar />
    <div className={styles.main}>
      <h1>Create your own instance of Opencracia!</h1>
      <p className={styles.desc}>
        Please, fill the options to config a new participation instance.
      </p>

      <h2>Module</h2>
      <div className={styles.modules}>
        <div 
          className={classNames(styles.moduleIcon, {[styles.selected]: _module === "pairwise"})}
          onClick={() => setModule("pairwise")}
        >
          <img src="icons/icon_pairwise.png" alt="" />
          <span>Pairwise Comparison</span>
        </div>
        <div 
          className={classNames(styles.moduleIcon, {[styles.selected]: _module === "approval"})}
          onClick={() => setModule("approval")}
        >
          <img src="icons/icon_approval.png" alt="" />
          <span>Approval Voting</span>
        </div>
        <div 
          className={classNames(styles.moduleIcon, {[styles.selected]: _module === "rank"})}
          onClick={() => setModule("rank")}
        >
          <img src="icons/icon_rank.png" alt="" />
          <span>Rank Voting</span>
        </div>
        <div 
          className={classNames(styles.moduleIcon, {[styles.selected]: _module === "fallback"})}
          onClick={() => setModule("fallback")}
        >
          <img src="icons/icon_fallback.png" alt="" />
          <span>Fallback Voting</span>
        </div>
      </div>

      {["fallback", "rank", "approval"].includes(_module) && <>
        <div className={styles.title}>
          <h2>Ballot Size</h2>
          <Slider
            handleHtmlProps={{"aria-label": "example 1"}}
            labelStepSize={1}
            max={10}
            min={2}
            onChange={evt => setBallotSize(evt)} 
            stepSize={1}
            value={_ballotSize}
          />
        </div>
        <div className={styles.inputBallot}>
          {exampleBallot.map(d => d)}
        </div>
      </>}
      

      <h2>Set of Alternatives</h2>
      <p className={styles.desc}>
        By default, we include projects voted during the participatory budgeting campaign in New York in 2012.
      </p>

      <input 
        className={styles.input} 
        onChange={evt => setAlternatives(evt.target.value)}
        type="text" 
        value={_alternatives}
      />

      <button 
        className={styles.button} 
        onClick={() => createInstance()}
      >
        Create
      </button>
    </div>
  </div>;
}