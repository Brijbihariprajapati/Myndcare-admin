import React, { useState } from 'react';
import axios from 'axios'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditQuestion = () => {
  const navigate = useNavigate()
  const data = useLocation();
  const state = data.state.question;
  console.log(state);
  
  
  const [questionData, setQuestionData] = useState(state);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = value;
    setQuestionData({
      ...questionData,
      options: updatedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.put(`http://localhost:7000/api/auth/editquestions/${questionData._id}`, questionData);
        setUpdateStatus('Question updated successfully!');
        toast('Question updated successfully!')
        navigate('/questions')
        console.log('API Response:', response.data);
      } catch (error) {
        setUpdateStatus('Failed to update question');
        toast('Failed to update question')
        console.error('API Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!questionData.question) newErrors.question = 'Title is required';
    if (questionData.options.some(option => option === '')) newErrors.options = 'All options are required';
    if (!questionData.correctOption) newErrors.correctOption = 'Correct answer is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="container mt-5">
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Title</label>
          <input
            type="text"
            className={`form-control ${errors.question ? 'is-invalid' : ''}`}
            name="question"
            value={questionData.question}
            onChange={handleChange}
          />
          {errors.question && <div className="invalid-feedback">{errors.question}</div>}
        </div>

        {questionData.options.map((option, index) => (
          <div className="form-group" key={index}>
            <label>Option {index + 1}</label>
            <input
              type="text"
              className={`form-control ${errors.options ? 'is-invalid' : ''}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            {errors.options && <div className="invalid-feedback">{errors.options}</div>}
          </div>
        ))}

        <div className="form-group">
          <label>Correct Answer</label>
          <input
            type="text"
            className={`form-control ${errors.correctOption ? 'is-invalid' : ''}`}
            name="correctOption"
            value={questionData.correctOption}
            onChange={handleChange}
          />
          {errors.correctOption && <div className="invalid-feedback">{errors.correctOption}</div>}
        </div>

       <div style={{marginTop:'10px',}}>
       <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Save Changes'}
        </button>
        <button className="btn btn-danger" style={{marginLeft:'50px',width:'130px'}} onClick={()=>navigate('/questions')} >Back </button>
        
       </div>
        {updateStatus && <div className="mt-3 alert alert-info">{updateStatus}</div>}
      </form>
    </div>
  );
};


export default EditQuestion;
