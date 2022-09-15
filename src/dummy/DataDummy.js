import brand1 from "../assets/Beans/beans-1.png";
import brand2 from "../assets/Beans/beans-2.png";
import brand3 from "../assets/Beans/beans-3.png";
import brand4 from "../assets/Beans/beans-4.png";


import mango from "../assets/mango.svg";
import bubble from "../assets/bubble-tea-gelatin.svg";
import greencoco from "../assets/green-coconut.svg";
import bobamango from "../assets/boba-mango.svg";
import berry from "../assets/berry.svg";
import kiwi from "../assets/kiwi-popping.svg";
import strawberry from "../assets/strawberry-popping.svg";
import matchacan from "../assets/matcha-can.svg";

export let dataProduct = [
  {
    id: 1,
    name: "RWANDA Beans",
    price: 27000,
    image: brand1,
    stock: 200,
    desc: "Hampir semua referensi sepakat mengatakan bahwa kopi pertama kali ditemukan di Ethiopia, meskipun ada juga beberapa protes yang menyatakan bahwa Coffea arabica sebenarnya muncul pertama kali di bagian selatan Sudan. Karena para gembala Ethiopia adalah manusia pertama yang mengonsumsi kopi—walau saat itu mereka baru mengonsumsi buah/cherry-nya saja, maka gagasan tentang “Ethiopia sebagai tempat asal kopi” pun semakin kuat."
  },
  {
    id: 2,
    name: "ETHIOPIA Beans",
    price: 31000,
    image: brand2,
    stock: 150,
    desc: "Hampir semua referensi sepakat mengatakan bahwa kopi pertama kali ditemukan di Ethiopia, meskipun ada juga beberapa protes yang menyatakan bahwa Coffea arabica sebenarnya muncul pertama kali di bagian selatan Sudan. Karena para gembala Ethiopia adalah manusia pertama yang mengonsumsi kopi—walau saat itu mereka baru mengonsumsi buah/cherry-nya saja, maka gagasan tentang “Ethiopia sebagai tempat asal kopi” pun semakin kuat."

  },
  {
    id: 3,
    name: "GUETEMALA Beans",
    price: 29000,
    image: brand3,
    stock: 100,
    desc: "Hampir semua referensi sepakat mengatakan bahwa kopi pertama kali ditemukan di Ethiopia, meskipun ada juga beberapa protes yang menyatakan bahwa Coffea arabica sebenarnya muncul pertama kali di bagian selatan Sudan. Karena para gembala Ethiopia adalah manusia pertama yang mengonsumsi kopi—walau saat itu mereka baru mengonsumsi buah/cherry-nya saja, maka gagasan tentang “Ethiopia sebagai tempat asal kopi” pun semakin kuat."

  },
  {
    id: 4,
    name: "NICARAGUA Beans",
    price: 28000,
    image: brand4,
    stock: 170,
    desc: "Hampir semua referensi sepakat mengatakan bahwa kopi pertama kali ditemukan di Ethiopia, meskipun ada juga beberapa protes yang menyatakan bahwa Coffea arabica sebenarnya muncul pertama kali di bagian selatan Sudan. Karena para gembala Ethiopia adalah manusia pertama yang mengonsumsi kopi—walau saat itu mereka baru mengonsumsi buah/cherry-nya saja, maka gagasan tentang “Ethiopia sebagai tempat asal kopi” pun semakin kuat."

  },
];

export let dataTopping = [
  {
    name: "Mango",
    image: mango,
    price: 5000,
  },
  {
    name: "Bubble Tea Gelatin",
    image: bubble,
    price: 5000,
  },
  {
    name: "Green Coconut",
    image: greencoco,
    price: 5000,
  },
  {
    name: "Boba Mango",
    image: bobamango,
    price: 5000,
  },
  {
    name: "Bill Berry Boba",
    image: berry,
    price: 5000,
  },
  {
    name: "Kiwi Popping Pearl",
    image: kiwi,
    price: 5000,
  },
  {
    name: "Matcha Cantoloupe",
    image: matchacan,
    price: 5000,
  },
  {
    name: "Strawberry Popping",
    image: strawberry,
    price: 5000,
  },
];

export let dataTransaction = [
  {
    id: "1",
    name: "Budi",
    address: "Jl. Elang IV",
    postcode: "62738",
    income: 500000,
    status: "Success",
  },
  {
    id: "2",
    name: "Mana",
    address: "Jl. Kalimantan",
    postcode: "17488",
    income: 29000,
    status: "Success",
  },
  {
    id: "3",
    name: "Mario",
    address: "Jl. Sumatera",
    postcode: "11128",
    income: 100000,
    status: "On the way",
  },
  {
    id: "4",
    name: "Nirina",
    address: "Jl. Sulawesi",
    postcode: "25478",
    income: 50000,
    status: "Waiting Approve",
  },
  {
    id: "5",
    name: "Subair",
    address: "Jl. Bali ",
    postcode: "32178",
    income: 10000000,
    status: "Canceled",
  },
  {
    id: "6",
    name: "Budi",
    address: "Jl. Elang IV",
    postcode: "62738",
    income: 500000,
    status: "Success",
  },
];
