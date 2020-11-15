import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import io from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config()

const Mainpage = () => {

    const [socket, SetSocket] = useState(null)

    useEffect(()=>{
        // socket client connections
        const username = localStorage.getItem('username')
        const ENDPOINT = process.env.PROXY;
        const connection = io.connect(ENDPOINT, {query: {username}})
        connection.emit('join', username)
        SetSocket(connection)
        // axios requests for search algorithm maybe and other things also external endpoints
        
    }, [])

    useEffect(()=>{
        // socket receiver / listerner
        socket.on('client-receiver', (sender, msg)=>{

        })
        return ()=>{
            // reduces socket redundancy
            socket.off('client-receiver')
        }
    })

    return (
        <Fragment>

        </Fragment>
    )
}

export default Mainpage
