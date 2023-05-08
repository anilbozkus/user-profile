import * as React from 'react';
import {
  Formik,
  Form,
  FieldArray,
  ErrorMessage, 
} from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Chip, OutlinedInput, Paper, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface MyFormValues {
  firstName: string;
  lastName: string;
  birthDate: string | null;
  gender: string;
  address: string;
  hobbies: [];
  countries: Array<{country: string , city: string, visitedDate: string | null}>;
}

const validationSchema = yup.object({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  birthDate: yup.string().required('Required'),
  gender: yup.string().required('Required'),
  address: yup.string().required('Required'),
  hobbies: yup.array().min(1),
  countries:yup.array().of(
    yup.object().shape({
      country: yup.string().required('Country name is required'),
      city: yup.string().required('City is required'),
      visitedDate: yup.string().required('Visited year is required'),
    })
  )
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const hobbies = [
  'Comics',
  'PC Games',
  'Travelling',
  'Swimming',
  'Photograpyh'
];

function getStyles(name: any, personName: string | any[], theme: { typography: { fontWeightRegular: any; fontWeightMedium: any; }; }) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export const UserForm: React.FC<{}> = () => {
  const initialValues: MyFormValues = { firstName: '', lastName: '', birthDate: null, gender: '', hobbies: [], address: '', countries: [{country: '', city:'', visitedDate: null}] };
  const theme = useTheme();

  const onSubmit = (values: MyFormValues) => {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <Container maxWidth="md" sx={{
      marginTop:'50px'
    }}>
      <Typography variant='h4' sx={{
        marginBottom: '25px',
        fontWeight: 'bold'
      }}>User Form</Typography>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnChange={false} validateOnBlur={true} validationSchema={validationSchema}>
        {({errors, touched, values, handleChange, setFieldValue}) =>(
        <Form>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField id="firstName" inputProps={{ "data-testid": "first-name" }} name="firstName" value={values.firstName} onChange={handleChange} sx={{width:'100%'}} placeholder="First Name" label="First Name"/>
              {errors.firstName ? (
                <Typography data-testid="first-name-error" variant='subtitle1' color='error'>*{errors.firstName}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id="lastName" inputProps={{ "data-testid": "last-name" }}  name="lastName" value={values.lastName} onChange={handleChange} sx={{width:'100%'}} placeholder="Last Name" label="Last Name"/>
              {errors.lastName ? (
                <Typography variant='subtitle1' color='error'>*{errors.lastName}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{width:'100%'}} value={values.birthDate}  onChange={(value) => setFieldValue("birthDate", value, false)} label="Date of Birth" defaultValue={null}/>
              </LocalizationProvider>  
              {errors.birthDate ? (
                <Typography variant='subtitle1' color='error'>*{errors.birthDate}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    name='gender'
                    labelId="gender-label"
                    id="gender"
                    inputProps={{ "data-testid": "gender" }}
                    value={values.gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Man'}>Man</MenuItem>
                    <MenuItem value={'Woman'}>Woman</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {errors.gender ? (
                  <Typography data-testid="gender-error" variant='subtitle1' color='error'>*{errors.gender}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="hobbies-label">Hobbies</InputLabel>
                <Select
                  labelId="hobbies-label"
                  id="hobbies-chip"
                  name='hobbies'
                  multiple
                  value={values.hobbies}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-hobbies" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {hobbies.map((hobby) => (
                    <MenuItem
                      key={hobby}
                      value={hobby}
                      style={getStyles(hobby, values.hobbies, theme)}
                    >
                      {hobby}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.hobbies ? (
                  <Typography variant='subtitle1' color='error'>*{errors.hobbies}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id="address" name="address" value={values.address} onChange={handleChange} sx={{width:'100%'}} placeholder="Address" label="Address" multiline rows={4}/>
              {errors.address ? (
                <Typography variant='subtitle1' color='error'>*{errors.address}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <FieldArray name='countries' render={({insert, remove}) => {
                return (
                  <>
                  <Grid container justifyContent='space-between' alignItems="baseline">
                    <Typography variant='h5' sx={{
                      marginBottom: '25px',
                      fontWeight: 'bold'
                    }}>Visited Countries</Typography>
                    <Button color="secondary" variant="contained" size='small' onClick={(event) => {
                      insert(values.countries?.length + 1, {
                        country: '',
                        city: '',
                        visitedYear: ''
                      })
                    }}>Add Country</Button>
                  </Grid>
                  {values.countries?.map((visitedCountry, index) =>{
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Paper elevation={1} sx={{minHeight: 100, width:'100%', background:'#f1efef', display:'flex', alignItems:'center' }}>
                          <Grid item xs={12} md={3} sx={{ padding:'0 15px' }}>
                            <Box sx={{ width: '100%', background: '#fff' }}>
                              <FormControl fullWidth>
                                <InputLabel id="country-label">Country</InputLabel>
                                <Select
                                  name={`countries.${index}.country`}
                                  labelId={`country-label ${index}`}
                                  id={`countries.${index}.country`}
                                  value={visitedCountry.country}
                                  label="Country"
                                  onChange={handleChange}
                                >
                                  <MenuItem value={'Germany'}>Germany</MenuItem>
                                  <MenuItem value={'France'}>France</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <div>
                            </div>
                            {errors.countries && errors.countries[index] ? (
                                <Typography variant='subtitle1' color='error'>
                                  <ErrorMessage name={`countries.${index}.country`} />
                                </Typography>
                            ) : null}
                          </Grid>
                          {visitedCountry.country.length > 0 && 
                          <Grid item xs={12} md={3} sx={{ padding:'0 15px' }}>
                            <Box sx={{ width: '100%', background: '#fff' }}>
                              <FormControl fullWidth>
                                <InputLabel id="city-label">City</InputLabel>
                                <Select
                                  name={`countries.${index}.city`}
                                  labelId={`city-label - ${index}`}
                                  id={`countries.${index}.city`}
                                  value={visitedCountry.city}
                                  label="City"
                                  onChange={handleChange}
                                >
                                {visitedCountry.country === "Germany" && <MenuItem value={'Frankfurt'}>Frankfurt</MenuItem>}
                                {visitedCountry.country === "Germany" && <MenuItem value={'Berlin'}>Berlin</MenuItem>}
                                {visitedCountry.country === "France" && <MenuItem value={'Paris'}>Paris</MenuItem>}
                                {visitedCountry.country === "France" &&   <MenuItem value={'Lille'}>Lille</MenuItem>}
                                </Select>
                              </FormControl>
                            </Box>
                            {errors.countries && errors.countries[index] ? (
                                <Typography variant='subtitle1' color='error'>
                                  <ErrorMessage name={`countries.${index}.city`} />
                                </Typography>
                            ) : null}
                          </Grid>
                          }
                          {visitedCountry.country.length > 0 && 
                          <Grid item xs={12} md={3} sx={{ padding:'0 15px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker sx={{ width:'100%', background: '#fff' }} views={['month', 'year']} value={visitedCountry.visitedDate}  onChange={(value) => setFieldValue(`countries.${index}.visitedDate`, value, false)} label="Visited year" defaultValue={null}/>
                            </LocalizationProvider>
                            {errors.countries && errors.countries[index] ? (
                                <Typography variant='subtitle1' color='error'>
                                  <ErrorMessage name={`countries.${index}.visitedDate`} />
                                </Typography>
                            ) : null}
                          </Grid>
                          }
                          <Grid item xs={12} md={3} sx={{ padding:'0 15px' }}>
                            <Button sx={{width:'100%'}} color="error" variant="contained" onClick={(event) =>{
                              remove(index);
                            }}>Remove</Button>
                          </Grid>
                        </Paper>
                      </Box>
                    )
                  })}
                  </>
                )
              }}/>
            </Grid>
            <Grid item xs={12}>
              <Button sx={{width:'100%'}} data-testid="submit-button" color="primary" variant="contained" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </Form>
        )}
      </Formik>
    </Container>
  );
};
