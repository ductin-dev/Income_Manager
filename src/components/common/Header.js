import React, {Component} from "react";
import {NavLink} from "react-router-dom";


class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <ul>
                    <li>
                        <NavLink exact activeStyle={{
                            backgroundColor: 'white',
                            color: 'red'
                        }} to="/" className="my-link">Login</NavLink>
                    </li>
                    <li>
                        <NavLink exact activeStyle={{
                            backgroundColor: 'white',
                            color: 'red'
                        }} to="/" className="my-link">Logout</NavLink>
                    </li>

                    <li>
                        <NavLink exact activeStyle={{
                            backgroundColor: 'white',
                            color: 'red'
                        }} to="/" className="my-link">Information</NavLink>

                    </li>

                </ul>


                <div>{this.props.children}</div>
            </div>
        )
    }

}

export default Header;