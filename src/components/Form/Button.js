export const Button = ({ children, ...otherProps }) => {
    return (
        <button
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            {...otherProps}
        >
            {children}
        </button>
    );
};
