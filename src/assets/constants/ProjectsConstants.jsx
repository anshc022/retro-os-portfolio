import BoseImg from "../projects/bose.png";
import MoodifyImg from "../projects/moodify-website.png";
import IOLabsImg from "../projects/iolabs.png";
import PortfolioImg from "../projects/portfolio.png";
import SplineImg from "../projects/spine-website.png";
import WomenImg from "../projects/women.png";
import MindImg from "../projects/mind.jpeg";
import MindImg2 from "../projects/mind2.jpeg";
import RecoraImg from "../projects/recora.jpeg";
import RecoraImg2 from "../projects/recora'.jpeg";
import ThinkForgeImg from "../projects/ThinkForge.jpg";
import ThinkForgeImg1 from "../projects/ThinkForge1.jpg";
import ThinkForgeImg2 from "../projects/ThinkForge2.jpg";
import HackTwImg from "../projects/hacktw.gif";

export const projects = [
    {
      id: 1,
      title: 'ThinkForge - AI Debate Platform',
      description:
        'AI-powered debate platform featuring historical figures using Sonar AI and React.js. Users can engage in debates with AI representations of famous personalities, creating an educational and interactive experience.',
      techStack: ["React.js", "Sonar AI", "JavaScript"],
      img: ThinkForgeImg,
      slideImages: [ThinkForgeImg, ThinkForgeImg1, ThinkForgeImg2],
      colorClass: 'indigo-400',
      link: 'https://youtu.be/j6A_h_n3Cjw',
      secondaryLink: 'https://devpost.com/software/recora-ai-powered-personal-health-record-manager?ref_content=user-portfolio&ref_feature=in_progress',
      linkLabels: { primary: 'Watch Demo', secondary: 'View on Devpost' }
    },
    {
      id: 2,
      title: 'HackaTwin - Hackathon Management',
      description:
        'Comprehensive hackathon management system built with FastAPI and Next.js, featuring local LLM integration. Achieved 43% email open rate and streamlined event organization for technical competitions.',
      techStack: ['FastAPI', 'Next.js', 'LLM', 'Python'],
      img: HackTwImg,
      colorClass: 'stone-400',
      link: '#',
    },
    {
      id: 3,
      title: 'Recora - Privacy-First Health Assistant',
      description:
        'AI-powered health assistant using Large Language Models and React, focusing on user privacy and data security. Secured Top 10 position among 800+ teams at MIT AI Hackathon.',
      techStack: ['React', 'LLMs', 'Python', 'AI/ML'],
      img: RecoraImg,
      slideImages: [RecoraImg, RecoraImg2],
      colorClass: 'amber-400',
      link: 'https://devpost.com/software/recora-ai-powered-personal-health-record-manager?ref_content=user-portfolio&ref_feature=in_progress',
      achievement: '🏅 Top 10 - MIT AI Hackathon (800+ teams)',
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
      title: 'MindMate - AI Mental Health Companion',
      description:
        '1st Prize winner at Tech Frontier Industry 4.0! AI-powered mental health companion that blends emotional well-being with intelligent technology. Featured at 21st ICDCIT 2025 and evolved into an accessible, empathetic mental health support solution.',
      techStack: ['AI/ML', 'Natural Language Processing', 'React', 'Python', 'Mental Health Tech'],
      img: MindImg,
      slideImages: [MindImg, MindImg2],
      colorClass: 'green-400',
      link: '#',
      achievement: '🏆 1st Prize - Tech Frontier Industry 4.0',
    },
    {
      id: 6,
      title: 'Women Safety Analytics',
      description:
        'CCTV-integrated anomaly detection system using AI/ML and OpenCV for Smart India Hackathon. Real-time monitoring and alert system to enhance women safety in public spaces.',
      techStack: ['Python', 'OpenCV', 'AI/ML', 'Computer Vision'],
      img: WomenImg,
      colorClass: 'red-400',
      link: '#',
    },
  ];