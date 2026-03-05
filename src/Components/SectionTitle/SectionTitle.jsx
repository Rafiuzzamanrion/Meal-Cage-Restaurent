

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className="md:w-6/12 mx-auto text-center my-16">
            <p className="text-primary font-serif italic text-lg md:text-xl font-medium tracking-wide"> --- {subHeading} --- </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-light uppercase border-y border-white/20 py-6 mt-6 tracking-widest">{heading}</h3>
        </div>
    );
};

export default SectionTitle;