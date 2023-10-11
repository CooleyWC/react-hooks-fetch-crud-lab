import React, {useState} from "react";

function QuestionItem({ question, onDeleteQuestion, onAnsweredQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState({correctIndex});

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    // console.log(question.id)
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then(res=>res.json())
    .then(()=>{
      onDeleteQuestion(question)}) 
  }

  function handleSelectedAnswer(e){
    const newAnswerIndex = parseInt(e.target.value)
    setSelectedAnswerIndex(newAnswerIndex)
    // console.log(selectedAnswerIndex)

    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({"correctIndex": newAnswerIndex})
    })
    .then(res=>res.json())
    .then((updatedQ)=>onAnsweredQuestion(updatedQ))

  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={selectedAnswerIndex} onChange={handleSelectedAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
