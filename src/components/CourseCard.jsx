import React from 'react';
import { Card } from 'antd';

const CourseCard = ({ course }) => {
    return (
        <Card
            hoverable
            cover={course.image && <img alt={course.title} src={course.image} />}
        >
            <Card.Meta title={course.title} description={course.description} />
        </Card>
    );
}

export default CourseCard;
