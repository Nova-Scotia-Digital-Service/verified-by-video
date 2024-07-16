export const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS ?? 'http://localhost:3100'
export const API_BASE_URL = `${BACKEND_ADDRESS}/api/v1/staff`

export const KEYCLOAK_ADDRESS = process.env.REACT_APP_KEYCLOAK_ADDRESS ?? 'http://localhost:8080'
export const KEYCLOAK_REALM = process.env.REACT_APP_KEYCLOAK_REALM ?? 'verified_by_video'
export const KEYCLOAK_CLIENT_ID = process.env.REACT_APP_KEYCLOAK_CLIENT_ID ?? 'vbv_dashboard'
