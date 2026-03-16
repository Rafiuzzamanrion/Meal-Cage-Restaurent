import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaSackDollar, FaStar, FaMedal, FaFire } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { MdTableRestaurant, MdVerified } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, AreaChart, Area,
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
  padding: '10px 16px',
};

const StatCard = ({ icon: Icon, label, value, badge, sub, delay = "600", highlight }) => (
  <div
    className="bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl flex flex-col justify-center items-center p-5 group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
    data-aos="fade-up"
    data-aos-duration={delay}
  >
    {highlight && <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />}
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${highlight ? 'bg-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-primary/10'}`}>
      <Icon size={22} className="text-primary" />
    </div>
    <h3 className="text-[10px] font-sans text-light/50 tracking-widest uppercase mb-1 text-center leading-tight">{label}</h3>
    <h1 className="text-xl md:text-2xl font-sans font-bold text-light text-center relative z-10">{value}</h1>
    {sub && <p className="text-xs text-light/40 mt-1 relative z-10">{sub}</p>}
    {badge && (
      <span className={`mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold border relative z-10`}
        style={{ color: TIER_COLORS[badge] || '#d4af37', borderColor: TIER_COLORS[badge] || '#d4af37', background: `${TIER_COLORS[badge]}22` }}>
        {badge}
      </span>
    )}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-serif text-light mt-10 mb-6 border-b border-white/10 pb-3 flex items-center gap-2">{children}</h2>
);

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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

  // User Monthly Spending (Last 6 months)
  const userMonthlySpending = useMemo(() => {
    const now = new Date();
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      
      const monthPayments = payment.filter(p => {
        const pd = new Date(p.date || p.createdAt); // Support standard date fields
        return pd >= start && pd < end;
      });
      const monthTotal = monthPayments.reduce((s, p) => s + (p.price || 0), 0);
      data.push({
        month: start.toLocaleString('default', { month: 'short' }),
        spent: parseFloat(monthTotal.toFixed(2)),
      });
    }
    return data;
  }, [payment]);

  const favoriteCategory = categoryData.length > 0
    ? categoryData.reduce((prev, cur) => cur.count > prev.count ? cur : prev).category
    : null;

  // Reservation status breakdown
  const reservationStatusData = useMemo(() => {
    const map = {};
    reservations.forEach(r => { 
      const name = r.status ? r.status.charAt(0).toUpperCase() + r.status.slice(1) : 'Unknown';
      map[name] = (map[name] || 0) + 1; 
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [reservations]);

  const confirmedRes = reservations.filter(r => r.status === 'confirmed' || r.status === 'delivered').length;

  if (paymentLoading || itemsLoading || loyaltyLoading || reservationsLoading) return <Loader />;

  const hasNoData = payment.length === 0 && items.length === 0 && reservations.length === 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-20">
      <Helmet><title>MealCage | User Home</title></Helmet>

      <div className="mt-12 mb-10 text-center md:text-left" data-aos="fade-right" data-aos-duration="800">
        <h1 className="text-3xl md:text-5xl font-serif text-light tracking-wide">
          Welcome back, <span className="text-primary italic">{user?.displayName}</span>
        </h1>
      </div>

      {hasNoData ? (
        <div className="flex justify-center items-center mt-20">
          <NoData heading="No Activity Yet" text="Your recent order history will appear here once you make a purchase." />
        </div>
      ) : (
        <>
          {/* ── Spending Stats ── */}
          <SectionTitle><FaSackDollar className="text-primary" /> Your Spending</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard icon={FaSackDollar} label="Total Spent" value={`$${parseFloat(totalSpent.toFixed(2))}`} delay="600" highlight />
            <StatCard icon={PiBowlFoodFill} label="Items Ordered" value={totalQuantity} delay="650" />
            <StatCard icon={BsCurrencyDollar} label="Avg Order Value" value={`$${avgOrderValue}`} delay="700" />
            {topDish && (
              <StatCard icon={FaFire} label="Your Fav Dish" value={topDish[0]} sub={`${topDish[1]} orders`} delay="750" highlight />
            )}
          </div>

          {/* ── Loyalty & Reservations ── */}
          <SectionTitle><FaMedal className="text-primary" /> Loyalty & Bookings</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={FaMedal} label="Loyalty Points" value={loyalty?.points ?? 0} badge={loyalty?.tier ?? 'Bronze'} delay="600" highlight />
            <StatCard icon={FaStar} label="Loyalty Tier" value={loyalty?.tier ?? 'Bronze'} delay="650" />
            <StatCard icon={MdTableRestaurant} label="My Reservations" value={reservations.length} delay="700" />
            <StatCard icon={MdVerified} label="Completed" value={confirmedRes} sub="confirmed / delivered" delay="750" />
          </div>

          {favoriteCategory && (
            <div className="mb-6">
              <div className="bg-dark-800 border border-primary/20 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-[0_0_20px_rgba(212,175,55,0.1)] relative overflow-hidden" data-aos="fade-up" data-aos-duration="600">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
                <span className="text-3xl relative z-10">🍽️</span>
                <div className="relative z-10">
                  <p className="text-[10px] text-light/50 tracking-widest uppercase mb-0.5">Your Favorite Category</p>
                  <p className="text-light font-bold text-xl">{favoriteCategory}</p>
                </div>
                <span className="ml-auto text-primary text-xs border border-primary/30 rounded-full px-4 py-1.5 bg-primary/10 relative z-10 font-bold tracking-wide shadow-xl">Top Ranked</span>
              </div>
            </div>
          )}

          {/* ── User Monthly Spending Trend (Modern Area Chart) ── */}
          <SectionTitle>📈 Your Spending Trend (6 mo)</SectionTitle>
          <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl mb-10 overflow-x-auto" data-aos="fade-up" data-aos-duration="600">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={userMonthlySpending} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="userSpentGradiant" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="month" stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#aaa" tick={{ fill: '#ccc', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip contentStyle={tooltipStyle} formatter={(val) => [`$${val}`, 'Spent']} wrapperStyle={{ zIndex: 9999 }} />
                <Legend wrapperStyle={{ color: '#ccc', fontSize: 13, paddingTop: '10px' }} iconType="circle" />
                <Area type="monotone" dataKey="spent" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#userSpentGradiant)" name="Amount Spent ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* ── Order Category Charts ── */}
          {categoryData.length > 0 && (
            <>
              <SectionTitle>📊 Spending Analytics</SectionTitle>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl overflow-x-auto" data-aos="fade-up" data-aos-duration="600">
                  <h3 className="text-light/80 font-serif mb-6 text-center text-lg">Amount Spent per Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData} margin={{ top: 20, right: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="userCatGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFBB28" stopOpacity={1} />
                          <stop offset="100%" stopColor="#ff9f43" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                      <XAxis dataKey="category" stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis stroke="#555" tick={{ fill: '#ccc', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(val) => [`$${val}`, 'Spent']} wrapperStyle={{ zIndex: 9999 }} cursor={false} />
                      <Bar dataKey="total" fill="url(#userCatGradient)" radius={[6, 6, 0, 0]} barSize={45} label={{ position: "top", fill: "#FFBB28", fontSize: 11, fontWeight: "bold" }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl flex flex-col justify-center items-center relative" data-aos="fade-up" data-aos-duration="800">
                  <h3 className="text-light/80 font-serif mb-2 text-center text-lg">Orders by Category</h3>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={75} outerRadius={110} paddingAngle={2} dataKey="count" nameKey="category" label={renderLabel} labelLine={false} stroke="none">
                        {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} formatter={(val, name, props) => [val, props?.payload?.category ?? name]} wrapperStyle={{ zIndex: 9999 }} allowEscapeViewBox={{ x: true, y: true }} />
                      <Legend wrapperStyle={{ color: '#ccc', fontSize: 12, paddingTop: '15px' }} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* ── Reservation Status ── */}
          {reservationStatusData.length > 0 && (
            <>
              <SectionTitle>📋 Reservation Outline</SectionTitle>
              <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl flex flex-col justify-center items-center mb-6" data-aos="fade-up" data-aos-duration="600">
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie data={reservationStatusData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value" nameKey="name" label={renderLabel} labelLine={false} stroke="none">
                      {reservationStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} wrapperStyle={{ zIndex: 9999 }} allowEscapeViewBox={{ x: true, y: true }} />
                    <Legend wrapperStyle={{ color: '#ccc', fontSize: 13, textTransform: 'capitalize', paddingTop: '15px' }} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserHome;
