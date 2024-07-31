import question from "./data";
import './app.css';
import { useState } from "react";
import rewards from "./reward";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";


function App() {
  return <>
    <div className="app">
      <Quizs quizs={question}/>
    </div>
      </>;
}


const Quizs = ({quizs}) => {
  const [quizIndex,setQuizIndex] = useState(0);
  const [urScore,setUrScore] = useState(0);
  const [showAnswer,setShowAnswer] =useState(false);
  const [showX,setShowX] = useState('');
  const [disabled,setDisabled] = useState(false)

  const isFinished = quizIndex === quizs.length;
  console.log(quizs);
  const handleNext = () =>{
    setQuizIndex(prev => prev + 1)
    setShowAnswer(false);
    setShowX('');
    setDisabled(false);
  }
  const handleGoToHome = () => {
    setQuizIndex(0)
  }
  return <> { isFinished ? 
  <>
  <ScoreBoard urScore={urScore}/>
  <Rewards rewards={rewards}/>
  <div style={{ width : '95%' , padding : '4px 10px'}}>
  <Button onClick={handleGoToHome} css='goToHome'>{'<<<'} Go To Home</Button>
  </div>
  </>
  : 
  <>
    <h1>Quiz For US</h1>
    <EachQuiz quiz={quizs[quizIndex]}  setUrScore={setUrScore} showAnswer={showAnswer} setShowAnswer={setShowAnswer} showX={showX} setShowX={setShowX} disabled={disabled} setDisabled={setDisabled}/>
    <NextAndScore showAnswer={showAnswer} urScore={urScore} onNext={handleNext}>Next</NextAndScore> 
  </>}
  </> 
}

const EachQuiz = ({quiz,setUrScore,setShowAnswer,setDisabled,setShowX,showAnswer,showX,disabled}) => {
  
  console.log(quiz);
  const checkAnswer = (quiz) => {
    setShowAnswer(true);
    setDisabled(true)
    quiz.condition ? setUrScore(prev => prev + 10) 
    : (() => {
      setShowX(quiz.option);
      setUrScore(prev => prev-10);
    })();
  }
  return <div className="eachQuiz">
    <h2>{quiz.question}</h2>
    <div className="options">
      {quiz.options.map((each,index) => <p key={index} onClick={() => checkAnswer(each)} className={`option  ${each.condition && showAnswer && 'right' }  ${each.option === showX && 'showX' } ${disabled && 'disabled'}`}>{each.option}</p>)}
    </div>
  </div>
}

const NextAndScore =  ({urScore,onNext,children,showAnswer}) => {
  return <div className="nextAndScore">
    <h4>Your Score : {urScore}</h4>
    <button className={`next ${showAnswer ? '' : 'noNext'}`}  onClick={onNext}>{children}</button>
  </div>
}

const ScoreBoard = ({urScore}) => {
  return <div className="scoreBoard">
    <h1>Your Score is {urScore}</h1>
  </div>
}

const Button = ({children,css,onClick}) => {
  return <button onClick={onClick} className={css}>{children}</button>
}

const Rewards = ({rewards}) => {
  const [open,setOpen] = useState('');
  const handleClick = (score) => {
    setOpen(open => open === score ? '' : score);
  }
  return <div className='rewards'>
    <h2>Take Your Reward Here 👇</h2>
    {rewards.map(reward => <EachReward open={open} handleClick={handleClick} setOpen={setOpen} reward={reward}/>)}
  </div>
}

const EachReward = ({reward,open,handleClick}) => {
  const isOpen = open === reward.score;
  return <div onClick={() => handleClick(reward.score)} className={isOpen ? 'opened' : 'notOpened'}>
    {isOpen ? <p >{reward.reward}</p> :<h3>{reward.score}</h3> }
  </div>
}

export default App;
