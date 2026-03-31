import React from 'react';
import './UiverseButton.css';

interface UiverseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
}

export const UiverseButton: React.FC<UiverseButtonProps> = ({ text, icon, className = '', ...props }) => {
  const letters = text.split('');

  return (
    <button className={`uiverse-btn ${className}`} {...props}>
      <div className="text text-foreground">
        {letters.map((letter, i) => (
          <span key={i}>{letter === ' ' ? '\u00A0' : letter}</span>
        ))}
      </div>
      <div className="clone text-primary">
        {letters.map((letter, i) => (
          <span key={i} style={{ transitionDelay: `${0.15 + i * 0.05}s` }}>
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
      {icon || (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      )}
    </button>
  );
};
