import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider.js"
import { EventContext } from "./EventProvider.js"


export const EventForm = () => {
    const history = useHistory()

    const { games, getGames } = useContext(GameContext)
    const { events, getEvents, createEvent } = useContext(EventContext)
    

    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        location: "",
        date: "",
        time: "",
        scheduler: 0
    })

    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent }
        newEventState.game = domEvent.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDateState = (event) => {
        // ...
        const newEventState = { ...currentEvent }
        newEventState.date = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventTimeState = (event) => {
        // ...
        const newEventState = { ...currentEvent }
        newEventState.time = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDescriptionState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.description = event.target.value
        setCurrentEvent(newEventState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Event: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={`game--${game.id}`} value={game.id}> {game.title} </option>
                            ))
                        }
                    </select>


                    <input type="dateField" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventDateState}
                    />

                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventTimeState}
                    />

                    <label htmlFor="description"> Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventDescriptionState}
                    />
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    const newEvent = {
                        gameId: currentEvent.game,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Once event is created, redirect user to event list
                    createEvent(newEvent)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}