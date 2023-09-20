let ACCEPTED_EMAIL_DOMAINS_CSV = import.meta.env.VITE_ACCEPTED_EMAIL_DOMAINS_CSV;

//split the accepted email domains into an array
const ACCEPTED_EMAIL_DOMAINS = ACCEPTED_EMAIL_DOMAINS_CSV.split(',');

export default function validateEmailDomain(email) {
    const emailDomain = email.split('@')[1];
    return ACCEPTED_EMAIL_DOMAINS.includes(emailDomain);
}