import { pool } from '../../db'

export const updateSessionWithConnectionId = async (sessionId: string, connectionId: string) => {
  await pool.query(
    `
    UPDATE sessions
    SET
      didcomm_connection_id = $1
    WHERE
      id = $2;
    `,
    [connectionId, sessionId],
  )
}
