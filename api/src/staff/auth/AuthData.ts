import * as TD from '../../types'

import { pool } from '../../db'

export const getUser = async (email: string) => {
  const tags = await pool.query<TD.DBUser>(
    `
    SELECT
      id, email, full_name, is_admin
    FROM users
    WHERE email = $1`,
    [email],
  )

  return tags.rows[0]
}
