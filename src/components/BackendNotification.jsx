import { useState, useEffect } from 'react';
import { X, AlertTriangle, Linkedin } from 'lucide-react';
import Lottie from 'react-lottie';
import sadAnimationData from '../animations/crosseyeman.json'; // Path to your Lottie JSON file

const BackendNotification = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300); // Wait for animation to complete
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: sadAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
      
      <div 
        className={`bg-white rounded-lg shadow-xl p-6 mx-4 transition-all duration-300 transform relative z-10 max-w-md
          ${isVisible ? 'scale-100' : 'scale-95'} 
          ${isMinimized ? 'translate-y-[calc(100vh-80px)] w-72' : ''}`}
      >
        {/* Minimize/Maximize button */}
        <button 
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMinimized ? 
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /> : 
              <path d="M8 3h8m-8 18h8m-8-9h8" />
            }
          </svg>
        </button>
      
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        {!isMinimized && (
          <div className="text-center pt-4">
            <div className="flex justify-center mb-4">
              <div style={{ width: '180px', height: '180px' }}>
                <Lottie options={defaultOptions} />
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Backend Service Down
              </h3>
              
              <p className="text-gray-600 mb-3">
                Due to some technical issues, the backend service is currently unavailable. I'm working on fixing it and may be migrating from Railway to EC2.
              </p>
              
              <p className="text-gray-600 mb-2">
                As a beginner, I'm still learning how to handle deployment challenges. In the meantime, you can explore the UI and get familiar with the features.
              </p>
              
              <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 my-4">
                <p>Expected to be back online: <span className="font-medium">Soon™</span></p>
              </div>
            </div>
            
            <a 
              href="https://linkedin.com/in/01neelesh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center py-2 px-4 rounded font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              Connect on LinkedIn
            </a>
          </div>
        )}
        
        {isMinimized && (
          <div className="flex items-center pl-6">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
            <p className="text-sm font-medium text-gray-700">Backend Down - Click to expand</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackendNotification;