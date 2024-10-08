// components/Chip.tsx
import React from 'react';

type ChipColor = 'green' | 'blue' | 'red' | 'yellow';
type ChipSize = 'small' | 'medium' | 'large';

interface ChipProps {
  color?: ChipColor;
  size?: ChipSize;
  label: string;
}

const Chip: React.FC<ChipProps> = ({
  color = 'green',
  size = 'medium',
  label,
}) => {
  const colorStyles = {
    green: {
      background: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-800',
    },
    blue: {
      background: 'bg-blue-100',
      text: 'text-blue-800',
      dot: 'bg-blue-800',
    },
    red: {
      background: 'bg-red-100',
      text: 'text-red-800',
      dot: 'bg-red-800',
    },
    yellow: {
      background: 'bg-yellow-100',
      text: 'text-yellow-800',
      dot: 'bg-yellow-800',
    },
  };

  const sizeStyles = {
    small: 'py-0.5 px-2 text-xs',
    medium: 'py-1 px-3 text-sm',
    large: 'py-1.5 px-4 text-lg',
  };

  const { background, text, dot } = colorStyles[color];
  const sizeClass = sizeStyles[size];

  return (
    <div
      className={`rounded-md flex items-center ${background} ${sizeClass} border border-transparent transition-all shadow-sm ${text}`}
    >
      <div className={`mx-auto block h-2 w-2 rounded-full ${dot} mr-2`} />
      {label}
    </div>
  );
};

export default Chip;
