import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {Table} from "react-bootstrap";


export const TablePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [user, setUser] = useState(null)
    const UserId = useParams().id

    const getUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/user/info/${UserId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
        } catch (e) {}
    }, [token, UserId, request])

    useEffect(() => {
        getUser()
    }, [getUser])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>

                </tbody>
            </Table>
        </>
    )
}
