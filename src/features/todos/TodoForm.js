import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {TodoAPI} from "./todoAPI";
import {TextField} from "formik-mui";
import {Button} from "@mui/material";
import * as React from "react";

export const TodoForm = (props) => {
  const dispatch = useDispatch()
  const {todoId} = useParams();
  const navigate = useNavigate();

  const handleUpdate = (todoData) => {
    dispatch(TodoAPI.updateById({todoId, todoData}))
  }
  const handleCreate = (todoData) => {
    dispatch(TodoAPI.create(todoData))
  }

  const handleSubmit = async (todoData, {setSubmitting}) => {
    if (props.editMode) {
      // Ask: how can I submit until request is done?
      // Ask: Is it a correct way to handle both create and update actions?
      await handleUpdate(todoData)
    } else {
      await handleCreate(todoData)
    }
    setSubmitting(false)
    navigate(-1)
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .min(3, 'Must be 3 characters or more')
      .max(50, 'Must be 50 characters or less'),
    description: Yup.string()
      .required('Required')
      .min(3, 'Must be 3 characters or more')
      .max(200, 'Must be 200 characters or less'),
  })

  console.log(props.initial)

  return (
    <Formik
      initialValues={props.initial}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Field
            component={TextField} name="name" label="Name" variant="outlined" size="small" margin="dense"/>
          <br/>
          <Field
            component={TextField} name="description" label="Description" variant="outlined" size="small"
            margin="dense" multiline minRows={2} sx={{maxWidth: 195}}/>
          <br/>
          <Button variant="contained" size="small" sx={{marginTop: 1}}
                  onClick={() => formik.submitForm(formik.touched)}>Save</Button>
        </Form>
      )}
    </Formik>
  );
}