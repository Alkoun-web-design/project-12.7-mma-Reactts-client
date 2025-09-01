// import React, { useState, useEffect, useRef } from "react"
// // import { useQuery } from "@tanstack/react-query";
// // import { queryData } from '../Utilities.tsx';
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search as SearchIcon, X, Tag } from 'lucide-react';
// import { useSearch } from './SearchContext';


// export const SearchDialog2:React.FC = () => {

//     const navigate = useNavigate();
    
//     const [userInput, setUserInput] = useState<string>('');
//     const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

//     const searchInputRef = useRef<HTMLInputElement>(null);
    
//     useEffect(() => {
//       if (isSearchOpen) {
//         searchInputRef.current?.focus();
//       }
//     }, [isSearchOpen]);


//     return(
//         <>

//         {isSearchOpen && 
//             <input 
//                 ref={searchInputRef}
//                 type="text" 
//                 value={userInput}
//                 placeholder="Enter your Search here"
//                 className="flex-1 text-lg bg-transparent outline-none"
//                 onChange={(e) => {setUserInput(e.target.value)}}
//                 onKeyDown={(e) => {
//                     if (e.key === 'Enter' && userInput.trim()) {
//                       setIsSearchOpen(false);
//                       navigate(`/search-results?q=${encodeURIComponent(userInput)}`);
//                     }
//                 }}
//                 >
//             </input>
//         }
//         </>
//     )
// }