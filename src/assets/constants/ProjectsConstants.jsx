import BoseImg from "../projects/bose.png";
import MoodifyImg from "../projects/moodify-website.png";
import IOLabsImg from "../projects/iolabs.png";
import PortfolioImg from "../projects/portfolio.png";
import SplineImg from "../projects/spine-website.png";

export const projects = [
    {
      id: 1,
      title: 'ThinkForge - AI Debate Platform',
      description:
        'AI-powered debate platform featuring historical figures using Sonar AI and React.js. Users can engage in debates with AI representations of famous personalities, creating an educational and interactive experience.',
      techStack: ["React.js", "Sonar AI", "JavaScript"],
      img: BoseImg,
      colorClass: 'indigo-400',
      link: '#',
    },
    {
      id: 2,
      title: 'HackaTwin - Hackathon Management',
      description:
        'Comprehensive hackathon management system built with FastAPI and Next.js, featuring local LLM integration. Achieved 43% email open rate and streamlined event organization for technical competitions.',
      techStack: ['FastAPI', 'Next.js', 'LLM', 'Python'],
      img: IOLabsImg,
      colorClass: 'stone-400',
      link: '#',
    },
    {
      id: 3,
      title: 'Recora - Privacy-First Health Assistant',
      description:
        'AI-powered health assistant using Large Language Models and React, focusing on user privacy and data security. Secured Top 10 position among 800+ teams at MIT AI Hackathon.',
      techStack: ['React', 'LLMs', 'Python', 'AI/ML'],
      img: PortfolioImg,
      colorClass: 'amber-400',
      link: '#',
    },
    {
      id: 4,
      title: 'Ninja Meeting AI',
      description:
        'Real-time meeting transcription system using RAG (Retrieval-Augmented Generation), BERT, and Large Language Models. Provides intelligent meeting summaries and actionable insights.',
      techStack: ['Python', 'BERT', 'LLMs', 'RAG'],
      img: MoodifyImg,
      colorClass: 'orange-400',
      link: '#',
    },
    {
      id: 5,
      title: 'Women Safety Analytics',
      description:
        'CCTV-integrated anomaly detection system using AI/ML and OpenCV for Smart India Hackathon. Real-time monitoring and alert system to enhance women safety in public spaces.',
      techStack: ['Python', 'OpenCV', 'AI/ML', 'Computer Vision'],
      img: SplineImg,
      colorClass: 'red-400',
      link: '#',
    },
  ];