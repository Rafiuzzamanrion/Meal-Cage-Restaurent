import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaSackDollar, FaUser, FaCartShopping, FaStar, FaRepeat, FaFire } from 'react-icons/fa6';
import { HiTemplate } from "react-icons/hi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdTableRestaurant, MdPendingActions, MdVerified, MdTrendingUp } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, AreaChart, Area, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line
} from 'recharts';
import { Helmet } from "react-helmet-async";
import Loader from "../../../Components/Shared/Loader";

const COLORS = ['#d4af37', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#ee5a24'];
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

const StatCard = ({ icon: Icon, label, value, sub, delay = '600', highlight }) => (
  <div
    className="bg-dark-800 border border-white/5 shadow-xl shadow-black/40 rounded-2xl flex flex-col justify-center items-center p-5 group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
    data-aos="fade-up"
    data-aos-duration={delay}
  >
    {highlight && <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />}
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${highlight ? 'bg-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-primary/10'}`}>
      <Icon size={22} className="text-primary" />
    </div>
    <h3 className="text-[10px] font-sans text-light/50 tracking-widest uppercase mb-1 text-center leading-tight">{label}</h3>
    <h1 className="text-2xl font-sans font-bold text-light text-center relative z-10">{value}</h1>
    {sub && <p className="text-xs text-light/40 mt-1 relative z-10">{sub}</p>}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-serif text-light mt-10 mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
    {children}
  </h2>
);

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = UseAxiosSecure();

  const { data: states = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-states"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-states");
      return res.data;
    },
  });

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["chart-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chart-data");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (statsLoading || itemsLoading) return <Loader />;

  // Category breakdown
  const categories = ['salad', 'dessert', 'soup', 'pizza', 'drinks'];
  const categoryData = categories.map(cat => {
    const filtered = items.filter(i => i.category === cat);
    return {
      category: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: filtered.length,
      total: parseFloat(filtered.reduce((s, i) => s + (i.price || 0), 0).toFixed(2)),
    };
  });

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

  const loyaltyData = (states.loyaltyTierDistribution || []).filter(d => d.count > 0);
  const topDishesData = (states.topDishes || []).slice(0, 5).reverse();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-20">
      <Helmet><title>MealCage | Admin Home</title></Helmet>

      <div className="mt-12 mb-10 text-center md:text-left" data-aos="fade-right" data-aos-duration="800">
        <h1 className="text-3xl md:text-5xl font-serif text-light tracking-wide">
          Administrator, <span className="text-primary italic">{user?.displayName}</span>
        </h1>
      </div>

      {/* ── Financial KPIs ── */}
      <SectionTitle><FaSackDollar className="text-primary" /> Financial Overview</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FaSackDollar} label="Total Revenue" value={`$${states.revenue ?? 0}`} delay="600" highlight />
        <StatCard icon={BsCurrencyDollar} label="Avg Order Value" value={`$${states.avgOrderValue ?? 0}`} delay="650" />
        <StatCard icon={HiTemplate} label="Total Orders" value={states.orders ?? 0} delay="700" />
        <StatCard icon={MdTrendingUp} label="Repeat Customers" value={states.repeatCustomers ?? 0} sub="ordered 2+ times" delay="750" />
      </div>

      {/* ── Operations KPIs ── */}
      <SectionTitle><FaUser className="text-primary" /> Operations</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={FaUser} label="Total Customers" value={states.users ?? 0} delay="600" />
        <StatCard icon={GiForkKnifeSpoon} label="Menu Items" value={states.menuItems ?? 0} delay="650" />
        <StatCard icon={FaCartShopping} label="Active Carts" value={states.cartItems ?? 0} delay="700" />
        <StatCard icon={FaStar} label="Avg Rating" value={`${states.avgRating ?? 0} ★`} sub={`${states.reviews ?? 0} reviews`} delay="750" />
        {states.mostPopularDish && (
          <StatCard icon={FaFire} label="Top Dish" value={states.mostPopularDish.name} sub={`${states.mostPopularDish.orders} orders`} delay="800" highlight />
        )}
      </div>

      {/* ── Reservations KPIs ── */}
      <SectionTitle><MdTableRestaurant className="text-primary" /> Reservations</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={MdTableRestaurant} label="Total Bookings" value={states.reservations ?? 0} delay="600" />
        <StatCard icon={MdPendingActions} label="Pending" value={states.pendingReservations ?? 0} delay="650" />
        <StatCard icon={MdVerified} label="Confirmed" value={states.confirmedReservations ?? 0} delay="700" />
        <StatCard icon={FaRepeat} label="Confirm Rate" value={`${states.reservationConfirmRate ?? 0}%`} delay="750" highlight />
      </div>

      {/* ── Monthly Revenue Trend (Modern Area Chart) ── */}
      <SectionTitle>📈 Monthly Growth (6 mo)</SectionTitle>
      <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl mb-10 overflow-x-auto" data-aos="fade-up" data-aos-duration="700">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={states.monthlyRevenue || []} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C49F" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis dataKey="month" stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
            <Tooltip contentStyle={tooltipStyle} wrapperStyle={{ zIndex: 9999 }} />
            <Legend wrapperStyle={{ color: '#ccc', fontSize: 13, paddingTop: '10px' }} iconType="circle" />
            <Area type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="Revenue ($)" />
            <Area type="monotone" dataKey="orders" stroke="#00C49F" strokeWidth={3} fillOpacity={1} fill="url(#colorOrd)" name="Total Orders" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Advanced Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* Top 5 Dishes */}
        {topDishesData.length > 0 && (
          <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl" data-aos="fade-up" data-aos-duration="600">
            <h3 className="text-light/80 font-serif mb-6 text-center text-lg">🔥 Top 5 Popular Dishes</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topDishesData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#f9d423" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#ccc" tick={{ fill: '#ccc', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={tooltipStyle} wrapperStyle={{ zIndex: 9999 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="orders" fill="url(#barGradient)" radius={[0, 6, 6, 0]} barSize={20} label={{ position: 'right', fill: '#d4af37', fontSize: 12, fontWeight: 'bold' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Orders by Time of Day */}
        <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl" data-aos="fade-up" data-aos-duration="700">
          <h3 className="text-light/80 font-serif mb-6 text-center text-lg">🕒 Orders by Time of Day</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={states.salesByTimeOfDay || []} margin={{ top: 20, right: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity={1} />
                  <stop offset="100%" stopColor="#FF8042" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
              <XAxis dataKey="time" stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} formatter={(val) => [val, 'Orders']} wrapperStyle={{ zIndex: 9999 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" fill="url(#timeGradient)" radius={[6, 6, 0, 0]} barSize={40} label={{ position: 'top', fill: '#d4af37', fontSize: 12, fontWeight: 'bold' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Day of Week */}
        <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl" data-aos="fade-up" data-aos-duration="750">
          <h3 className="text-light/80 font-serif mb-6 text-center text-lg">📅 Orders by Day of Week</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={states.salesByDayOfWeek || []} margin={{ top: 20, right: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="dayGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity={1} />
                  <stop offset="100%" stopColor="#FF8042" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
              <XAxis dataKey="day" stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} formatter={(val) => [val, 'Orders']} wrapperStyle={{ zIndex: 9999 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" fill="url(#dayGradient)" radius={[6, 6, 0, 0]} barSize={35} label={{ position: 'top', fill: '#d4af37', fontSize: 12, fontWeight: 'bold' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ── Category Insights Row ── */}
      <h2 className="text-xl font-serif text-light mt-10 mb-6 border-b border-white/10 pb-3 flex items-center gap-2">🍽️ Product Insights</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl overflow-x-auto" data-aos="fade-up" data-aos-duration="600">
          <h3 className="text-light/80 font-serif mb-6 text-center text-lg">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} margin={{ top: 20, right: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="catGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8042" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ee5a24" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
              <XAxis dataKey="category" stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="#555" tick={{ fill: '#ccc', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip contentStyle={tooltipStyle} formatter={(val) => [`$${val}`, 'Revenue']} wrapperStyle={{ zIndex: 9999 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="total" fill="url(#catGradient)" radius={[6, 6, 0, 0]} barSize={45} label={{ position: 'top', fill: '#FF8042', fontSize: 11, fontWeight: 'bold' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl relative" data-aos="fade-up" data-aos-duration="800">
          <h3 className="text-light/80 font-serif mb-2 text-center text-lg">Orders by Category</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={75} outerRadius={110} paddingAngle={2} dataKey="count" nameKey="category" label={renderLabel} labelLine={false} stroke="none">
                {categoryData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(val, name, props) => [val, props?.payload?.category ?? name]} wrapperStyle={{ zIndex: 9999 }} allowEscapeViewBox={{ x: true, y: true }} />
              <Legend wrapperStyle={{ color: '#ccc', fontSize: 12, paddingTop: '15px' }} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Loyalty & Reservation Breakdowns Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* Loyalty Tier Distribution */}
        {loyaltyData.length > 0 && (
          <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl" data-aos="fade-up" data-aos-duration="700">
            <h3 className="text-light/80 font-serif mb-2 text-center text-lg">🏅 Customer Tiers</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={loyaltyData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="count" nameKey="tier" label={renderLabel} labelLine={false} stroke="none">
                  {loyaltyData.map((entry, index) => <Cell key={`tier-${index}`} fill={TIER_COLORS[entry.tier] || COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(val, name) => [val, name]} wrapperStyle={{ zIndex: 9999 }} allowEscapeViewBox={{ x: true, y: true }} />
                <Legend wrapperStyle={{ color: '#ccc', fontSize: 13, paddingTop: '15px' }} iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Reservation Status */}
        {states.reservationStatusData?.length > 0 && (
          <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl" data-aos="fade-up" data-aos-duration="700">
            <h3 className="text-light/80 font-serif mb-2 text-center text-lg">📋 Reservation Status</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={states.reservationStatusData}
                  cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="value" nameKey="name" label={renderLabel} labelLine={false} stroke="none"
                >
                  {states.reservationStatusData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} wrapperStyle={{ zIndex: 9999 }} allowEscapeViewBox={{ x: true, y: true }} />
                <Legend wrapperStyle={{ color: '#ccc', fontSize: 13, paddingTop: '15px', textTransform: 'capitalize' }} iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

      </div>

      {/* ── Daily Operational KPI (7 Days) Row ── */}
      <h2 className="text-xl font-serif text-light mt-10 mb-6 border-b border-white/10 pb-3 flex items-center gap-2">📅 7-Day Performance</h2>
      <div className="bg-dark-800 border border-white/5 p-6 rounded-3xl shadow-2xl mb-10 overflow-x-auto" data-aos="fade-up" data-aos-duration="800">
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={states.recentSalesHistory || []} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="recentRevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#d4af37" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis dataKey="date" stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis yAxisId="left" stroke="#aaa" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
            <YAxis yAxisId="right" orientation="right" hide />
            <Tooltip contentStyle={tooltipStyle} wrapperStyle={{ zIndex: 9999 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Legend wrapperStyle={{ color: '#ccc', fontSize: 13, paddingTop: '10px' }} iconType="circle" />
            <Bar yAxisId="left" dataKey="revenue" name="Daily Revenue ($)" fill="url(#recentRevGrad)" radius={[6, 6, 0, 0]} barSize={40} />
            <Line yAxisId="right" type="monotone" dataKey="orders" name="Total Orders" stroke="#00C49F" strokeWidth={3} dot={{ fill: '#00C49F', r: 5 }} activeDot={{ r: 7 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminHome;
