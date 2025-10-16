import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
// Base CSS (global)
// Only needed if you later enable navigation/pagination UI
// import 'swiper/css/navigation';
// import { Navigation, Pagination, A11y } from 'swiper/modules';

import styles from '../styles/reactComponents/projectSwitcher.module.css';

export default function ProjectSwiper({
    projects,
}: {
    projects: {
        id: number;
        title: string;
        description: string;
        imageUrl: string;
        url: string;
    }[];
}) {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const onSwiper = (swiper: SwiperInstance) => {
        swiperRef.current = swiper;
        setActiveIndex(swiper.realIndex ?? 0);
    };

    return (
        <section className={`${styles.mySwiperSection} hero-section`}>
            <div className={styles.mySwiperContainer}>
                <Swiper
                    // modules={[Navigation, Pagination, A11y]} // <— only if you enable those features
                    onSwiper={onSwiper}
                    onRealIndexChange={({ realIndex }) =>
                        setActiveIndex(realIndex)
                    }
                    slidesPerView={1}
                    loop={true}
                    style={{ width: '100%', height: '100%', maxHeight: '100%' }}
                    autoHeight={false}
                    navigation={false} // <— you’re using custom buttons
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div
                                className={`gradient-overlay-2 ${styles.slideImageWrapper}`}
                            >
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={styles.myControls}>
                <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    Prev
                </button>

                <div className={styles.projectInfo}>
                    <h4>{projects[activeIndex]?.title ?? 'project title'}</h4>
                    <p>
                        {projects[activeIndex]?.description ??
                            (projects.length
                                ? `Slide ${activeIndex + 1}`
                                : 'No projects')}
                    </p>

                    {projects[activeIndex]?.url ? (
                        <a
                            className={styles.viewProjectButton}
                            href={`/projects/${projects[activeIndex].url}`}
                        >
                            View Project
                        </a>
                    ) : (
                        <span />
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    Next
                </button>
            </div>
        </section>
    );
}
