import { Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import API from '../services/api';
import CourseCard from '../components/CourseCard';
import { Option } from 'antd/es/mentions';
const Course = () => {
  const [courses, setCourses] = useState([]);
  const [value,setValue]=useState('all')

  useEffect(() => {
    API.get('courses/')
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className='bg-gray-100 pt-20 '>
      <div style={{ padding: '20px' }} className='w-[90%] m-auto' >
        <h1 className=' mb-10 text-3xl font-semibold'> Чизи нав омӯзед!</h1>
        <Select className='w-50 ' value={value} onChange={(val)=>setValue(val)} placeholder='Выберите категорию'>
          <Select.Option className='text-[20px] font-serif' value="all">Хама курсхо</Select.Option>
          <Select.Option className='text-[20px] font-serif' value="Backend">Бекенд</Select.Option>
          <Select.Option  className='text-[20px] font-serif' value="Frontend">Фронтенд</Select.Option>
        </Select><br /><br /><br />
        <Row gutter={[16, 16]}>
          {courses.filter(el=>value=='all'|| el.category==value).map(course => (
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
