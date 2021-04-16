import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { apilogin } from "./../../api/index"
import { APP_CONFIG } from "./../../utils/constants";
import { useHistory } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import JWT from "./../../utils/jwt";
// LoginForm.propTypes = {

// };

function LoginForm(props) {
    const { onSubmit } = props
    const [value, setValue] = useState({})
    const history = useHistory();
    function handleChange(e) {
        console.log(e.target.name);
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
        console.log('fsggsgsgsgsg', value);
    }
    function handleSubmit(e) {

        e.preventDefault();
        // onSubmit(value);
        apilogin(value).then(res => {
            JWT.saveToken(res.data.token);
            history.replace('/home')
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <legend>Form title</legend>
                <div className="form-group">
                    <label >Email</label>
                    <input type="text" className="form-control" value={value.value} id="" name="email" placeholder="Nhập email" onChange={handleChange} />
                    <label >Password</label>
                    <input type="text" className="form-control" value={value.password} id="" name="password" placeholder="Nhập mật khấu" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;