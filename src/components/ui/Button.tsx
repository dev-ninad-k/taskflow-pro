// type ButtonProps = {
//   children: React.ReactNode;
//   onClick?: () => void;
// };

// function Button({ children, onClick }: ButtonProps) {
//   return (
//     <button
//       className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// }

// export default Button;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        rounded-md px-4 py-2 font-medium text-white transition
        bg-blue-600 hover:bg-blue-700
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
