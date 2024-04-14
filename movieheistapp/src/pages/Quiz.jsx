import React, { useState, useEffect } from "react";
import { Radio, Button, Card, Modal, Input } from "antd";
import { motion } from "framer-motion";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import axios from "axios";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const { movie, id } = location.state;
  //   const {id} = useParams();
  const [reviewText, setReviewText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sentiment, setReviwSentiment] = useState("");

  //   console.log(movie);
  //   console.log(id);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/questions?name=${movie}`
        );
         console.log(response.data);
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        // Handle error (e.g., display an error message)
      }
    };

    fetchQuizData();
  }, [movie]);
  
const handleScore = (score) => {
   
      if (score > 3) {
        setIsModalVisible(true);
      } else {
        navigate("/");
      }
    };
  const handleNextQuestion = () => {
    if (!quizData) return; // Ensure quizData is loaded

    const currentQuestionData = quizData.questions[currentQuestion];
    const { correct_option } = currentQuestionData;

    if (selectedAnswer === correct_option) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const getSentiments = async ()=>{
    try {
        const response = await axios.post('http://127.0.0.1:5000/sentiments',{
            review:reviewText
        })
        setReviwSentiment(response.data)
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
  }
  const handleReviewSubmission = async () => {
    setIsModalVisible(false);
    try {
      const token = localStorage.getItem("token"); // token in localStorage
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log(token);
      const sentimentResponse = await axios.post('http://127.0.0.1:5000/sentiments',{
        review:reviewText
    })
    console.log(sentimentResponse.data);

    if (sentimentResponse) {
        const response = await axios.post(
            "http://localhost:7676/api/auth/addReview",
            {
              review: reviewText,
              movie_id: id,
              score: score,
              sentiment: sentimentResponse.data.sentiment,
            },
            { headers, withCredentials: true }
          );
           
      console.log(response.data); // Check the response from the backend
      const data = await response.json();
      console.log("Submitted review:", reviewText);
      setReviewText("");
    }
     
  
    } catch (error) {
      console.error("Error adding review:", error.message);
    }
    // Clear review text
    // Close the modal
  };

  const renderQuizContent = () => {
    if (!quizData) {
      return <p>Loading quiz data...</p>; // Display loading indicator while fetching data
    }

    const currentQuestionData = quizData.questions[currentQuestion];
    const { question, options } = currentQuestionData;

    const handleRadioChange = (e) => {
      setSelectedAnswer(e.target.value); // Update selectedAnswer with the chosen option key
    };

    const isLastQuestion = currentQuestion + 1 === quizData.questions.length;

    
    return (
      <Card
        title={`Question ${currentQuestion + 1}`}
        className="bg-black text-white shadow-lg rounded-lg p-4"
        style={{ maxWidth: 400 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <motion.p className="text-lg text-white">{question}</motion.p>
        <Radio.Group onChange={handleRadioChange} value={selectedAnswer}>
          {Object.entries(options).map(([optionKey, optionText]) => (
            <Radio
              key={optionKey}
              value={optionKey}
              className="block my-2 text-white"
            >
              {optionText}
            </Radio>
          ))}
        </Radio.Group>
        <Button
          type="primary"
          className="mt-4"
          onClick={handleNextQuestion}
          style={{ backgroundColor: "#E50914", borderColor: "#E50914" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black flex-col">
      <Link
        to="/movies"
        className="fixed z-10 top-5 left-5 text-4xl text-white bg-red-600 rounded-full p-2"
      >
        <HiChevronLeft />
      </Link>
      <div className="max-w-md w-full">
        <h1 className="text-white text-3xl mb-5">{movie} Quiz</h1>
        {showScore ? (
          <Button
            type="primary"
            onClick={() => handleScore(score)}
            style={{ backgroundColor: "#E50914", borderColor: "#E50914" }}
          >
            your score is {score} : {score > 3 ? "Post Review" : "Give Retake"}
          </Button>
        ) : (
          renderQuizContent()
        )}
      </div>
      <Modal
        title="Write a Review"
        visible={isModalVisible}
        onOk={handleReviewSubmission}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input.TextArea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Modal>
    </div>
  );
};

export default Quiz;
