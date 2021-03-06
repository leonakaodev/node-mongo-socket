export default {
  newMessageNotificationWehHook:
    process.env.SERVICE_API_WEBHOOK_NOTIFICATION || '',
  baseURL: process.env.SERVICE_API_BASE_URL || '',
}

export const EndPoints = [
  { type: 'user', auth: 'auth/user', find: 'user' },
  { type: 'rest', auth: 'auth/rest', find: 'rest' },
  { type: 'supt', auth: 'auth/supt', find: 'supt' },
  { type: 'delivery', auth: 'auth/delivery', find: 'delivery' },
]
