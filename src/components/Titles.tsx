import React, { FC } from 'react';
import '../styles/titles.scss'

export const Title: FC= ({children}) => {
    return (
        <h1 className="title">
            {children}
        </h1>
    );
};

export const SubTitle: FC = ({children}) => {
    return (
        <h2 className="sub-title">
            {children}
        </h2>
    );
};

interface IMessage {
    status?: string;
}

export const Message: FC<IMessage> = ({children, status}) => {
    
    return (
        <p className={status ? "message good" : "message"}>
            {children}
        </p>
    );
};
