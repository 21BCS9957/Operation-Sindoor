import { useState } from 'react';
import MotionWrapper from '../components/MotionWrapper';
import { registerUser } from '../api';

const aidTypes = [
  'Medical',
  'Financial',
  'Educational',
];

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', aadhaar: '', aidType: '', description: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.phone) errs.phone = 'Phone is required';
    if (!form.aadhaar) errs.aadhaar = 'Aadhaar is required';
    if (!form.aidType) errs.aidType = 'Aid type is required';
    if (!form.description) errs.description = 'Description is required';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear API error when user starts typing
    if (apiError) setApiError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setApiError('');
      
      try {
        const response = await registerUser(form);
        setUserData(response);
        setSubmitted(true);
        console.log('✅ User registered successfully:', response);
      } catch (error) {
        setApiError('Failed to register user. Please try again.');
        console.error('❌ Registration failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <MotionWrapper initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
      <div className="container py-5">
        <h2 className="mb-4">Aid Registration</h2>
        
        {apiError && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {apiError}
            <button type="button" className="btn-close" onClick={() => setApiError('')}></button>
          </div>
        )}
        
        {submitted && userData ? (
          <div className="alert alert-success">
            <h4 className="alert-heading">Registration Successful! 🎉</h4>
            <p>Your user ID is: <strong>{userData.userId}</strong></p>
            <p className="mb-0">Please save this ID for tracking your aid request.</p>
            <hr />
            <button 
              className="btn btn-outline-success" 
              onClick={() => {
                setSubmitted(false);
                setUserData(null);
                setForm({ name: '', email: '', phone: '', aadhaar: '', aidType: '', description: '' });
              }}
            >
              Register Another User
            </button>
          </div>
        ) : (
          <form className="row g-3" onSubmit={handleSubmit} noValidate>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                className={`form-control${errors.name ? ' is-invalid' : ''}`} 
                name="name" 
                value={form.name} 
                onChange={handleChange}
                disabled={loading}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className={`form-control${errors.email ? ' is-invalid' : ''}`} 
                name="email" 
                value={form.email} 
                onChange={handleChange}
                disabled={loading}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input 
                type="tel" 
                className={`form-control${errors.phone ? ' is-invalid' : ''}`} 
                name="phone" 
                value={form.phone} 
                onChange={handleChange}
                disabled={loading}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Aadhaar</label>
              <input 
                type="text" 
                className={`form-control${errors.aadhaar ? ' is-invalid' : ''}`} 
                name="aadhaar" 
                value={form.aadhaar} 
                onChange={handleChange}
                disabled={loading}
              />
              {errors.aadhaar && <div className="invalid-feedback">{errors.aadhaar}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Aid Type</label>
              <select 
                className={`form-select${errors.aidType ? ' is-invalid' : ''}`} 
                name="aidType" 
                value={form.aidType} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select...</option>
                {aidTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.aidType && <div className="invalid-feedback">{errors.aidType}</div>}
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea 
                className={`form-control${errors.description ? ' is-invalid' : ''}`} 
                name="description" 
                rows="3" 
                value={form.description} 
                onChange={handleChange}
                disabled={loading}
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            <div className="col-12">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </MotionWrapper>
  );
};

export default Register; 