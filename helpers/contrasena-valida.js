const esContrasenaValida = (contrasena) => {
    // Verificar longitud
    if (contrasena.length < 8) {
        return {
            ok: false,
            msg: `La contraseña debe tener al menos 8 caracteres.`
        };
    }
    if (contrasena.length > 15) {
        return {
            ok: false,
            msg: `La contraseña no debe exceder los 15 caracteres.`
        };
    }

    // Verificar al menos una letra mayúscula
    if (!/[A-Z]/.test(contrasena)) {
        return {
            ok: false,
            msg: `La contraseña debe contener al menos una letra mayúscula.`
        };
    }

    // Verificar al menos una letra minúscula
    if (!/[a-z]/.test(contrasena)) {
        return {
            ok: false,
            msg: `La contraseña debe contener al menos una letra minúscula.`
        };
    }

    // Verificar al menos un dígito
    if (!/[0-9]/.test(contrasena)) {
        return {
            ok: false,
            msg: `La contraseña debe contener al menos un dígito.`
        };
    }

    // Verificar al menos un caracter especial
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasena)) {
    //     return {
    //         ok: false,
    //         msg: `La contraseña debe contener al menos un carácter especial.`
    //     };
    // }

    // Verificar que no haya espacios en blanco
    if (/\s/.test(contrasena)) {
        return {
            ok: false,
            msg: `La contraseña no debe contener espacios en blanco.`
        };
    }

    // Si pasa todas las verificaciones
    return {
        ok: true,
        msg: "La contraseña es válida."
    };
}
module.exports= {
    esContrasenaValida
}