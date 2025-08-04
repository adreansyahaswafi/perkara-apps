const Button = ({ children,...props }) => {
    return (
        <button
            {...props}
            className={`px-4 py-2 cursor-pointer ${props.className}`}
        >
            {children}
        </button>
    );
};

export default Button;