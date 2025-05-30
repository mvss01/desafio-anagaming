interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  onHover?: (hovered: boolean) => void;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  onHover,
}) => {
  const handleMouseEnter = () => {
    if (onHover) onHover(true);
  };

  const handleMouseLeave = () => {
    if (onHover) onHover(false);
  };

  return (
    <button
      type="button"
      className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 transition ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-blue-500 hover:text-white"
      }`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};
