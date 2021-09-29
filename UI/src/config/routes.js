import AdminDashboard  from '../containers/AdminDashboard';
import UserDashboard  from '../containers/UserDashboard';
import SpeechToText  from '../containers/SpeechToText';
import UserManagement  from '../containers/UserManagement';
import AudioAndFileManagement  from '../containers/AudioAndTextFileManagement';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import FileCopyIcon from '@material-ui/icons/FileCopy';

/** Constants */
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
        layout: '/admin',
        icon: <FileCopyIcon/>,
    },
    {
        component: UserManagement,
        name: 'User Management',
        path: USER_MANAGEMENT_SCREEN_PATH,
        layout: '/admin',
        icon: <AccountBoxIcon/>,
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
        layout: '/user',
        icon: <SettingsVoiceIcon/>,
    }

]