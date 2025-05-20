"use client"

import { googleLogin } from "@/api/api";
import { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";


export default function LoginPage(){

    const router = useRouter();
    const [error, setError] = useState<string>("");
    const googleLoginEvent = async() => {
        try{
            const user : User | null = await googleLogin();
            if(user){
                router.push('/');
            }else{
                setError('wrong email or password.');
            }
        }catch(err){
            console.error(err);
            setError('login failed : check the system.')
        }
    }

    return(
        <Container>
            <Title>Login</Title>
            <Form>
                <Input
                    type="email"
                    placeholder="enter your email"
                />
                <Input
                    type="password"
                    placeholder="enter your password"
                />
                <Button type = "submit">Login</Button>
                <Button type = "button" onClick={googleLoginEvent}>Google Login</Button>
                {error && <ErrorText>{error}</ErrorText>}
            </Form>
            <JoinLink href="/join">sign up</JoinLink>
        </Container>
    )
}

const Container = styled.div`
    
`
const Title = styled.h2`
    
`
const Form = styled.form`
    
`
const Input = styled.input`
    
`
const Button = styled.button`
    
`
const ErrorText = styled.span`
    
`
const JoinLink = styled(Link)`
    
`