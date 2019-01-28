import auth from './shared/sagas/auth';
import settings from './modules/Settings/sagas';
export default [...auth,...settings];
