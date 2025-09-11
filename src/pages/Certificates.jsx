import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Star, BookOpen, Code, Brain, Trophy, CheckCircle, FileText, User, Building, FolderOpen, FileCheck, Shield, Zap, Target } from "lucide-react";

const certificatesData = [
  {
    id: 1,
    title: "MindMate - 1st Prize Winner",
    issuer: "Tech Frontier Industry 4.0",
    date: "2025",
    category: "technical",
    description: "1st Prize for AI-powered mental health companion that blends emotional well-being with intelligent technology.",
    skills: ["AI/ML", "Mental Health Tech", "NLP", "Innovation"],
    verified: true,
    achievement: "1st Prize Winner"
  },
  {
    id: 2,
    title: "ICDCIT 2025 Research Presentation",
    issuer: "21st ICDCIT Conference",
    date: "2025",
    category: "academic",
    description: "Presented MindMate mental health innovation at international conference.",
    skills: ["Research", "Academic Presentation", "Innovation"],
    verified: true
  },
  {
    id: 3,
    title: "AI Engineer Certification",
    issuer: "OneRoadmap",
    date: "May 2025",
    category: "technical",
    description: "Professional AI Engineer certification covering machine learning, deep learning, and AI system design principles.",
    skills: ["AI/ML", "Deep Learning", "Machine Learning", "AI Systems"],
    credentialId: "CERT-73145AA6",
    verificationLink: "https://oneroadmap.io/skills/ai/certificate/CERT-73145AA6",
    verified: true
  },
  {
    id: 4,
    title: "CSS Certification",
    issuer: "OneRoadmap",
    date: "May 2025",
    category: "technical",
    description: "Comprehensive CSS certification covering advanced styling, animations, and responsive design techniques.",
    skills: ["CSS", "Responsive Design", "Web Development", "Frontend"],
    credentialId: "CERT-D0D0AAF7",
    verificationLink: "https://oneroadmap.io/skills/css/certificate/CERT-D0D0AAF7",
    verified: true
  },
  {
    id: 5,
    title: "Cloud Computing Certification",
    issuer: "Infosys Springboard",
    date: "May 2025",
    category: "technical",
    description: "Professional certification in cloud computing fundamentals, architecture, and deployment strategies.",
    skills: ["Cloud Computing", "AWS", "Cloud Architecture", "DevOps"],
    verified: true
  },
  {
    id: 6,
    title: "MongoDB Certification",
    issuer: "Infosys Springboard",
    date: "May 2025",
    category: "technical",
    description: "Database certification covering MongoDB operations, data modeling, and database optimization.",
    skills: ["MongoDB", "NoSQL", "Database Design", "Data Modeling"],
    verified: true
  },
  {
    id: 7,
    title: "TechNova: Igniting Brilliance Qualifier",
    issuer: "Unstop",
    date: "Sep 2024",
    category: "technical",
    description: "Certificate of participation in qualifier round of TechNova: Igniting Brilliance (Season 1) competition.",
    skills: ["Problem Solving", "Competitive Programming", "Technical Skills"],
    credentialId: "ba723041-6599-4388-88d0-a3e147bfb8a5",
    verified: true
  },
  {
    id: 8,
    title: "AWS Skill Builder Course",
    issuer: "Amazon Web Services (AWS)",
    date: "2024",
    category: "technical",
    description: "Completed AWS Skill Builder Course covering cloud fundamentals and core AWS services. Insightful journey into cloud computing!",
    skills: ["AWS", "Cloud Computing", "Cloud Fundamentals", "AWS Services"],
    verified: true,
    achievement: "Course Completion"
  }
];

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  const categories = [
    { id: "all", label: "All" },
    { id: "technical", label: "Technical" },
    { id: "academic", label: "Academic" }
  ];

  const filteredCertificates = selectedCategory === "all" 
    ? certificatesData 
    : certificatesData.filter(cert => cert.category === selectedCategory);

  const currentCert = filteredCertificates[currentCertIndex] || certificatesData[0];

  return (
    <div className="w-full h-[400px] sm:h-[480px] md:h-[520px] lg:h-[580px] bg-gray-200 p-1 sm:p-2 overflow-hidden flex flex-col">
      {/* Notepad Window Frame */}
      <div className="flex-1 bg-white border-2 border-gray-400 border-t-gray-100 border-l-gray-100 shadow-lg flex flex-col">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-1 sm:px-2 py-1 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            <FileText size={12} className="sm:w-4 sm:h-4" />
            <span className="truncate max-w-[150px] sm:max-w-none">{currentCert.title} - Certificates.txt</span>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-gray-100 border-b border-gray-300 px-1 sm:px-2 py-1 text-xs">
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="hidden sm:flex gap-4">
              <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">File</span>
              <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">Edit</span>
              <span className="hover:bg-gray-200 px-2 py-1 cursor-pointer">View</span>
            </div>
            <div className="flex gap-1 sm:gap-2 ml-auto overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentCertIndex(0);
                  }}
                  className={`px-1 sm:px-2 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-blue-200 text-blue-800'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Bar for Certificates */}
        <div className="bg-gray-100 border-b border-gray-300 flex overflow-x-auto scrollbar-hide">
          {filteredCertificates.map((cert, index) => (
            <button
              key={cert.id}
              onClick={() => setCurrentCertIndex(index)}
              className={`flex-shrink-0 px-2 sm:px-3 py-1 sm:py-2 text-xs border-r border-gray-300 transition-colors ${
                index === currentCertIndex
                  ? 'bg-white text-black border-b-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={cert.title}
            >
              <div className="flex items-center gap-1 max-w-[80px] sm:max-w-[120px]">
                {cert.achievement ? (
                  <Trophy size={8} className="sm:w-3 sm:h-3 text-yellow-600 flex-shrink-0" />
                ) : cert.category === 'technical' ? (
                  <Code size={8} className="sm:w-3 sm:h-3 text-blue-600 flex-shrink-0" />
                ) : (
                  <BookOpen size={8} className="sm:w-3 sm:h-3 text-green-600 flex-shrink-0" />
                )}
                <span className="truncate text-xs">
                  {cert.title.length > 10 ? `${cert.title.substring(0, 10)}...` : cert.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Text Content Area with Clickable Links */}
        <div className="flex-1 bg-white p-1 sm:p-3 overflow-auto">
          <div className="flex gap-1 sm:gap-3">
            {/* Icon Sidebar - Hidden on very small screens */}
            <div className="hidden sm:flex flex-col gap-2 sm:gap-3 pt-1">
              <User size={10} className="sm:w-4 sm:h-4 text-blue-600" title="Profile" />
              <div className="h-2 sm:h-4" />
              <FileCheck size={10} className="sm:w-4 sm:h-4 text-green-600" title="Certificate" />
              <div className="h-1 sm:h-3" />
              <Award size={10} className="sm:w-4 sm:h-4 text-purple-600" title="Title" />
              <Building size={10} className="sm:w-4 sm:h-4 text-gray-600" title="Issuer" />
              <Calendar size={10} className="sm:w-4 sm:h-4 text-orange-600" title="Date" />
              <FolderOpen size={10} className="sm:w-4 sm:h-4 text-blue-600" title="Category" />
              <div className="h-1 sm:h-3" />
              <FileText size={10} className="sm:w-4 sm:h-4 text-gray-600" title="Description" />
              <div className="h-8 sm:h-16" />
              <Target size={10} className="sm:w-4 sm:h-4 text-green-600" title="Skills" />
              <div className="flex flex-col gap-1 mt-3 sm:mt-6">
                {currentCert.credentialId && (
                  <Shield size={10} className="sm:w-4 sm:h-4 text-blue-600" title="Credential ID" />
                )}
                {currentCert.verificationLink && (
                  <Zap size={10} className="sm:w-4 sm:h-4 text-purple-600" title="Verification Link" />
                )}
                {currentCert.achievement && (
                  <Trophy size={10} className="sm:w-4 sm:h-4 text-yellow-600" title="Achievement" />
                )}
                {currentCert.verified && (
                  <CheckCircle size={10} className="sm:w-4 sm:h-4 text-green-600" title="Verified" />
                )}
              </div>
            </div>

            {/* Text Content with Clickable Elements */}
            <div className="flex-1 font-mono text-xs leading-relaxed text-gray-800">
              <div className="whitespace-pre-line">
                <div className="font-bold text-blue-800 text-xs sm:text-sm">CERTIFICATES & ACHIEVEMENTS - Ankita Rahi</div>
                <div className="text-gray-600">{`${'='.repeat(30)}`}</div>
                <div className="mt-1 sm:mt-2"></div>
                
                <div className="text-gray-600 text-xs">Certificate {currentCertIndex + 1} of {filteredCertificates.length}</div>
                <div className="mt-1 sm:mt-2"></div>
                
                <div className="text-xs sm:text-sm"><span className="text-purple-600 font-semibold">Title:</span> {currentCert.title}</div>
                <div className="text-xs sm:text-sm"><span className="text-gray-600 font-semibold">Issuer:</span> {currentCert.issuer}</div>
                <div className="text-xs sm:text-sm"><span className="text-orange-600 font-semibold">Date:</span> {currentCert.date}</div>
                <div className="text-xs sm:text-sm"><span className="text-blue-600 font-semibold">Category:</span> {currentCert.category.toUpperCase()}</div>
                <div className="mt-1 sm:mt-2"></div>
                
                <div className="text-gray-600 font-semibold text-xs sm:text-sm">Description:</div>
                <div className="text-gray-800 ml-1 sm:ml-2 text-xs sm:text-sm leading-tight">{currentCert.description}</div>
                <div className="mt-1 sm:mt-2"></div>
                
                <div className="text-green-600 font-semibold text-xs sm:text-sm">Skills Demonstrated:</div>
                <div className="ml-1 sm:ml-4 text-xs sm:text-sm">
                  {currentCert.skills.map((skill, idx) => (
                    <div key={idx} className="text-gray-700">• {skill}</div>
                  ))}
                </div>
                <div className="mt-1 sm:mt-2"></div>
                
                {currentCert.credentialId && (
                  <div className="text-xs sm:text-sm"><span className="text-blue-600 font-semibold">Credential ID:</span> {currentCert.credentialId}</div>
                )}
                
                {currentCert.verificationLink && (
                  <div className="mt-1 text-xs sm:text-sm">
                    <span className="text-purple-600 font-semibold">Verification Link:</span>{' '}
                    <a 
                      href={currentCert.verificationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-700 cursor-pointer break-all"
                    >
                      View Certificate
                    </a>
                  </div>
                )}
                
                {currentCert.achievement && (
                  <div className="text-xs sm:text-sm"><span className="text-yellow-600 font-semibold">Achievement:</span> {currentCert.achievement}</div>
                )}
                
                {currentCert.verified && (
                  <div className="text-xs sm:text-sm"><span className="text-green-600 font-semibold">Status:</span> <span className="text-green-700 font-bold">VERIFIED</span></div>
                )}
                
                <div className="mt-2 sm:mt-3 text-gray-500">{`${'─'.repeat(30)}`}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-100 border-t border-gray-300 px-1 sm:px-3 py-1 sm:py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="hidden sm:inline">Navigate:</span>
            <button
              onClick={() => setCurrentCertIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length)}
              className="px-1 sm:px-2 py-1 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded text-xs"
            >
              ← <span className="hidden sm:inline">Prev</span>
            </button>
            <button
              onClick={() => setCurrentCertIndex((prev) => (prev + 1) % filteredCertificates.length)}
              className="px-1 sm:px-2 py-1 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded text-xs"
            >
              <span className="hidden sm:inline">Next</span> →
            </button>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="https://www.linkedin.com/in/ankitarahi1477/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-1 sm:px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 rounded text-xs"
            >
              <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="hidden sm:inline">All Certificates</span>
              <span className="sm:hidden">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-200 border-t border-gray-400 px-1 sm:px-3 py-1 text-xs text-gray-600 flex justify-between">
          <span>Tab {currentCertIndex + 1}</span>
          <span className="hidden sm:inline">{filteredCertificates.length} certificates loaded</span>
          <span className="sm:hidden">{filteredCertificates.length}</span>
          <span className="truncate max-w-[80px] sm:max-w-none">{currentCert.category}</span>
        </div>
      </div>
    </div>
  );
}
