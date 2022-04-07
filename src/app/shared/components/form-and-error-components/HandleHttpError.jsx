import React from 'react'
import { toast } from 'react-toastify'

const isHandlerEnabled = (config = {}) => {
    return !(config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled)
}

const errorToastMessage = (error) => (
    <div className="text-center">
        <strong>
            {
                error.response.data.message == null ? (
                    <>
                        Erreur dans : {error.response.request.responseURL}
                        <br/>{error.response.status} : {error.response.statusText})
                    </>
                ) : (
                    <>
                        {error.response.data.message}
                    </>
                )
            }

        </strong>
    </div>
) 

/**
 * Component to handle the errors (like errors from an api back end)
 * 
 * @param {object} error 
 * 
 * @author Mohamed Nechab
 */
const handleHttpError = (error) => {
    console.log(error)
    if (!error.response) return
    else if (isHandlerEnabled(error.config)) toast.error(errorToastMessage(error))
    return Promise.reject(error);
}

export default handleHttpError;