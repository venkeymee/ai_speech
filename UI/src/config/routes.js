import AdminDashboard  from '../containers/AdminDashboard';
import UserDashboard  from '../containers/UserDashboard';
import SpeechToText  from '../containers/SpeechToText';
import UserManagement  from '../containers/UserManagement';
import AudioAndFileManagement  from '../containers/AudioAndTextFileManagement';

export const adminRoutes = [
    {
        component: AudioAndFileManagement,
        name: 'Audio & Text File Management',
        path: '/admininfo',
        layout: '/admin'
    },
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