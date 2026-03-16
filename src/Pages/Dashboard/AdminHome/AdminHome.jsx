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
  PieChart, Pie, LineChart, Line, Tooltip, ResponsiveContainer, Legend
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
  padding: '8px 14px',
};

const StatCard = ({ icon: Icon, label, value, sub, delay = '600', highlight }) => (
  <div
    className="bg-dark-800 border border-white/5 shadow-xl shadow-black/40 rounded-2xl flex flex-col justify-center items-center p-5 group hover:border-primary/30 transition-all duration-300"
    data-aos="fade-up"
    data-aos-duration={delay}
  >
    <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${highlight ? 'bg-primary/20' : 'bg-primary/10'}`}>
      <Icon size={22} className="text-primary" />
    </div>
    <h3 className="text-[10px] font-sans text-light/50 tracking-widest uppercase mb-1 text-center leading-tight">{label}</h3>
    <h1 className="text-2xl font-sans font-bold text-light text-center">{value}</h1>
    {sub && <p className="text-xs text-light/40 mt-1">{sub}</p>}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-serif text-light mt-10 mb-6 border-b border-white/10 pb-3">
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

  const getPath = (x, y, width, height) =>
    `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y} C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height} Z`;
  const TriangleBar = ({ fill, x, y, width, height }) => (
    <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
  );

  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
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

  const loyaltyData = (states.loyaltyTierDistribution || []).filter(d => d.count > 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-20 overflow-hidden">
      <Helmet><title>MealCage | Admin Home</title></Helmet>

      <div className="mt-12 mb-10 text-center md:text-left" data-aos="fade-right" data-aos-duration="800">
        <h1 className="text-3xl md:text-5xl font-serif text-light tracking-wide">
          Administrator, <span className="text-primary italic">{user.displayName}</span>
        </h1>
      </div>

      {/* ── Financial KPIs ── */}
      <SectionTitle>💰 Financial Overview</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FaSackDollar} label="Total Revenue" value={`$${states.revenue ?? 0}`} delay="600" highlight />
        <StatCard icon={BsCurrencyDollar} label="Avg Order Value" value={`$${states.avgOrderValue ?? 0}`} delay="650" />
        <StatCard icon={HiTemplate} label="Total Orders" value={states.orders ?? 0} delay="700" />
        <StatCard icon={MdTrendingUp} label="Repeat Customers" value={states.repeatCustomers ?? 0} sub="ordered 2+ times" delay="750" />
      </div>

      {/* ── Operations KPIs ── */}
      <SectionTitle>🏠 Operations</SectionTitle>
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
      <SectionTitle>📅 Reservations</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={MdTableRestaurant} label="Total Bookings" value={states.reservations ?? 0} delay="600" />
        <StatCard icon={MdPendingActions} label="Pending" value={states.pendingReservations ?? 0} delay="650" />
        <StatCard icon={MdVerified} label="Confirmed" value={states.confirmedReservations ?? 0} delay="700" />
        <StatCard icon={FaRepeat} label="Confirm Rate" value={`${states.reservationConfirmRate ?? 0}%`} delay="750" highlight />
      </div>

      {/* ── Monthly Revenue Trend ── */}
      <SectionTitle>📈 Monthly Revenue & Orders (6 mo)</SectionTitle>
      <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl mb-10 overflow-x-auto" data-aos="fade-up" data-aos-duration="700">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={states.monthlyRevenue || []} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="month" stroke="#d4af37" tick={{ fill: '#ccc', fontSize: 12 }} />
            <YAxis stroke="#555" tick={{ fill: '#ccc', fontSize: 12 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(val, name) => [name === 'revenue' ? `$${val}` : val, name === 'revenue' ? 'Revenue' : 'Orders']}
              wrapperStyle={{ zIndex: 9999 }}
            />
            <Legend wrapperStyle={{ color: '#ccc', fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2.5} dot={{ fill: '#d4af37', r: 4 }} activeDot={{ r: 6 }} name="revenue" />
            <Line type="monotone" dataKey="orders" stroke="#00C49F" strokeWidth={2} dot={{ fill: '#00C49F', r: 3 }} activeDot={{ r: 5 }} name="orders" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Category Revenue ── */}
      <SectionTitle>🍽️ Revenue by Category</SectionTitle>
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
              <Bar dataKey="total" fill="#d4af37" shape={<TriangleBar />} label={{ position: 'top', fill: '#aaa', fontSize: 11 }}>
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center" data-aos="fade-up" data-aos-duration="800">
          <PieChart width={300} height={300}>
            <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={110} fill="#8884d8" dataKey="count">
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(val, name, props) => [val, props?.payload?.category ?? name]}
              wrapperStyle={{ zIndex: 9999 }}
            />
            <Legend wrapperStyle={{ color: '#ccc', fontSize: 12, marginTop: 8 }} />
          </PieChart>
        </div>
      </div>

      {/* ── Loyalty Tier Distribution ── */}
      {loyaltyData.length > 0 && (
        <>
          <SectionTitle>🏅 Customer Loyalty Tiers</SectionTitle>
          <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center mb-10" data-aos="fade-up" data-aos-duration="700">
            <PieChart width={320} height={260}>
              <Pie data={loyaltyData} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={90} dataKey="count" nameKey="tier">
                {loyaltyData.map((entry, index) => (
                  <Cell key={`tier-${index}`} fill={TIER_COLORS[entry.tier] || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(val, name) => [val, name]} wrapperStyle={{ zIndex: 9999 }} />
              <Legend wrapperStyle={{ color: '#ccc', fontSize: 13 }} />
            </PieChart>
          </div>
        </>
      )}

      {/* ── Reservation Status ── */}
      {states.reservations > 0 && (
        <>
          <SectionTitle>📋 Reservation Status Breakdown</SectionTitle>
          <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center mb-4" data-aos="fade-up" data-aos-duration="700">
            <PieChart width={320} height={260}>
              <Pie
                data={[
                  { name: 'Pending', value: states.pendingReservations || 0 },
                  { name: 'Confirmed', value: states.confirmedReservations || 0 },
                  { name: 'Other', value: (states.reservations || 0) - (states.pendingReservations || 0) - (states.confirmedReservations || 0) },
                ].filter(d => d.value > 0)}
                cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={90} dataKey="value"
              >
                {[0, 1, 2].map(index => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} wrapperStyle={{ zIndex: 9999 }} />
              <Legend wrapperStyle={{ color: '#ccc', fontSize: 13 }} />
            </PieChart>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
