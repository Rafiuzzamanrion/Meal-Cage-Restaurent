import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaSackDollar, FaStar, FaMedal } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { MdTableRestaurant, MdOutlineAvTimer } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Helmet } from "react-helmet-async";
import Loader from "../../../Components/Shared/Loader";
import NoData from "../../../Components/Shared/NoData";

const COLORS = ["#d4af37", "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#ee5a24"];

const StatCard = ({ icon: Icon, label, value, delay = "600", badge }) => (
  <div
    className="bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl flex flex-col justify-center items-center p-6 group hover:border-primary/30 transition-all duration-300"
    data-aos="fade-up"
    data-aos-duration={delay}
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
      <Icon size={24} className="text-primary" />
    </div>
    <h3 className="text-xs font-sans text-light/50 tracking-widest uppercase mb-1 text-center">{label}</h3>
    <h1 className="text-2xl md:text-3xl font-sans font-bold text-light text-center">{value}</h1>
    {badge && (
      <span className="mt-2 px-3 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30">
        {badge}
      </span>
    )}
  </div>
);

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = UseAxiosSecure();

  const { data: payment = [], isLoading: paymentLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory?email=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["chart-data-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/chart-data-user?email=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { data: loyalty = null, isLoading: loyaltyLoading } = useQuery({
    queryKey: ["loyalty-points", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/loyalty/my-points`);
        return res.data;
      } catch {
        return null;
      }
    },
  });

  const { data: reservations = [], isLoading: reservationsLoading } = useQuery({
    queryKey: ["reservationHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reservationHistory?email=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (paymentLoading || itemsLoading || loyaltyLoading || reservationsLoading) {
    return <Loader />;
  }

  // Payment stats
  const totalSpent = payment.reduce((sum, item) => item.price + sum, 0);
  const totalQuantity = payment.reduce((sum, item) => sum + (item.foodId?.length || 0), 0);
  const avgOrderValue = payment.length > 0 ? (totalSpent / payment.length).toFixed(2) : 0;

  // Category breakdown from ordered items
  const categories = ["salad", "dessert", "soup", "pizza", "drinks"];
  const categoryData = categories.map(cat => {
    const filtered = items.filter(i => i.category === cat);
    return {
      category: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: filtered.length,
      total: parseFloat(filtered.reduce((s, i) => s + (i.price || 0), 0).toFixed(2)),
    };
  }).filter(c => c.count > 0);

  // Favorite category
  const favoriteCategory = categoryData.length > 0
    ? categoryData.reduce((prev, cur) => (cur.count > prev.count ? cur : prev)).category
    : null;

  // Reservation status breakdown
  const resStatusMap = reservations.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});
  const reservationStatusData = Object.entries(resStatusMap).map(([name, value]) => ({ name, value }));

  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getPath = (x, y, width, height) =>
    `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y} C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height} Z`;

  const TriangleBar = ({ fill, x, y, width, height }) => (
    <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
  );

  const hasNoData = payment.length === 0 && items.length === 0 && reservations.length === 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-16 overflow-hidden">
      <Helmet><title>MealCage | User Home</title></Helmet>

      <div className="mt-12 mb-10 text-center md:text-left" data-aos="fade-right" data-aos-duration="800">
        <h1 className="text-3xl md:text-5xl font-serif text-light tracking-wide">
          Welcome back, <span className="text-primary italic">{user.displayName}</span>
        </h1>
      </div>

      {hasNoData ? (
        <div className="flex justify-center items-center mt-20">
          <NoData heading="No Activity Yet" text="Your recent order history will appear here once you make a purchase." />
        </div>
      ) : (
        <>
          {/* ── Primary Stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
            <StatCard icon={FaSackDollar} label="Total Spent" value={`$${parseFloat(totalSpent.toFixed(2))}`} delay="600" />
            <StatCard icon={PiBowlFoodFill} label="Items Ordered" value={totalQuantity} delay="650" />
            <StatCard icon={BsCurrencyDollar} label="Avg Order Value" value={`$${avgOrderValue}`} delay="700" />
          </div>

          {/* ── Secondary Stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard icon={MdTableRestaurant} label="My Reservations" value={reservations.length} delay="600" />
            <StatCard icon={FaMedal} label="Loyalty Points" value={loyalty?.points ?? 0} badge={loyalty?.tier} delay="650" />
            <StatCard icon={FaStar} label="Loyalty Tier" value={loyalty?.tier ?? "Bronze"} delay="700" />
            {favoriteCategory && (
              <StatCard icon={MdOutlineAvTimer} label="Fav Category" value={favoriteCategory} delay="750" />
            )}
          </div>

          {/* ── Order Category Analytics ── */}
          {categoryData.length > 0 && (
            <>
              <h2 className="text-2xl font-serif text-light mt-4 mb-8 border-b border-white/10 pb-4">Your Order Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl overflow-x-auto flex justify-center items-center" data-aos="fade-up" data-aos-duration="600">
                  <BarChart width={400} height={300} data={categoryData} margin={{ top: 30, right: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="category" stroke="#d4af37" />
                    <YAxis stroke="#f5f5f5" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#f5f5f5' }}
                      formatter={(val) => [`$${val}`, 'Revenue']}
                    />
                    <Bar dataKey="total" fill="#d4af37" shape={<TriangleBar />} label={{ position: "top", fill: "#f5f5f5", fontSize: 11 }}>
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>

                <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center" data-aos="fade-up" data-aos-duration="800">
                  <PieChart width={300} height={300}>
                    <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={100} fill="#8884d8" dataKey="count">
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#f5f5f5' }}
                      formatter={(val, name, props) => [val, props.payload.category]}
                    />
                  </PieChart>
                </div>
              </div>
            </>
          )}

          {/* ── Reservation Status ── */}
          {reservationStatusData.length > 0 && (
            <>
              <h2 className="text-2xl font-serif text-light mb-8 border-b border-white/10 pb-4">Reservation Status</h2>
              <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center mb-8" data-aos="fade-up" data-aos-duration="600">
                <PieChart width={320} height={260}>
                  <Pie data={reservationStatusData} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={90} dataKey="value">
                    {reservationStatusData.map((_, index) => (
                      <Cell key={`res-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#f5f5f5' }} />
                  <Legend wrapperStyle={{ color: '#f5f5f5', fontSize: 13, textTransform: 'capitalize' }} />
                </PieChart>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserHome;
