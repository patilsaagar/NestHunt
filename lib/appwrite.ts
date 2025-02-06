import Config from "react-native-config";
import {
  Client,
  Account,
  ID,
  Avatars,
  OAuthProvider,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

// Check if environment variables are loaded
const projectId = Config.REACT_NATIVE_APPWRITE_PROJECT_ID;
const platform = Config.REACT_NATIVE_APPWRITE_PROJECT_PLATFORM;
const endpoint = Config.REACT_NATIVE_APPWRITE_PROJECT_ENDPOINT;

if (!projectId || !platform || !endpoint) {
    console.error("Environment variables:", {
        projectId,
        platform,
        endpoint
    });
    throw new Error("Missing Appwrite configuration. Please check your .env file");
}

export const config = {
    projectId,
    platform,
    endpoint
};

const client = new Client();

// Initialize the client
try {
    client
        .setEndpoint(endpoint)
        .setProject(projectId);
} catch (error) {
    console.error("Failed to initialize Appwrite client:", error);
    throw error;
}

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL("/");
        console.log("Redirect URI:", redirectUri);

        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );
        if (!response) throw new Error("Create OAuth2 token failed");

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );
        if (browserResult.type !== "success")
            throw new Error("Create OAuth2 token failed");

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();
        if (!secret || !userId) throw new Error("Create OAuth2 token failed");

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error("Failed to create session");

        return true;
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
}
