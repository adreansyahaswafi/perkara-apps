
const ErrorPage = () => {
    return (
        <div className="flex justify-center relative top-12">
            <div className="flex items-center gap-4 border border-gray-100 shadow-md rounded-md px-4 py-4 text-center">
                <div className="mx-auto h-22">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="100" cy="100" r="96" stroke="#ff6467" strokeWidth="8" className="animate-pulse" />
                        <path
                            d="M60 60L140 140M140 60L60 140"
                            stroke="#ff6467"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-left flex flex-col gap-2">
                        <h1 className="text-3xl font-extrabold text-red-400 tracking-tight">
                            404
                        </h1>
                        <h2 className="text-xl font-bold text-gray-500">
                            Page Not Found
                        </h2>
                        <p className="text-base text-gray-500">
                            Oops! The page you looking for  exist or has been moved.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-full cursor-pointer sm:w-auto flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;