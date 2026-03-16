import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaSackDollar, FaUser, FaCartShopping, FaStar } from 'react-icons/fa6';
import { HiTemplate } from "react-icons/hi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdTableRestaurant, MdPendingActions, MdTrendingUp } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, LineChart, Line, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Helmet } from "react-helmet-async";
import Loader from "../../../Components/Shared/Loader";

const COLORS = ['#d4af37', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#ee5a24'];

const StatCard = ({ icon: Icon, label, value, prefix = '', delay = '600' }) => (
  <div
    className="bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl flex flex-col justify-center items-center p-6 group hover:border-primary/30 transition-all duration-300"
    data-aos="fade-up"
    data-aos-duration={delay}
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
      <Icon size={24} className="text-primary" />
    </div>
    <h3 className="text-xs font-sans text-light/50 tracking-widest uppercase mb-1 text-center">{label}</h3>
    <h1 className="text-3xl font-sans font-bold text-light">
      {prefix && <span className="text-primary text-lg align-top mr-0.5">{prefix}</span>}
      {value}
    </h1>
  </div>
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

  // Reservation status breakdown
  const reservationStatusData = [
    { name: 'Pending', value: states.pendingReservations || 0 },
    { name: 'Other', value: (states.reservations || 0) - (states.pendingReservations || 0) },
  ].filter(d => d.value > 0);

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  const TriangleBar = ({ fill, x, y, width, height }) => (
    <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
  );

  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-16 overflow-hidden">
      <Helmet><title>MealCage | Admin Home</title></Helmet>

      <div className="mt-12 mb-10 text-center md:text-left" data-aos="fade-right" data-aos-duration="800">
        <h1 className="text-3xl md:text-5xl font-serif text-light tracking-wide">
          Administrator, <span className="text-primary italic">{user.displayName}</span>
        </h1>
      </div>

      {/* ── Primary Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard icon={FaSackDollar} label="Total Revenue" value={`$${parseFloat(states?.revenue || 0).toFixed(2)}`} delay="600" />
        <StatCard icon={FaUser} label="Customers" value={states.users ?? 0} delay="650" />
        <StatCard icon={GiForkKnifeSpoon} label="Menu Items" value={states.menuItems ?? 0} delay="700" />
        <StatCard icon={HiTemplate} label="Orders" value={states.orders ?? 0} delay="750" />
        <StatCard icon={BsCurrencyDollar} label="Avg Order Value" value={`$${states.avgOrderValue ?? 0}`} delay="800" />
      </div>

      {/* ── Secondary Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        <StatCard icon={MdTableRestaurant} label="Reservations" value={states.reservations ?? 0} delay="600" />
        <StatCard icon={MdPendingActions} label="Pending Bookings" value={states.pendingReservations ?? 0} delay="650" />
        <StatCard icon={FaStar} label="Total Reviews" value={states.reviews ?? 0} delay="700" />
        <StatCard icon={FaStar} label="Avg Rating" value={`${states.avgRating ?? 0} ★`} delay="750" />
        <StatCard icon={FaCartShopping} label="Active Carts" value={states.cartItems ?? 0} delay="800" />
      </div>

      {/* ── Monthly Revenue Trend ── */}
      <h2 className="text-2xl font-serif text-light mt-6 mb-6 border-b border-white/10 pb-4">Monthly Revenue Trend</h2>
      <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl mb-12 overflow-x-auto" data-aos="fade-up" data-aos-duration="700">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={states.monthlyRevenue || []} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#d4af37" />
            <YAxis stroke="#f5f5f5" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#f5f5f5' }}
              formatter={(val) => [`$${val}`, 'Revenue']}
            />
            <Line type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2.5} dot={{ fill: '#d4af37', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Category Analytics ── */}
      <h2 className="text-2xl font-serif text-light mb-8 border-b border-white/10 pb-4">Category Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl overflow-x-auto flex justify-center items-center" data-aos="fade-up" data-aos-duration="600">
          <BarChart width={420} height={300} data={categoryData} margin={{ top: 30, right: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="category" stroke="#d4af37" />
            <YAxis stroke="#f5f5f5" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#f5f5f5' }}
              formatter={(val) => [`$${val}`, 'Revenue']}
            />
            <Bar dataKey="total" fill="#d4af37" shape={<TriangleBar />} label={{ position: 'top', fill: '#f5f5f5', fontSize: 11 }}>
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

      {/* ── Reservation Status ── */}
      {reservationStatusData.length > 0 && (
        <>
          <h2 className="text-2xl font-serif text-light mb-8 border-b border-white/10 pb-4">Reservation Status</h2>
          <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center mb-8" data-aos="fade-up" data-aos-duration="600">
            <PieChart width={300} height={250}>
              <Pie data={reservationStatusData} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={90} dataKey="value">
                {reservationStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#f5f5f5' }}
              />
              <Legend wrapperStyle={{ color: '#f5f5f5', fontSize: 13 }} />
            </PieChart>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
