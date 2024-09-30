import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Table, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FcQuestions } from "react-icons/fc";

const AdminQuestion = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  const checkAuthAndFetchQuestions = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:7000/api/auth/admin/questions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      
    } catch (error) {
      toast.error('You are not authorized or session expired!');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/auth/findallquestions');
      setQuestions(response.data); 
      console.log('questions', response.data);

    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    checkAuthAndFetchQuestions();
    fetchQuestions();
  }, [checkAuthAndFetchQuestions]);

  const handleEdit = (question) => {
    navigate(`/editquestion`,{state:{question}});
    
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/auth/deletequestion/${id}`);
      toast.success('Question deleted successfully');
      setQuestions(questions.filter(question => question._id !== id));
    } catch (error) {
      toast.error('Failed to delete question');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '50px' }}>
        <h2 style={{ color: 'black', fontWeight: '400',marginLeft:'20px' }}>All Questions and Answers</h2>
       <div style={{fontWeight:'600', display:'flex',alignItems:'center', flexDirection:'row', gap:'10px'}}> <div style={{marginTop:'15px'}}>Create Questions:</div>
       <FcQuestions style={{marginRight:'30px'}} size={50} color='blue' onClick={() => navigate('/createquestion')}/>
       </div>
      </div>
      <Container>
        {questions.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Options</th>
                <th>Correct Answer</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody style={{height:'100%'}}>
              {questions.map((question, index) => (
                <tr key={question._id}>
                  <td>{index + 1}</td>
                  <td>{question.question}</td>
                  <td>
                    <ul>
                      {question.options.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{question.options[question.correctOption]}</td>
                  <td >
                 <div style={{height:'100%', display: 'flex',  alignItems: 'center', gap: '25px', padding:'24px  10px 24px 10px' }}>
                 <MdEdit color='green' size={50}  onClick={()=>handleEdit(question)}/>
                 <MdDelete color='red' size={50} onClick={()=>handleDelete(question._id)} />
                 </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h4 className="text-center">No questions found</h4>
        )}
      </Container>
    </div>
  );
};

export default AdminQuestion;
