import "./ShopNowList.css";
import ShopNowCard from "./ShopNowcard";
import FlashSaleCount from "../FlashSaleCount/FlashSaleCount";
import SectionTitle from "../SectionTitle/SectionTitle";
import Line from "../Line";

function ShopNowList() {
  const featuredCardData = {
    img: "https://www.apple.com/v/iphone-15/c/images/overview/welcome/hero_endframe__e0ajd2ayxqc2_large.jpg",
    title: "iPhone 15 Pro",
    description:
      "Dive into advanced technology, captivating design, and robust features.",
    link: "/product?id=GFYIOyhpj7BvfZJaAKim&productName=iphone%2015%20Pro",
  };

  const list2CardData1 = {
    img: "https://images.samsung.com/lb/smartphones/galaxy-z-fold5/images/galaxy-z-fold5-highlights-kv-a.jpg?imbypass=true",
    title: "Samsung Galaxy Z Fold 5",
    description:
      "Innovative foldable design ideal for multitasking, gaming, and video viewing on a tablet-sized screen.",
    link: "/product?id=MK8OdnhbvPoDPnn0QICQ&productName=Samsung%20Galaxy%20Z%20Fol...",
  };

  const list2CardData2 = {
    img: "https://s3.amazonaws.com/cms.ipressroom.com/219/files/20240/geforce-rtx-40-super-series-family-hero-image.png",
    title: "GeForce RTX 40 SUPER Series",
    description:
      "New Heroes Debut in the Gaming and Creating Universe With AI as Their Superpower.",
    link: "/product?id=2KP3LRxGsK9BifciBrs9&productName=GeForce%20RTX%2040%20SUPER...",
  };

  return (
    <div>
      <SectionTitle SectionTitle="Featured" />
      <FlashSaleCount SectionAbout="New Arrival" />
      <div id="ShopNowList">
        <ShopNowCard {...featuredCardData} />

        <div className="List-2">
          <ShopNowCard {...list2CardData1} />
          <ShopNowCard {...list2CardData2} />
        </div>
      </div>
      <Line />
    </div>
  );
}

export default ShopNowList;
