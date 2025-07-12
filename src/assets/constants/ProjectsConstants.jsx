import BoseImg from "../projects/bose.png";
import MoodifyImg from "../projects/moodify-website.png";
import IOLabsImg from "../projects/iolabs.png";
import PortfolioImg from "../projects/portfolio.png";
import SplineImg from "../projects/spine-website.png";

export const projects = [
    {
      id: 1,
      title: 'Headphones Product Page',
      description:
        'Crafted an immersive 3D product experience for Bose wireless headphones. Users can scroll through dynamic camera transitions, exploring the product from multiple angles in an interactive and engaging format.',
      techStack: ["React.js", "GSAP", "3D Model"],
      img: BoseImg,
      colorClass: 'indigo-400',
      link: 'https://shrutitaylor.github.io/earphones-v1/',
    },
    {
      id: 2,
      title: 'IO Labs Business Website',
      description:
        'Designed and launched a business website for a Melbourne-based tech repair shop. The site includes service highlights, customer testimonials, responsive layout, and animated transitions for a polished, user-friendly experience.',
      techStack: ['React', 'Tailwind', 'Framer Motion'],
      img: IOLabsImg,
      colorClass: 'stone-400',
      link: 'https://iolabs.au/',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description:
        'A personal portfolio website to showcase my work, design thinking, and skills. Built with smooth animations, responsive layout, and a clean aesthetic to reflect both creativity and professionalism.',
      techStack: ['React', 'Tailwind','Framer Motion'],
      img: PortfolioImg,
      colorClass: 'amber-400',
      link: 'https://shrutitaylor.github.io/ProtfolioWebsiteShruti/',
    },
    {
      id: 4,
      title: 'Moodify – Fun Project',
      description:
        'A music streaming app made for fun, that curates playlists based on user moods. Built with UI animations and expressive design, Moodify offers an emotional and visually engaging listening experience.',
      techStack: ['React', 'CSS Animations'],
      img: MoodifyImg,
      colorClass: 'orange-400',
      link: 'https://shrutitaylor.github.io/Moodify-v1.0/',
    },
    {
      id: 5,
      title: '3D Portfolio – Fun Project',
      description:
        'A lightweight 3D portfolio experience using React and Vite, integrated with Spline for real-time 3D modeling and interactions. This project explores immersive visuals and smooth transitions.',
      techStack: ['React', 'Vite', 'Spline'],
      img: SplineImg,
      colorClass: 'orange-400',
      link: 'https://shrutitaylor.github.io/spline-app/',
    },
  ];