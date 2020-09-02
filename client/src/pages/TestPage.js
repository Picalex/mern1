import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/AuthContext";
import {RolesContext} from '../context/Roles/RolesContext'



export const TestPage = () => {
    const access='SuperAdmin'
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [mas, setMas] = useState([])
    const [acc, setAcc] = useState()

    const fetchRoles = useCallback(async () => {
        try {
            const fetched = await request('/api/role', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMas(fetched)
        } catch (e) {}
    }, [token, request])


    const fetchAccess = useCallback(async () => {
        try {
            const fetched = await request('/api/access', 'POST', {access}, {
                Authorization: `Bearer ${token}`
            })
            setAcc(fetched)
        } catch (e) {}
    }, [token, request])
    const lif = 23





    const test = React.useContext(RolesContext)

    let arrObjects = []
    const UserId = '5f21368cbc9f4b288c8f832f'
    // const fetchUsers = useCallback(async () => {
    //     try {
    //         const fetched = await request('/api/user', 'GET', null, {
    //             Authorization: `Bearer ${token}`
    //         })
    //         setMas(fetched)
    //     } catch (e) {}
    // }, [token, request])

    useEffect(() => {
        fetchRoles()
        fetchAccess()
    }, [fetchRoles,fetchAccess])


    arrObjects[0] = {
        id: "1",
        name: "firstArrElement"
    }
    arrObjects[1] = {
        id: "2",
        name: "secondArrElement"
    }
    arrObjects[2] = {
        id: "3",
        name: "3ArrElement"
    }
    arrObjects[3] = {
        id: "4",
        name: "4ArrElement"
    }
    

    const roles = []
    roles[0] = {
        id: "1",
        name: "first"
    }
    roles[1] = {
        id: "2",
        name: "second"
    }

const loader=(<div style={{paddingTop:'84.222%',position:'relative'}}>
    <iframe src="https://gifer.com/embed/3aM" width="100%" height="100%" style={{position:'absolute',top:'0',left:'0'}} frameBorder="0" allowFullScreen />
</div>)





    function Nameles(mas1) {

        const a = mas1.map((role) => {
            if (role.roleName === 'SuperAdmin') {
                console.log('sadmin')
            }
        })



        // array.forEach(function (s) {
        //     console.log(s.name)
        // })
    }

    const asss = ['1', '2', '3', '4', '5']

if(acc){
    return (
        <div>
            <h5>YES</h5>

        </div>
    )
}else{
    return (
        <div>
            <h5>NO</h5>

        </div>
    )
}

}




