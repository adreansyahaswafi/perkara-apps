import Form from '../../components/HooksForm/Form';
import Input from '../../components/HooksForm/Input';
import { EnvelopeIcon, LockClosedIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { Navigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import bg from '../../assets/images/bg-bendera.png'
import useForgotPassword from './hooks-integration/useForgotPassword';

const LoginPage = () => {
    // const [open, setopen] = useState(false);
    const { postBody, isPosible } = useForgotPassword();
    const handleSubmit = (data) => {
        postBody({
            "email": data?.email,
            "newPassword": data?.password
        });
    };
    const defaultValue = {
        email: "",
        password: ""
    }
    if (isPosible) return <Navigate to='/' />
    return (
        <div className='flex'>
            <div className="min-h-screen w-full flex-1 relative flex items-center justify-center bg-sky-100 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-90">
                    <img src={bg} alt='bendera' className='w-full mb-2.5' />
                </div>

                {/* Login Card */}
                <div className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-sm p-10 pt-5 rounded-xl shadow-2xl border border-sky-200">
                    <div className="flex items-center gap-2 justify-center">
                        <img className='w-16 text-center flex justify-center items-center' src={logo} alt="logo" />
                        <h2 className="text-5xl text-center m-0 mt-4 font-medium text-gray-900">
                            <span className='text-gray-700'>SI</span><span className='text-red-500'>PERKARA</span>
                        </h2>
                    </div>
                    <div className='flex items-center justify-center mt-3 text-center'>
                        <LockClosedIcon className='h-5 text-gray-600' />
                        <span className='text-sm  text-gray-600'>Forgot Password</span>
                    </div>
                    <Form onSubmit={handleSubmit} defaultValues={defaultValue}>
                        <div className="mt-8 space-y-2">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Input
                                        suffix={
                                            <div className=" inset-y-0 flex justify-center bg-gray-400 h-10 w-10 items-center pointer-events-none">
                                                <EnvelopeIcon className='h-5 w-5  text-gray-600' />
                                            </div>}
                                        id="email"
                                        validation={['required']}
                                        name="email"
                                        type="text"
                                        className="text-sm relative block w-full px-1 py-2 pl-3 text-gray-900"
                                        placeholder="Email" />
                                </div>
                                <div className="relative">
                                    <Input
                                        suffix={
                                            <div className=" inset-y-0 flex justify-center bg-gray-400 h-10 w-10 items-center pointer-events-none">
                                                <LockClosedIcon className='h-5 w-5  text-gray-600' />
                                            </div>
                                        }
                                        id="password"
                                        type={"password"}
                                        validation={['required']}
                                        name="password"
                                        className="text-sm relative block w-full px-1 py-2 pl-3 text-gray-900"
                                        placeholder="New Password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="group cursor-pointer relative w-full flex gap-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 "
                                >
                                    <PaperAirplaneIcon className='h-5 w-5  text-white font-bold' />
                                    Simpan Password Baru
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;