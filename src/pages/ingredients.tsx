import { Input } from "@/components/Input";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const Ingredients = () => {
    const user = useUser();
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!user) return;
        (async () => {
            const response = await fetch('/api/add-ingredient', {
                method: 'PUT',
                body: JSON.stringify({
                    uid: user?.id
                })
            });
            const data: {iid: string;}[] = await response.json();
            setIngredients(data.map(({iid}) => iid));
        })()
    }, [user]);

    if (!user)
        return <div/>;

    const handleButtonPress = async () => {
        const response = await fetch('/api/add-ingredient', {
            method: 'POST',
            body: JSON.stringify({
                uid: user.id,
                ing: value
            })
        });
        if (response.status !== 200)
            return;
        const data = await response.json();

        setIngredients(prev => [...prev, data.name]);
        setValue('');
    }

    return (
        <div>
            <h1>My Ingredients</h1>
            <div className='flex'>
                <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/5 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleButtonPress}
                >
                    Select
                </button>
            </div>
            {ingredients.map(ingredient => (
                <div key={ingredient}>{ingredient}</div>
            ))}
        </div>
    );
}

export default Ingredients;

