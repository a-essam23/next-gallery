import {
    About,
    Contact,
    FourBoxs,
    Layout,
    ModelSwiper,
    SwiperTemplate,
} from "../components";
import { useLang } from "../hooks";

export default function Home() {
    const { langData } = useLang();
    return (
        <Layout>
            <section className="w-full h-full gap-4 sm:flex sm:h-96 md:h-120 xl:h-144 2xl:h-216">
                <SwiperTemplate
                    autoplay
                    delay={10}
                    items={Array(4)
                        .fill()
                        .map((i) => {
                            return (
                                <img
                                    src="/imgs/placeholder.jpg"
                                    className="h-full w-full object-cover"
                                />
                            );
                        })}
                    className="sm:basis-3/5 h-96 sm:h-full w-full shadow-cd center "
                />
                <FourBoxs className="my-12 h-120 sm:h-full sm:my-0 sm:basis-2/5 " />
            </section>
            <section className="text-3xl 2xl:text-4xl text-center ">
                {langData.latest.toUpperCase()}
            </section>
            <section>
                <ModelSwiper size={16} showCode />
            </section>
            <section id="about">
                <About card={{}} />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </Layout>
    );
}
