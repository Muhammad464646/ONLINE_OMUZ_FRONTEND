import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import API from '../services/api';
import CourseCard from '../components/CourseCard';
const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('courses/')
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className='bg-gray-50'>
      <div style={{ padding: '20px' }}>
        <h1 className='text-center text-3xl font-bold'> Чизи нав омӯзед!</h1>
        <Row gutter={[16, 16]}>
          {courses.map(course => (
            <Col key={course.id} span={6}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Course
