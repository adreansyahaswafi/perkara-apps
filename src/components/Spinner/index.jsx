const Spinner = ({ color = 'text-sky-300' }) => {
    return (
        <div className="flex items-center justify-center h-[75%]">
            <div className={`inline-block relative ${color} w-8 h-8 border-4 border-current border-t-transparent border-r-transparent animate-spin rounded-full`}>
            </div>
        </div>
    );
};
export default Spinner;