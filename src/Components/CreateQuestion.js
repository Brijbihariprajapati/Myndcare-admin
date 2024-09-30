import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const CreateQuestion = () => {
  const navigate = useNavigate()
  const [question, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']); 
  const [correctOption, setCorrectOption] = useState(null); 

  const checkAuth  = async()=>{
    const token = localStorage.getItem('token')
    try {
      const data = await axios.get('http://localhost:7000/api/auth/question',{
        headers:{Authorization:`Bearer ${token}`}
      })
      console.log(data)
    } catch (error) {
      localStorage.removeItem('token')
      toast.error('You are not authorized or session expired!');
      navigate('/')
    }
  }

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleCorrectOptionChange = (index) => {
    setCorrectOption(index); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionData = {
      question,
      options,
      correctOption 
    };

    try {
      await axios.post('http://localhost:7000/api/auth/createquestion', questionData);
      toast('Question created successfully');
      setQuestionText('');
      setOptions(['']);
      setCorrectOption(null);
    } catch (error) {
      console.error('Error creating question', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4 text-center">Create a New Question</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="questionText" className="mb-3">
              <Form.Label>Question Text</Form.Label>
              <Form.Control
                type="text"
                value={question}
                onChange={(e) => setQuestionText(e.target.value)}
                required
                placeholder="Enter your question"
              />
            </Form.Group>

            <Form.Group controlId="options" className="mb-3">
              <Form.Label>Options (for multiple-choice questions)</Form.Label>
              {options.map((option, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                  <Form.Check
                    type="radio"
                    name="correctOption"
                    className="ms-3"
                    onChange={() => handleCorrectOptionChange(index)}
                    checked={correctOption === index}
                    label="Correct"
                  />
                </div>
              ))}
              <Button variant="outline-secondary" onClick={addOption}>
                Add Option
              </Button>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create Question
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuestion;
