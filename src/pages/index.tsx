import { Inter } from 'next/font/google'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LogIn from '../../components/LogIn'
import NavBar from '../../components/NavBar'
import { useUser } from '@supabase/auth-helpers-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser();

  return (
    <div className='flex flex-col h-screen max-h-screen'>
      {user && <div>
        <h1>Welcome to uBrew!</h1>
        <h3>Your go-to for drink concoction and fun cocktail ideas.</h3>
      </div>}
      {!user && <div>
        <LogIn />
      </div>}
    </div>
  )
}
