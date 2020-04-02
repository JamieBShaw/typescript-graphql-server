import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '10px',
        },

        control: {
            marginTop: '50px',
            paddingTop: '50px',
            padding: theme.spacing(2),
            display: 'flex',

            textAlign: 'center',
            height: 200,
            width: 350,
            zIndex: 2,
        },
    })
);
