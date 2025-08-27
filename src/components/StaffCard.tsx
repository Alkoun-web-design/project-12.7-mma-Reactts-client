// import React from 'react';
// // import { StaffMember } from '../types/types';

// interface StaffCardProps {
//   staff: StaffMember;
// }

// const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//       <div className="h-48 overflow-hidden">
//         <img 
//           src={staff.avatar_url ? `/avatars/${staff.avatar_url}` : '/avatars/default.png'} 
//           alt={staff.name}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-6">
//         <h3 className="text-xl font-semibold text-gray-900 mb-1">{staff.name}</h3>
//         {staff.role && (
//           <p className={staff.is_admin 
//             ? "text-primary-600 font-medium mb-3" 
//             : "text-gray-600 font-medium mb-3"
//           }>
//             {staff.title || staff.role}
//             {staff.is_admin && ' (Admin)'}
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default StaffCard;