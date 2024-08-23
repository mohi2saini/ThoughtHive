import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            console.log("Attempting to fetch current user...");
            const user = await this.account.get();
            console.log("Fetched user data:", user);
            return user;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error.message);
            console.error("Error details:", error);
    
            if (error.response) {
                console.log("Response error status:", error.response.status);
                console.log("Response error data:", error.response.data);
            }
    
            if (error.code === 401) {
                console.log("User is not authenticated. Redirecting to login...");
                // Optionally, you can redirect to the login page here
                // window.location.href = '/login';
            } else {
                console.log("An unexpected error occurred while fetching the current user.");
            }
        }
    
        return null;
    }
    
    

    async logout() {

        try {
            await this.account.deleteSessions();
            console.log("Logged out successfully");
            window.location.href = '/';
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

