import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '10px',
        },
        formContainer: {
            paddingTop: '50px',
            marginTop: '10px',
            margin: '1rem',
            '& .MuiTextField-root': {
                margin: '1rem 0',
            },
            padding: theme.spacing(1),

            textAlign: 'center',
            display: 'flex',
        },

        title: {
            flexGrow: 1,
        },
    })
);
