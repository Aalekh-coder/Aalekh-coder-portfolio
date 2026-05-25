import { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export default function AnimatedHeading({ text, className = '' }: AnimatedHeadingProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // The whole animation starts after 200ms initial delay
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');
  const charDelay = 30; // 30ms

  return (
    <h1
      className={className}
      style={{ letterSpacing: '-0.04em', lineHeight: '1.1' }}
    >
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;
        const characters = line.split('');

        return (
          <span key={lineIndex} className="block">
            {characters.map((char, charIndex) => {
              const delay = (lineIndex * lineLength * charDelay) + (charIndex * charDelay);
              // Spaces render as \u00A0 (non-breaking space)
              const isSpace = char === ' ' || char === '\u00A0';
              const displayChar = isSpace ? '\u00A0' : char;

              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all ease-out"
                  style={{
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDuration: '500ms', // Each character transition is 500ms
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {displayChar}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
