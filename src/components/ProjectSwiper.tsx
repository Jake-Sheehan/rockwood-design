import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../styles/reactComponents/projectSwitcher.module.css';

export default function ProjectSwiper({
    projects,
}: {
    projects: {
        id: number;
        title: string;
        description: string;
        imageUrl: string;
    }[];
}) {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const onSwiper = (swiper: SwiperInstance) => {
        swiperRef.current = swiper;
        setActiveIndex(swiper.realIndex);
    };

    const onSlideChange = (swiper: SwiperInstance) => {
        setActiveIndex(swiper.realIndex);
    };

    const goToNextSlide = () => {
        swiperRef.current?.slideNext();
    };

    const goToPrevSlide = () => {
        swiperRef.current?.slidePrev();
    };

    return (
        <div>
            <Swiper
                onSwiper={onSwiper}
                onSlideChange={onSlideChange}
                slidesPerView={1}
                loop={true}
                navigation={false}
                style={{ width: '100%', height: '100%' }}
            >
                {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={styles.myControls}>
                <button onClick={goToPrevSlide}>Prev</button>
                <p>
                    {projects[activeIndex]?.description ??
                        `Slide ${activeIndex + 1}`}
                </p>
                <button onClick={goToNextSlide}>Next</button>
            </div>
        </div>
    );
}
