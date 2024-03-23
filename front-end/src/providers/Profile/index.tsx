import { createContext, useContext, useState } from 'react'
import { IUser } from '@/types/user'

type UserContextType = {
  users: IUser[]
  activeUser: IUser | null
  setActiveUser: (user: IUser | null) => void
  addUser: (user: IUser) => void
  removeUser: (userId: number) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [activeUser, setActiveUser] = useState<IUser | null>(null)

  const addUser = (user: IUser) => {
    setActiveUser(user)
    setUsers((prevUsers) => [...prevUsers, user])
  }

  const removeUser = (userId: number) => {
    activeUser?.id != userId
      ? setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      : console.log('User is active')
  }

  return (
    <UserContext.Provider value={{ users, activeUser, setActiveUser, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
