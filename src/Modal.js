import React from "react";


const Modal = (props) => {
  const { isModalOpen, closeModal, correct} = props;
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="negrilla">
        
        {/*<p>{questions &&((correct / questions.length) * 100).toFixed(0)}% of
          questions correctly</p>*/}
          <p>Score: {correct}</p>
          <p>Points:  {correct*1000}
        </p>
        <button className="close-btn" onClick={closeModal}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default Modal;
