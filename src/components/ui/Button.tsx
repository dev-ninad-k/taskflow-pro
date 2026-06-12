type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
