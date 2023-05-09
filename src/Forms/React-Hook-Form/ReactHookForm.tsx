import * as React from 'react';
import { Controller, useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { array, literal, object, string, TypeOf, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Chip, OutlinedInput, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const registerSchema  = object({
  firstName: string()
    .nonempty('First Name is required')
    .max(32, 'First Name must be less than 100 characters'),
  lastName: string()
    .nonempty('Last Name is required')
    .max(32, 'Last Name must be less than 100 characters'),
  birthDate: string()
    .nonempty('Last Name is required'),
  gender: string()
    .nonempty('Last Name is required'),
  hobbies: string().array().min(1, 'At least 1 hobby required'),
  address: string()
  .nonempty('Address is required'),
  countries: z.array(
    z.object({
      country: z.string().nonempty('Country is required'),
      city: z.string().nonempty('City is required'),
      visitedDate: z.string().nonempty('Visited date is required')
    }))
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

const hobbieList = [
  'Comics',
  'PC Games',
  'Travelling',
  'Swimming',
  'Photograpyh'
];

function getStyles(name: any, personName: string | any[], theme: { typography: { fontWeightRegular: any; fontWeightMedium: any; }; }) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type RegisterInput = TypeOf<typeof registerSchema>;

export const ReactHookForm: React.FC<{}> = () => {
  const [hobbies, setHobbies] = React.useState<string[]>([]);
  const [conutryName, setconutryName] = React.useState<string>();
  const { register, reset, formState: { errors, isSubmitSuccessful },handleSubmit, control, setValue } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  });
  const theme = useTheme();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "countries", // unique name for your Field Array
  });

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <Container maxWidth="md" sx={{
      marginTop:'50px'
    }}>
      <Typography variant='h4' sx={{
        marginBottom: '25px',
        fontWeight: 'bold'
      }}>React Hook Form</Typography>
        <form>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField id="firstName" inputProps={{ "data-testid": "first-name" }} error={!!errors['firstName']} {...register('firstName')} sx={{width:'100%'}} placeholder="First Name" label="First Name"/>
              {errors['firstName'] ? (
                <Typography data-testid="first-name-error" variant='subtitle1' color='error'>*{errors['firstName'] ? errors['firstName'].message : ''}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id="lastName" inputProps={{ "data-testid": "last-name" }} error={!!errors['lastName']} {...register('lastName')} sx={{width:'100%'}} placeholder="Last Name" label="Last Name"/>
              {errors['lastName'] ? (
                <Typography data-testid="first-name-error" variant='subtitle1' color='error'>*{errors['lastName'] ? errors['lastName'].message : ''}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller control={control} name={"birthDate"} render={({ field: { onChange, name, value } })=> (
                <DatePicker sx={{width:'100%'}} label="Date of Birth" value={value} onChange={(date) => {onChange(date?.toString())}} defaultValue={value}/>
                )}
              />
              </LocalizationProvider>  
              {errors['birthDate'] ? (
                <Typography data-testid="first-name-error" variant='subtitle1' color='error'>*{errors['birthDate'] ? errors['birthDate'].message : ''}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    inputProps={{ "data-testid": "gender" }}
                    {...register('gender')}
                    label="Gender"
                    error={!!errors['gender']}
                  >
                    <MenuItem value={'Man'}>Man</MenuItem>
                    <MenuItem value={'Woman'}>Woman</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {errors['gender'] ? (
                  <Typography data-testid="gender-error" variant='subtitle1' color='error'>*{errors['gender'] ? errors['gender'].message : ''}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="hobbies-label">Hobbies</InputLabel>
                <Controller control={control} name="hobbies" render={({ field: { onChange, name, value } })=> (
                  <Select
                    labelId="hobbies-label"
                    id="hobbies-chip"
                    name='hobbies'
                    multiple
                    value={hobbies}
                    onChange={(event: any) => {
                      setHobbies(event.target.value as string[]);
                      setValue("hobbies", event.target.value);
                    }}
                    input={<OutlinedInput id="select-hobbies" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.length > 0 && selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                  {hobbieList.map((hobby) => (
                      <MenuItem
                        key={hobby}
                        value={hobby}
                        style={getStyles(hobby, value, theme)}
                      >
                        {hobby}
                      </MenuItem>
                  ))}
                  </Select>
                )}
                />
              </FormControl>
              {errors['hobbies'] ? (
                  <Typography data-testid="gender-error" variant='subtitle1' color='error'>*{errors['hobbies'] ? errors['hobbies'].message : ''}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id="address" inputProps={{ "data-testid": "address" }} error={!!errors['address']} {...register('address')} sx={{width:'100%'}} placeholder="Address" label="Address"  multiline rows={4}/>
              {errors['address'] ? (
                <Typography data-testid="address-error" variant='subtitle1' color='error'>*{errors['address'] ? errors['address'].message : ''}</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
                  <Grid container justifyContent='space-between' alignItems="baseline">
                    <Typography variant='h5' sx={{
                      marginBottom: '25px',
                      fontWeight: 'bold'
                    }}>Visited Countries</Typography>
                    <Button color="secondary" variant="contained" size='small' onClick={(event) => {
                      append({
                        country: '',
                        city: '',
                        visitedDate: ''
                      })
                    }}>Add Country</Button>
                  </Grid>
                  {fields.map((country, index) => (
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
                                <Controller control={control} name={`countries.${index}.country`} render={({ field: { onChange, name, value } })=> (
                                  <Select
                                    labelId={`country-label ${index}`}
                                    id={`countries.${index}.country`}
                                    value={value}
                                    label="Country"
                                    onChange={(event: any) => {
                                      setconutryName(event.target.value as string);
                                      setValue(`countries.${index}.country`, event.target.value);
                                    }}
                                  >
                                    <MenuItem value={'Germany'}>Germany</MenuItem>
                                    <MenuItem value={'France'}>France</MenuItem>
                                  </Select>
                                )}
                                />
                              </FormControl>
                            </Box>
                            {errors['countries'] && errors.countries[index]?.country ? (
                                <Typography data-testid="address-error" variant='subtitle1' color='error'>*{(errors.countries && errors.countries[index] && errors.countries[index]?.country && errors.countries[index]?.country?.message) ? errors.countries[index]?.country?.message : ''}</Typography>
                            ) : null}
                          </Grid>
                          {conutryName && conutryName.length > 0 && 
                          <Grid item xs={12} md={3} sx={{ padding:'0 15px' }}>
                            <Box sx={{ width: '100%', background: '#fff' }}>
                              <FormControl fullWidth>
                                <InputLabel id="city-label">City</InputLabel>
                                <Controller control={control} name={`countries.${index}.city`} render={({ field: { onChange, name, value } })=> (
                                <Select
                                  name={`countries.${index}.city`}
                                  labelId={`city-label - ${index}`}
                                  id={`countries.${index}.city`}
                                  value={value}
                                  label="City"
                                  onChange={onChange}
                                >
                                {conutryName && conutryName === "Germany" && <MenuItem value={'Frankfurt'}>Frankfurt</MenuItem>}
                                {conutryName && conutryName === "Germany" && <MenuItem value={'Berlin'}>Berlin</MenuItem>}
                                {conutryName && conutryName === "France" && <MenuItem value={'Paris'}>Paris</MenuItem>}
                                {conutryName && conutryName === "France" &&   <MenuItem value={'Lille'}>Lille</MenuItem>}
                                </Select>
                                )}
                                />
                              </FormControl>
                            </Box>
                            {errors['countries'] && errors.countries[index]?.city ? (
                                <Typography data-testid="city-error" variant='subtitle1' color='error'>*{(errors.countries && errors.countries[index] && errors.countries[index]?.city && errors.countries[index]?.city?.message) ? errors.countries[index]?.city?.message : ''}</Typography>
                            ) : null}
                          </Grid>
                          }
                          {conutryName && conutryName.length > 0 && 
                          <Grid item xs={12} md={3} sx={{ padding:'0 15px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Controller control={control} name={`countries.${index}.visitedDate`} render={({ field: { onChange, name, value } })=> (
                                <DatePicker sx={{width:'100%'}} label="Date of Birth" value={value} onChange={(date) => {onChange(date?.toString())}} defaultValue={value}/>
                                )}
                              />                            
                            </LocalizationProvider>
                            {errors['countries'] && errors.countries[index]?.visitedDate ? (
                                <Typography data-testid="address-error" variant='subtitle1' color='error'>*{(errors.countries && errors.countries[index] && errors.countries[index]?.visitedDate && errors.countries[index]?.visitedDate?.message) ? errors.countries[index]?.visitedDate?.message : ''}</Typography>
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
                  ))}
            </Grid>
            <Grid item xs={12}>
              <Button sx={{width:'100%'}} data-testid="submit-button" color="primary" variant="contained" onClick={handleSubmit(onSubmitHandler)}>Submit</Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  );
};
