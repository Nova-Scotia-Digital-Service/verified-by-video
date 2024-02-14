import * as TD from '../types'

const now = new Date()
const later = new Date(Number(now) + 30 * 60 * 1000)

export const initialSessionData: TD.Session = {
  version: '1',
  id: '88acfa3d-bf2f-4cae-8746-60a9106f6d56',
  createdAt: now,
  expiresAt: later,
  prompts: [
    { id: '10125e01-642d-4be5-bf1c-2e0575091b23', text: 'Hold up two fingers', type: 'text' },
    { id: '8e579ca4-400f-4802-952a-54ae33e81799', text: 'Touch your ear', type: 'text' },
    { id: '870fbfb4-2bab-4a91-b5b3-0d16d7220353', text: 'Turn your head to the left', type: 'text' },
  ],
}
