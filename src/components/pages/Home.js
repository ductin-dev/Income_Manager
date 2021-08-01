import React, {useEffect, useState} from "react";

const Home = (props) => {

    const [user, setUser] = useState({
        User: {
            username: '',
            password: ''
        }
    });
    const [isCallRequest, setIsCallRequest] = useState(false);
    const [response, setResponse] = useState([]);
    const [hasError, setErrors] = useState(false);
    useEffect(() => {
        if (isCallRequest) {
            async function fetchData() {
                const res = await fetch("https://api.publicapis.org/entries");
                res
                    .json()
                    .then(res => setResponse(res))
                    .catch(err => setErrors(err));
            }

            fetchData();
            setIsCallRequest(false);
        }
    }, [isCallRequest]);

    const onLoginHandler = (event) => {
        event.preventDefault();
        setIsCallRequest(true);
        console.log(user);
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value.trim()
        });
    };

    const style = {
        padding: '10px'
    }

    return (
        <div>
            <h1>Home Page</h1>
            <form style={style} method="POST" onSubmitCapture={(event) => onLoginHandler(event)}>
                <label> Username </label>
                <br/>
                <input type="text" name="username" onChange={(e) => handleChange(e)}/>
                <br/>
                <label> Password </label>
                <br/>
                <input type="password" name="password" onChange={(e) => handleChange(e)}/>
                <br/>
                <button>Login</button>
            </form>
            <LoginSuccess response={response}/>
            <div>
                <hr/>
                <span>Has error: {JSON.stringify(response)}</span>

                <hr/>
                <span>Has error: {JSON.stringify(hasError)}</span>
            </div>
        </div>
    )
}

const LoginSuccess = (response) => {

    const red = {
        color: "red"
    }

    if (response == null || response == []) {
        return <div style={red}>Fail check your Password</div>
    }
    return null;
}

export default Home;