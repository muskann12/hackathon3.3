"use client";

import React from "react";
import Button from "./ui/Button";
import ProductCards from "./ProductCards";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import ReviewCard from "./ReviewCard";
import { useRouter } from "next/navigation";

import { Montserrat } from "next/font/google";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

const fontMont = Montserrat({
  weight: "800",
  subsets: ["latin"],
});

const Hero = () => {
  const router = useRouter();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const imageVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="min-h-dvh w-screen overflow-x-hidden">
      <motion.div
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
        }}
        className="w-full h-fit lg:h-[950px] bg-[#f2f0f1] relative"
      >
        <div className="container mx-auto h-full flex w-full flex-col lg:flex-row">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="pt-6 lg:pt-24 h-2/4 w-full lg:h-full lg:w-2/4 flex flex-col gap-4 px-4 lg:px-0 justify-center overflow-hidden"
          >
            <motion.h1
              variants={textVariant}
              className={`text-[64px] leading-[64px]  font-extrabold  text-black gradient-text ${fontMont.className} mainHeading`}
            >
              FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
            </motion.h1>

            <motion.p variants={textVariant} className="mainText">
              Browse through our diverse range of meticulously crafted garments,
              designed <br /> to bring out your individuality and cater to your
              sense of style.
            </motion.p>

            <motion.div variants={textVariant} whileTap={{ scale: 0.9 }}>
              <Button
                title="Shop Now"
                isBlack
                customClass="mainText"
                href="/casual"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mainText h-full flex gap-5 justify-center lg:justify-start mt-6 z-50"
            >
              {[
                { number: "200+", text: "International Brands" },
                { number: "2000+", text: "High Quality Products" },
                { number: "30,000+", text: "Happy Customers" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={textVariant}
                  whileHover={{
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  style={{ zIndex: 0.5 }}
                >
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-xl font-bold"
                  >
                    {item.number}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                  >
                    {item.text}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="show"
            style={{
              x: useTransform(springScroll, [0, 1], [0, -100]),
              rotate: useTransform(springScroll, [0, 1], [0, -10]),
              overflow: "hidden",
            }}
            className="relative md:px-4 min-h-[448px] md:min-h-[428px] animate-float"
          >
            <motion.img
              src="/images/models.jpg"
              alt=""
              className="object-cover h-full w-full mainImg relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.5,
          }}
          className="w-full h-fit lg:h-32 bg-black absolute bottom-0"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="container mx-auto h-full flex items-center flex-wrap justify-center gap-x-5 py-2 lg:justify-between px-5 lg:px-0"
          >
            {["versace", "zara", "gucci", "prada", "ck"].map((brand, index) => (
              <motion.img
                key={brand}
                src={`/images/${brand}.png`}
                alt={brand}
                className="imgs"
                variants={textVariant}
                whileHover={{
                  scale: 1.1,
                  filter: "brightness(1.2)",
                  transition: { type: "spring", stiffness: 300 },
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto min-h-screen mt-24 overflow-x-hidden">
      <h1 className="text-[48px] font-extrabold text-black text-center mt-24">
          NEW ARRIVALS
        </h1>

        <div className="mt-24">
          <div className="w-full flex justify-center flex-wrap gap-8">
            <ProductCards
              title="Vertical Stripped Shirt"
              price={212}
              imgSrc="/images/greens.png"
              rating={5.0}
              oldPrice={232}
              discount="-20%"
            />
            <ProductCards
              title="Courage Graphics T-shirt"
              price={145}
              imgSrc="/images/bw.png"
              rating={4.0}
            />
            <ProductCards
              title="Loose Fit Bermuda Shorts"
              price={80}
              imgSrc="/images/short.png"
              rating={3.0}
            />
            <ProductCards
              title="Faded Skinny Jeans"
              price={210}
              imgSrc="/images/blackp.png"
              rating={4.5}
            />
          </div>
          <div className="flex justify-center w-full mt-12">
            <Button title="View All" href="/casual" />
          </div>
        </div>
        

        <h1 className="text-[48px] font-extrabold text-black text-center mt-24">
          TOP SELLING
        </h1>

        <div className="mt-24">
          <div className="w-full flex justify-center flex-wrap gap-8">
            <ProductCards
              title="Vertical Stripped Shirt"
              price={212}
              imgSrc="/images/greens.png"
              rating={5.0}
              oldPrice={232}
              discount="-20%"
            />
            <ProductCards
              title="Courage Graphics T-shirt"
              price={145}
              imgSrc="/images/orange.png"
              rating={4.0}
            />
            <ProductCards
              title="Loose Fit Bermuda Shorts"
              price={80}
              imgSrc="/images/short.png"
              rating={3.0}
            />
            <ProductCards
              title="Faded Skinny Jeans"
              price={210}
              imgSrc="/images/blackp.png"
              rating={4.5}
            />
          </div>
          <div className="flex justify-center w-full mt-12">
            <Button title="View All" href="/casual" />
          </div>
        </div>

        {/* browse by category */}

        <div className="mt-12">
          <div className="h-fit lg:h-[866px] w-full rounded-[60px] bg-[#f2f0f1] pb-6 lg:pb-0 overflow-hidden">
            <h1 className="mt-12 font-extrabold text-4xl uppercase text-center">
              browse by dress style
            </h1>

            <div className="mt-12 w-full h-full flex flex-col gap-2 px-24">
              <div className="w-full h-[289px] flex flex-col lg:flex-row gap-4">
                <div
                  className="lg:w-1/4 h-full rounded-[30px] p-5 bg-[url(/images/tatoo.png)] bg-no-repeat bg-center bg-cover cursor-pointer"
                  onClick={() => router.push("/casual")}
                >
                  <h1 className="text-3xl font-bold">Casual</h1>
                </div>
                <div className="lg:w-3/4 h-full rounded-[30px] p-5 bg-[url(/images/coat.png)] bg-no-repeat bg-center bg-cover">
                  <h1 className="text-3xl font-bold">Formal</h1>
                </div>
              </div>
              <div className="w-full h-[289px] flex flex-col lg:flex-row gap-4">
                <div className="lg:w-3/4 h-full rounded-[30px] p-5 bg-[url(/images/girl.png)] bg-no-repeat bg-center bg-cover">
                  <h1 className="text-3xl font-bold">Party</h1>
                </div>
                <div className="lg:w-1/4 h-full rounded-[30px] p-5 bg-[url(/images/gym.png)] bg-no-repeat bg-center bg-cover">
                  <h1 className="text-3xl font-bold">Formal</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="container mx-auto flex items-center justify-between px-6 lg:px-0">
            <h1 className="text-xl md:text-3xl font-extrabold text-black text-center">
              OUR HAPPY CUSTOMERS
            </h1>
            <div className="flex items-center gap-1">
              <div className=" rounded-full bg-[#f2f0f1] flex items-center justify-center">
                <BiLeftArrow className="text-2xl cursor-pointer" />
              </div>
              <div className=" rounded-full bg-[#f2f0f1] flex items-center justify-center">
                <BiRightArrow className="text-2xl cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 w-full">
          <div className="flex gap-2 lg:-translate-x-48">
            <ReviewCard
              isBlurred
              customClass="!min-w-[400px]"
              name="Sarah M."
              paragraph="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            />
            <ReviewCard
              customClass="!min-w-[400px]"
              name="Sarah M."
              paragraph="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            />
            <ReviewCard
              customClass="!min-w-[400px]"
              name="Alex K."
              paragraph="Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
            />
            <ReviewCard
              customClass="!min-w-[400px]"
              name="James L."
              paragraph="As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
            />
            <ReviewCard
              customClass="!min-w-[400px]"
              isBlurred
              name="Sarah M."
              paragraph="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            />
            <ReviewCard
              customClass="!min-w-[400px]"
              name="Sarah M."
              paragraph="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            />
            <ReviewCard
              customClass="!min-w-[400px]"
              name="Sarah M."
              paragraph="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            />
            <ReviewCard
              customClass="!min-w-[400px]"
              name="Sarah M."
              paragraph="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
