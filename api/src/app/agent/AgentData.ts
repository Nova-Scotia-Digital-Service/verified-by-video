import { pool } from '../../db'

export const createConnectionDetails = async (sessionId: string, connectionId: string) => {
  await pool.query(
    `
    INSERT INTO credentials (didcomm_connection_id, session_id)
    VALUES ($1, $2)
    RETURNING id, created_at,didcomm_connection_id, session_id;
    `,
    [connectionId, sessionId],
  )
}
