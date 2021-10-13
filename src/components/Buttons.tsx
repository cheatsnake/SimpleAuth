import React, { FC } from 'react';
import '../styles/buttons.scss'

export const LogButton: FC = ({children}) => {
    return (
        <button type="submit" className="btn btn_log">
            {children}
        </button>
    );
};

export const CreateButton: FC = ({children}) => {
    return (
        <button type="submit" className="btn btn_create">
            {children}
        </button>
    );
};

interface ILogoutButton {
    func: Function
}

export const LogoutButton: FC<ILogoutButton> = ({children, func}) => {
    return (
        <button onClick={() => func()} type="submit" className="btn btn_out">
            {children}
        </button>
    );
};
