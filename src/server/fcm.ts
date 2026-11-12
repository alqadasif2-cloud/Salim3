/**
 * Firebase Cloud Messaging (FCM) Integration Stub & Device Registry
 */

export interface DeviceTokenRecord {
  token: string;
  userId: number;
  username?: string;
  deviceId?: string;
  platform?: string;
  deviceModel?: string;
  registeredAt: number;
  updatedAt: number;
}

const deviceTokens = new Map<string, DeviceTokenRecord>();

export async function registerDeviceToken(params: {
  token: string;
  userId: number;
  username?: string;
  deviceId?: string;
  platform?: string;
  deviceModel?: string;
}): Promise<DeviceTokenRecord> {
  const existing = deviceTokens.get(params.token);
  const now = Date.now();
  const record: DeviceTokenRecord = {
    token: params.token,
    userId: params.userId,
    username: params.username || existing?.username,
    deviceId: params.deviceId || existing?.deviceId,
    platform: params.platform || existing?.platform,
    deviceModel: params.deviceModel || existing?.deviceModel,
    registeredAt: existing?.registeredAt || now,
    updatedAt: now,
  };
  deviceTokens.set(params.token, record);
  return record;
}

export async function unregisterDeviceToken(
  userId: number,
  token?: string,
  deviceId?: string
): Promise<boolean> {
  if (token && deviceTokens.has(token)) {
    deviceTokens.delete(token);
    return true;
  }
  for (const [t, record] of deviceTokens.entries()) {
    if (record.userId === userId && (!deviceId || record.deviceId === deviceId)) {
      deviceTokens.delete(t);
    }
  }
  return true;
}

export async function sendNotificationToUsers(
  targetUserIds: (number | string)[],
  payload: {
    title: string;
    body: string;
    chatType?: string;
    data?: Record<string, string>;
  }
): Promise<{ success: boolean; sentCount: number }> {
  // In development/self-contained mode, log push notification
  console.log('[FCM] Notification dispatched:', {
    targets: targetUserIds,
    title: payload.title,
    body: payload.body,
  });
  return { success: true, sentCount: targetUserIds.length };
}

export async function dispatchAuthorizedChatPush(params: {
  senderId: number;
  senderName: string;
  senderRole?: string;
  chatType: 'channel' | 'private';
  channelId?: string;
  receiverId?: number;
  messageId: string;
  snippet: string;
}): Promise<{ delivered: boolean; recipientCount: number }> {
  console.log('[FCM] Chat push dispatched:', params);
  return { delivered: true, recipientCount: 1 };
}
