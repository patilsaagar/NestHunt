import Config from "react-native-config";
import {
  Client,
  Account,
  ID,
  Avatars,
  OAuthProvider,
  Databases,
  Storage,
  Query,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.sandbox.nesthunt",
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "67a321f40027f7bb0a2b",
  databaseId: "67a59b5c003327de861d",
  galleriesCollectionId: "67a59bec000e72d007a9",
  reviewsCollectionId: "67a59c3f0011ea4f9eb0",
  agentsCollectionId: "67a59b7900212a4b6681",
  propertiesCollectionId: "67a59c8c003bec6a17b2",
};

const client = new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);

try {
  client
    .setEndpoint("https://cloud.appwrite.io/v1"!)
    .setProject("67a49e6c003acdea1355"!)
    .setPlatform("com.sandbox.nesthunt"!);
} catch (error) {
  console.error("Failed to initialize Appwrite client:", error);
  throw error;
}

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/entry");

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
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
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

export const logout = async () => {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getLatestProperties = async () => {
  try {
    const result = await databases.listDocuments(
      "67a59b5c003327de861d",
      "67a59c8c003bec6a17b2",
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );
    return result.documents;
  } catch (error) {
    console.error("Error fetching latest properties:", error);
    return [];
  }
};

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      "67a59b5c003327de861d",
      "67a59c8c003bec6a17b2",
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      "67a59b5c003327de861d",
      "67a59c8c003bec6a17b2",
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
