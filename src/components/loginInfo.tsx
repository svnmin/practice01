"use client"

import { googleLogout, onUserState } from "@/api/api"
import { adminUser } from "@/service/admin"
import { User } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import styled from "styled-components"

interface AuthUser{
    uid : string,
    displayName : string,
    isAdmin? : string,
}

const LoginInfo : FC = () => {

    const [user, setUser] = useState<AuthUser | null>(null)
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onUserState( async (u : User | null) => {
            if(!u){
                setUser(null)
                return
            }
            const adminCheck = await adminUser(u);
            if(!adminCheck){
                setUser(null);
                return;
            }
            setUser({
                uid : adminCheck.uid,
                displayName : adminCheck.displayName ?? "",
                isAdmin : adminCheck.isAdmin ? "true" : "false"
            })
        });

        return() => {
            if(typeof unsubscribe === 'function') unsubscribe();
        }
    },[])

    const login = () => {
        router.push('/login')
    }
    const logout = async () => {
        await googleLogout();
    }

    return(
        <Container>
            {user?.isAdmin &&(
                <AdminLink href='/admin'>
                    admin
                </AdminLink>
            )}

            {user ?(
                <>
                    <Name>{user.displayName}</Name>
                    <Button onClick={logout}>logout</Button>
                </>
            ) : (
                    <Button onClick={login}>login</Button>
            )}
        </Container>
    )
}

export default LoginInfo;

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const AdminLink = styled(Link)`
    padding: 5px 10px;
    color: #fff;
    font-size: 12px;
    text-decoration: none;
`
const Name = styled.span`
    color: #fff;
    font-weight: 200;
    font-size: 12px;
`
const Button = styled.button`
    padding: 5px 10px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
`