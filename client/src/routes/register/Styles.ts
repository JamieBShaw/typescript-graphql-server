import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
    createStyles({
        root: {
            height: '10px',
        },
        formContainer: {
            margin: '1rem',
            '& .MuiTextField-root': {
                margin: '1rem 0',
            },
        },

        title: {
            flexGrow: 1,
        },

        text: {
            textAlign: 'center',
        },
    })
);
