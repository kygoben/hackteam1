import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUser } from '@supabase/auth-helpers-react'

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    
  }, [])

  return (
    <>
      <nav className=' flex flex-row sm:flex-row sm:text-left sm:justify-between w-full border-b-2 border-d-blue z-10 items-center'>
        <div className='text-left text-4xl text-black ml-2 font-extralight'>
          <Link href='/'>Swift TA</Link>
        </div>
        <div className='flex flex-col sm:flex-row text-xl sm:justify-end'>
          {user && <div className="flex flex-row">
            <Link href='/ingredients' className='text-black m-2 no-underline'>ingredients</Link>
            <Link href='/recipes' className='text-black m-2 no-underline'>recipes</Link>
          </div>}

          {!user && <div className="flex flex-row">
            <Link href='/ingredients' className='text-black m-2 no-underline'>ingredients</Link>
            <Link href='/recipes' className='text-black m-2 no-underline'>no</Link>
          </div>}
        </div>
      </nav>
    </>
  )
}