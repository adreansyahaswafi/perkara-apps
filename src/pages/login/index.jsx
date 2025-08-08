import Form from '../../components/HooksForm/Form';
import Input from '../../components/HooksForm/Input';
import { Link, Navigate } from 'react-router-dom';
import useLogin from './hooks-integration/useLogin';
import { ArrowRightStartOnRectangleIcon, EnvelopeIcon, LockClosedIcon, StarIcon } from '@heroicons/react/24/outline';
import logo_krimsus from '../../assets/images/logo-krimsus.png'
const LoginPage = () => {
    // const [open, setopen] = useState(false);
    const { postBody, isPosible } = useLogin();
    const handleSubmit = (data) => {
        postBody({
            "email": data?.email,
            "password": data?.password
        });
    };
    const defaultValue = {
        email: "",
        password: ""
    }
    if (isPosible) return <Navigate to='/' />
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Moving Stars */}
                <div className="absolute top-10 left-10 animate-pulse">
                    <StarIcon className="w-4 h-4 text-blue-300 fill-current" />
                </div>
                <div className="absolute top-32 right-20 animate-pulse delay-1000">
                    <StarIcon className="w-3 h-3 text-blue-200 fill-current" />
                </div>
                <div className="absolute bottom-40 left-32 animate-pulse delay-2000">
                    <StarIcon className="w-5 h-5 text-blue-400 fill-current" />
                </div>
                <div className="absolute top-20 right-1/3 animate-pulse delay-500">
                    <StarIcon className="w-3 h-3 text-blue-300 fill-current" />
                </div>

                {/* Floating Orbs */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-bounce delay-300"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl animate-bounce delay-700"></div>
                <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-cyan-400/20 rounded-full blur-lg animate-bounce delay-1000"></div>

                {/* Gradient Waves */}
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-indigo-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    {/* Logo/Header Section */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                            {/* <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-full shadow-2xl">
                                <ShieldCheckIcon className="w-12 h-12 text-white" />
                            </div> */}
                            <div className="relative mb-4">
                                {/* Logo Circle */}
                                {/* <div className="w-44 h-44 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="text-center">
                                        <h1 className="text-white text-3xl font-bold tracking-wider">
                                            SIPIDTER
                                        </h1>
                                        <div className="w-36 h-1 bg-white mx-auto rounded-sm scale-x-[-1]" style={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 0% 0%)' }}></div>
                                    </div>
                                </div> */}
                            </div>
                        </div>                      
                    </div>
                    <img src={logo_krimsus} className='w-md absolute animate-fade-in left-0  top-0 z-50' alt='background' />
                    {/* Login Form */}
                    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 animate-slide-up">
                        <div className='text-center'>
                            <p className="text-blue-200 text-sm font-medium">
                                Sistem Informasi Tindak Pidana Tertentu
                            </p>
                            <p className="text-blue-200 text-sm font-medium">
                                Ditreskrimsus Polda Metro Jaya
                            </p>
                            <div className="mt-2 flex justify-center space-x-1">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit} defaultValues={defaultValue}>
                            <div className="mt-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Input
                                            suffix={
                                                <div className=" inset-y-0 flex justify-center h-10 w-10 items-center pointer-events-none">
                                                    <EnvelopeIcon className='h-5 w-5  text-white' />
                                                </div>
                                            }
                                            id="email"
                                            validation={['required']}
                                            name="email"
                                            type="text"
                                            className="text-sm overflow-hidden placeholder:text-white bg-transparent relative block w-full px-1 py-2 pl-3 text-white"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Input
                                            suffix={
                                                <div className=" inset-y-0 flex justify-center h-10 w-10 items-center pointer-events-none">
                                                    <LockClosedIcon className='h-5 w-5  text-white' />
                                                </div>
                                            }
                                            id="password"
                                            type={"password"}
                                            validation={['required']}
                                            name="password"
                                            className="text-sm relative block w-full px-1 py-2 pl-3 text-white"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 cursor-pointer text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                                            Ingat Saya
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <Link to="/forgot-password" className="font-medium text-white hover:text-sky-500">
                                            Lupa Password?
                                        </Link>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button
                                        type="submit"
                                        className="group cursor-pointer w-full relative flex gap-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                                    >
                                        <ArrowRightStartOnRectangleIcon className='h-5 w-5  text-white font-bold' />
                                        Masuk Ke Sistem
                                    </button>
                                </div>
                            </div>
                        </Form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <p className="text-blue-200 text-xs">
                                © 2024 Kepolisian Republik Indonesia
                            </p>
                            <div className="mt-2 flex justify-center space-x-4 text-blue-300">
                                <div className="w-1 h-1 bg-current rounded-full animate-ping"></div>
                                <div className="w-1 h-1 bg-current rounded-full animate-ping delay-300"></div>
                                <div className="w-1 h-1 bg-current rounded-full animate-ping delay-700"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;