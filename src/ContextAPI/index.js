import React, { createContext, useReducer } from 'react'


export const StateContext = createContext()


export const StateProvider = ({ reducer, initState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initState)} >
        {children}
    </StateContext.Provider>
)

