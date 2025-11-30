export interface AuthenticationResponse {
    token: string;
    user: {
        id: string;
        username: string;
        fullName: string;
        email: string;
        tel: string;
    };
}