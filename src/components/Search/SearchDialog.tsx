import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Tag } from 'lucide-react';
import { useSearch } from './SearchContext';
import type { SearchFilter } from './SearchContext';
import { useNavigate } from 'react-router-dom';

// const filters: { id: SearchFilter; label: string }[] = [
//   { id: 'all', label: 'All' },
//   { id: 'tutors-counselors', label: 'Tutors & Counselors' },
//   { id: 'homeschooling', label: 'Home-Schooling' },
//   { id: 'subject-tutors', label: 'Subject Tutors' },
//   { id: 'subject-classes', label: 'Subject Classes' },
//   { id: 'test-prep', label: 'Test Prep' },
//   { id: 'languages', label: 'Languages' },
// ];

const filters: { id: SearchFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'admin', label: 'Admin'},
  { id: 'tutors', label: 'Tutors' },
  { id: 'counsellors', label: 'Counsellors'},
  { id: 'subjects', label: 'Subjects' },
  { id: 'classroom-schedules', label: 'Classes Schedule' },
  { id: 'standardized-test-prep', label: 'Standardized Test Prep' },
  { id: 'study-coaching', label: 'Study Coaching & Counselling' },
  { id: 'student-clubs', label: 'Student Clubs & Activities' },
  { id: 'academic-resources', label: 'Academic Resources' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'services-pricing', label: 'Services Pricing'},
  { id: 'educational-services', label: 'Educational Services' },
  { id: 'languages', label: 'Languages' },
];

interface SearchResult {
  id: number;
  title: string;
  category: SearchFilter;
  path: string;
  description?: string;
}

const mockSearch = (query: string, filters: SearchFilter[]) => {
  const allResults: SearchResult[] = [
    {
      id: 1,
      title: 'Math Tutor - John Doe',
      category: 'teachers',
      path: '/our-staff',
      description: 'Experienced mathematics tutor specializing in advanced topics'
    },
    {
      id: 2,
      title: 'Homeschooling Program',
      category: 'homeschooling',
      path: '/educational-services/homeschooling',
      description: 'Complete curriculum for K-12 students'
    },
    {
      id: 3,
      title: 'Physics Classes',
      category: 'subject-classes',
      path: '/educational-services/subject-classes',
      description: 'Group physics classes for high school students'
    },
    {
      id: 4,
      title: 'SAT Preparation Course',
      category: 'test-prep',
      path: '/educational-services/standardized-test-prep',
      description: 'Comprehensive SAT prep program'
    },
    {
      id: 5,
      title: 'Spanish Language Course',
      category: 'languages',
      path: '/educational-services/learn-languages',
      description: 'Learn Spanish from native speakers'
    },
    {
      id: 6,
      title: 'Chemistry Tutor - Jane Smith',
      category: 'subject-tutors',
      path: '/educational-services/subject-tutoring',
      description: 'One-on-one chemistry tutoring'
    }
  ];

  if (!query) return [];
  
  const filterResults = filters.includes('all')
    ? allResults
    : allResults.filter(result => filters.includes(result.category));

  return filterResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description?.toLowerCase().includes(query.toLowerCase())
  );
};

