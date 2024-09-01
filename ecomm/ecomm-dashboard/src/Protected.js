import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate("/register"); 
    }
  }, [navigate]);

  return <div>{children}</div>;
}

export default Protected;
