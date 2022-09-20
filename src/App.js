import React, { useState } from 'react';
import './App.css';
import Form from './Form';
import FormSuccess from './FormSuccess';
import './Form.css';



function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true);
  }
  return (

    <div className='form-container'>
      
        <Form submitForm={submitForm}/>
    </div>
  );
}

export default App;
