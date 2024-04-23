import React from 'react'
import { Navigate } from 'react-router-dom'


export function ProtectMainRoute({children}) {

    const user = localStorage.getItem('user');

    if(!user || user === null) {
        return <Navigate to='/' />
    }


    return children
}

export function ProtectAuthRoute({children}) {

    const user = localStorage.getItem('user');

    if(user && user !== null) {
        return <Navigate to='/projects' />
    }


    return children
}