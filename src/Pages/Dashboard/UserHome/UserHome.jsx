import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaSackDollar, FaStar, FaMedal, FaFire, FaRepeat } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { MdTableRestaurant, MdVerified } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Helmet } from "react-helmet-async";
import Loader from "../../../Components/Shared/Loader";
import NoData from "../../../Components/Shared/NoData";

const COLORS = ["#d4af37", "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#ee5a24"];
const TIER_COLORS = { Bronze: '#cd7f32', Silver: '#aaa9ad', Gold: '#d4af37', Platinum: '#e5e4e2' };

const tooltipStyle = {
  backgroundColor: '#1c1c1c',
  border: '1px solid #3a3a3a',
  borderRadius: '10px',
  color: '#f5f5f5',
  fontSize: 13,
  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
  padding: '8px 14px',
};

const StatCard = ({ icon: Icon, label, value, badge, sub, delay = "600" }) => (
  <div
    className="bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl flex flex-col justify-center items-center p-5 group hover:border-primary/30 transition-all duration-300"
    data-aos="fade-up"
    data-aos-duration={delay}
  >
    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
      <Icon size={22} className="text-primary" />
    </div>
    <h3 className="text-[10px] font-sans text-light/50 tracking-widest uppercase mb-1 text-center leading-tight">{label}</h3>
    <h1 className="text-xl md:text-2xl font-sans font-bold text-light text-center">{value}</h1>
    {sub && <p className="text-xs text-light/40 mt-1">{sub}</p>}
    {badge && (
      <span className={`mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold border`}
        style={{ color: TIER_COLORS[badge] || '#d4af37', borderColor: TIER_COLORS[badge] || '#d4af37', background: `${TIER_COLORS[badge]}22` }}>
        {badge}
      </span>
    )}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-serif text-light mt-10 mb-6 border-b border-white/10 pb-3">{children}</h2>
);

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="600">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const getPath = (x, y, width, height) =>
  `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y} C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height} Z`;
const TriangleBar = ({ fill, x, y, width, height }) => (
  <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
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
    queryKey: ["loyalty-points-user", user?.email],
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

  const totalSpent = useMemo(() => payment.reduce((s, p) => s + (p.price || 0), 0), [payment]);
  const totalQuantity = useMemo(() => payment.reduce((s, p) => s + (p.foodId?.length || 0), 0), [payment]);
  const avgOrderValue = payment.length > 0 ? (totalSpent / payment.length).toFixed(2) : 0;

  // Most-ordered dish
  const dishCount = useMemo(() => {
    const acc = {};
    payment.forEach(p => (p.foodNames || []).forEach(n => { acc[n] = (acc[n] || 0) + 1; }));
    return acc;
  }, [payment]);
  const topDish = Object.entries(dishCount).sort((a, b) => b[1] - a[1])[0];

  // Category breakdown
  const categoryData = useMemo(() => {
    const cats = ['salad', 'dessert', 'soup', 'pizza', 'drinks'];
    return cats.map(cat => {
      const filtered = items.filter(i => i.category === cat);
      return {
        category: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: filtered.length,
        total: parseFloat(filtered.reduce((s, i) => s + (i.price || 0), 0).toFixed(2)),
      };
    }).filter(c => c.count > 0);
  }, [items]);

  const favoriteCategory = categoryData.length > 0
    ? categoryData.reduce((prev, cur) => cur.count > prev.count ? cur : prev).category
    : null;

  // Reservation status breakdown
  const reservationStatusData = useMemo(() => {
    const map = {};
    reservations.forEach(r => { map[r.status] = (map[r.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [reservations]);

  const confirmedRes = reservations.filter(r => r.status === 'confirmed' || r.status === 'delivered').length;

  if (paymentLoading || itemsLoading || loyaltyLoading || reservationsLoading) return <Loader />;

  const hasNoData = payment.length === 0 && items.length === 0 && reservations.length === 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-20 overflow-hidden">
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
          {/* ── Spending Stats ── */}
          <SectionTitle>💳 Your Spending</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <StatCard icon={FaSackDollar} label="Total Spent" value={`$${parseFloat(totalSpent.toFixed(2))}`} delay="600" />
            <StatCard icon={PiBowlFoodFill} label="Items Ordered" value={totalQuantity} delay="650" />
            <StatCard icon={BsCurrencyDollar} label="Avg Order Value" value={`$${avgOrderValue}`} delay="700" />
            {topDish && (
              <StatCard icon={FaFire} label="Your Fav Dish" value={topDish[0]} sub={`${topDish[1]} orders`} delay="750" />
            )}
          </div>

          {/* ── Loyalty & Reservations ── */}
          <SectionTitle>🏅 Loyalty & Reservations</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={FaMedal} label="Loyalty Points" value={loyalty?.points ?? 0} badge={loyalty?.tier ?? 'Bronze'} delay="600" />
            <StatCard icon={FaStar} label="Loyalty Tier" value={loyalty?.tier ?? 'Bronze'} delay="650" />
            <StatCard icon={MdTableRestaurant} label="My Reservations" value={reservations.length} delay="700" />
            <StatCard icon={MdVerified} label="Completed" value={confirmedRes} sub="confirmed / delivered" delay="750" />
          </div>
          {favoriteCategory && (
            <div className="mb-6">
              <div className="bg-dark-800 border border-primary/20 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl" data-aos="fade-up" data-aos-duration="600">
                <span className="text-2xl">🍽️</span>
                <div>
                  <p className="text-xs text-light/50 tracking-widest uppercase">Your Favorite Category</p>
                  <p className="text-light font-bold text-xl">{favoriteCategory}</p>
                </div>
                <span className="ml-auto text-primary text-xs border border-primary/30 rounded-full px-3 py-1 bg-primary/10">Most Ordered</span>
              </div>
            </div>
          )}

          {/* ── Order Category Charts ── */}
          {categoryData.length > 0 && (
            <>
              <SectionTitle>📊 Your Order Analytics</SectionTitle>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl overflow-x-auto" data-aos="fade-up" data-aos-duration="600">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData} margin={{ top: 30, right: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                      <XAxis dataKey="category" stroke="#d4af37" tick={{ fill: '#ccc', fontSize: 12 }} />
                      <YAxis stroke="#555" tick={{ fill: '#ccc', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(val) => [`$${val}`, 'Revenue']}
                        wrapperStyle={{ zIndex: 9999 }}
                        cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                      />
                      <Bar dataKey="total" fill="#d4af37" shape={<TriangleBar />} label={{ position: "top", fill: "#aaa", fontSize: 11 }}>
                        {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center" data-aos="fade-up" data-aos-duration="800">
                  <PieChart width={300} height={300}>
                    <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={100} dataKey="count">
                      {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(val, name, props) => [val, props?.payload?.category ?? name]}
                      wrapperStyle={{ zIndex: 9999 }}
                    />
                    <Legend wrapperStyle={{ color: '#ccc', fontSize: 12 }} />
                  </PieChart>
                </div>
              </div>
            </>
          )}

          {/* ── Reservation Status ── */}
          {reservationStatusData.length > 0 && (
            <>
              <SectionTitle>📋 Reservation Status</SectionTitle>
              <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center mb-6" data-aos="fade-up" data-aos-duration="600">
                <PieChart width={320} height={260}>
                  <Pie data={reservationStatusData} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={90} dataKey="value" nameKey="name">
                    {reservationStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} wrapperStyle={{ zIndex: 9999 }} />
                  <Legend wrapperStyle={{ color: '#ccc', fontSize: 13, textTransform: 'capitalize' }} />
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
