import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, Variants } from "framer-motion"; 

export default function NotFoundScreen() {
  const navigate = useNavigate();

  // Animation variants for text and button
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut", // <- permitido, mas precisa tipagem correta
    },
  },
};


  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F628E] to-[#113247] animate-gradient"></div>

      {/* Particle Effect */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <g>
            {[...Array(10)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 1000}
                cy={Math.random() * 1000}
                r="3"
                fill="#ffffff"
                fillOpacity="0.5"
                className="animate-particle"
                style={{
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="max-w-3xl text-center flex flex-col items-center relative z-10">
        {/* Illustration: Lost Astronaut */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-64 h-64 mb-8"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background Stars */}
            <g>
              {[...Array(5)].map((_, i) => (
                <circle
                  key={i}
                  cx={20 + i * 40}
                  cy={30 + Math.random() * 20}
                  r="2"
                  fill="#ffffff"
                  className="animate-twinkle"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </g>

            {/* Astronaut */}
            <g transform="translate(50 50) scale(0.6)">
              {/* Helmet */}
              <circle cx="100" cy="80" r="40" fill="#ffffff" stroke="#1F628E" strokeWidth="5" />
              <circle cx="100" cy="80" r="30" fill="#1F628E" opacity="0.2" />
              {/* Body */}
              <path
                d="M100 120 Q90 150 80 180 H120 Q110 150 100 120 Z"
                fill="#ffffff"
                stroke="#1F628E"
                strokeWidth="5"
              />
              {/* Arms */}
              <path d="M80 130 L60 160" stroke="#1F628E" strokeWidth="5" strokeLinecap="round" />
              <path d="M120 130 L140 160" stroke="#1F628E" strokeWidth="5" strokeLinecap="round" />
              {/* Legs */}
              <path d="M90 180 L85 200" stroke="#1F628E" strokeWidth="5" strokeLinecap="round" />
              <path d="M110 180 L115 200" stroke="#1F628E" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>

        {/* Content */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-6xl sm:text-7xl font-bold text-white mb-4 drop-shadow-md"
        >
          404
        </motion.h1>
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-2xl sm:text-3xl font-semibold text-white mb-6 drop-shadow-md"
        >
          Página Não Encontrada
        </motion.h2>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-lg sm:text-xl text-gray-100 mb-8 max-w-md drop-shadow-sm"
        >
          Oops! Parece que você seguiu um link incorreto ou a página foi removida.
        </motion.p>

        {/* Back Button */}
        <motion.button
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={buttonVariants}
          onClick={() => navigate(-1)}
          className="bg-[#1F628E] text-white px-6 py-3 cursor-pointer rounded-lg font-semibold uppercase flex items-center gap-2 hover:bg-[#17425f] transition-colors duration-200 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar à Página Anterior
        </motion.button>
      </div>
    </div>
  );
}

// CSS for Animations (to be added in your global CSS file or a style block)
const styles = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 10s ease infinite;
  }

  @keyframes particle {
    0% { transform: translateY(0) scale(1); opacity: 0.5; }
    50% { transform: translateY(-50px) scale(1.2); opacity: 1; }
    100% { transform: translateY(-100px) scale(0.8); opacity: 0; }
  }

  .animate-particle {
    animation: particle infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  .animate-twinkle {
    animation: twinkle 2s infinite;
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}