export const SearchDialog: React.FC = () => {
  const {
    isSearchOpen,
    searchQuery,
    activeFilters,
    searchResults,
    setIsSearchOpen,
    setSearchQuery,
    toggleFilter,
    setSearchResults,
  } = useSearch();

  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);


  const handleClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleResultClick = (result: SearchResult) => {
    handleClose();
    navigate(result.path);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-4 max-w-2xl mx-auto bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <SearchIcon className="w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      setIsSearchOpen(false);
                      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
                    }
                  }}
                  placeholder="Search for anything..."
                  className="flex-1 text-lg bg-transparent outline-none"
                />
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 py-4">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      activeFilters.includes(filter.id)
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {filter.label}
                  </button>
                ))}
              </div>

              {searchQuery && (
                <div className="mt-4 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map((result: SearchResult) => (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="font-medium text-gray-900">
                            {result.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {result.description}
                          </div>
                          <div className="text-xs text-primary-600 mt-1">
                            {result.path}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {searchQuery.length < 2 
                        ? 'Please enter at least 2 characters to search' 
                        : 'No results found for your search'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const SearchButton: React.FC = () => {
  const { setIsSearchOpen } = useSearch();

  return (
    <button
      onClick={() => setIsSearchOpen(true)}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
    >
      <SearchIcon className="w-4 h-4" />
      <span>Search...</span>
      <span className="text-xs text-gray-400 border border-gray-300 rounded px-1.5">
        ⌘K
      </span>
    </button>
  );
};
// import React, {  useState, useEffect, useRef } from 'react';
// import { useQuery } from "@tanstack/react-query";
// import { queryData } from "../Utilities";
// // import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search as SearchIcon, X, Tag } from 'lucide-react';



// export const SearchDialog: React.FC = () => {

//   [searchQuery, setSearchQuery] = useState<string>('');
//   [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
//   [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
//   [searchFilter, setSearchFilter] = useState<SearchFilter>('all');
  

//   useEffect(() => {
//     if (isSearchOpen) {
//       searchInputRef.current?.focus();
//     }
//   }, [isSearchOpen]);

//   const handleClose = () => {
//     setIsSearchOpen(false);
//     setSearchQuery('');
//   };

//   const searchInputRef = useRef<HTMLInputElement>(null);


//   return (
//     <AnimatePresence>
//       {isSearchOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 z-40"
//             onClick={handleClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="fixed inset-x-4 top-4 max-w-2xl mx-auto bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
//           >
//             <div className="p-4">
//               <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
//                 <SearchIcon className="w-5 h-5 text-gray-400" />
//                 <input
//                   ref={searchInputRef}
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter' && searchQuery.trim()) {
//                       setIsSearchOpen(false);
//                       navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
//                     }
//                   }}
//                   placeholder="Search for anything..."
//                   className="flex-1 text-lg bg-transparent outline-none"
//                 />
//                 <button
//                   onClick={handleClose}
//                   className="p-1 hover:bg-gray-100 rounded-full"
//                 >
//                   <X className="w-5 h-5 text-gray-400" />
//                 </button>
//               </div>

//               <div className="flex flex-wrap gap-2 py-4">
//                 {filters.map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => toggleFilter(filter.id)}
//                     className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
//                       activeFilters.includes(filter.id)
//                         ? 'bg-primary-100 text-primary-700'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     <Tag className="w-3 h-3" />
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>

//                {searchQuery && (
//                  <div className="mt-4 max-h-96 overflow-y-auto">
//                    {searchResults.length > 0 ? (
//                      <div className="space-y-2">
//                        {searchResults.map((result: SearchResult) => (
//                          <button
//                            key={result.id}
//                            onClick={() => handleResultClick(result)}
//                            className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
//                          >
//                            <div className="font-medium text-gray-900">
//                              {result.title}
//                            </div>
//                            <div className="text-sm text-gray-500">
//                              {result.description}
//                            </div>
//                            <div className="text-xs text-primary-600 mt-1">
//                              {result.path}
//                            </div>
//                          </button>
//                        ))}
//                      </div>
//                    ) : (
//                      <div className="text-center py-8 text-gray-500">
//                        {searchQuery.length < 2 
//                          ? 'Please enter at least 2 characters to search' 
//                          : 'No results found for your search'}
//                      </div>
//                    )}
//                  </div>
//                )}
//              </div>
//            </motion.div>
//          </>
//        )}
//     </AnimatePresence>
//    );
//  };

// export const SearchButton: React.FC = () => {
//   const { setIsSearchOpen } = useSearch();

//   return (
//     <button
//       onClick={() => setIsSearchOpen(true)}
//       className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
//     >
//       <SearchIcon className="w-4 h-4" />
//       <span>Search...</span>
//       <span className="text-xs text-gray-400 border border-gray-300 rounded px-1.5">
//         ⌘K
//       </span>
//     </button>
//   );
// };