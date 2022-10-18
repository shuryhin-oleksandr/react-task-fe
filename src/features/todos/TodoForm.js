import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {TextField} from "formik-mui";
import {Button} from "@mui/material";
import * as React from "react";
import {diff} from "deep-object-diff";
import {useAddNewTodoMutation, useEditTodoMutation} from "../api/apiSlice";

export const TodoForm = (props) => {
  const {todoId} = useParams();
  const navigate = useNavigate();
  // TODO: Remove redundant argument
  // TODO: Add error handling
  // TODO: Add loading handling
  const [addNewToDo, { isAddLoading }] = useAddNewTodoMutation()
  const [editToDo, { isEditLoading }] = useEditTodoMutation()

  const handleUpdate = (todoData) => {
    editToDo({todoId, todoData})
  }
  const handleCreate = (todoData) => {
    addNewToDo(todoData)
  }

  const handleSubmit = async (formik) => {
    const dataToSend = diff(formik.initialValues, formik.values);

    if (props.editMode) {
      // Ask: how can I submit until request is done?
      // Ask: Is it a correct way to handle both create and update actions?
      await handleUpdate(dataToSend)
    } else {
      await handleCreate(dataToSend)
    }
    formik.setSubmitting(false)
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

  return (
    <Formik
      initialValues={props.initial}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          {/*Ask: how will I get a formik instance in from the field? Does useFormik do this? */}
          <Field
            component={TextField} name="name" label="Name" variant="outlined" size="small" margin="dense"/>
          <br/>
          <Field
            component={TextField} name="description" label="Description" variant="outlined" size="small"
            margin="dense" multiline minRows={2} sx={{maxWidth: 195}}/>
          <br/>
          <Button variant="contained" size="small" sx={{marginTop: 1}}
                  onClick={() => handleSubmit(formik)}>Save</Button>
        </Form>
      )}
    </Formik>
  );
}