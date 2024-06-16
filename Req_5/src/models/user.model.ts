import mongoose, { Document } from "mongoose";

interface PrivacySettings {
  profileVisibility: string;
  activityVisibility: string;
  messagePermissions: string;
}

interface SecuritySettings {
  twoFactorAuthEnabled: boolean;
  backupCodes: string[];
}

export interface User extends Document {
  email: string;
  password: string;
  username: string;
  profileImage: string;
  bio: string;
  friends: any[];
  wishlist: any[];
  privacySettings: PrivacySettings;
  securitySettings: SecuritySettings;
  gameLibrary: any[];
  badges: any[];
  inventory: any[];
  screenshots: any[];
  videos: any[]; // D
  workshopItems: any[];
  reviews: any[];
  guides: any[];
  artwork: any[];
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  profileImage: { type: String },
  bio: { type: String },
  friends: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  wishlist: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  privacySettings: {
    type: {
      profileVisibility: { type: String, required: true },
      activityVisibility: { type: String, required: true },
      messagePermissions: { type: String, required: true },
    },
  },
  securitySettings: {
    type: {
      twoFactorAuthEnabled: { type: Boolean, required: true },
      backupCodes: { type: [String], default: [] },
    },
  },
  gameLibrary: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  badges: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  inventory: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  screenshots: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  videos: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  workshopItems: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  reviews: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  guides: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  artwork: { type: [mongoose.Schema.Types.ObjectId], default: [] },
});

const User = mongoose.model<User>("User", userSchema);
export default User;
