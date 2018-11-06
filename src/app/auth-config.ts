import { environment } from './../environments/environment';

export const AuthConfig = {
    loginUrl : environment.apiUrl + 'auth/login',
    tokenPrefix : '',
    tokenName : 'access_token',
    signupUrl : environment.apiUrl + 'auth/register'
}
