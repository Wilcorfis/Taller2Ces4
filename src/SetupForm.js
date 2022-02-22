import React, { useState } from "react";
import trivia_categories from "./trivia_categories";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";
import App from "./App";

const SetupForm = () => {
  const table = trivia_categories

  const API_ENDPOINT = "https://opentdb.com/api.php?";

  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    name: "",
    amount: 10,
    category: 0,
    difficulty: "",
  });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabled,setDisabled]=useState(false);



  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;

      if (data.length > 0) {

        setQuestions(response.data.results);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setDisabled(false);//volver a habilitar los botones para escoger
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };


  const checkAnswer = (value) => {
    if (value) {
      
      setCorrect((oldState) => oldState + 1);
      setTimeout(() => {
        console.log('Hello, World!')
        nextQuestion();
      }, 5000);
      
      
      
      
    } else {
      openModal();

    }

  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };



  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    if (quiz.name === "" || quiz.category === 0 || quiz.difficulty === "") return;
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
    navigate('/App');
  };

  return (
    <>
      {questions.length === 0 && (
        <main>
          <section className="quiz quiz-small">
            <form className="setup-form">
             
              {/* {amount} */}
              <div className="form-control">
                <label htmlFor="amount">Name of player</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={quiz.name}
                  onChange={handleChange}
                  className="form-input"


                />
              </div>
              {/* {category} */}
              <div className="form-control">
                <label htmlFor="category">category</label>
                <select
                  defaultValue="Choose a category"
                  name="category"
                  id="category"
                  className="form-input"
                  value={quiz.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Choose a category
                  </option>

                  {table.map((x) => (
                    <option value={x.id}>{x.name}</option>
                  ))}



                </select>
              </div>
              {/* {difficulty} */}
              <div className="form-control">
                <label htmlFor="difficulty">Select difficulty</label>
                <select
                  defaultValue="Choose a difficulty"
                  name="difficulty"
                  id="difficulty"
                  className="form-input"
                  value={quiz.difficulty}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Choose a difficulty
                  </option>

                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              {error && (
                <p className="error">
                  can't generate questions, please try different options
                </p>
              )}
              <button type="submit" onClick={handleSubmit} className="submit-btn">
                start
              </button>
            </form>
          </section>
        </main >
      )}
      <Modal
        isModalOpen={isModalOpen} closeModal={closeModal} correct={correct} questions={questions}

      />
      {questions.length > 0 && (
        <App
          waiting={waiting}
          loading={loading}
          questions={questions}
          index={index}
          correct={correct}
          checkAnswer={checkAnswer}
          openModal={openModal}
          quiz={quiz}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          disabled={disabled}
          setDisabled={setDisabled}

        />
      )}
    </>
  );
};

export default SetupForm;
