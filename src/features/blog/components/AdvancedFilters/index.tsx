import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface DateFilter {
  startDate: string;
  endDate: string;
}

interface AdvancedFiltersProps {
  className?: string;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dateFilter, setDateFilter] = React.useState<DateFilter>({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || ''
  });

  const handleApplyFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (dateFilter.startDate) {
      newSearchParams.set('startDate', dateFilter.startDate);
    } else {
      newSearchParams.delete('startDate');
    }
    
    if (dateFilter.endDate) {
      newSearchParams.set('endDate', dateFilter.endDate);
    } else {
      newSearchParams.delete('endDate');
    }

    navigate({
      pathname: '/blog/search',
      search: newSearchParams.toString()
    });
  };

  const handleResetFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('startDate');
    newSearchParams.delete('endDate');
    
    setDateFilter({
      startDate: '',
      endDate: ''
    });

    navigate({
      pathname: '/blog/search',
      search: newSearchParams.toString()
    });
  };

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <svg
          className={`w-5 h-5 mr-1 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        Advanced Filters
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Date Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    From
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={dateFilter.startDate}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        startDate: e.target.value
                      }))
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    To
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={dateFilter.endDate}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        endDate: e.target.value
                      }))
                    }
                    min={dateFilter.startDate}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;