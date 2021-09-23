import AdminDashboard  from '../containers/AdminDashboard';
import UserDashboard  from '../containers/UserDashboard';
import SpeechToText  from '../containers/SpeechToText';
import UserManagement  from '../containers/UserManagement';

export const adminRoutes = [
    // {
    //     component: AdminDashboard,
    //     name: 'Admin Dashboard',
    //     path: '/admininfo',
    //     layout: '/admin'
    // },
    {
        component: UserManagement,
        name: 'User Management',
        path: '/user-management',
        layout: '/admin'
    }
]

export const userRoutes = [
    // {
    //     component: UserDashboard,
    //     name: 'User Dashboard',
    //     path: '/userinfo',
    //     layout: '/user'
    // },
    {
        component: SpeechToText,
        name: 'Speech To Text',
        path: '/speech-to-text',
        layout: '/user'
    }

]