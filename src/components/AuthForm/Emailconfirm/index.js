import React, {Component} from 'react'
import Success from "../Alert/Success";
import Logo from "../../../components/Logo";
import AuthTemplate from '../../../containers/auth/AuthTemplate'

const btnstyle = {
    color: "#35b986"
}

export default class Emailconfirm extends Component {
   
    render() {
        return (
            <AuthTemplate>
                <div className="auth-block">
                    <Logo full={true} className={'registration--logo'} />
                    <Success><p>Account created! Last step. Check your inbox to confirm your email address.</p>
                        <a style={btnstyle} href="https://shosho.co">Back Home</a>
                    </Success>                    
                </div>    
            </AuthTemplate>                   
        )
    }
}

