import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '10px',
        },
        formContainer: {
            paddingTop: '50px',
            marginTop: '50px',
            margin: '1rem',
            '& .MuiTextField-root': {
                margin: '1rem 0',
            },
            padding: theme.spacing(1),

            textAlign: 'center',
            display: 'flex',
        },

        control: {
            marginTop: '50px',
            paddingTop: '50px',
            padding: theme.spacing(2),
            height: 400,
            width: 350,
        },
    })
);
