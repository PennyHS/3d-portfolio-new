import {
  Telstra,
  python,
  C,
  C2,
  css,
  tensflow,
  spotlight1,
  spotlight2,
  matlab,
  bluetooth,
} from "../assets";

import netflix from "../assets/company/netflix.png";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];




const technologies = [
  {
    name: "python",
    icon: python,
  },
  {
    name: "C",
    icon: C,
  },
  {
    name: "C#",
    icon: C2,
  },
  {
    name: "CSS",
    icon: css,
  },
];

const experiences = [
  {
    title: "Software Engineer",
    company_name: "Telstra",
    icon: Telstra,
    iconBg: "#E6DEDD",
    date: "May 2019 - Present",
    points: [
      "Design and develop scalable, resilient software solutions that meet business requirements.",
      "Collaborate with product owners, architects, and other engineers to define technical specifications.",
      "Write clean, maintainable code with comprehensive test coverage.",
      "Troubleshoot and resolve complex technical issues in production environments.",
    ],
  },
  {
    title: "Data Scientist",
    company_name: "Netflix",
    icon: netflix,
    iconBg: "#E6DEDD",
    date: "Mar 2015 - May 2019",
    points: [
      "Assisting customers with selecting meat, providing cooking tips, or fulfilling special orders.",
      "Monitoring stock levels, rotating products to ensure freshness, and replenishing displays.",
      "Maintaining cleanliness and adhering to food safety regulations to ensure a safe work environment.",
      "Coordinating with other staff members to ensure the smooth operation of the meat department.",
    ],
  },
];

const myProjects = [
  {
    name: "FinTrack: AI-Powered Financial Dashboard",
    desc: 'A comprehensive financial analytics platform that uses machine learning to provide personalized insights, expense tracking, and investment recommendations based on user behavior patterns.',
    subdesc: 'Developed with React.js frontend and Python backend, FinTrack integrates with banking APIs to securely fetch transaction data. The platform employs NLP algorithms to categorize expenses automatically and uses predictive models to forecast future spending trends. Features include customizable dashboards, anomaly detection for unusual transactions, and AI-driven savings recommendations.',
      video:'/project/project1.mp4',
      spotlight: spotlight2,
      tags: [
      {
        id: '1',
        name: "Python",
        icon: python,
      },
      {
        id: '2',
        name: "TensorFlow",
        icon: tensflow,
      },
      {
        id: '3',
        name: "MATLAB",
        icon: matlab,
      },
    ],
  },
  {
    name: "HealthConnect: Telemedicine Platform",
    desc: 'A secure telemedicine application connecting patients with healthcare providers through video consultations, electronic health records management, and integrated prescription services.',
    subdesc: 'Built using MERN stack (MongoDB, Express.js, React, Node.js) with WebRTC for real-time communication. The platform features end-to-end encryption for patient confidentiality, appointment scheduling system with automated reminders, digital prescription generation, and integration with pharmacy networks. The responsive design ensures accessibility across desktop and mobile devices.',
      video:'/project/project2.mp4',
      spotlight: spotlight1,
      tags: [
      {
        id: "1",
        name: "C#",
        icon: C2,
      },
      {
        id: "2",
        name: "C",
        icon: C,
      },
      {
        id: "3",
        name: "Bluetooth",
        icon: bluetooth,
      },
    ],

  },
];

export { technologies, experiences, myProjects };