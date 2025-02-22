import * as TD from '../../types'

import { pool } from '../../db'

export const createOrUpdateReviewer = async (decodedToken: TD.DecodedKeycloakToken) => {
  const isAdmin = decodedToken.realm_access.roles.includes('admin')

  const reviewer = await pool.query<TD.DBReviewer>(
    `
    INSERT INTO reviewers (keycloak_id, email, full_name, is_admin)
    VALUES
      ($1, $2, $3, $4)
    ON CONFLICT (keycloak_id)
      DO UPDATE
      SET
        keycloak_id=$1,
        email=$2,
        full_name=$3,
        is_admin=$4
    RETURNING
      id,
      email,
      full_name,
      is_admin
    `,
    [decodedToken.sub, decodedToken.email, decodedToken.name, isAdmin],
  )

  return reviewer.rows[0]
}
