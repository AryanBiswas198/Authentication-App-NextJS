export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyToken: string;
    verifyTokenExpiry: Date;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date;
}

export interface ApiResponse{
    success: boolean;
    message: string;
    token?: any;
    user?: IUser;
}