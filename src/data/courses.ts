export interface Course {
  slug: string;
  title: string;
  desc: string;
  features: string[];
  duration: string;
  level: string;
  price?: string;
  originalPrice?: string;
  seats?: string;
  discount?: string;
  discountedPrice?: string;
  discountCode?: string;
}

export const courses: Course[] = [
  {
    slug: "summer-ai-bootcamp-26",
    title: "Summer AI Bootcamp '26",
    desc: "Don't waste your summer... upgrade your future! Learn AI Skills in just 10 Days.",
    features: [
      "Build No-Code Apps & Websites",
      "Create Viral AI Reels & Videos",
      "Master ChatGPT & Prompts",
      "Smart Study & Homework Hacks",
      "Career & Future Growth"
    ],
    duration: "10 Days",
    level: "Starts: 01/05/2025",
    price: "₹999/-",
    seats: "20 Seats/per batch",
    discount: "School Students 50% OFF (Code: SS50)",
    discountedPrice: "₹499/-",
    discountCode: "SS50"
  },
  {
    slug: "summer-robotics-iot-bootcamp-26",
    title: "Summer Robotics & IoT Bootcamp '26",
    desc: "This summer, stop scrolling... start building! Turn ideas into real robots, smart devices, and future-ready skills in just 10 Days.",
    features: [
      "Build & Control Real Robots",
      "Create IoT Smart Home Projects",
      "Learn Sensors & Electronics Basics",
      "Beginner Coding Made Easy",
      "Fun Hands-on Daily Activities",
      "Certificate + Future Tech Exposure"
    ],
    duration: "10 Days",
    level: "Starts: 01/05/2025",
    price: "₹999/-",
    seats: "20 Seats/per batch",
    discount: "School Students 50% OFF (Code: SS50)",
    discountedPrice: "₹499/-",
    discountCode: "SS50"
  },
  {
    slug: "1-day-iot-workshop",
    title: "1-Day IoT Workshop",
    desc: "Learn IoT from Scratch (No Experience Needed). Understand how smart devices work, connect devices to the internet, and build your first smart IoT project.",
    features: [
      "IoT Basics Made Easy",
      "WiFi + ESP32 Modules Setup",
      "Mobile Control System",
      "Real-Time Data Monitoring",
      "Build Live Project"
    ],
    duration: "1 Day",
    level: "Beginner",
    price: "₹499/-",
    discount: "50% OFF (Code: IoT50)",
    discountedPrice: "₹249/-",
    discountCode: "IoT50"
  }
];
