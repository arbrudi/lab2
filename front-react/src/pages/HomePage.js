import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/slider.css';

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
      <section className='e-library-section'>
        <h2>Welcome to our E-Library!</h2>
        <p>Explore our vast digital collection of books, comics, and resources.</p>
      </section>

      <Slider {...settings}>
        <div className='image'>
          <img src="https://images.pexels.com/photos/2898170/pexels-photo-2898170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="image1" />
        </div>
        <div className='image'>
          <img src="https://images.pexels.com/photos/2923463/pexels-photo-2923463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="image2" />
        </div>
        <div className='image'>
          <img src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="image3" />
        </div>
      </Slider>

      <section className='categories-section'>
        <h2>Explore Categories</h2>
        <div className='category'>
          <h3>Books</h3>
          <p>Discover a wide range of books covering various genres and topics.</p>
        </div>
        <div className='category'>
          <h3>Comics</h3>
          <p>Immerse yourself in captivating stories and vibrant illustrations.</p>
        </div>
        <div className='category'>
          <h3>Events</h3>
          <p>Stay updated with upcoming events, author talks, and book launches.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;