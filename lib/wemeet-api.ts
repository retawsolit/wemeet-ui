/**
 * Helper functions to interact with WeMeet-server API
 */
import { buildRoomMetadata, type DashboardRoomSettings } from './defaultRoomMetadata'

// Get API URL from current origin (same server)
const WEMEET_API_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : (process.env.NEXT_PUBLIC_WEMEET_API_URL || 'http://localhost:8080')
const WEMEET_API_KEY = 'wemeet'
const WEMEET_API_SECRET = 'zumyyYWqv7KR2kUqvYdq4z4sXg7XTBD2ljT6'

/**
 * Generate HMAC-SHA256 signature for WeMeet API authentication
 * Using Web Crypto API (available in modern browsers)
 */
async function generateSignature(body: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    throw new Error('Crypto API not available')
  }

  const encoder = new TextEncoder()
  const keyData = encoder.encode(WEMEET_API_SECRET)
  const messageData = encoder.encode(body)
  
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, messageData)
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Make authenticated request to WeMeet API
 */
async function wemeetApiRequest(endpoint: string, body: any): Promise<any> {
  const bodyString = JSON.stringify(body)
  const signature = await generateSignature(bodyString)
  
  const response = await fetch(`${WEMEET_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-KEY': WEMEET_API_KEY,
      'HASH-SIGNATURE': signature,
    },
    body: bodyString,
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ msg: 'Unknown error' }))
    throw new Error(error.msg || `HTTP ${response.status}`)
  }
  
  return response.json()
}

/**
 * Create a new room in WeMeet-server
 */
export async function createWeMeetRoom(roomId: string, settings: DashboardRoomSettings) {
  const request = {
    // Prefer protobuf JSON field names (camelCase)
    roomId,
    metadata: buildRoomMetadata(settings),
  }
  
  const response = await wemeetApiRequest('/auth/room/create', request)
  
  if (!response.status) {
    throw new Error(response.msg || 'Failed to create room')
  }
  
  return response.room_info
}

/**
 * Get join token for a room
 */
export async function getJoinToken(roomId: string, userInfo: {
  name: string
  user_id: string
  is_admin?: boolean
}) {
  const request = {
    roomId,
    userInfo: {
      name: userInfo.name,
      userId: userInfo.user_id,
      isAdmin: userInfo.is_admin || false,
      isHidden: false,
    },
  }
  
  const response = await wemeetApiRequest('/auth/room/getJoinToken', request)
  
  if (!response.status) {
    throw new Error(response.msg || 'Failed to get join token')
  }
  
  return response.token
}

