import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Card,
  Space,
  Typography,
  message,
  Select
} from 'antd';
import API from '../services/api';

const { Title } = Typography;

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [teachers, setTeachers] = useState([]);

  console.log(teachers);
  

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    API.get('users/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTeachers(res.data))
      .catch(err => console.log(err));
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await API.get('courses/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    } catch (error) {
      message.error('Failed to load courses');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAdd = () => {
    form.resetFields();
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    form.setFieldsValue(course);
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await API.delete(`courses/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      message.error('Failed to delete course');
    }
  };

  const handleFinish = async (values) => {
    console.log('values',values);
    
    try {
      const token = localStorage.getItem('access_token');
      if (editingCourse) {
        await API.put(`courses/${editingCourse.id}/`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Course updated successfully');
      } else {
        await API.post('courses/', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Course added successfully');
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (error) {
      message.error(editingCourse ? 'Failed to update course' : 'Failed to add course');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Teacher',
      render: (record) => (
        <div>
          <h1>{record.id}</h1>
        </div>
      )
    },
    {
      title: 'Short Description',
      dataIndex: 'short_description',
      key: 'short_description',
      ellipsis: true,
      width: 300
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          Courses Management
        </Title>
      }
      extra={
        <Button type="primary" onClick={handleAdd}>
          + Add Course
        </Button>
      }
      style={{ borderRadius: 8 }}
    >
      <Table
        dataSource={courses}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={editingCourse || {}}
        >
          <Form.Item
            name="title"
            label="Course Title"
            rules={[{ required: true, message: 'Please enter the course title' }]}
          >
            <Input placeholder="e.g. Introduction to React" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <Input type="number" placeholder="e.g. 100" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="Frontend">Frontend</Select.Option>
              <Select.Option value="Backend">Backend</Select.Option>
              <Select.Option value="Fullstack">Fullstack</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="teacher"
            label="Teacher"
            rules={[{ required: true, message: 'Please select a teacher' }]}
          >
            <Select placeholder="Select teacher">
              {teachers.map(t => (
                <Select.Option key={t.id} value={t.id}>
                  {t.username}    
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="short_description"
            label="Short Description"
            rules={[{ required: true, message: 'Please enter a short description' }]}
          >
            <Input placeholder="Brief overview of the course" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Full Description"
            rules={[{ required: true, message: 'Please enter the full description' }]}
          >
            <Input.TextArea rows={4} placeholder="Detailed course content..." />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingCourse ? 'Update Course' : 'Add Course'}
              </Button>
            </Space>
          </Form.Item>
        </Form>

      </Modal>
    </Card>
  );
};

export default CourseTable;