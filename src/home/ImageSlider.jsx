// ImageSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OptimizedImage from "../common/OptimizedImage";

const ImageSlider = ({ image = [], styleForImage = {} }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
    lazyLoad: 'progressive', // Enable progressive lazy loading
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {image.map((src, index) => (
          <div key={index} className="px-1">
            <OptimizedImage
              src={src}
              alt={`Product ${index + 1}`}
              className="w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] rounded-lg"
              style={{
                objectFit: 'contain',
                ...styleForImage
              }}
              priority={index === 0} // Prioritize first image
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
