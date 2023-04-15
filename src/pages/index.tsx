import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Auth } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LogIn from '../../components/LogIn'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      yo
      <LogIn />
    </div>
  )
}
