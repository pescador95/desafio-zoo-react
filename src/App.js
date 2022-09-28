import React, { useState } from 'react';
import './styles/App.css';


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true);
  }
  return (

    <div className='form-container'>
      
      
    </div>
  );
}

export default App;
