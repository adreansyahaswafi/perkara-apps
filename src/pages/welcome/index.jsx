import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className='w-full flex items-center justify-center bg-white p-4'>
            <div
                className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-400 to-red-200 rounded-2xl shadow-2xl w-full max-w-2xl h-80 flex items-center justify-center p-8 transition-all duration-700 hover:shadow-blue-500/20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Animated background elements */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30 transition-transform duration-700 transform" />
                <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-sky-400 rounded-full blur-3xl opacity-30 transition-transform duration-700 ${isHovered ? 'scale-125' : 'scale-100'}`} />

                {/* Content container */}
                <div className="relative z-10 max-w-4xl w-full">
                    <div className="text-center flex flex-col gap-8">
                        {/* Title section */}
                        <div
                            className={`transform transition-all duration-1000 ease-out
                                ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
                        >
                            <div className="flex flex-col items-center justify-center gap-4 mb-2">
                                <h1 className={`text-5xl font-bold text-white transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
                                    Selamat Datang
                                </h1>
                                <div className={`transition-all duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
                                    <div className='animate-bounce'>
                                        {/* <CustomSVG height={32} width={32} /> */}
                                    </div>
                                </div>
                            </div>

                            {/* Animated underline */}
                            {/* <div className={`h-1 bg-white/30 rounded-full mx-auto transition-all duration-700 ${isHovered ? 'w-32 bg-white/50' : 'w-24'}`} /> */}
                        </div>

                        {/* Description */}

                        {/* Call to action button */}
                        <button
                            onClick={() => navigate('/beranda')}
                            type='button'
                            className={`mx-auto text-base cursor-pointer px-8 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white font-medium
                                transition-all duration-500 hover:bg-white/20 hover:shadow-lg hover:scale-105
                                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        >
                            Ayo Mulai
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;