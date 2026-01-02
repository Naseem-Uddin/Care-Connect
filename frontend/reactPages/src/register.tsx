import React, { useState } from 'react';
import axios ,{ AxiosError }from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REGISTER_PATH = '/api/users/register';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
     
      const response = await axios.post(`${API_BASE_URL}${REGISTER_PATH}`, formData);
      
      console.log(response.data); 
      setLoading(false);
      
      // Redirect to login page on success
      navigate('/login'); 

    } catch (err) {
      setLoading(false);
      
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (      
    <div className="min-h-screen bg-slate-400 pt-24 pb-12 px-4">

    <div className="fixed top-0 left-0 w-full h-16 bg-blue-200 z-40 flex items-center px-4 justify-center">
      <h2 className="text-xl font-bold text-blue-900">Care Connect</h2>
    </div>

    <Link to="/login" className="fixed top-0 left-4 z-50 block">
         <img 
           className="w-16 h-16" 
           alt="Logo" 
         />
       </Link>
    
    
    <div className="max-w-md w-full mx-auto bg-slate-300  shadow-md p-8">
      
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
        Create Your Account
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
        </div>
        

        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     disabled:bg-gray-400"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
      </form>
    </div>
  </div>
  );
}

export default Register;