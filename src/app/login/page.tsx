"use client"

import { googleLogin } from "@/api/api";
import { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emit } from "process";
import { useState } from "react";
import styled from "styled-components";


export default function LoginPage(){

    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();

        if(!email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }
        if(password.length < 10) {
            setError("Password must be at least 10 characters");
            return;
        }
    }

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
        <Page>
      <Container>
        <Logo>✳︎</Logo>
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
             />
            <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          <BottomRow>
            <JoinLink href="/join">Sign up</JoinLink>
            <Button type="submit">Log in</Button>
          </BottomRow>
          {error && <ErrorText>{error}</ErrorText>}
        </Form>
      </Container>
    </Page>
    )
}
const Page = styled.div`
  display: flex;
  height: 100vh;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 16px;
`;

const Logo = styled.h2`
  font-size: 20px;
  color: #888;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 15px;
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

const Button = styled.button`
  color: #ccc;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #444;
    color: white;
  }
`;

const JoinLink = styled(Link)`
  color: #ccc;
  font-size: 12px;
  align-self: flex-start;

  &:hover {
    color: white;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  text-align: right;
`;