import { useQuery } from '@tanstack/react-query';
import { queryData } from './Utilities';
import { Link } from 'react-router-dom';

interface ClassroomSchedule {
  id: number;
  subject_name: string;
  tutor_name: string;
  timing: string;
  description: string;
  status: 'Now Enrolling' | 'Starting Next Month' | 'Enrollment Closed';
  timeframe: string;
}

export const ClassesScheduleSidebar = () => { 

    const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useQuery({
        queryKey: ['schedules'], 
        queryFn: () => queryData('schedules'),
        staleTime: 6 * 60 * 60 * 1000, 
        gcTime: 24 * 60 * 60 * 1000,
        refetchInterval: 6 * 60 * 60 * 1000,
    });

    return (
        <div className="fixed z-20 top-0 right-0 w-60 h-screen overflow-x-auto bg-white shadow-md flex flex-col">
            <div className="py-4 border-b">
                <div className='text-sm text-center'>
                    <button className="btn btn-primary">
                        <Link to="/educational-services/subject-tutoring/combined-classes">Classes Schedule</Link>
                    </button>
                </div>
                {schedulesLoading &&
                <p> 'Loading...'</p>} 
                {schedulesError && 
                <p>'Error loading schedules'</p>} 
                {schedules && 
                
                    schedules.map((schedule:ClassroomSchedule) => (
                      // <div key={schedule.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-500 ease-in-out">
                      <div key={schedule.id} className="bg-white rounded-xl">
                        <div className="p-6">
                          <div className="flex items-start mb-2 justify-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              schedule.status === 'Now Enrolling' ? 'bg-green-100 text-green-800' :
                              schedule.status === 'Starting Next Month' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {schedule.status}
                            </span>
                          </div>
                          <div className="flex justify-center items-start mb-4">
                            <h3 className="text-md font-semibold text-primary-600">{schedule.subject_name}</h3>
                            
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{schedule.description}</p>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Tutor:</span> {schedule.tutor_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Schedule:</span> {schedule.timing}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Duration:</span> {schedule.timeframe}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4">
                          {/* <button
                            className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                            onClick={() => {
                              // Scroll to the signup form
                              document.querySelector('#signup-form')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            Register Now
                          </button> */}
                        </div>
                      </div>
                    ))
                }
            </div>
        </div>
    )
}