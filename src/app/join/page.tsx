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
            setNameErr("please type in your name");
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
            <Logo>✳︎</Logo>
            <FormWrapper>
                <Form onSubmit={handleSubmitEvent}>
                <Input
                    type="text"
                    placeholder="Enter your user name"
                    value={userName}
                    onChange={(e : ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                />
                {nameErr && <ErrorText>{nameErr}</ErrorText>}

                <Input
                    type="text"
                    placeholder="Enter your email"
                    value={userEmail}
                    onChange={(e : ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
                />
                {emailErr && <ErrorText>{emailErr}</ErrorText>}
            
                <Input
                    type="text"
                    placeholder="Enter your password"
                    value={userPassword}
                    onChange={(e : ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)}
                />
                {passwordErr && <ErrorText>{passwordErr}</ErrorText>}
                <SubmitBtn type="submit">Sign in</SubmitBtn>
                </Form>
            </FormWrapper>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 90vh;
    background-color: #000;
    justify-content: center;
    align-items: center;
`;
const Logo = styled.h2`
    font-size: 20px;
    color: #888;
    text-align: left;
    padding-left: 10px;
    margin-bottom: 15px;
`;
const FormWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 16px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
const Input = styled.input`
    background-color: #1c1c1c;
    border: none;
    padding: 12px;
    color: white;
    border: 1px solid #000;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    &:focus {
        border: 1px solid #444;
    }    
`;
const ErrorText = styled.span`
    color: red;
    font-size: 12px;
    text-align: right;
`;
const SubmitBtn = styled.button`
  color: #ccc;
  font-size: 12px;
  text-align: right;
  cursor: pointer;

  &:hover {
    background-color: #444;
    color: white;
  }
`;