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

const client = new Client();

// Initialize the client
try {
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67a438f20008358d3317");
} catch (error) {
  console.error("Failed to initialize Appwrite client:", error);
  throw error;
}

export const avatar = new Avatars(client);
export const account = new Account(client);

export const login =  async () => {
  try {
    // Check if user is already logged in
    const existingUser = await getCurrentUser();
    if (existingUser) {
      console.log("User is already logged in:", existingUser);
      return true; // No need to log in again
    }

    const redirectUri = Linking.createURL("/");

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

    // Create a new session only if no session exists
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getCurrentUser =  async () => {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logout =  async () => {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}