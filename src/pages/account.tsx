import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import RecipeView from "../../components/RecipeView";
import { useUser } from "@supabase/auth-helpers-react";
import { Recipe } from "@/types";

export default function Account() {
    const session = useSession()
    const supabase = useSupabaseClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    return (
        // Render your account page UI here
        <div>
            <h1>Welcome, {session.user.email}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}