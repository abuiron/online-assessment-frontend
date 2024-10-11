import { message, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllExams } from '../../../apicalls/exams';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { Card, CardHeader, CardContent, Button, Typography } from '@mui/material';
import '../../../stylesheets/home.css';

function HomePage() {
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];
  const user = useSelector(state => state.users.user);

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user.name}, Welcome to Online Assessment Portal`} />
        <div className="divider"></div>
        <div className="container">
          <Row gutter={[16, 16]} className="mt-2">
            {exams &&
              exams.map((exam, index) => {
                return (
                  <Col
                    xs={24} // Full width on extra-small screens (mobile)
                    sm={12} // Half width on small screens (tablets)
                    md={8} // One-third width on medium screens
                    lg={6} // Quarter width on large screens
                    key={index}
                  >
                    <Card
                      sx={{ maxWidth: 345, borderTop: `3px solid`, marginBottom: 3 }}
                      className={`border-top-${colors[index % colors.length]}`}
                    >
                      <CardHeader title={exam.name} />

                      <CardContent>
                        <Typography variant="body2" color="textSecondary">
                          Category: {exam.category}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Questions: {exam.questions.length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Marks: {exam.totalMarks}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Passing Marks: {exam.passingMarks}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Duration: {exam.duration} mins
                        </Typography>

                        <Button
                          variant="outlined"
                          color={colors[index % colors.length]} // Select color dynamically
                          onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                          sx={{ marginTop: 2 }}
                        >
                          Start Exam
                        </Button>
                      </CardContent>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
    )
  );
}

export default HomePage;
