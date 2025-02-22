import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById } from '../../../apicalls/exams';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { message } from 'antd'; // Ant Design components
import Instructions from './Instructions';
import { addReport } from '../../../apicalls/reports';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../../../stylesheets/ResultCard.css';

function WriteExam() {
  const [examData, setExamData] = useState();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [view, setView] = useState('instructions');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const getExamDataById = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        setExamData(response.data);
        setQuestions(response.data.questions);
        setSecondsLeft(response.data.duration);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = 'Pass';
      if (correctAnswers.length < examData.passingMarks) {
        verdict = 'Fail';
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };
      setResult(tempResult);
      dispatch(ShowLoading());
      const response = await addReport({
        exam: id,
        result: tempResult,
        user: user._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setView('result');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp && view === 'questions') {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (id) {
      getExamDataById(id);
    }
  }, []);

  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center">{examData.name}</h1>
        <div className="divider"></div>
        {view === 'instructions' && (
          <Instructions
            examData={examData}
            setExamData={setExamData}
            view={view}
            setView={setView}
            startTimer={startTimer}
          />
        )}
        {view === 'questions' && questions.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between">
              <h1 className="text-2xl">
                {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].name}
              </h1>
              <div className="timer">
                <span className="text-2xl">{secondsLeft}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {Object.keys(questions[selectedQuestionIndex].options).map((option, index) => {
                return (
                  <div
                    className={`flex gap-2 items-center ${
                      selectedOptions[selectedQuestionIndex] === option
                        ? 'selected-option'
                        : 'option'
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuestionIndex]: option,
                      });
                    }}
                  >
                    <h1 className="text-xl">
                      {option} : {questions[selectedQuestionIndex].options[option]}
                    </h1>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}
              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    clearInterval(intervalId);
                    setTimeUp(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
        {view === 'result' && (
          <div className="flex justify-center mt-2 gap-2 bc">
          <div className="flex flex-col gap-2 result p-6 shadow-lg rounded-lg bg-red-100 text-gray-800 uc">
            <h1 className="text-3xl font-semibold text-center h">Result</h1>
            <div className="marks">
              <h1 className="text-lg font-medium"><span className='sp1'>Total Marks:</span> {examData.totalMarks}</h1>
              <h1 className="text-lg font-medium"><span className='sp1'>Passing Marks:</span> {examData.passingMarks}</h1>
              <h1 className="text-lg font-medium"><span className='sp1'>Obtained Marks:</span> {result.correctAnswers.length}</h1>
              <h1 className="text-lg font-medium"><span className='sp1'>Wrong Answers:</span> {result.wrongAnswers.length}</h1>
    
              <div className="flex items-center gap-2 text-lg font-medium mt-4">
                <h1><span className='sp1'>Verdict:</span> {result.verdict}</h1>
                {result.verdict === 'Pass' ? (
                  <FaCheckCircle className="text-green-500 tick animate-bounce" size={28} />
                ) : (
                  <FaTimesCircle className="text-red-500 cross animate-shake" size={28} />
                )}
              </div>
    
              <div className="flex gap-2 mt-2">
                  <button
                    className="primary-outlined-btn"
                    onClick={() => {
                      setView('instructions');
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                      setTimeUp(false);
                      setSecondsLeft(examData.duration);
                    }}
                  >
                    Retake Exam
                  </button>
                  <button
                    className="primary-contained-btn"
                    onClick={() => {
                      setView('review');
                    }}
                  >
                    Review Answers
                  </button>
                </div>
            </div>
          </div>
        </div>
        )}
        {view === 'review' && (
          <div className="flex flex-col gap-2">
            {questions.map((question, index) => (
              <div key={index}>
                <h1 className="text-xl">
                  {index + 1} : {question.name}
                </h1>
                <h1 className="text-md">Correct Answer : {question.correctOption}</h1>
                <h1 className="text-md">
                  Your Answer : {selectedOptions[index] || 'Not Answered'}
                </h1>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}

export default WriteExam;
