import React from "react";
import { Container, Typography } from '@material-ui/core/'
import * as firebase from "firebase";
import firebaseConfig from "../firebaseConfig";
import { withRouter } from "react-router-dom";

class Nakijken extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
    }

    render() {

        return (
        <>
        {console.log(this.props.location)}
            <Typography>{this.props.location.state.uid}</Typography>
        </>
        )
    }
}

export default withRouter(Nakijken)