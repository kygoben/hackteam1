import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function Test({ data }) {
    console.log(data)

    const user = useUser()

    useEffect(() => {

    })

    // Type guard to check if user is not null or undefined
    if (!user) {
        return <div>Loading user data...</div>
    }

    // Render content for authenticated users
    return (
        <div>
            <p>Welcome, {user.email}</p>
            <p>Data: {JSON.stringify(data)}</p>
            {/* <button onClick={() => signOut()}>Sign out</button> */}
        </div>
    )
}

export async function getServerSideProps() {

    if(!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        return {
            props: {
              data: null
            }
        }
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const { data, error } = await supabase
        .from('exampleTable')
        .select(`
            id,
            info
        `)

    console.log(data)
    console.log(error)

    return {
        props: {
          data: data || null
        }
    }
}