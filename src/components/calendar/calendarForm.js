import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Box, Button, Drawer, Grid, IconButton, Stack, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Controller, useForm } from 'react-hook-form';
import { addAppointment, updateAppointment } from '../../features/calendar/caledarSlice';

import './css/calendarForm.css';
import { useDispatch, useSelector } from 'react-redux';

const formStyle = {
    padding: '20px 30px 30px 30px',
    display: 'block'
}

export default function CalendarForm(props) {

    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: props.item === null ? "ashash" : "asfadaswdas",
            description: "rtyghjukl"
        }
    });

    console.log("item", props.item);
    const onSubmit = data => {
        props.item === null ?
            data.id = props.appointments.length :
            data.id = props.item.id;
        handleSubmitAppointment(data);
        props.handleToggle();
        reset();
    }

    const handleSubmitAppointment = (data) => {
        let action = null;
        props.item === null ?
            action = addAppointment(data) :
            action = updateAppointment(data);
        dispatch(action);
        console.log(action)
    }

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        setStartDate(props.dateChoice);
        setEndDate(props.dateChoice);
    }, [props.dateChoice])



    const list = () => (
        <Box
            sx={{
                width: 650
            }}
        >
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <div className='group'>
                    <IconButton onClick={props.handleToggle}>
                        <CloseIcon />
                    </IconButton>
                    <Button type='submit' style={{ float: "right" }} variant="contained">SAVE</Button>
                </div>
                <div className='group'>
                    <label>Details</label> <br />
                    <div>
                        {props.item?.title}
                    </div>
                    <input id='title' name="title" type='text' placeholder='Title' {...register("title")} />
                </div>
                <div className='group'>
                    <Grid container>
                        <Grid item xs={5.5}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} {...register("startDate")} />}
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={1}>
                            <p style={{ textAlign: 'center' }}>-</p>
                        </Grid>
                        <Grid item xs={5.5}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} />}
                                        {...register("endDate")}
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>
                <div className='group'>
                    <label>More Information</label> <br />
                    <textarea rows='6' {...register("description")} />
                </div>
            </form>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={'left'}
                open={props.open}
                onClose={props.handleToggle}
            >
                {list()}
            </Drawer>
        </div>
    );
}
