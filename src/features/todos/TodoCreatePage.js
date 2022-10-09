import {Button, Typography} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {useDispatch} from "react-redux";
import {TodoAPI} from "./todoAPI";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import * as Yup from 'yup';

const TodoCreatePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="contained" size="small" sx={{marginBottom: 3}} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Create Todo</Typography>
      <Paper elevation={3} sx={{maxWidth: 230, padding: 3}}>
        <TodoCreateForm/>
      </Paper>
    </>
  )
}

export const TodoCreateForm = () => {
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required')
          .min(3, 'Must be 3 characters or more')
          .max(50, 'Must be 50 characters or less'),
        description: Yup.string()
          .required('Required')
          .min(3, 'Must be 3 characters or more')
          .max(200, 'Must be 200 characters or less'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        // Ask: how can I submit until request is done?
        await dispatch(TodoAPI.create(values))
        setSubmitting(false)
      }}
    >
      {({ submitForm }) => (
        <Form>
          <Field
            component={TextField} name="name" label="Name" variant="outlined" size="small" margin="dense"/>
          <br/>
          <Field
            component={TextField} name="description" label="Description" variant="outlined" size="small"
            margin="dense"/>
          <br/>
          <Button variant="contained" size="small" sx={{marginTop: 1}} onClick={submitForm}>Save</Button>
        </Form>
      )}
    </Formik>
  );
}

export {TodoCreatePage}
