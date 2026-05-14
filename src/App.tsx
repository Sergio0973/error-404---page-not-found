/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Command } from 'lucide-react';

type Step = 'START' | 'SEQUENCE' | 'FINAL';

const MESSAGES = [
  "Gracias por cada enseñanza.",
  "Gracias por su paciencia diaria.",
  "Cada clase deja una huella.",
  "Su esfuerzo forma nuestro futuro.",
  "Enseñar también es inspirar."
];

export default function App() {
  const [step, setStep] = useState<Step>('START');
  const [messageIndex, setMessageIndex] = useState(0);

  const startSequence = () => {
    setStep('SEQUENCE');
  };

  useEffect(() => {
    if (step === 'SEQUENCE') {
      if (messageIndex < MESSAGES.length) {
        const timer = setTimeout(() => {
          setMessageIndex((prev) => prev + 1);
        }, 3000); // 3 seconds per message
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setStep('FINAL');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [step, messageIndex]);

  return (
    <div id="app-container" className="relative min-h-screen flex flex-col items-center justify-center font-sans tracking-tight selection:bg-white/20 select-none bg-[#030303] text-white overflow-hidden">
      {/* Background layer 1: Animated Gradient Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" id="mesh-gradient-container">
        <motion.div 
          className="gradient-sphere w-[500px] h-[500px] bg-blue-600/30 -top-24 -left-24"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="gradient-sphere w-[400px] h-[400px] bg-purple-600/20 bottom-0 right-0"
          animate={{ x: [0, -80, 0], y: [0, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="gradient-sphere w-[600px] h-[600px] bg-indigo-900/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Background layer 2: Digital Grid */}
      <div className="absolute inset-0 z-1 grid-pattern opacity-30 pointer-events-none" id="digital-grid" />

      {/* Background layer 3: Noise & Vignette */}
      <div className="noise z-2" id="noise-layer" />
      <div className="absolute inset-0 z-3 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" id="vignette" />
      
      <AnimatePresence mode="wait">
        {step === 'START' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center z-10 px-6"
            id="start-screen"
          >
            <motion.h1 
              className="font-display font-bold text-7xl md:text-9xl mb-4 tracking-tighter glow-text"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              id="title-404"
            >
              ERROR 404
            </motion.h1>
            <motion.p 
              className="text-white/60 text-lg md:text-xl font-light mb-12 tracking-wide font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              id="subtitle-error"
            >
              Profesor reemplazable no encontrado.
            </motion.p>
            
            <motion.button
              onClick={startSequence}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 border border-white/20 rounded-full font-sans font-medium text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm group cursor-pointer"
              id="open-message-btn"
            >
              <span className="relative z-10">[ ABRIR MENSAJE ]</span>
              <motion.div 
                className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                id="btn-hover-glow" 
              />
            </motion.button>
          </motion.div>
        )}

        {step === 'SEQUENCE' && (
          <motion.div
            key="sequence"
            className="flex flex-col items-center justify-center min-h-screen text-center z-10 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="sequence-screen"
          >
            <AnimatePresence mode="wait">
              {messageIndex < MESSAGES.length && (
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl md:text-4xl font-display font-light leading-relaxed glow-text italic"
                  id={`message-${messageIndex}`}
                >
                  {MESSAGES[messageIndex]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {step === 'FINAL' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center z-10 px-6 max-w-2xl"
            id="final-screen"
          >
            <motion.p 
              className="text-xl md:text-2xl font-light text-white/70 mb-8 font-sans"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
              id="thanks-p1"
            >
              No existe una forma suficiente de agradecerles.
            </motion.p>
            <motion.div 
              className="flex flex-col items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              id="thanks-p2-container"
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight glow-text flex items-center gap-4" id="final-title">
                Gracias Trainers <Heart className="w-8 h-8 md:w-12 md:h-12 text-red-500 fill-red-500 animate-pulse" id="heart-icon" />
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" id="particles-container">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 blur-xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            id={`particle-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
