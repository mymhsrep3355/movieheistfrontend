import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Typography, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css'; // Ensure Ant Design styles are imported if not globally done

const { confirm } = Modal;
const { Title, Paragraph } = Typography;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You must be logged in to view reviews");
      return;
    }

    try {
      const response = await axios.get('http://localhost:7676/api/auth/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
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

  const handleDelete = (reviewId) => {
    confirm({
      title: 'Are you sure you want to delete this review?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      async onOk() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.delete(`http://localhost:7676/api/auth/review/${reviewId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          if (response.status === 200) {
            message.success('Review deleted successfully');
            fetchReviews(); // Refresh the list after deletion
          } else {
            throw new Error('Failed to delete review');
          }
        } catch (error) {
          message.error(error.message || 'Error deleting review');
        }
      },
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen p-5 flex flex-col items-center">
      {reviews.length > 0 ? reviews.map((item) => (
        <Card
          key={item._id}
          className="w-full max-w-xl bg-gray-800 text-white mb-4 hover:bg-gray-700 transition-colors duration-300"
          actions={[
            <Button key="delete" type="primary" danger onClick={() => handleDelete(item._id)} icon={<ExclamationCircleOutlined />} ghost>
              Delete
            </Button>
          ]}
        >
          <Card.Meta
            title={<Title level={4} className="text-red-600">{`Review for ${item.movieId}`}</Title>}
            description={
              <>
                <Paragraph>{item.review}</Paragraph>
                <Paragraph strong className="text-gray-400">Sentiment: {item.sentiment}</Paragraph>
                <Paragraph>Score: <span className="text-yellow-500">{item.score}</span> / 5</Paragraph>
              </>
            }
          />
        </Card>
      )) : <Title level={3} className="text-white">No Reviews Found</Title>}
    </div>
  );
};

export default Reviews;
