const HistoryCard = ({ paymentData }) => {
  const { date, transactionId, quantity, price } = paymentData;
  return (
    <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="600">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-xl hover:border-white/10 transition-colors gap-4">
        <div className="flex-1">
          <p className="text-light/80 font-sans tracking-wide">
            <span className="font-bold text-light uppercase text-sm mr-2">Date:</span>
            {date.length < 25 ? date : date.slice(0, 25)}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-light/80 font-sans tracking-wide">
            <span className="font-bold text-light uppercase text-sm mr-2">T. ID:</span>
            <span className="text-primary font-mono">{transactionId}</span>
          </p>
        </div>
        <div className="flex-1 text-left md:text-center">
          <p className="text-light/80 font-sans tracking-wide">
            <span className="font-bold text-light uppercase text-sm mr-2">Qty:</span>
            {quantity}
          </p>
        </div>
        <div className="flex-1 text-left md:text-right">
          <p className="text-light/80 font-sans tracking-wide text-xl">
            <span className="font-bold text-light uppercase text-sm mr-2">Price:</span>
            <span className="text-primary font-bold">${price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
