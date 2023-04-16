import { Inter } from 'next/font/google'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LogIn from '../../components/LogIn'
import { useUser } from '@supabase/auth-helpers-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser();

  return (
    <div className='flex flex-col h-screen max-h-screen'>
      {user && <main className="flex flex-col items-center justify-center flex-1 px-4 bg-gray-700">
        <h2 className="text-2xl font-bold text-center">Welcome to uBrew!</h2>
        <p className="mt-4 text-center text-gray-500">
          Discover new cocktail recipes, or create and share your own!
        </p>
        <a href="/search" className="mt-8 bg-gray-800 text-white py-4 px-8 rounded-full text-xl font-bold hover:bg-gray-700 transition-colors duration-300">
          Get Started
        </a>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Mix it up with uBrew
        </p>
      </main>}
      {!user && <div>
        <LogIn />
      </div>}
    </div>
  )
}
