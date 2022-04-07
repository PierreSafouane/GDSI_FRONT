import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import makeAnimated from 'react-select/animated';
import { InsyChoice, InsyInputText, InsySelect } from './../form-and-error-components/InputCustom';

const animatedComponents = makeAnimated();

const schemaForm = Yup.object().shape({
    name: Yup.string().required("Required input"),
    gender: Yup.string().required("Required input"),
    hobby: Yup.array().required("Required input")
})

const initialValues = {
    name: '',
    gender: '',
    hobby: ''
}

const genderOptions = [
    {label:'Female', value:'female'},
    {label:'Male', value:'male'},
    {label:'Other', value:'other'},
]

const optionsHobbies = [
    {label:'Tennis', value:'tennis'},
    {label:'Football', value:'football'},
    {label:'Karaté', value:'karate'},
    {label:'Natation', value:'natation'},
]

const FormExample = () => {

    const submit = values => console.log(values);

    return (
        <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schemaForm}>
            {({values}) => (
                <Form>
                    <InsyChoice
                        type='radio'
                        name='gender'
                        options={ genderOptions }
                        valueSelected={values.gender}
                        inline
                    />
                    <Field
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        component={ InsyInputText } 
                        className="form-control mt-4"
                        errorRight
                    />
                    <Field
                        name='hobby'
                        options={optionsHobbies}
                        component={InsySelect}
                        placeholder="Hobbies..."
                        errorRight
                        isClearable
                        isMulti
                        components={animatedComponents}
                        className="mt-4"
                    />
                    <button 
                        type='submit'
                        className="btn btn-block btn-dark mt-4"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default FormExample;