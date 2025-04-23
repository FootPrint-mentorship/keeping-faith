import React, { useState, useEffect } from "react";
import styles from "../../styles/explore.module.scss";
import { FiMic, FiEdit, FiPlayCircle, FiArrowLeft } from "react-icons/fi";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from 'next/router';
import RequestModal from "../modals/RequestModal";

interface SearchResult {
  _id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  duration?: string;
  thumbnail?: string;
  link: string;
}

interface SearchParams {
  search?: string;
  type?: string;
  category?: string;
}

const getVideoId = (url: string): string | null => {
  try {
    if (!url) return null;
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      // Handle youtube.com/watch?v=ID format
      const searchParams = new URLSearchParams(urlObj.search);
      const videoId = searchParams.get('v');
      if (videoId) return videoId;

      // Handle youtu.be/ID format
      const pathSegments = urlObj.pathname.split('/');
      return pathSegments[pathSegments.length - 1] || null;
    }
  } catch (e) {
    console.error('Error parsing video URL:', e);
  }
  return null;
};

const Explore: React.FC = () => {
  const router = useRouter();
  const { getToken, logout, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  const [showMusicSearch, setShowMusicSearch] = useState(false);
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [showVideoSearch, setShowVideoSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [error, setError] = useState("");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const resetSearch = () => {
    setSearchParams({});
    setSearchResults([]);
    setError("");
    setShowResults(false);
  };

  const handleBackToExplore = () => {
    setShowMusicSearch(false);
    setShowBookSearch(false);
    setShowVideoSearch(false);
    resetSearch();
  };

  const loadInitialData = async (category: string) => {
    console.log(`Loading initial data for category: ${category}`);
    setSearchParams({ category, type: 'newest' });
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const url = `https://keeping-faith-api.onrender.com/api/v1/records/search?category=${category}&type=newest`;
      console.log('Loading initial data from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        if (response.status === 401) {
          logout();
          throw new Error('Your session has expired. Please login again.');
        }
        throw new Error(`Failed to fetch initial results: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Initial data response:', data);

      const records = data.records || [];
      setSearchResults(Array.isArray(records) ? records : []);
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while loading data');
    }
  };

  const handleMusicClick = () => {
    resetSearch();
    setShowMusicSearch(true);
    loadInitialData('music');
  };

  const handleBooksClick = () => {
    resetSearch();
    setShowBookSearch(true);
    loadInitialData('books');
  };

  const handleVideosClick = () => {
    resetSearch();
    setShowVideoSearch(true);
    loadInitialData('videos');
  };

  const handleSearch = async () => {
    console.log('Starting search with params:', searchParams);
    setIsSearching(true);
    setError("");
    
    try {
      const queryParams = new URLSearchParams();
      if (searchParams.type) queryParams.append('type', searchParams.type);
      if (searchParams.category) queryParams.append('category', searchParams.category);
      if (searchParams.search) queryParams.append('search', searchParams.search);

      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      // If no search parameters are provided, default to showing newest items in the category
      if (!searchParams.search && !searchParams.type) {
        queryParams.append('type', 'newest');
      }

      const url = `https://keeping-faith-api.onrender.com/api/v1/records/search?${queryParams.toString()}`;
      console.log('Making API request to:', url);
      console.log('Search params:', searchParams);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        if (response.status === 401) {
          logout();
          throw new Error('Your session has expired. Please login again.');
        }
        throw new Error(`Failed to fetch search results: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', {
        url,
        searchParams,
        totalRecords: data.records?.length || 0,
        response: data
      });

      // Ensure we're getting the records array from the response
      const records = data.records || [];
      if (records.length > 0) {
        console.log('Found records:', records.map((r: SearchResult) => ({
          id: r._id,
          title: r.title,
          type: r.type,
          category: r.category
        })));
      } else {
        console.log('No records found for the current search');
      }
      
      setSearchResults(Array.isArray(records) ? records : []);
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setIsSearching(false);
    }
  };

  if (showResults) {
    return (
      <div className={styles.searchResults}>
        <div className={styles.header}>
          <FiArrowLeft className={styles.backButton} onClick={() => setShowResults(false)} />
          <h2>{searchResults.length} search results{searchParams.search ? ` for "${searchParams.search}"` : ''}</h2>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.resultsGrid}>
        {Array.isArray(searchResults) && searchResults.length === 0 && !error ? (
          <div className={styles.noResults}>
            <p>No results found for your search criteria. Try adjusting your filters or search term.</p>
          </div>
        ) : (
          Array.isArray(searchResults) && searchResults.map((item) => (
          <div key={item._id} className={styles.resultCard}>
            <div className={styles.resultImage}>
              <img 
                src={item.thumbnail || `https://img.youtube.com/vi/${getVideoId(item.link)}/hqdefault.jpg`} 
                alt={item.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/400x300?text=No+Preview';
                }}
              />
            </div>
            <div className={styles.resultContent}>
              <h3>{item.title}</h3>
              <div className={styles.metadata}>
                <span className={styles.type}>{item.type}</span>
                {item.duration && <span className={styles.duration}>{item.duration}</span>}
              </div>
              <p>{item.description}</p>
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewButton}
              >
                View {item.category}
              </a>
            </div>
          </div>
        )))}
        </div>
        
        <div className={styles.noResults}>
          <p>Can&apos;t find what you are looking for? Click here to make a request</p>
          <button 
            className={styles.newRequestButton}
            onClick={() => setIsRequestModalOpen(true)}
          >
            New Request
          </button>
        </div>

        <RequestModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
        />
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
        <div className={styles.header}>
          <FiArrowLeft className={styles.backButton} onClick={handleBackToExplore} />
          <h2>Search Music</h2>
        </div>
        <h2>Effortlessly search through a vast collection of videos, audios, and books. Filter by category, tags, or</h2>
        <h2>keywords to get exactly what you&apos;re looking for</h2>
        <div className={styles.searchContainer}>
          <div className={styles.searchForm}>
            <h3>Enter your search criteria</h3>
            <input
              type="text"
              placeholder="search by title, description, tags"
              className={styles.searchInput}
              value={searchParams.search || ''}
              onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
            />

            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Type</label>
                <select 
                  className={styles.select}
                  value={searchParams.type || ''}
                  onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Category</label>
                <select 
                  className={styles.select}
                  value={searchParams.category || ''}
                  onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="music">Music</option>
                  <option value="books">Books</option>
                  <option value="videos">Videos</option>
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

  
  if (showBookSearch) {
    return (
      <div className={styles.explore1}>
        <div className={styles.header}>
          <FiArrowLeft className={styles.backButton} onClick={handleBackToExplore} />
          <h2>Search Books</h2>
        </div>
        <h2>Effortlessly search through a vast collection of videos, audios, and books. Filter by category, tags, or</h2>
        <h2>keywords to get exactly what you&apos;re looking for</h2>
        <div className={styles.searchContainer}>
          <div className={styles.searchForm}>
            <h3>Enter your search criteria</h3>
            <input
              type="text"
              placeholder="search by title, description, tags"
              className={styles.searchInput}
              value={searchParams.search || ''}
              onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
            />

            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Type</label>
                <select 
                  className={styles.select}
                  value={searchParams.type || ''}
                  onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Category</label>
                <select 
                  className={styles.select}
                  value={searchParams.category || ''}
                  onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="music">Music</option>
                  <option value="books">Books</option>
                  <option value="videos">Videos</option>
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

  
  if (showVideoSearch) {
    return (
      <div className={styles.explore1}>
        <div className={styles.header}>
          <FiArrowLeft className={styles.backButton} onClick={handleBackToExplore} />
          <h2>Search Videos</h2>
        </div>
        <h2>Effortlessly search through a vast collection of videos, audios, and books. Filter by category, tags, or</h2>
        <h2>keywords to get exactly what you&apos;re looking for</h2>
        <div className={styles.searchContainer}>
          <div className={styles.searchForm}>
            <h3>Enter your search criteria</h3>
            <input
              type="text"
              placeholder="search by title, description, tags"
              className={styles.searchInput}
              value={searchParams.search || ''}
              onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
            />

            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Type</label>
                <select 
                  className={styles.select}
                  value={searchParams.type || ''}
                  onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Category</label>
                <select 
                  className={styles.select}
                  value={searchParams.category || ''}
                  onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="music">Music</option>
                  <option value="books">Books</option>
                  <option value="videos">Videos</option>
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
            you&apos;re looking for.{" "}
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

          <div className={styles.category} onClick={handleBooksClick}>
            <div className={styles.iconWrapper}>
              <FiEdit size={24} />
            </div>
            <h3>Books</h3>
          </div>

          <div className={styles.category} onClick={handleVideosClick}>
            <div className={styles.iconWrapper}>
              <FiPlayCircle size={24} />
            </div>
            <h3>Videos</h3>
          </div>
        </div>
      </div>

      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
};

export default Explore;
