import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import {useTranslation} from "react-i18next";

import logo from "/home/simplepc/Documents/Git/ReactFirstTry/react-first-try/src/images/pngaaa.com-2507930.png";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem("auth")
    }

    return (
        <div className="navbar">
            <img src={logo} alt="React logo" className='logo'/>
            <div>
                <Link to="/about" className="navbar__links"> {t("navbar.link_about")}</Link>
                <Link to="/posts" className="navbar__links"> {t("navbar.link_posts")}</Link>
            </div>
            <MyButton onClick={()=>changeLanguage("en")} style={{marginLeft:"auto"}}>
            {t("navbar.EN")}
            </MyButton>
            <MyButton onClick={()=>changeLanguage("ru")} style={{marginLeft:"10px"}}>
            {t("navbar.RU")}
            </MyButton>
            <MyButton onClick={logout} style={{marginLeft:"20px"}}>
            {t("navbar.logout")}
            </MyButton>
        </div>
    );
};

export default Navbar;