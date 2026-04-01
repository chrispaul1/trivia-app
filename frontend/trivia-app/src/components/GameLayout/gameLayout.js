import { Outlet } from "react-router-dom";


export function GameLayout(){
    return(
        <div>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}