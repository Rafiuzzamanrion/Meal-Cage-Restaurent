import { Parallax } from 'react-parallax';

const Cover = ({ img, title }) => {
  return (

    <div className='mb-12'>
      <Parallax
        blur={{ min: -50, max: 40 }}
        bgImage={img}
        bgImageAlt="the menu"
        strength={-300}
      >
        <div className="hero h-[500px] md:h-[600px] lg:h-[700px]"
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="700"
        >
          <div className="hero-overlay bg-gradient-to-t from-dark-900 via-dark-900/40 to-dark-900/80"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-2xl bg-dark-900/60 backdrop-blur-md p-10 md:p-16 border border-white/10 rounded-2xl shadow-2xl">
              <h1 className="mb-6 text-4xl md:text-6xl font-serif font-bold tracking-widest uppercase text-light">{title}</h1>
              <p className="font-sans text-light/80 tracking-wide leading-relaxed text-sm md:text-base">
                Experience the true essence of fine dining. Our masterfully curated selections are designed to captivate your senses and leave you craving for more.
              </p>
            </div>
          </div>
        </div>
      </Parallax>

    </div>

  );
};

export default Cover;