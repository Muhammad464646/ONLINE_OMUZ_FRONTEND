import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Row, Col, Tabs } from 'antd';
import CourseCard from '../components/CourseCard';
import AutoPlaySwiping from '../components/AutoPlaySwiping';
import Header from '../components/Header';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './styles.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';



const Home = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        API.get('courses/')
            .then(res => setCourses(res.data))
            .catch(err => console.log(err));
    }, []);

    const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

    return (
        <div className='bg-gray-100'>
            <Header />
            <section>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination,]}
                className="mySwiper"
            >
                <SwiperSlide><img  src="photo/ss3.png" alt="" /></SwiperSlide>
                <SwiperSlide><img  src="photo/ss2.png" alt="" /></SwiperSlide>
                <SwiperSlide><img  src="photo/ss1.png" alt="" /></SwiperSlide>
            </Swiper>
                </section>
                <section className='flex justify-between'>
                    <h1 className='text-[50px]'>Чаро Online Omuz-ро барои омӯзиш интихоб мекунанд?</h1>
                    <article>
                        <img width={2000} src="photo/ss4.png" alt="" />
                    </article>
                </section>
                <section className=' text-center'>
                    <h1 className='text-[50px]'>Афзалияти мо</h1>
                    <article>
                        <img width={2000} src="photo/ss5.png" alt="" />
                    </article>
                </section>
                <section className='w-[90%] m-auto'>
                    <h1 className='text-center text-2xl'>Хатмкунандагони мо дар ин ҷойҳо кор мекунанд</h1>
                    <AutoPlaySwiping />
                </section>
            <Tabs defaultActiveKey="1" items={items} />
            <div style={{ padding: '20px' }}>
                <h1 className='text-center text-3xl font-bold'> Курсхо</h1>
                <Row gutter={[16, 16]}>
                    {courses.map(course => (
                        <Col key={course.id} span={6}>
                            <CourseCard course={course} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Home;
