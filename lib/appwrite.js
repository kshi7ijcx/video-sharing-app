import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io.v1",
  platform: "com.kcx.aora",
  projectId: "66b9b3a30032566929bd",
  databaseId: "66b9b65c00173f82423c",
  userCollectionId: "66b9b6c300232c8dd7e8",
  videoCollectionId: "66b9b6f9002698c7a292",
  storageId: "66b9bd59001a27548dfc",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

export const createUser = async () => {
  try {
    const newAcc = await account.create(ID.unique(), email, password, username);
    if (!newAcc) throw Error;
    const avatarUrl = avatar.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAcc.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
