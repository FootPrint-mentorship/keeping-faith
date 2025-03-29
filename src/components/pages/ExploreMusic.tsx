import React from "react";
import styles from "../../styles/exploreMusic.module.scss";
import { FiMic, FiEdit, FiPlayCircle } from "react-icons/fi";

const ExploreMusic: React.FC = () => {
  return (
    <div className={styles.explore}>
      <h1 className={styles.title}>Explore</h1>
      <div className={styles.exploreContainer}>
        <div className={styles.hero}>
          <h1>Discover Multimedia Content with ease</h1>
          <p>
            Effortlessly search through a vast collection of videos, audios, and
            books. Filter by category, tags, or keywords to get exactly what
            you're looking for.{" "}
            <span className={styles.highlight}>
              Select any category to get started
            </span>
          </p>
        </div>

        <div className={styles.categories}>
          
        </div>
      </div>
    </div>
  );
};

export default ExploreMusic;
