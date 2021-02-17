import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import {EventList} from "./event/EventList"
import {EventProvider} from "./event/EventProvider"
import {GameForm} from "./game/GameForm"
import {EventForm} from "./event/EventForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                <GameForm />
            </Route>
            </GameProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>

        <GameProvider>
            <EventProvider>
                <Route exact path="/events/new">
                    <EventForm />
                </Route>
            </EventProvider>
        </GameProvider>
        

        </main>
    </>
}
