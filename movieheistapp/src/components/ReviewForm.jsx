import React, { useState } from "react";

const ReviewForm = ({ onClose, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReviewTextArea, setShowReviewTextArea] = useState(false);

  const questions = [
    {
      correct_option: "a",
      options: [
        "A) Neo",
        "B) Morpheus",
        "C) Trinity",
        "D) Agent Smith"
      ],
      question: "In the movie \"Matrix,\" what is the name of the protagonist played by Keanu Reeves?"
    },
    {
      correct_option: "c",
      options: [
        "A) Christopher Nolan",
        "B) James Cameron",
        "C) The Wachowskis",
        "D) Steven Spielberg"
      ],
      question: "Who directed the movie \"Matrix\"?"
    },
  ];

  const handleChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowReviewTextArea(true);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <span
          className="absolute top-2 right-2 text-gray-600 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        {showReviewTextArea ? (
          <div className="mb-4">
            <textarea
              rows="5"
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Write your review here..."
              value={answers.review || ""}
              onChange={(e) => setAnswers({ ...answers, review: e.target.value })}
            />
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
            >
              Submit Review

            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl mb-4 text-black">{questions[currentQuestion].question}</h2>
            <form>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="options"
                    value={option}
                    onChange={() => handleChange(questions[currentQuestion].id, option)}
                    className="mr-2"
                  />
                  <label className="text-black" htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </form>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
              onClick={handleNextQuestion}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Submit"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
