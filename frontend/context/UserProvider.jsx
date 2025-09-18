import { useState } from "react";
import { UserContext } from "./UserContext"
import axios from "axios";
import { useEffect } from "react";

export const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:3001/api/users")
        setUsers(response.data.users)
    }

    const addUser = async (newUser) => {
        const response = await axios.post("http://localhost:3001/api/register", newUser)
        setUsers([...users, response.data])
    }

    useEffect(() => {
        getAllUsers()
    }, [users])

    return (
        <UserContext.Provider value={{ users, addUser }}>
            {children}
        </UserContext.Provider>
    )
}
