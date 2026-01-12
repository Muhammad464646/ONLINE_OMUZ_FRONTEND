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
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    useEffect(() => {
        API.get('courses/')
            .then(res => {setCourses(res.data),
            setFilteredCourses(res.data)}
        )
            .catch(err => console.log(err));
    }, []);

    const handleTabChange = (key) => {
        setActiveTab(key);

        if (key === 'all') {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(
                course => course.category === key
            );
            setFilteredCourses(filtered);
        }
    };

    const items = [
        { key: 'all', label: 'Ҳама курсҳо' },
        { key: 'Frontend', label: 'Frontend' },
        { key: 'Backend', label: 'Backend' },
    ];
    return (
        <div className='bg-gray-100'>
            <section className='pt-30 w-[90%] m-auto'>

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
                    <SwiperSlide><img src="photo/ss3.png" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="photo/ss2.png" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="photo/ss1.png" alt="" /></SwiperSlide>
                </Swiper>
            </section>
            <section className='flex justify-between mt-20 w-[90%] m-auto'>
                <h1 className='text-[40px] font-bold'>Чаро Online Omuz-ро барои омӯзиш интихоб мекунанд?</h1>
                <article>
                    <img width={2000} src="photo/ss4.png" alt="" />
                </article>
            </section>
            <section className=' text-center mt-20 mb-30'>
                <h1 className='text-[40px] font-bold'>Афзалияти мо</h1>
                <article>
                    <img width={2000} src="photo/ss5.png" alt="" />
                </article>
            </section>
            <section className='w-[90%] m-auto'>
                <h1 className='text-center mb-10 text-4xl font-bold'>Хатмкунандагони мо дар ин ҷойҳо кор мекунанд</h1>
                <AutoPlaySwiping />
            </section>
            <div style={{ padding: '20px' }}>
                <h1 className='text-center text-3xl font-bold'> Курсхо</h1><br />
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    items={items}
                    centered
                    className="custom-tabs"
                />
                <br /><br />
                <Row gutter={[16, 16]}>
                    {filteredCourses.map(course => (
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
