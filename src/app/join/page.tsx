"use client"

import { JoinEmail } from "@/api/api";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"
import styled from "styled-components";

export default function JoinPage(){
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const [nameErr, setNameErr] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");

    const router = useRouter();

    const validatorName = (name : string) : boolean => {
        if(!name){
            setNameErr("please type your name in");
            return false
        }
        if(name.length < 2 || name.length > 10){
            setNameErr("your name should be more than 2, less than 10 characters");
            return false
        }
        if(!/^[A-Za-z가-힣\s'-]+$/.test(name)){
            setNameErr("invalid character included");
            return false
        }
        return true
    }

    const handleSubmitEvent = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameErr('');
        setEmailErr('');
        setPasswordErr('');

        if(!validatorName(userName)) return
        if(!/^[A-Za-z가-힣\s'-]+$/.test(userEmail)){
            setEmailErr("invalid email address");
            return
        }
        if(userPassword.length < 6){
            setPasswordErr("password needs to be more than 10 characters");
            return
        }
        try{
            const result = await JoinEmail(userEmail, userPassword, userName);
            router.push('/')
        }catch(error){
            console.error(error);
        }
    }
    return(
        <Container>
            <Title>sign in</Title>
            <Form onSubmit={handleSubmitEvent}>
                <InputWrapper>
                    <Input
                        type="text"
                        placeholder="enter your user name"
                        value={userName}
                        onChange={(e : ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                    />
                    {nameErr && <ErrorText>{nameErr}</ErrorText>}
                </InputWrapper>

                <InputWrapper>
                    <Input
                        type="text"
                        placeholder="enter your email"
                        value={userEmail}
                        onChange={(e : ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
                    />
                    {emailErr && <ErrorText>{emailErr}</ErrorText>}
                </InputWrapper>
                
                <InputWrapper>
                    <Input
                        type="text"
                        placeholder="enter your password"
                        value={userPassword}
                        onChange={(e : ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)}
                    />
                    {passwordErr && <ErrorText>{passwordErr}</ErrorText>}
                </InputWrapper>

                <SubmitBtn type="submit">sign in</SubmitBtn>

            </Form>
        </Container>
    )
}

const Container = styled.div`
    
`
const Title = styled.h2`
    
`
const Form = styled.form`
    
`
const InputWrapper = styled.div`
    
`
const Input = styled.input`
    
`
const ErrorText = styled.span`
    
`
const SubmitBtn = styled.button`
    
`