import "express-session"

declare module 'express-session' {
    interface SessionData {
        // userId?: string; // Optional user ID to store in session
        email: string; // Optional email to store in session
        // isAuthenticated?: boolean; // Optional flag to indicate if the user is authenticated
    }
}