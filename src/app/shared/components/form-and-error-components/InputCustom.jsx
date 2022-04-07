import React from 'react'
import { ErrorMessage, Field } from 'formik'
import Select from 'react-select';
import { TextField } from '@material-ui/core';

/**
 * Composant générique permettant de gérer facilement les Choices (Checkbox et Radiobutton) en utilisant MDB et Formik
 * 
 * @param {Boolean} inline: Permet de définir les Choices en form-inline
 * @param {Array} options: Les options représente les différents Choices, sous forme de tableau d'objet:{label:'Oui', value:"true"}
 * @param {Boolean} marginLeft Désigne si les Choices auront un margin ml-4, par défaut étant de mr-4
 * @param {Any} valueSelected: La valeur sélectionne, typiquement retourner par: valueSelected={values.name}
 * 
 * @example <InsyChoice type='radio' name='leasing' options={option} valueSelected={values.leasing} marginLeft inline />
 * @author Peter Mollet
 */
export const InsyChoice = ({ inline, name, options, valueSelected, type, ...rest }) => {
	return(
		<>
			<div className={ inline && 'form-inline' }>
			{
				options.map(({ label, value }, index) => (
					<Field 
						key={ index } 
						placeholder={ label }
						id={ name + value }
						value={ value }
						checked={ type === 'radio' ? valueSelected === value : valueSelected.includes(value) }
						type={ type }
						name={ name } 
						component={ InsyInputText }
						{ ...rest }
					/>
				))
			}
				<ErrorMessage 
					name={name} 
					component="small" 
					className="text-danger"
				/>
			</div>
			
		</>
	)
}

/**
 * Composant générique permettant de gérer facilement les Input simple (text, text-area, number) en utilisant MDB et Formik
 * 
 * @param {String} placeholder: label de l'input, qui sera affiché
 * @param {Boolean} errorRight: Permet de mettre le message d'erreur sur la droite (par défaut étant à gauche)
 * 
 * @example <Field type="email" name="email" placeholder="Email" component={ InsyInputText } className='my-0'/>
 * @author Peter Mollet
 */
export const InsyInputText = ({ placeholder, errorRight, field:{ name, onChange, onBlur, value }, form:{ errors, touched }, ...rest }) => {

	return(
		<>
			<TextField
				error={errors[name] && touched[name]}
				label={ placeholder }
				name={ name }
				onChange={ onChange }
				onBlur={ onBlur }
				value={ value }
				variant="outlined"
				{ ...rest}
			/>
			<ErrorMessage 
				name={ name }
				component="small" 
				className={ `text-danger ${ errorRight ? 'float-right' : 'float-left' }` }
				style={{marginBottom:'-20px'}}
			/>
		</>
    )
}

/**
 * Composant permettant de facilement utiliser MDBSelect (single ou multiple)
 * 
 * @param {Array} options: Liste d'options, selon MDBSelect. Sous forme d'objet {text:'Male',value:1,checked:false}
 * @param {Boolean} isMulti: Défini si le Select est un multiple select ou non (renvoi une liste si oui)
 * @param {Boolean} errorRight: Pour mettre le message d'erreur à droite, gauche par défaut
 * @param {String} label: Permet de définir le libellé du Select
 * 
 * @example <Field type="select" name="gender" options={options} component={InsySelect} label="Gender" errorRight />
 * @author Peter Mollet
 */
export const InsySelect = ({ isMulti, options, errorRight, field:{name, value, onBlur}, form:{setFieldValue, errors}, ...rest }) => {
    const onChange = (option) => {
        isMulti 
        ? setFieldValue(name, option.map(o => o.value))
        : setFieldValue(name, option.value)
	}
	
    const customTheme = (theme) => {
        return {
            ...theme,
            colors: {
                 ...theme.colors,
                 neutral20: errors[name] ? 'red' : "hsl(0, 0%, 80%)"
            },
        }
	}
	
    return(
        <>
			<Select 
                name={name}
                value={options ? options.find(option => option.value === value) : ''}
                onChange={option => onChange(option)}
                onBlur={onBlur}
                isMulti={isMulti}
                options={options}
                theme={customTheme}
                {...rest}
            />
            <ErrorMessage 
				name={ name }
				component="small"
				className={ `text-danger ${errorRight ? 'float-right' :  'float-left'}` }
			/>
        </>
    )
}