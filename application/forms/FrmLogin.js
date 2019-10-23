import React from 'react';
import t from 'tcomb-form-native';
import validaciones from '../utils/validaciones';

export const EstructuraLogin = t.struct({
    nombre: t.String,
    email: validaciones.email,
    password: validaciones.password,
    confPassword: validaciones.password
});

export const OpcionesLogin = {
    fields: {
        nombre: {
            label: "Nombre (*)",
            placeholder: "Escribe tu nombre y apellidos",
            error: "Nombre Invalido"
        },
        email: {
            label: "Email (*)",
            placeholder: "Ingresa tu correo",
            error: "Correo invalido"
        },
        password: {
            label: "Contraseña (*)",
            placeholder: "Ingresa tu contraseña",
            error: "Contraseña invalida",
            password: true,
            secureTextEntry: true
        },
        confPassword: {
            label: "Confirmar Contraseña (*)",
            placeholder: "Confirma la contraseña",
            error: "Contraseña no coicide",
            password: true,
            secureTextEntry: true
        }
    }
};
