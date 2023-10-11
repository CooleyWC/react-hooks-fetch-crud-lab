import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {


  const questionComps = questions.map((question)=>{
    return <QuestionItem 
      key={question.id} 
      question={question} 
      onDeleteQuestion={handleDeleteQuestion}
      onAnsweredQuestion={handleSelectedQuestion}
      />
  })

function handleDeleteQuestion(deletedQuestion){

  const updatedQuestions = questions.filter((question)=>{
    return question.id !== deletedQuestion.id
  })
  setQuestions(updatedQuestions)
}

function handleSelectedQuestion(updatedQ){
  // console.log(updatedQ)
  const updatedQs = questions.map(question=>{
    if(question.id===updatedQ.id){
      return updatedQ
    } else {
      return question
    }
  })
  // console.log(updatedQs)
  setQuestions(updatedQs)
}

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionComps}
      </ul>
    </section>
  );
}

export default QuestionList;
