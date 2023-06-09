import { Auth } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'


export default function LogIn() {
    const session = useSession()
    const supabase = useSupabaseClient()


    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!session ? (
                <Auth
                    providers={[]}
                    supabaseClient={supabase}
                    theme="dark"
                />
            ) : (
                <p>Account page will go here.</p>
            )}
        </div>
    )
}