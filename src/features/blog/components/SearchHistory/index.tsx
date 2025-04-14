import React from 'react';
import { useNavigate } from 'react-router-dom';

const MAX_HISTORY_ITEMS = 5;
const SEARCH_HISTORY_KEY = 'blog-search-history';

interface SearchHistoryProps {
  className?: string;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = React.useState<string[]>(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  });

  React.useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    setSearchHistory(prev => {
      const newHistory = [
        query,
        ...prev.filter(item => item !== query)
      ].slice(0, MAX_HISTORY_ITEMS);
      
      return newHistory;
    });
  };

  const removeFromHistory = (query: string) => {
    setSearchHistory(prev => prev.filter(item => item !== query));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  if (!searchHistory.length) {
    return null;
  }

  return (
    <div className={`mt-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">Recent Searches</h3>
        <button
          onClick={clearHistory}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchHistory.map((query) => (
          <div
            key={query}
            className="group flex items-center bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200"
          >
            <button
              onClick={() => {
                navigate(`/blog/search?q=${encodeURIComponent(query)}`);
              }}
              className="text-sm text-gray-600"
            >
              {query}
            </button>
            <button
              onClick={() => removeFromHistory(query)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const useSearchHistory = () => {
  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    const searches = history ? JSON.parse(history) : [];
    
    const newHistory = [
      query,
      ...searches.filter((item: string) => item !== query)
    ].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  return { addToHistory };
};

export default SearchHistory;