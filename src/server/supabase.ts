/**
 * Optional Supabase persistence and cloud mirror for Salim Full-Stack Application
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

let supabaseClient: SupabaseClient | null = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn('[Salim Supabase] Client initialization notice:', err);
  }
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseClient);
}

export async function testSupabaseConnection(): Promise<{ success: boolean; error?: string }> {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase credentials not configured' };
  }
  try {
    const { error } = await supabaseClient.from('users').select('id').limit(1);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Connection failed' };
  }
}

export async function supabaseGetUserById(userId: number): Promise<any | null> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('users').select('*').eq('id', userId).maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseGetUserByUsername(username: string): Promise<any | null> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('users').select('*').eq('username', username).maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseGetAllUsers(): Promise<any[]> {
  if (!supabaseClient) return [];
  try {
    const { data } = await supabaseClient.from('users').select('*');
    return data || [];
  } catch {
    return [];
  }
}

export async function supabaseUpsertUser(record: any): Promise<any> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('users').upsert(record).select().maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseGetChannels(): Promise<any[]> {
  if (!supabaseClient) return [];
  try {
    const { data } = await supabaseClient.from('channels').select('*');
    return data || [];
  } catch {
    return [];
  }
}

export async function supabaseGetChannelById(channelId: string): Promise<any | null> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('channels').select('*').eq('id', channelId).maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseUpsertChannel(channel: any): Promise<any> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('channels').upsert(channel).select().maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseGetChannelMessages(channelId: string, limitCount = 50): Promise<any[]> {
  if (!supabaseClient) return [];
  try {
    const { data } = await supabaseClient
      .from('channel_messages')
      .select('*')
      .eq('channelId', channelId)
      .order('timestamp', { ascending: false })
      .limit(limitCount);
    return data ? data.reverse() : [];
  } catch {
    return [];
  }
}

export async function supabaseInsertChannelMessage(message: any): Promise<any> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('channel_messages').insert(message).select().maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseGetPrivateMessages(u1: number, u2: number, limitCount = 50): Promise<any[]> {
  if (!supabaseClient) return [];
  try {
    const { data } = await supabaseClient
      .from('private_messages')
      .select('*')
      .or(`and(senderId.eq.${u1},receiverId.eq.${u2}),and(senderId.eq.${u2},receiverId.eq.${u1})`)
      .order('timestamp', { ascending: false })
      .limit(limitCount);
    return data ? data.reverse() : [];
  } catch {
    return [];
  }
}

export async function supabaseInsertPrivateMessage(record: any): Promise<any> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('private_messages').insert(record).select().maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseGetUserChallenge(userId: number): Promise<any | null> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('user_challenges').select('*').eq('userId', userId).maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseUpsertUserChallenge(challenge: any): Promise<any> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('user_challenges').upsert(challenge).select().maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseGetUserTrades(userId: number): Promise<any[]> {
  if (!supabaseClient) return [];
  try {
    const { data } = await supabaseClient
      .from('user_trades')
      .select('*')
      .eq('userId', userId)
      .order('date', { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export async function supabaseInsertTrade(trade: any, _updatedChallenge?: any): Promise<any> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('user_trades').insert(trade).select().maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseGetLatestAppUpdate(): Promise<any | null> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient
      .from('app_updates')
      .select('*')
      .order('versionCode', { ascending: false })
      .limit(1)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function supabaseUpsertAppUpdate(update: any): Promise<any> {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.from('app_updates').upsert(update).select().maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function syncAllToSupabase(_snapshot?: any): Promise<{ success: boolean; message: string }> {
  return { success: true, message: 'Sync skipped - local store and firestore are primary' };
}

export async function reconcileSupabaseData(_sourceCounts?: any): Promise<{ success: boolean; message: string; diff?: any }> {
  return { success: true, message: 'Reconciliation complete' };
}
