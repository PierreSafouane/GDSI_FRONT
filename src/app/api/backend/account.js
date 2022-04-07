
import apiBackEnd from './api.Backend';
import { URL_BACK_AUTHENTICATE } from './../../shared/constants/urls/urlBackEnd';

export function authenticate(values) {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values)
}