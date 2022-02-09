import {
    AppBar,
    Toolbar,
    // Button,
    // ButtonGroup
} from '@mui/material';
import { Button, Row, Col, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import tags from '../../tags.json'

const style={
    backgroundColor: "#21b6ae",
    padding: "4px 18px",
    fontSize: "14px"
};

const handleSelect = () => {
    console.log(window.getSelection().toString());
}

const Header = () => {
    return(
        <AppBar position='static'>
            <Toolbar>
                <Container fluid>
                    <Row className="mx-0">
                    {
                        Object.keys(tags).map(element => {
                            return (
                                <Button as={Col}  key={tags[element]} style={style} onClick={handleSelect}>
                                    {tags[element]}
                                </Button>
                            )
                        })
                    }
                    </Row>
                </Container>
            </Toolbar>
        </AppBar>
    );
}


export default Header;