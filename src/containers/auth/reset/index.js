import React from 'react';
import AuthTemplate from '../AuthTemplate';
import Logo from "../../../components/Logo";
import RestorePassword from '../../../components/AuthForm/RestorePassword';

export default class ResetPassword extends React.Component {
    render() {
        return (
            <AuthTemplate>
                <div className="auth-block">
                    <Logo full={true} className={'registration--logo'}/>
                    <RestorePassword />
                </div>
            </AuthTemplate>
        )
    }
}