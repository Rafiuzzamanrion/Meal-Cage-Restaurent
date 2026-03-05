import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import orderImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { useState } from "react";
import UseMenu from "../../../Hooks/UseMenu";

import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
  const categories = ['salad', 'pizza', 'soups', 'dessert', 'drinks', 'offered'];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = UseMenu();

  const desserts = menu.filter(item => item.category === 'dessert')
  const soups = menu.filter(item => item.category === 'soup')
  const salads = menu.filter(item => item.category === 'salad')
  const pizzas = menu.filter(item => item.category === 'pizza')
  const drinks = menu.filter(item => item.category === 'drinks')

  return (
    <div>
      <Helmet>
        <title>MealCage | Order Food</title>
      </Helmet>
      <Cover img={orderImg} title={"ORDER FOOD"}></Cover>

      <div className="container mx-auto px-4 mb-20">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="mt-12">
          <TabList className="flex justify-center flex-wrap mb-12 border-b border-white/10">
            <Tab className="mx-2 md:mx-6 py-4 uppercase font-sans tracking-widest text-sm md:text-base text-light/70 cursor-pointer outline-none transition-colors duration-300 hover:text-primary" selectedClassName="text-primary border-b-2 border-primary font-bold">Salad</Tab>
            <Tab className="mx-2 md:mx-6 py-4 uppercase font-sans tracking-widest text-sm md:text-base text-light/70 cursor-pointer outline-none transition-colors duration-300 hover:text-primary" selectedClassName="text-primary border-b-2 border-primary font-bold">Pizza</Tab>
            <Tab className="mx-2 md:mx-6 py-4 uppercase font-sans tracking-widest text-sm md:text-base text-light/70 cursor-pointer outline-none transition-colors duration-300 hover:text-primary" selectedClassName="text-primary border-b-2 border-primary font-bold">Soup</Tab>
            <Tab className="mx-2 md:mx-6 py-4 uppercase font-sans tracking-widest text-sm md:text-base text-light/70 cursor-pointer outline-none transition-colors duration-300 hover:text-primary" selectedClassName="text-primary border-b-2 border-primary font-bold">Dessert</Tab>
            <Tab className="mx-2 md:mx-6 py-4 uppercase font-sans tracking-widest text-sm md:text-base text-light/70 cursor-pointer outline-none transition-colors duration-300 hover:text-primary" selectedClassName="text-primary border-b-2 border-primary font-bold">Drinks</Tab>
          </TabList>

          <TabPanel className="focus:outline-none">
            <OrderTab items={salads}></OrderTab>
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <OrderTab items={pizzas}></OrderTab>
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <OrderTab items={soups}></OrderTab>
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <OrderTab items={desserts}></OrderTab>
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <OrderTab items={drinks}></OrderTab>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
