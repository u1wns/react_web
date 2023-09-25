import { useState } from "react";
import "./main.css";
import { Swiper, SwiperSlide } from "swiper/react";
import swiperCore, { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
const Main = () => {
  const [swiper, setSwiper] = useState(null);
  const swiperParams = {
    navigation: false,
    onSwiper: setSwiper,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
  };
  swiperCore.use([Autoplay]);
  return (
    <div className="main-slide">
      <Swiper {...swiperParams} ref={setSwiper}>
        <SwiperSlide>
          <img src="/image/1.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/2.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/3.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/4.jpg"></img>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Main;
