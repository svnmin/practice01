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
            <Logo>✳︎</Logo>
            
            <Form>
                <FormInner>
                    <Input
                        type="email"
                        placeholder="enter your email"
                    />
                    {/* <Gap></Gap> */}
                    <Input
                        type="password"
                        placeholder="enter your password"
                    />
                    <Button type = "submit">Login</Button>
                    {/* <Button type = "button" onClick={googleLoginEvent}>Google Login</Button> */}
                    {error && <ErrorText>{error}</ErrorText>}
                </FormInner>
                
            </Form>
            <JoinLink href="/join">sign up</JoinLink>
        </Container>
    )
}
const Container = styled.div`
    max-width: 400px;
    margin: 40px auto;
    padding: 12px;
`
const Logo = styled.h2`
    font-size: 24px;
    color: #888;
`
const Form = styled.div`

`
const FormInner = styled.form`
    
`
const Input = styled.input`
    width: 350px;
`
const Button = styled.button`
    align-self: flex-end;
`
const ErrorText = styled.span`
    color: red;
    font-size: 10px;
    text-align: end;
`
const JoinLink = styled(Link)`

`