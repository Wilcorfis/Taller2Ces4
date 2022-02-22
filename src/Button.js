import React, { useState } from "react";

const Button = props => {
    const [verdadero,setVerdadero]=useState("");
    const [falso,setFalso]=useState("");
    const { correct_answer,
        answer,disabled,setDisabled
    } = props;
    const clickHandler = () => {
        props.setActiveButton(props.id);
        setFalso("btn-danger");
        setVerdadero("btn-success")    
        setDisabled(true) 
        props.checkAnswer(correct_answer === answer);
       
    }
    


    return (
        <button
            className={` ${props.active} ${correct_answer === answer ? verdadero : falso} answer-btn`}
            value={answer}
            onClick={clickHandler}
            dangerouslySetInnerHTML={{ __html: answer }}
            disabled={disabled}
        >

        </button>
    )

}

export default Button