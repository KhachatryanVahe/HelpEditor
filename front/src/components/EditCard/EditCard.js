import {
    useState,
    useEffect
} from 'react';
import {
    Card,
    TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
}

const useStyles = makeStyles({
    card: {
        width: '50%',
        height: '85%',
        margin: '15px'
    },
    inputArea: {
        width: '100%',
        height: '95%',
        margin: '2%',
    },
    inputAreaProps: {
        width: '95%',
        height: '98%',
        padding: '4%',
    },
})


const EditCard = () => {
    const classes = useStyles();
    const { height, width } = useWindowDimensions();
    return(
        <Card
            variant='elevation'
            className={classes.card}
        >
            <TextField
                className={classes.inputArea}
                InputProps = {{className: classes.inputAreaProps}}

                multiline
                minRows={height / 32}
                maxRows={height / 32}
                label='Input'
            >
            </TextField>
        </Card>
    )
}

export default EditCard;