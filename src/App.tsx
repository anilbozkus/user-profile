import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const App: React.FC<{}> = () => {
  return (
    <Container maxWidth="md" sx={{
      marginTop:'50px'
    }}>
      <Typography variant='h4' sx={{
        marginBottom: '25px',
        fontWeight: 'bold'
        }}>Form Options</Typography>
        <Grid item xs={12}>
          <Link to="/formik">
            <Button sx={{width:'100%'}} data-testid="submit-button" color="primary" variant="contained">Formik</Button>
          </Link>
        </Grid>
        <Grid item xs={12} sx={{marginTop: '15px'}}>
          <Link to="/react-hook">
            <Button sx={{width:'100%'}} data-testid="submit-button" color="secondary" variant="contained">React Hook Form</Button>
          </Link>
        </Grid>
    </Container>
  );
};
