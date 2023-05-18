import React, { Component} from 'react'
import axios from 'axios'
import VerifyRegisterAccount from '../components/verify.register.account/verify.register.account'
import NotFound from '../components/404/404'
import { BACKEND_PORT } from '../config/application.config'
class VerifyRegisterAccountContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            isconfirm: true
        }
    }
    async componentWillMount() {
        try {
           await axios.get(`http://localhost:${BACKEND_PORT}/user/verify/` + this.props.match.params.token)
        }
        catch(err) {
            this.setState({isconfirm: false})
        }
    }
    render() {
        if(this.state.isconfirm) {
            return(
                <VerifyRegisterAccount/>
            )
        } else {
            return (
                <NotFound/>
            )
        }
            
    }
}
export default VerifyRegisterAccountContainer