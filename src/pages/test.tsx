import { Auth } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function Test() {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState()
    

  // Type guard to check if user is not null or undefined
  if (!user) {
    return <div>Loading user data...</div>
  }

  // Render content for authenticated users
  return (
    <div>
      <p>Welcome, {user.email}</p>
      {/* <button onClick={() => signOut()}>Sign out</button> */}
    </div>
  )
}
