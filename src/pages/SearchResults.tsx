// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// // import { useSearch } from '../components/Search/SearchContext';
// import { motion } from 'framer-motion';

// const SearchResults: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { searchResults, setSearchQuery, setIsSearchOpen, setSearchResults, activeFilters, isLoading, error } = useSearch();

//   // Get query from URL
//   const params = new URLSearchParams(location.search);
//   const query = params.get('q') || '';

//   useEffect(() => {
//     setSearchQuery(query);
//     setIsSearchOpen(false);
//     // Optionally, you could re-run your search logic here if needed
//   }, [query, setSearchQuery, setIsSearchOpen]);

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      
//       {/* Error state */}
//       {error && (
//         <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//           <p className="text-red-700">{error}</p>
//         </div>
//       )}
      
//       {/* Loading state */}
//       {isLoading ? (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//         </div>
//       ) : (
//         <>
//           {searchResults.length === 0 ? (
//             <div className="text-gray-500 text-center py-16">
//               {query.length < 2 ? (
//                 <p>Please enter at least 2 characters to search</p>
//               ) : (
//                 <p>No results found for your search</p>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {searchResults.map((result: any) => (
//                 <motion.div
//                   key={result.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
//                 >
//                   <div>
//                     <h2 className="text-xl font-semibold text-primary-700 mb-2">{result.title}</h2>
//                     <div className="text-gray-600 mb-2 text-sm">{result.description}</div>
//                     <div className="text-xs text-gray-400 mb-4">Category: 
//                       {result.category === 'tutors-counselors' ? 'Tutors & Counselors' : 
//                       result.category.replace(/-/g, ' ')}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => navigate(result.path)}
//                     className="mt-4 btn btn-primary w-full"
//                   >
//                     View Page
//                   </button>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default SearchResults;
