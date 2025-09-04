export const serverAPI = import.meta.env.VITE_API_BASE_URL;
export const uploadsURL = import.meta.env.VITE_UPLOADS_URL;

export const handleGetData = async (apiEndpoint:string, setData: React.Dispatch<React.SetStateAction<any>>,  setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const res = await fetch(`${serverAPI}${apiEndpoint}`, { credentials: 'include' });
    if (!res.ok) throw new Error(await res.text() || `Failed to fetch data`);
    const data = await res.json();
    setData(data);
  } catch (err) {
    setData([]);
    console.error(`Error fetching data:`, err);
  } finally {
    setLoading(false);
  }
};

export const queryData = async (apiEndpoint:string) => { 
    const res = await fetch(`${serverAPI}${apiEndpoint}`, { credentials: 'include' });
    return res.json()
};

export const handleGetPageContent = async (apiEndpoint:string, setData: React.Dispatch<React.SetStateAction<any>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const res = await fetch(`${serverAPI}pages/${apiEndpoint}`, { credentials: 'include' });
    if (!res.ok) throw new Error(await res.text() || `Failed to fetch data`);
    const data = await res.json();
    setData(data[0]);
  } catch (err) {
    setData([]);
    console.error(`Error fetching data:`, err);
  } finally {
    setLoading(false);
  }
};

export const queryPageContent = async (apiEndpoint:string ) => {
    const res = await fetch(`${serverAPI}pages/${apiEndpoint}`, { credentials: 'include' });
    const data = await res.json();
    return data[0];
};

  // const handleDataSubmit = async (e: React.FormEvent, Id: number | null, setId: any, apiEndpoint: string, setForm: any, filledForm: any, blankForm: any, setData: any, setError: any) => {
export const handleAddOrUpdateData = async (e: React.FormEvent, id: number | null, setId: any, apiEndpoint: string, setForm: any, form: any, blankForm: any, setData: any) => {
  e.preventDefault();
  try {
    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `${serverAPI}${apiEndpoint}/${id}`
      : `${serverAPI}${apiEndpoint}`;
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    if (!response.ok) throw new Error('Failed to save data');
    setForm(blankForm);
    setId(null);
    const refreshed = await fetch(`http://localhost:5000/api/${apiEndpoint}`, { credentials: 'include' });
    setData(await refreshed.json());
  } catch (err: unknown) {
    console.error(err || 'Error saving data.');
  }
};

export const handleDeleteData = async (id: number | null, apiEndpoint: string, setData: React.Dispatch<React.SetStateAction<any[]>>) => {
    if (!window.confirm(`Delete this data`)) return;
    try {
      const res = await fetch(`${serverAPI}${apiEndpoint}/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error(`Failed to delete data`);
      const refreshed = await fetch(`${serverAPI}${apiEndpoint}`, { credentials: 'include' });
      setData(await refreshed.json());
    } catch (err: unknown) {
      console.error(err || `Failed to delete data`);
    }
  };

export const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>, setForm, form) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

export const handleSaveContent = async (e: React.FormEvent, page:string, form:any, setSaveStatus:any) => {
  e.preventDefault();
    if (!page) return;

    try {
      const response = await fetch(`${serverAPI}pages/${page}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      console.log(form);

      if (!response.ok) {
        throw new Error('Failed to save page content');
      }

      setSaveStatus('Content saved successfully');
    } catch (error) {
      console.error('Error saving page content:', error);
      setSaveStatus('Error saving content');
    }
  };  

export const handleFormSubmit = async (e: React.FormEvent, formData: any, setSubmitting:React.Dispatch<React.SetStateAction<boolean>>, setSuccess:React.Dispatch<React.SetStateAction<boolean>>, setFormData:React.Dispatch<React.SetStateAction<any>> ) => {
      e.preventDefault();
      setSubmitting(true);
      
      try {
        const response = await fetch(`${serverAPI}contact/enquiry-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        
        setSuccess(true);
        setFormData(formData);
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setSubmitting(false);
      }
    };