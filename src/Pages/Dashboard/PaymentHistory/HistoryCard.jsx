import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { HiDownload, HiCalendar, HiIdentification, HiHashtag, HiCurrencyDollar } from "react-icons/hi";

const HistoryCard = ({ paymentData }) => {
  const { date, transactionId, quantity, price, itemName } = paymentData;

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    
    // Add professional branding
    doc.setFillColor(20, 20, 20); // Dark background for header
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(212, 175, 55); // Gold color
    doc.setFontSize(24);
    doc.text("MEALCAGE", 14, 25);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("OFFICIAL INVOICE", 160, 25);
    
    // Reset text color for body
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text("Transaction Details", 14, 55);
    
    // Table content
    const tableData = [
      ["Transaction ID", transactionId],
      ["Date", date],
      ["Total Items", quantity.toString()],
      ["Items Ordered", itemName || "Assorted Items"],
      ["Total Paid", `$${price}`]
    ];
    
    doc.autoTable({
      startY: 65,
      head: [['Description', 'Details']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [212, 175, 55], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });
    
    doc.setFontSize(10);
    doc.text("Thank you for dining with MealCage!", 14, doc.autoTable.previous.finalY + 20);
    
    doc.save(`Invoice_${transactionId.substring(0, 8)}.pdf`);
  };

  return (
    <div data-aos="fade-up" data-aos-duration="600" className="group">
      <div className="relative bg-dark-800/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl hover:border-primary/30 transition-all duration-500 overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-primary/10" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
          
          {/* Order Identity info */}
          <div className="flex items-center gap-6 flex-1">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0 shadow-lg shadow-primary/5">
              <HiIdentification size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-light/40 text-[10px] uppercase tracking-[0.2em] font-sans">Transaction ID</p>
              <p className="text-primary font-mono text-sm tracking-tighter break-all">{transactionId}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-light/70 text-xs font-sans">
                  <HiCalendar className="text-primary" /> {date.split('T')[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-[1.5] w-full lg:w-auto">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-light/40 text-[10px] uppercase tracking-[0.1em] font-sans">Quantity</p>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <HiHashtag size={14} className="text-primary/60" />
                <span className="text-light font-bold text-xl">{quantity} Items</span>
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <p className="text-light/40 text-[10px] uppercase tracking-[0.1em] font-sans">Total Amount</p>
              <div className="flex items-center justify-center sm:justify-start gap-1">
                <span className="text-primary text-lg font-bold">$</span>
                <span className="text-light font-black text-2xl tracking-tight">{price}</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center justify-center lg:justify-end">
              <button 
                onClick={handleDownloadInvoice}
                className="group/btn flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-dark-900 border border-primary/20 hover:border-primary px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/5"
              >
                <HiDownload size={18} className="transition-transform group-hover/btn:-translate-y-1" />
                Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
