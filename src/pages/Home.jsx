import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Row, Col } from 'antd';
import CourseCard from '../components/CourseCard';

const Home = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        API.get('courses/')
            .then(res => setCourses(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Все курсы</h1>
            <Row gutter={[16, 16]}>
                {courses.map(course => (
                    <Col key={course.id} span={6}>
                        <CourseCard course={course} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Home;
