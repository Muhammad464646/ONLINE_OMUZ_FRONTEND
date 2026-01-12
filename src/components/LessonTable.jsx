import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Upload,
  Card,
  Space,
  Typography,
  message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import API from '../services/api';

const { Title, Text } = Typography;

const LessonTable = () => {
  const [lessons, setLessons] = useState([]);
  const [editingLesson, setEditingLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await API.get('lessons/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLessons(res.data);
    } catch (error) {
      message.error('Failed to load lessons');
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleAdd = () => {
    form.resetFields();
    setEditingLesson(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lesson) => {
    form.setFieldsValue({
      ...lesson,
      course: lesson.course?.id || lesson.course,
      video: null 
    });
    setEditingLesson(lesson);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await API.delete(`lessons/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Lesson deleted successfully');
      fetchLessons();
    } catch (error) {
      message.error('Failed to delete lesson');
    }
  };

  const handleFinish = async (values) => {
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('course', values.course);

      if (values.video?.file?.originFileObj) {
        formData.append('video', values.video.file.originFileObj);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingLesson) {
        await API.put(`lessons/${editingLesson.id}/`, formData, config);
        message.success('Lesson updated successfully');
      } else {
        await API.post('lessons/', formData, config);
        message.success('Lesson added successfully');
      }

      setIsModalOpen(false);
      fetchLessons();
    } catch (error) {
      message.error(editingLesson ? 'Failed to update lesson' : 'Failed to add lesson');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 70 },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 250,
      render: (text) => <Text ellipsis title={text}>{text}</Text>
    },
    {
      title: 'Course',
      key: 'course',
      render: (record) =>(
        <div>
          <h1>{record.course}</h1>
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <Button  onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button  danger onClick={() => handleDelete(record.id)}>
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
          Lessons Management
        </Title>
      }
      extra={
        <Button type="primary" onClick={handleAdd}>
          + Add Lesson
        </Button>
      }
      style={{ borderRadius: 8 }}
    >
      <Table
        dataSource={lessons}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 900 }}
      />

      <Modal
        title={editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{}}
        >
          <Form.Item
            name="title"
            label="Lesson Title"
            rules={[{ required: true, message: 'Please enter the lesson title' }]}
          >
            <Input placeholder="e.g. Understanding State in React" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter lesson content' }]}
          >
            <Input.TextArea rows={4} placeholder="Describe the lesson content..." />
          </Form.Item>

          <Form.Item
            name="course"
            label="Course ID"
            rules={[{ required: true, message: 'Please enter a valid Course ID' }]}
          >
            <Input placeholder="e.g. 123" type="number" />
          </Form.Item>

          <Form.Item
            name="video"
            label="Video File (optional)"
            valuePropName="file"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select Video</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingLesson ? 'Update Lesson' : 'Add Lesson'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default LessonTable;