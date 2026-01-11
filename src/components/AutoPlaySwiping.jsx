import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AutoPlaySwiping() {
  const settings = {
    infinite: true,
    arrows:false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1,
    cssEase: "linear"
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      <article>
        <img src="photo/ss.png" alt="" />
      </article>
      <article>
        <img src="photo/ss.png" alt="" />
      </article>
      <article>
        <img src="photo/ss.png" alt="" />
      </article>
      <article>
        <img src="photo/ss.png" alt="" />
      </article>
      </Slider>
    </div>
  );
}

export default AutoPlaySwiping;
