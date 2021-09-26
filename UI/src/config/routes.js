import AdminDashboard  from '../containers/AdminDashboard';
import UserDashboard  from '../containers/UserDashboard';
import SpeechToText  from '../containers/SpeechToText';
import UserManagement  from '../containers/UserManagement';
import AudioAndFileManagement  from '../containers/AudioAndTextFileManagement';
const AUDIO_AND_TEXT_FILEMANAGEMENT_SCREEN_PATH = '/admininfo';
const USER_MANAGEMENT_SCREEN_PATH = '/user-management';
const SPEECH_TO_TEXT_SCREEN_PATH = '/speech-to-text'

export {
    AUDIO_AND_TEXT_FILEMANAGEMENT_SCREEN_PATH,
    USER_MANAGEMENT_SCREEN_PATH,
    SPEECH_TO_TEXT_SCREEN_PATH
}

export const adminRoutes = [
    {
        component: AudioAndFileManagement,
        name: 'Audio & Text File Management',
        path: AUDIO_AND_TEXT_FILEMANAGEMENT_SCREEN_PATH,
        layout: '/admin'
    },
    {
        component: UserManagement,
        name: 'User Management',
        path: USER_MANAGEMENT_SCREEN_PATH,
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
        path: SPEECH_TO_TEXT_SCREEN_PATH,
        layout: '/user'
    }

]