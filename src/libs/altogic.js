import { createClient } from 'altogic';

const ENV_URL = import.meta.env.VITE_ALTOGIC_URL;
const CLIENT_KEY = import.meta.env.VITE_ALTOGIC_CLIENT_KEY;

const altogic = createClient(ENV_URL, CLIENT_KEY, {
    signInRedirect: '/login',
});

export default altogic;