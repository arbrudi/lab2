import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/slider.css'
const HomePage = () => {
 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div> 
      <Slider {...settings}>
        <div className='image'>
          <img src="https://cdn.optipic.io/site-104380/images/library/elibrary_.jpg" />
        </div>
        <div className='image'>
          <img src="image2.jpg" alt="image2" />
        </div>
        <div className='image'>
          <img src="image3.jpg" alt="image3" />
        </div>
      </Slider>
    </div>
  );
}

export default HomePage;