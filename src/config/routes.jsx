import Loadable from '../helper/Loadable';
import React from 'react';
// import Error404 from 'page/error/Error404';

/*public components*/
const Login = Loadable(React.lazy(() => import('../pages/login')));
const ForgotPassword = Loadable(React.lazy(() => import('../pages/forgot-password')));

const Welcome = Loadable(React.lazy(() => import('../pages/welcome')));

const Dashboard = Loadable(React.lazy(() => import('../pages/dashboard')));

const UserAccount = Loadable(React.lazy(() => import('../pages/user')));
const UserAccountCreate = Loadable(React.lazy(() => import('../pages/user/form')));
const UserAccountDetail = Loadable(React.lazy(() => import('../pages/user/detail')));

const ReportAccount = Loadable(React.lazy(() => import('../pages/police_report')));
const ReportAccountCreate = Loadable(React.lazy(() => import('../pages/police_report/form')));
const ReportAccountDetail = Loadable(React.lazy(() => import('../pages/police_report/detail')));

const ReportAccountPolice = Loadable(React.lazy(() => import('../pages/register_police_report')));
const ReportAccountPoliceCreate = Loadable(React.lazy(() => import('../pages/register_police_report/form')));
const ReportAccountPoliceDetail = Loadable(React.lazy(() => import('../pages/register_police_report/detail')));

const PoliceCrime = Loadable(React.lazy(() => import('../pages/kejahatan')));
const PoliceCrimeCreate = Loadable(React.lazy(() => import('../pages/kejahatan/form')));
const PoliceCrimeDetail = Loadable(React.lazy(() => import('../pages/kejahatan/detail')));

const TahananPolice = Loadable(React.lazy(() => import('../pages/tahanan')));
const TahananPoliceCreate = Loadable(React.lazy(() => import('../pages/tahanan/form')));
const TahananPoliceDetail = Loadable(React.lazy(() => import('../pages/tahanan/detail')));

const Error = Loadable(React.lazy(() => import('../pages/error')));

const GenerateTitle = (name) => `${name}`;

const publicRoute = [
    { exact: true, path: '/login', name: GenerateTitle('Login'), component: Login },
    { exact: true, path: '/forgot-password', name: GenerateTitle('Forgot Password'), component: ForgotPassword },
]
const privateRoute = [
    { exact: true, path: '/', name: GenerateTitle('Welcome'), component: Welcome, access: "welcome", action: 'read' },

    { exact: true, path: '/beranda', name: GenerateTitle('Dashboard Default'), component: Dashboard, access: "dashboard", action: 'read' },

    { exact: true, path: '/user', name: GenerateTitle('User'), component: UserAccount, access: "user", action: 'read' },
    { exact: true, path: '/user/create', name: GenerateTitle('Buat User'), component: UserAccountCreate, access: "user", action: 'read' },
    { exact: true, path: '/user/:id', name: GenerateTitle('Detail User'), component: UserAccountDetail, access: "user", action: 'read' },
    { exact: true, path: '/user/:id/edit', name: GenerateTitle('Edit User'), component: UserAccountCreate, access: "user", action: 'read' },

    { exact: true, path: '/laporan-polisi', name: GenerateTitle('Laporan Polisi'), component: ReportAccount, access: "laporan", action: 'read' },
    { exact: true, path: '/laporan-polisi/create', name: GenerateTitle('Buat Laporan Polisi'), component: ReportAccountCreate, access: "laporan", action: 'read' },
    { exact: true, path: '/laporan-polisi/:id', name: GenerateTitle('Detail Laporan'), component: ReportAccountDetail, access: "laporan", action: 'read' },
    { exact: true, path: '/laporan-polisi/:id/edit', name: GenerateTitle('Edit Laporan Polisi'), component: ReportAccountCreate, access: "laporan", action: 'read' },

    { exact: true, path: '/register-laporan-polisi', name: GenerateTitle('Register Laporan Polisi'), component: ReportAccountPolice, access: "register-laporan", action: 'read' },
    { exact: true, path: '/register-laporan-polisi/create', name: GenerateTitle('Buat Register Laporan Polisi'), component: ReportAccountPoliceCreate, access: "register-laporan", action: 'read' },
    { exact: true, path: '/register-laporan-polisi/:id', name: GenerateTitle('Detail Register Laporan Polisi'), component: ReportAccountPoliceDetail, access: "register-laporan", action: 'read' },
    { exact: true, path: '/register-laporan-polisi/:id/edit', name: GenerateTitle('Edit Register Laporan Polisi'), component: ReportAccountPoliceCreate, access: "register-laporan", action: 'read' },

    { exact: true, path: '/kejahatan', name: GenerateTitle('Kejahatan/Pelanggaran'), component: PoliceCrime, access: "kejahatan", action: 'read' },
    { exact: true, path: '/kejahatan/create', name: GenerateTitle('Buat Kejahatan/Pelanggaran'), component: PoliceCrimeCreate, access: "kejahatan", action: 'read' },
    { exact: true, path: '/kejahatan/:id', name: GenerateTitle('Detail Kejahatan/Pelanggaran'), component: PoliceCrimeDetail, access: "kejahatan", action: 'read' },
    { exact: true, path: '/kejahatan/:id/edit', name: GenerateTitle('Edit Kejahatan/Pelanggaran'), component: PoliceCrimeCreate, access: "kejahatan", action: 'read' },

    { exact: true, path: '/tahanan', name: GenerateTitle('Tahanan'), component: TahananPolice, access: "tahanan", action: 'read' },
    { exact: true, path: '/tahanan/create', name: GenerateTitle('Buat Tahanan'), component: TahananPoliceCreate, access: "tahanan", action: 'read' },
    { exact: true, path: '/tahanan/:id', name: GenerateTitle('Detail Tahanan'), component: TahananPoliceDetail, access: "tahanan", action: 'read' },
    { exact: true, path: '/tahanan/:id/edit', name: GenerateTitle('Edit Tahanan'), component: TahananPoliceCreate, access: "tahanan", action: 'read' },

    // { exact: true, path: '/operation-oc-137', name: GenerateTitle('OC 137'), component: Oc137, access: "oc-137", action: 'read' },

    // { exact: true, path: '/operation-oc-137', name: GenerateTitle('OC 137'), component: Oc137, access: "oc-137", action: 'read' },



    { exact: true, path: '/location', name: GenerateTitle('Location'), component: Location, access: "location", action: 'read' },

    // { exact: true, path: '/logout', name: GenerateTitle('Logout'), component: Logout },
    { exact: true, path: '*', name: GenerateTitle('Page Not Found'), component: Error },
]

export const RouteConfig = { 'public': publicRoute, 'private': privateRoute }

