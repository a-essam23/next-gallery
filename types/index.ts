import session, { Session } from "express-session";
import { GetServerSidePropsContext, NextApiRequest } from "next";

export interface UserType {
    name?: string;
    _id?: string;
    role?: "admin" | "moderator" | "editor" | "user";
}

export interface CustomSession extends Session, UserType {}
export interface CustomNextApiRequest extends NextApiRequest {
    session: CustomSession | null; // Add the session property to the extended interface
}

export interface CustomServerSidePropsContext
    extends GetServerSidePropsContext {
    req: GetServerSidePropsContext["req"] & { session: CustomSession };
}

