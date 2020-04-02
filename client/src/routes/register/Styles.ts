import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        control: {
            marginTop: '25px',
            paddingTop: '40px',
            padding: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            height: 350,
            width: 350,
            zIndex: 2,
        },
    })
);
