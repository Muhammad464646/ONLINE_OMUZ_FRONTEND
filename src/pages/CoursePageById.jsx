import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Row, Col, Tabs } from 'antd';
import CourseCard from '../components/CourseCard';
import './stl.css';
import API from '../services/api';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse } from 'antd';
function CoursePageById() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { Panel } = Collapse;
  const teacherRef = useRef(null);
  const obunaRef = useRef(null);
  const TavsifRef = useRef(null);
  const scrollToTeacher = () => {
    teacherRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const scrollToObuna = () => {
    obunaRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const scrollToTavsif = () => {
    TavsifRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const res = await axios.get(`http://127.0.0.1:8000/api/courses/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        setError('Ошибка при загрузке курса');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='bg-gray-100 '>
      asd
      <section className='bg-gray-200 flex items-center justify-between w-[90%] m-auto p-15 rounded-2xl mt-20'>
        <article >
          <h1 className='text-5xl font-bold'>{course.title}</h1>
          <p className='text-[20px] font-sans'>{course.short_description}</p>
          <button className='p-[10px] bg-blue-500 text-white text-2xl rounded-2xl w-[250px] mt-[100px]'>Харид</button>
        </article>
        {course.image && <img className='mix-blend-multiply' src={course.image} alt={course.title} style={{ width: '400px' }} />}
      </section>
      <section className='flex justify-between w-[80%] m-auto text-2xl mt-[100px] text-blue-400 font-extrabold '>
        <h1 onClick={scrollToTavsif}>Тавсиф</h1>
        <h1>Барнома</h1>
        <button onClick={scrollToTeacher}>Омузгорон</button>
        <h1 onClick={scrollToObuna}>Обуна</h1>
      </section><br />
      <hr className='w-[90%] m-auto' />
      <section ref={TavsifRef} className='w-[90%] m-auto mb-[100px] mt-[100px]'>
        <h1 className='text-4xl font-bold'>{course.title}</h1><br />
        <p className='font-sans text-[20px]'>{course.description}</p>
      </section>
      <section className='w-[90%] m-auto' >
        <h1 className='text-4xl font-bold'>Омӯзиш чӣ гуна сурат мегирад</h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide> <article className=' w-[90%] p-[10px] bg-gray-200 mt-[50px] rounded-2xl'>
            <h1 className='border p-[10px] w-[15%] text-center text-2xl font-extrabold rounded-full text-blue-500 bg-black'>1</h1><br />
            <h1 className='text-2xl font-sans'>Мавзухо навро омузед ва супоришихои амалиро курсро ичро кунед</h1>
          </article>
          </SwiperSlide>
          <SwiperSlide> <article className=' w-[90%] p-[10px] bg-gray-200 mt-[50px] rounded-2xl'>
            <h1 className='border p-[10px] w-[15%] text-center text-2xl font-extrabold rounded-full text-blue-500 bg-black'>2</h1><br />
            <h1 className='text-2xl font-sans'>Мавзухо навро омузед ва супоришихои амалиро курсро ичро кунед</h1>
          </article>
          </SwiperSlide>
          <SwiperSlide> <article className=' w-[90%] p-[10px] bg-gray-200 mt-[50px] rounded-2xl'>
            <h1 className='border p-[10px] w-[15%] text-center text-2xl font-extrabold rounded-full text-blue-500 bg-black'>3</h1><br />
            <h1 className='text-2xl font-sans'>Мавзухо навро омузед ва супоришихои амалиро курсро ичро кунед</h1>
          </article>
          </SwiperSlide>
          <SwiperSlide> <article className=' w-[90%] p-[10px] bg-gray-200 mt-[50px] rounded-2xl'>
            <h1 className='border p-[10px] w-[15%] text-center text-2xl font-extrabold rounded-full text-blue-500 bg-black'>4</h1><br />
            <h1 className='text-2xl font-sans'>Мавзухо навро омузед ва супоришихои амалиро курсро ичро кунед</h1>
          </article>
          </SwiperSlide>
          <SwiperSlide> <article className=' w-[90%] p-[10px] bg-gray-200 mt-[50px] rounded-2xl'>
            <h1 className='border p-[10px] w-[15%] text-center text-2xl font-extrabold rounded-full text-blue-500 bg-black'>5</h1><br />
            <h1 className='text-2xl font-sans'>Мавзухо навро омузед ва супоришихои амалиро курсро ичро кунед</h1>
          </article>
          </SwiperSlide>
          <SwiperSlide> <article className=' w-[90%] p-[10px] bg-gray-200 mt-[50px] rounded-2xl'>
            <h1 className='border p-[10px] w-[15%] text-center text-2xl font-extrabold rounded-full text-blue-500 bg-black'>6</h1><br />
            <h1 className='text-2xl font-sans'>Мавзухо навро омузед ва супоришихои амалиро курсро ичро кунед</h1>
          </article>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className='w-[90%] m-auto mt-30'>
        <h1 className='text-3xl text-center font-bold mb-10'>Барномаи курс</h1>

        {course.lessons.map((el, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {el.title}?
            </AccordionSummary>
            <AccordionDetails>
              {el.content}
            </AccordionDetails>
          </Accordion>
        ))}
      </section>
      <section className='w-[90%] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-[50px] mt-[100px]'>Омӯзгорони курс</h1>
        <section ref={teacherRef} className='flex flex-wrap justify-between '>
          {course.teacher && (
            <div className='mb-[100px] w-[48%] bg-white p-[10px] rounded-2xl flex  gap-[10px]'>
              <article>
                <img width={200} src={`${course.teacher.profile_picture}`} alt="" />
                <h1 className='font-bold '>{course.teacher.username}</h1>
              </article>
              <article>
              <p className='font-bold'>{course.teacher.bio}</p>
              <article className='flex'>
              {course.teacher.skills.map((el)=>(
                <div className='flex w-15'>
                <img  className='ml-80' src={`${el.icon}`} alt="" />
              </div>
              ))}
              </article>
              </article>
            </div>
          )}
        </section>
      </section>
      <section className='flex  w-[90%] m-auto p-15 bg-gray-200 rounded-2xl'>
        <article>
          <h1 className='text-5xl text-blue-400 font-black'>Сертификат Softclub</h1><br />
          <p className='text-[20px]'>Тасдиқ мекунад, ки шумо курсро хатм кардаед ва ба шумо дар ёфтани кор кӯмак мекунад</p>
          <Link to={'https://online.omuz.tj/static/media/Certificete.744529ae130c66c8c1b2.pdf'}>
            <button className='border mt-[100px] p-5 rounded-2xl border-blue-500 text-blue-400 text-2xl font-bold'>Намунаи Сертификат</button>
          </Link>
        </article>
        <img src="/photo/ss6.png" alt="" />
      </section>
      <section className='w-[90%] m-auto pb-20'>
        <h1 className='text-3xl text-center mt-[100px] font-semibold'>Нақшаи комилро барои омӯзиши худ интихоб кунед</h1>
        <article className=' w-[35%] text-center bg-white p-10 mt-[100px]  rounded-2xl font-sans'>
          <h1 className='text-2xl'>{course.title}</h1><br />
          <h1 className='text-4xl text-blue-500 font-extrabold'>{course.price}с</h1><br />
          <h1 className='text-2xl'>/1мох</h1><br />
          <hr /><br />
          <button className='text-2xl border border-blue-500 w-full p-5 rounded-2xl text-blue-500'>Харид</button><br /><br />
          <h1 ref={obunaRef} className='text-2xl'>Давомноки:мох 2✅</h1>
        </article>
      </section>
    </div>
  );
}

export default CoursePageById;
