"use client"

import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import LoginInfo from "./loginInfo";


const Header : FC = () => {
    return(
        <HeaderContainer>
            <Logo>
                <Link href="/">store</Link>
            </Logo>
            <LoginInfo/>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.header`
    width: 100%;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`
const Logo = styled.h1`
    a{
        font-weight: 200;
        font-size: 15px;
        text-decoration: none;
        color: #ffff;
    }
`