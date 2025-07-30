import React from 'react';

interface Schedule {
  id: number;
  subject_id: number;
  tutor_id: number;
  timing: string;
  timeframe: string;
  description: string;
  status: 'Now Enrolling' | 'Starting Next Month' | 'Enrollment Closed';

}

interface AdminSectionProps {
  data: Schedule[];
  form: any;
  id: number | null;
  setForm: (form: any) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (id: number) => void;
}

const SchedulesAdminSection: React.FC<AdminSectionProps> = ({
  data,
  form,
  id,
  setForm,
  setId,
  handleFormChange,
  handleSubmit,
  handleDelete,
}) => (
  <div className="w-full bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
        Classroom Schedules
    </h2>
    {!data && <div className="text-red-600 mb-2">There was a problem with loading the data.</div>}    
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="subject_id" value={form.subject_id} onChange={handleFormChange} placeholder="Subject ID" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Subject ID for the classroom</div>
      </div>
      <div>
        <input name="tutor_id" value={form.tutor_id} onChange={handleFormChange} placeholder="Tutor ID" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Tutor ID for the classroom</div>
      </div>
      <div>        
        <input name="timing" value={form.timing} onChange={handleFormChange} placeholder="Schedule Timing" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Format: Mon 10:00-11:00</div>
      </div>
      <div>
        <input name="timeframe" value={form.timeframe} onChange={handleFormChange} placeholder="Schedule Timeframe" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">The duration e.g. Week, Month, Semester</div>      
      </div>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="description" value={form.description} onChange={handleFormChange} placeholder="Description of the Schedule" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Description</div>
      </div>
      <div>
        <input name="status" value={form.status} onChange={handleFormChange} placeholder="The Status of the Classroom" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Now Enrolling / Starting Next Month / Enrollment Closed</div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Schedule</button>
        {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ subject_id: 0, tutor_id: 0, timing: '', timeframe: '', description: '', status: '' })}}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="p-2">Subject ID</th>
          <th className="p-2">Tutor ID</th>
          <th className="p-2">Timing</th>
          <th className="p-2">Timeframe</th>
          <th className="p-2">Description</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="text-left border-b">
            <td className="py-2">{item.subject_id}</td>
            <td className="py-2">{item.tutor_id}</td>
            <th className="py-2">{item.timing}</th>
            <th className="py-2">{item.timeframe}</th>
            <th className="py-2">{item.description}</th>
            <th className="py-2">{item.status}</th>
            <td className="py-2 flex gap-2">
              <button className="btn btn-xs btn-primary" onClick={() => { setForm(item); setId(item.id); }}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SchedulesAdminSection;

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Classroom Schedules</h2>

//       {/* Add/Edit Schedule Form */}
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
//         <h3 className="text-lg font-semibold mb-4">
//           {id ? 'Edit Classroom Schedule' : 'Add New Classroom Schedule'}
//         </h3>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Subject
//             </label>
//             <select
//               name="subject_id"
//               value={form.subject_id}
//               onChange={handleFormChange}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             >
//               <option value="">Select a subject</option>
//               {subjects.map(subject => (
//                 <option key={subject.id} value={subject.id}>
//                   {subject.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Teacher
//             </label>
//             <select
//               name="teacher_id"
//               value={form.teacher_id}
//               onChange={handleFormChange}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             >
//               <option value="">Select a teacher</option>
//               {staff.map(teacher => (
//                 <option key={teacher.user_id} value={teacher.user_id}>
//                   {teacher.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Timing
//             </label>
//             <input
//               type="text"
//               name="timing"
//               value={form.timing}
//               onChange={handleFormChange}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//               placeholder="e.g., Mondays & Wednesdays, 4:00-5:30 PM"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleFormChange}
//               className="w-full px-3 py-2 border rounded-md"
//               rows={3}
//               placeholder="Enter a description of the class"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status
//             </label>
//             <select
//               name="status"
//               value={form.status}
//               onChange={handleFormChange}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             >
//               <option value="Now Enrolling">Now Enrolling</option>
//               <option value="Starting Next Month">Starting Next Month</option>
//               <option value="Enrollment Closed">Enrollment Closed</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Timeframe
//             </label>
//             <select
//               name="timeframe"
//               value={form.timeframe}
//               onChange={handleFormChange}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             >
//               <option value="Semester">Semester</option>
//               <option value="Quarter">Quarter</option>
//               <option value="Year">Year</option>
//             </select>
//           </div>

//           {error && (
//             <div className="text-red-600 text-sm">{error}</div>
//           )}

//           <div className="flex gap-4">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
//             >
//               {id ? 'Update Schedule' : 'Add Schedule'}
//             </button>
//             {id && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setId(null);
//                   setForm({
//                     subject_id: '',
//                     teacher_id: '',
//                     timing: '',
//                     description: '',
//                     status: 'Now Enrolling',
//                     timeframe: ''
//                   });
//                 }}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </form>

//       {/* Schedules List */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold p-6 border-b">Existing Classroom Schedules</h3>
//         <div className="divide-y">
//           {data.length === 0 ? (
//             <div className="p-6 text-center text-gray-500">No schedules found</div>
//           ) : (
//             data.map((schedule) => (
//               <div key={schedule.id} className="p-6">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <h4 className="font-medium text-gray-900">{schedule.subject}</h4>
//                     <p className="text-sm text-gray-500">Teacher: {schedule.tutor}</p>
//                     <p className="text-sm text-gray-500 mt-1">{schedule.timing}</p>
//                     <p className="text-sm text-gray-500 mt-1">{schedule.description}</p>
//                     <div className="mt-2">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         schedule.status === 'Now Enrolling' ? 'bg-green-100 text-green-800' :
//                         schedule.status === 'Starting Next Month' ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-red-100 text-red-800'
//                       }`}>
//                         {schedule.status}
//                       </span>
//                       <span className="ml-2 text-sm text-gray-500">{schedule.timeframe}</span>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => {
//                         setId(schedule.id);
//                         setForm({
//                           subject_id: schedule.subject_id.toString(),
//                           teacher_id: schedule.teacher_id.toString(),
//                           timing: schedule.timing,
//                           description: schedule.description,
//                           status: schedule.status,
//                           timeframe: schedule.timeframe
//                         });
//                       }}
//                       className="text-primary-600 hover:text-primary-700"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(schedule.id)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };