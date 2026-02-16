/**
 * SearchForm Component
 * Search and filter form for projects/services
 * @component
 */

import { useState, useCallback } from 'react';

/**
 * @typedef {Object} SearchFormProps
 * @property {Function} onSearch - Search callback with query and filters
 * @property {string} [placeholder] - Input placeholder text
 * @property {string[]} [filterOptions] - Filter options for dropdown
 * @property {string} [filterLabel] - Label for filter dropdown
 * @property {string} [className] - Additional CSS classes
 */

/**
 * SearchForm Component
 * @param {SearchFormProps} props - Component props
 * @returns {JSX.Element}
 */
const SearchForm = ({
  onSearch,
  placeholder = 'Search projects, services...',
  filterOptions = [],
  filterLabel = 'Category',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Debounce search to avoid too many function calls
  const handleSearch = useCallback(() => {
    if (query || filter) {
      setHasSearched(true);
      onSearch({ query, filter });
    } else {
      setHasSearched(false);
      onSearch({ query: '', filter: '' });
    }
  }, [query, filter, onSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setFilter('');
    setHasSearched(false);
    onSearch({ query: '', filter: '' });
  };

  // Search when user stops typing (simplified - no actual debounce for clarity)
  const handleInputBlur = () => {
    handleSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        {filterOptions.length > 0 && (
          <div className="md:w-40">
            <select
              value={filter}
              onChange={handleFilterChange}
              onBlur={handleSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">All {filterLabel}</option>
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Clear Button */}
        {(query || filter) && (
          <button
            onClick={handleClear}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
            aria-label="Clear filters"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Search Info */}
      {hasSearched && (
        <p className="mt-3 text-sm text-gray-600">
          {query && <span>Searching for "{query}"</span>}
          {query && filter && <span> in {filter}</span>}
          {!query && filter && <span>Filtering by {filter}</span>}
        </p>
      )}
    </div>
  );
};

export default SearchForm;
