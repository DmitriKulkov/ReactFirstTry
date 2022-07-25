import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const {t, i18n} = useTranslation()
    const date = new Date()

    return (
        <div className='App'>
            <h1 style={{textAlign: "center", fontFamily:'Open Sans'}}>
            {t("about")}
            </h1>
            <div className='App'>
                <h1 style={{textAlign: "center", fontFamily:'Open Sans'}}>
                    {t("dates.fullDate", { date })}
                </h1>
            </div>
        </div>
    );
};

export default About;