import React, { FC } from 'react';
import '../styles/authBlock.scss';

const AuthBlock: FC = ({children}) => {
    return (
        <div className="auth">
            {children}
        </div>
    );
};

export default AuthBlock;