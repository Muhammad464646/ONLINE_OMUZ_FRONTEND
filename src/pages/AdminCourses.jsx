import { Tabs, Row, Col, Button } from 'antd';
import API from '../services/api';
import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await API.get('courses/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить курс?')) return;
    try {
      const token = localStorage.getItem('access_token');
      await API.delete(`courses/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const items = [
    {
      key: 'all',
      label: 'Все курсы',
      children: (
        <Row gutter={[16,16]}>
          {courses.map(course => (
            <Col key={course.id} span={6}>
              <CourseCard course={course}>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </Button>
                <Button type="default">Edit</Button>
              </CourseCard>
            </Col>
          ))}
        </Row>
      )
    },
    {
      key: 'frontend',
      label: 'Фронтенд',
      children: (
        <Row gutter={[16,16]}>
          {courses.filter(c => c.category === 'frontend').map(course => (
            <Col key={course.id} span={6}>
              <CourseCard course={course}>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </Button>
                <Button type="default">Edit</Button>
              </CourseCard>
            </Col>
          ))}
        </Row>
      )
    },
    {
      key: 'backend',
      label: 'Бекенд',
      children: (
        <Row gutter={[16,16]}>
          {courses.filter(c => c.category === 'backend').map(course => (
            <Col key={course.id} span={6}>
              <CourseCard course={course}>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </Button>
                <Button type="default">Edit</Button>
              </CourseCard>
            </Col>
          ))}
        </Row>
      )
    }
  ];

  return <Tabs defaultActiveKey="all" items={items} />;
};

export default AdminCourses;
