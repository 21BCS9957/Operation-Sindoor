import { useState } from 'react';
import MotionWrapper from '../components/MotionWrapper';
import { getAidStatus } from '../api';

const Track = () => {
  const [input, setInput] = useState('');
  const [aidData, setAidData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter Aadhaar or Request ID');
      setAidData(null);
      return;
    }
    
    setError('');
    setApiError('');
    setLoading(true);
    
    try {
      const response = await getAidStatus(input.trim());
      setAidData(response);
      console.log('✅ Aid status retrieved:', response);
    } catch (error) {
      setApiError('Failed to fetch aid status. Please check your ID and try again.');
      setAidData(null);
      console.error('❌ Failed to get aid status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Pending':
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return '✅';
      case 'Rejected':
        return '❌';
      case 'Pending':
      default:
        return '⏳';
    }
  };

  return (
    <MotionWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <div className="container py-5">
        <h2 className="mb-4">Track Aid Request</h2>
        
        {apiError && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {apiError}
            <button type="button" className="btn-close" onClick={() => setApiError('')}></button>
          </div>
        )}
        
        <form className="row g-3 mb-4" onSubmit={handleSubmit}>
          <div className="col-md-8">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter Aadhaar or Request ID" 
              value={input} 
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="col-md-4">
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Tracking...
                </>
              ) : (
                'Track Request'
              )}
            </button>
          </div>
        </form>
        
        {error && <div className="alert alert-warning">{error}</div>}
        
        {aidData && (
          <MotionWrapper initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="card shadow-sm mx-auto" style={{ maxWidth: 500 }}>
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">Aid Request Details</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">Request ID:</div>
                  <div className="col-sm-8">{aidData.id}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">Aid Type:</div>
                  <div className="col-sm-8">{aidData.aid_type}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">Created:</div>
                  <div className="col-sm-8">
                    {new Date(aidData.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <hr />
                <div className="text-center">
                  <h6 className="mb-2">Current Status</h6>
                  <span className={`badge bg-${getStatusBadgeClass(aidData.status)} fs-5 px-3 py-2`}>
                    {getStatusIcon(aidData.status)} {aidData.status}
                  </span>
                </div>
              </div>
            </div>
          </MotionWrapper>
        )}
      </div>
    </MotionWrapper>
  );
};

export default Track; 