import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSackDollar, FaUser } from 'react-icons/fa6'
import { HiTemplate } from "react-icons/hi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

import { PieChart, Pie } from 'recharts';
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const { user } = useContext(AuthContext);

  const { data: states = {} } = useQuery({
    queryKey: ["admin-states"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin-states`);
      return res.data;
    },
  });


  const { data: items = [] } = useQuery({
    queryKey: ["chart-data"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chart-data`);
      return res.data;
    },
  });

  const newArray = [];


  const salad = items.filter(item => item.category === 'salad');
  const SaladData = {
    count: salad.length,
    category: 'salad', // Set the category directly, assuming it's a constant for salad items
    total: salad.reduce((sum, item) => item.price + sum, 0),
  };
  newArray.push(SaladData);

  const dessert = items.filter(item => item.category === 'dessert');
  const dessertData = {
    count: dessert.length,
    category: 'dessert', // Set the category directly, assuming it's a constant for salad items
    total: dessert.reduce((sum, item) => item.price + sum, 0),
  };
  newArray.push(dessertData)

  const soup = items.filter(item => item.category === 'soup');
  const total = soup.reduce((sum, item) => item.price + sum, 0)
  const newTotal = parseFloat(total?.toFixed(2))
  const soupData = {
    count: soup.length,
    category: 'soup', // Set the category directly, assuming it's a constant for salad items
    total: newTotal,
  };
  newArray.push(soupData)

  const pizza = items.filter(item => item.category === 'pizza');
  const pizzaData = {
    count: pizza.length,
    category: 'pizza', // Set the category directly, assuming it's a constant for salad items
    total: pizza.reduce((sum, item) => item.price + sum, 0),
  };
  newArray.push(pizzaData)
  const drinks = items.filter(item => item.category === 'drinks');
  const drinksData = {
    count: drinks.length,
    category: 'drinks', // Set the category directly, assuming it's a constant for salad items
    total: drinks.reduce((sum, item) => item.price + sum, 0),
  };
  newArray.push(drinksData)








  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-16 overflow-hidden">
      <Helmet>
        <title>MealCage | Admin Home</title>
      </Helmet>

      <div className="mt-12 mb-10 text-center md:text-left" data-aos="fade-right" data-aos-duration="800">
        <h1 className="text-3xl md:text-5xl font-serif text-light tracking-wide">
          Administrator, <span className="text-primary italic">{user.displayName}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl flex flex-col justify-center items-center p-6 group hover:border-white/10 transition-colors"
          data-aos="fade-up"
          data-aos-duration="600">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FaSackDollar size={28} className="text-primary" />
          </div>
          <h3 className="text-xs md:text-sm font-sans text-light/60 tracking-widest uppercase mb-1">Revenue</h3>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-light">
            <span className="text-primary text-xl align-top mr-1">$</span>
            {parseFloat(states?.revenue?.toFixed(2))}
          </h1>
        </div>

        <div className="bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl flex flex-col justify-center items-center p-6 group hover:border-white/10 transition-colors"
          data-aos="fade-up"
          data-aos-duration="700">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FaUser size={28} className="text-primary" />
          </div>
          <h3 className="text-xs md:text-sm font-sans text-light/60 tracking-widest uppercase mb-1">Customers</h3>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-light">
            {states.users}
          </h1>
        </div>

        <div className="bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl flex flex-col justify-center items-center p-6 group hover:border-white/10 transition-colors"
          data-aos="fade-up"
          data-aos-duration="800">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <GiForkKnifeSpoon size={28} className="text-primary" />
          </div>
          <h3 className="text-xs md:text-sm font-sans text-light/60 tracking-widest uppercase mb-1">Menu Items</h3>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-light">
            {states.menuItems}
          </h1>
        </div>

        <div className="bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl flex flex-col justify-center items-center p-6 group hover:border-white/10 transition-colors"
          data-aos="fade-up"
          data-aos-duration="900">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <HiTemplate size={28} className="text-primary" />
          </div>
          <h3 className="text-xs md:text-sm font-sans text-light/60 tracking-widest uppercase mb-1">Orders</h3>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-light">
            {states.orders}
          </h1>
        </div>
      </div>

      {/* ================ charts ================ */}
      <h2 className="text-2xl font-serif text-light mt-16 mb-8 border-b border-white/10 pb-4">Revenue Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl overflow-x-auto flex justify-center items-center" data-aos="fade-up" data-aos-duration="600">
          <BarChart
            width={400}
            height={300}
            data={newArray}
            margin={{ top: 30, right: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="category" stroke="#d4af37" />
            <YAxis stroke="#f5f5f5" />
            <Bar dataKey="total" fill="#d4af37" shape={<TriangleBar />} label={{ position: 'top', fill: '#f5f5f5' }}>
              {newArray.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-2xl flex justify-center items-center" data-aos="fade-up" data-aos-duration="800">
          <PieChart width={300} height={300}>
            <Pie
              data={newArray}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
            >
              {newArray.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
