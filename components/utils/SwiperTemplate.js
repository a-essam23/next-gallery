import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { v4 } from "uuid";

export default function SwiperTemplate({
    items,
    autoplay = false,
    showIndex = false,
    delay = 5,
    className,
    pagination,
}) {
    // const { isAr } = useLang();
    return (
        <Swiper
            dir="ltr"
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow "
            loop={true}
            pagination={pagination}
            autoplay={
                autoplay
                    ? {
                          delay: delay * 1000,
                          disableOnInteraction: false,
                      }
                    : false
            }
            spaceBetween={5}
            slidesPerView={1}
            className={`${className}`}
        >
            {items.map((item, i) => {
                return (
                    <SwiperSlide className="w-full h-full" key={v4()}>
                        {item}
                        {showIndex && (
                            <span className="absolute top-0 left-0 opacity-75 p-2 text-xl bg-black text-white">
                                {item?.name || i + 1}
                            </span>
                        )}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
