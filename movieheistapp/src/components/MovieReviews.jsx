import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Rate, message } from 'antd';
// import 'antd/dist/antd.css';

const MovieReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("You must be logged in to see reviews");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.get(`http://localhost:7676/api/auth/reviews/${id}`, {
          headers,
          withCredentials: true
        });

        if (response.status === 200) {
          setReviews(response.data);
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (error) {
        message.error(error.message || 'Error fetching reviews');
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div className="bg-black min-h-screen p-5">
      <div className="grid md:grid-cols-1 gap-4">
        {reviews.length > 0 ? reviews.map((review) => (
          <Card
            key={review._id}
            title={<h3 className="text-white text-xl">{review.review}</h3>}
            bordered={false}
            className="bg-gray-800 text-white"
            headStyle={{ borderColor: '#f00', color: '#fff' }}
            bodyStyle={{ borderColor: '#333' }}
          >
            <p>User sentiment: {review.sentiment}</p>
            <Rate allowHalf defaultValue={review.score} disabled />
            <p>Score: {review.score} / 5</p>
            {review.userId && (
              <p className="text-sm text-gray-400">Reviewer: {review.userId.email}</p>
            )}
          </Card>
        )) : (
          <p className="text-white">No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
