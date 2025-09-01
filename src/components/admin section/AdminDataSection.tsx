// import React, {useState, useEffect} from 'react';
// import { handleGetData, handleDeleteData, handleAddOrUpdateData } from '../components/Utilities'


// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// // }
// interface User { 
//   id: number;  
//   email: string; 
//   password: string;
//   user_type: "admin" | "tutor" | "counsellor"| null;
// }

// interface AdminDataSectionProps {
//   data: User[];
//   form: any;
//   id: number | null;
//   Error: string | null;
//   setForm: (form: any) => void;
//   setId: (id: number | null) => void;
//   handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSubmit: (e: React.FormEvent) => void;
//   handleEdit: (user: User) => void;
//   handleDeleteData: (id: number) => void;
// }
  
// // const blankUsersForm = { id: 0, name: '', email: '', password: '', user_type: '' };

// const AdminDataSection: React.FC<AdminDataSectionProps> = ({
//   userForm = { name: '', email: '', password: '' },
//   editingUserId,
//   userError,
//   setUserForm,
//   setEditingUserId,
//   handleUserFormChange,
//   handleUserSubmit,
//   handleEditUser,
//   handleDeleteUser,
// }) => {
//   const [data, setData] = useState<User[]>([]);
//   const [error, setError] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//       handleGetData('subjects', setData, setSubjectError, setLoading);
//   }, [])

//   return (
//   <div className="w-full bg-white rounded-lg shadow p-8">
//     <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
//       Users
//     </h2>
//     <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
//       <input name="email" value={form.email} onChange={handleFormChange} type="email" placeholder="Email" className="border rounded px-2 py-1" required />
//       <div className="text-xs text-gray-500">User email address</div>
//       <input name="password" value={form.password} onChange={handleFormChange} type="password" placeholder={id ? "New Password (optional)" : "Password"} className="border rounded px-2 py-1" {...(!id && { required: true })} />
//       <div className="text-xs text-gray-500">Password for the user account</div>
//       <input name="user_type" value={form.user_type} onChange={handleFormChange} type="text" placeholder={id ? "Select User Type (optional)" : "User Type"} className="border rounded px-2 py-1" {...(!id && { required: true })} />
//       <div className="text-xs text-gray-500">The user's role</div>
//       <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} User</button>
//       {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ name: '', email: '', password: '' }); }}>Cancel</button>}
//     </form>
//     {error && <div className="text-red-600 mb-2">{error}</div>}
//     <table className="min-w-full text-sm">
//       <thead>
//         <tr className="text-gray-600 text-center">
//           <th className="py-2">Email</th>
//           <th className="py-2">Password</th>
//           <th className="py-2">User Type</th>
//           <th className="py-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map(item => (
//           <tr key={item.id} className="border-b">
//             <td className="p-2">{item.email}</td>
//             <td className="p-2">{item.password}</td>
//             <td className="p-2">{item.user_type}</td>
//             <td className="p-2 flex gap-2">
//               {/* <button className="btn btn-xs btn-primary" type="button" onClick={() => handleEdit(item)}>Edit</button> */}
//               <button className="btn btn-xs btn-primary" type="button" >Edit</button>
//               <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )
// };

// export default AdminDataSection;