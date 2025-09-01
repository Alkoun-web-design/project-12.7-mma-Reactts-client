import React, { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface SignupFormProps {
  title: string;
  description: string;
  fields: FormField[];
  serviceType: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ 
  title, 
  description, 
  fields, 
  serviceType 
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(0);

  const currentField = fields[step];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < fields.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/contact/signup-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          formData,
          serviceType
        }), 
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setSuccess(true);
      setFormData({});
      setStep(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Thank You!</h3>
        <p className="text-green-600 mb-4">
          Your signup request has been submitted successfully. We'll contact you soon!
        </p>
        <button 
          onClick={() => setSuccess(false)} 
          className="btn btn-primary"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-primary-700 text-center">{title}</h2>
      <p className="text-gray-600 mb-8 text-center">{description}</p>
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((step + 1) / fields.length) * 100}%` }}
        />
      </div>
      <form onSubmit={step === fields.length - 1 ? (e) => handleSubmit(e) : handleNext} className="space-y-8">
        <div className="mb-2">
          <div className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 min-h-[48px]">
            {/* Display the field as a question */}
            {(() => {
              switch (currentField.name) {
                case 'studentName':
                  return "What is the student's full name?";
                case 'studentAge':
                  return 'How old is the student?';
                case 'gradeLevel':
                  return "What is the student's current grade level?";
                case 'coachingType':
                  return 'What type of coaching is needed?';
                case 'currentChallenges':
                  return 'What academic challenges is the student currently facing?';
                case 'parentName':
                  return "What is the parent or guardian's name?";
                case "email":
                  return 'What is the best email address for contact?';
                case 'phone':
                  return 'What is the best phone number for contact?';
                case 'additionalInfo':
                  return "Is there anything else you'd like us to know? (Optional)";
                default:
                  return currentField.label;
              }
            })()}
          </div>
          {/* Field input */}
          {currentField.type === 'textarea' ? (
            <textarea
              id={currentField.name}
              name={currentField.name}
              placeholder={currentField.placeholder}
              required={currentField.required}
              value={formData[currentField.name] || ''}
              onChange={handleChange}
              className="form-input min-h-[100px] text-lg"
            />
          ) : currentField.type === 'select' ? (
            <select
              id={currentField.name}
              name={currentField.name}
              required={currentField.required}
              value={formData[currentField.name] || ''}
              onChange={handleChange}
              className="form-input text-lg"
            >
              <option value="">Select an option</option>
              {currentField.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={currentField.type}
              id={currentField.name}
              name={currentField.name}
              placeholder={currentField.placeholder}
              required={currentField.required}
              value={formData[currentField.name] || ''}
              onChange={handleChange}
              className="form-input text-lg"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2 gap-2">
          <button
            type="button"
            className="btn btn-secondary px-6 py-2"
            onClick={handleBack}
            disabled={step === 0}
          >
            Back
          </button>
          <div className="flex-1 text-center text-gray-500 text-sm">
            Step {step + 1} of {fields.length}
          </div>
          {step === fields.length - 1 ? (
            <button
              type="submit"
              className="btn btn-primary px-6 py-2"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary px-6 py-2"
              disabled={!formData[currentField.name]}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;