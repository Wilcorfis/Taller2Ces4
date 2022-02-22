import React, { useState, } from "react";

import Countdown from "react-countdown";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./Button";
function App(props) {
  const [activeButton, setActiveButton] = useState(0)
 
 

  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    checkAnswer,
    quiz,
    openModal,
    closeModal,
    isModalOpen,
    disabled,
    setDisabled

  } = props;



  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer];
  ///timer function
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      openModal()
      return <Modal
        isModalOpen={isModalOpen} closeModal={closeModal} correct={correct} questions={questions}
      />

    } else {
      // Render a countdown
      return (
        <center>
          {hours}:{minutes}:{seconds}
        </center>
      );
    }
  };

  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <>
      <main>

        <section className="quiz">
          <nav class="navbar navbar-dark navbar-expand-sm bg-dark fixed-top ">
            <div class="container">

              <div id="navbarCollapse" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">

                  <li class="nav-item  mx-5">
                    <p class="nav-link active">
                    Difficulty : {quiz.difficulty}
         
                    </p>
                  </li>
                  <li class="nav-item mx-5">
                    <p class="nav-link active">
                    Player : {quiz.name}
                    </p>
          
                  
                  </li>
                  <li class="nav-item mx-5">
                    <p class="nav-link active">
                    Points : {correct * 1000}
                    </p>
                  </li>
                </ul>
              </div>



            </div>
          </nav>

          <Countdown date={Date.now() + 30000} renderer={renderer} />
          <article className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <div key={answer}>
                    <Button
                      id={index}
                      answer={answer}
                      setActiveButton={setActiveButton}
                      active={activeButton === index ? true : false}
                      correct_answer={correct_answer}
                      checkAnswer={checkAnswer}
                      disabled={disabled}
                      setDisabled={setDisabled}
                    />

                  </div>


                );
              })}
            </div>
          </article>
          {/*<button className="next-question" onClick={nextQuestion}>
            next question
            </button>*/}
        </section>
      </main>
    </>
  );
}

export default App;
