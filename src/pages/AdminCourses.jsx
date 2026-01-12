import { Tabs } from 'antd';
import CourseTable from '../components/CourseTable'; // таблица курсов с CRUD
import LessonTable from '../components/LessonTable'; // таблица уроков с CRUD

const AdminCourses = () => {
  const items = [
    { key: 'courses', label: 'Courses', children: <CourseTable /> },
    { key: 'lessons', label: 'Lessons', children: <LessonTable /> },
  ];

  return (
  <>
  <div className='mt-20'>
  <Tabs  defaultActiveKey="courses" items={items} />;
  </div>
  </>
  )
};

export default AdminCourses;
