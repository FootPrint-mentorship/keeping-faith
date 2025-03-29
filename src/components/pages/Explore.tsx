import React, { useState } from "react";
import styles from "../../styles/explore.module.scss";
import { FiMic, FiEdit, FiPlayCircle, FiArrowLeft } from "react-icons/fi";

const Explore: React.FC = () => {
  const [showMusicSearch, setShowMusicSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleMusicClick = () => {
    setShowMusicSearch(true);
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 2000);
  };

  if (showResults) {
    return (
      <div className={styles.searchResults}>
        <div className={styles.header}>
          <FiArrowLeft className={styles.backButton} onClick={() => setShowResults(false)} />
          <h2>4 search results for Praise & Worship.</h2>
        </div>
        <div className={styles.resultsGrid}>

        {[1, 2, 3, 4].map((item) => (
          <div key={item} className={styles.resultCard}>
            <div className={styles.resultImage}>
              <img src="/images/searchImage.jpeg" alt="Worship" />
            </div>
            <div className={styles.resultContent}>
              <h3>Praise & Worship</h3>
              <div className={styles.metadata}>
                <span className={styles.type}>Music</span>
                <span className={styles.duration}>1hr 30s</span>
              </div>
              <p>Praise and worship video by odunsi. this features a powerfull prais to the lord......</p>
              <button className={styles.viewButton}>View</button>
            </div>
          </div>
        ))}
        </div>
        
        <div className={styles.noResults}>
          <p>cant find what you are looking for? Click here to make a request</p>
          <button className={styles.newRequestButton}>New Request</button>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className={styles.searchingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
        <p>Searching...</p>
      </div>
    );
  }

  if (showMusicSearch) {
    return (
      <div className={styles.explore1}>
        <h2>Effortlessly search through a vast collection of videos, audios, and books. Filter by category, tags, or</h2>
        <h2>keywords to get exactly what you're looking for</h2>
        <div className={styles.searchContainer}>
          <div className={styles.searchForm}>
            <h3>Enter your search criteria</h3>
            <input
              type="text"
              placeholder="search by title, description, tags"
              className={styles.searchInput}
            />

            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Type</label>
                <select className={styles.select}>
                  <option value="">Select</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Category</label>
                <select className={styles.select}>
                  <option value="">Select</option>
                </select>
              </div>
            </div>

            <button className={styles.searchButton} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className={styles.category} onClick={handleMusicClick}>
            <div className={styles.iconWrapper}>
              <FiMic size={24} />
            </div>
            <h3>Music</h3>
          </div>

          <div className={styles.category}>
            <div className={styles.iconWrapper}>
              <FiEdit size={24} />
            </div>
            <h3>Books</h3>
          </div>

          <div className={styles.category}>
            <div className={styles.iconWrapper}>
              <FiPlayCircle size={24} />
            </div>
            <h3>Videos</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
