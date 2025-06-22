import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../assets/img1.jpg';

const Home = () => (
  <section
    className="position-relative d-flex align-items-center justify-content-center min-vh-100 w-100"
    style={{
      minHeight: '100vh',
      backgroundImage: `url(${heroImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Overlay */}
    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(255,255,255,0.7)' }}></div>
    
    {/* Full-width content container */}
    <div className="container-fluid position-relative z-1 px-4 px-lg-6 px-xl-8">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 text-center py-5">
          <motion.h1
            className="display-2 display-lg-1 fw-bold mb-5 text-primary"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Operation Sindoor
          </motion.h1>
          <motion.p
            className="lead fs-3 mb-6 text-secondary px-2 px-lg-5 mx-auto"
            style={{ maxWidth: '800px' }}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Empowering lives through medical, financial, and educational aid
          </motion.p>
          <motion.div
            className="d-flex flex-column flex-md-row justify-content-center gap-4 gap-lg-5 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 shadow-lg">
              Register for Aid
            </Link>
            <Link to="/track" className="btn btn-outline-primary btn-lg px-5 py-3 shadow-lg">
              Track Request
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default Home; 