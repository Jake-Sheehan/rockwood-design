import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
// Base CSS (global)
// Only needed if you later enable navigation/pagination UI
// import 'swiper/css/navigation';
// import { Navigation, Pagination, A11y } from 'swiper/modules';

import styles from '../styles/reactComponents/projectSwitcher.module.css';
import type { ProjectView } from '../lib.ts';
import { urlFor } from '../lib';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

export default function ProjectSwiper({
    projects,
}: {
    projects: ProjectView[];
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
                        <SwiperSlide key={project._id}>
                            <div
                                className={`gradient-overlay-2 ${styles.slideImageWrapper}`}
                            >
                                <img
                                    src={
                                        project.hero
                                            ? urlFor(project.hero)
                                                  .width(1600)
                                                  .height(900)
                                                  .url()
                                            : '/placeholder.png'
                                    }
                                    alt={project.title}
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={styles.infoSection}>
                <h1 className={`${styles.title} text-shadow`}>
                    Rockwood Design
                </h1>
                <div className={styles.myControls}>
                    <button
                        className={styles.arrowButton}
                        type="button"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <CaretLeftIcon color="#f2f2f2" size={24} />
                    </button>

                    <div className={styles.projectInfo}>
                        <h4 className={styles.projectTitle}>
                            {projects[activeIndex]?.title ?? 'project title'}
                        </h4>
                        <p className={styles.description}>
                            {projects[activeIndex].summary}
                        </p>
                        {projects[activeIndex]?.slug ? (
                            <a
                                className={styles.viewProjectButton}
                                href={`/projects/${projects[activeIndex].slug}`}
                            >
                                <p className={styles.learnMore}>
                                    Learn More
                                    <span className={styles.rightArrow}>
                                        &rarr;
                                    </span>
                                </p>
                            </a>
                        ) : (
                            <span />
                        )}
                    </div>

                    <button
                        className={styles.arrowButton}
                        type="button"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <CaretRightIcon color="#f2f2f2" size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
