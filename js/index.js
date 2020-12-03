function limpiarFormulario() {
    $('input').val('');
    $('#errorIden').text('');
    $('#errorEmail').text('');
    $('#errorTel').text('');
    $('#errorApe').text('');
    $('#errorNom').text('');
    return false;
}

$('#tipoidentificacion').on('change', function () {
    var tipo = $(this).val();
    var texto = '';
    if (tipo == 'Nacional') {
        texto = 'Formato 101230123 sin espacios *';
        $('.inputNombre').addClass('d-none');
        $('#identificacion').attr('maxlength', 9);
    }
    if (tipo == 'DIMEX') {
        texto = 'Dimex 12 dígitos *';
        $('.inputNombre').removeClass('d-none');
        $('#identificacion').attr('maxlength', 12);
    }

    $('#emailHelp').text(texto);
    var id = $('#identificacion').val();
    var texto = '';
    var numero = /[0-9]/;
    if (tipo == 'Nacional') {
        if (id.length != 9) {
            texto = 'Ingrese una identificación válida';
        }
        if (!numero.test(id)) {
            texto = 'Ingrese una identificación válida';
        }
        if (id.length == 0 || id == '') {
            texto = '';
        }
    }
    if (tipo == 'DIMEX') {
        if (id.length != 12) {
            texto = 'Ingrese una identificación válida';
        }
        if (!numero.test(id)) {
            texto = 'Ingrese una identificación válida';
        }
        if (id.length == 0 || id == '') {
            texto = '';
        }
    }
    $('#errorIden').text(texto);
    return false;
});

$('#identificacion').on('keyup', function () {
    var tipo = $('#tipoidentificacion').val();
    var id = $(this).val();
    var texto = '';
    var numero = /^[0-9]+$/;
    var ultimodigito = id.charAt(id.length - 1);
    $('#errorIden').addClass('d-none');
    if (id.length == 0) {
        return false;
    }
    if (tipo == 'Nacional') {
        if (id.length != 9) {
            texto = 'Ingrese una identificación válida';
        }
        if (!numero.test(id)) {
            $(this).val(id.replace(ultimodigito, ''));
            ;
            texto = 'Ingrese una identificación válida';
        }
        if (id.length == 0 || id == '') {
            texto = '';
        }
    }
    if (tipo == 'DIMEX') {
        if (id.length != 12) {
            texto = 'Ingrese una identificación válida';
        }
        if (!numero.test(id)) {
            $(this).val(id.replace(ultimodigito, ''));
            texto = 'Ingrese una identificación válida';
        }
        if (id.length == 0 || id == '') {
            texto = '';
        }
    }
    $('#errorIden').text(texto);

    if (texto == '') {
        var url = "https://datatalks.io/wspadron/api/padron/" + id;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (data, status) {
                $('#emailHelp').text(data.nombre + ' ' + data.apellido1 + ' ' + data.apellido2);

                $('#nombre').val(data.nombre);
                $('#apellido').val(data.apellido1 + ' ' + data.apellido2);
            },
            error: function () {
                //alert('error'); 
            }
        });
    }

    return false;
});

$('#telefono').on('keyup', function () {
    var id = $(this).val();
    var texto = '';
    var numero = /^[0-9]+$/;
    var ultimodigito = id.charAt(id.length - 1);
    if (id.length != 8) {
        texto = 'Ingrese un número válido';
    }
    if (!numero.test(id)) {
        $(this).val(id.replace(ultimodigito, ''));
        texto = 'Ingrese un número válido';
    }
    var primero = id.substr(0, 1);
    if (primero != 2 && primero != 8 && primero != 7 && primero != 6) {
        texto = 'Ingrese un número válido';
    }


    $('#errorTel').text(texto);
    return false;
});

$('#email').on('keyup', function () {
    var id = $(this).val();
    var texto = '';
    var expreCor = /^([a-zA-Z0-9\_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,160})+$/;
    if (!expreCor.test(id)) {
        texto = 'Ingrese un correo válido';
    }

    $('#errorEmail').text(texto);
    return false;
});

$('#condominios').on('change', function () {
    var id = $(this).val();
    if (id == 'Otro') {
        $('.otros').removeClass('d-none');
    } else {
        $('.otros').addClass('d-none');
    }
    return false;
});

$('#btnSolicitar').on('click', function () {
    var tipo = $('#tipoidentificacion').val();
    var identificacion = $('#identificacion').val();
    var telefono = $('#telefono').val();
    var email = $('#email').val();
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var condominios = $('#condominios').val();
    var otro = $('#otro').val();
    var texto = '';
    var numero = /^[0-9]+$/;
    texto = '';
    $('#errorTipoTarj').addClass('d-none');
    $('#errorTipoIden').addClass('d-none');
    $('#errorIden').addClass('d-none');
    $('#errorNom').addClass('d-none');
    $('#errorApe').addClass('d-none');
    $('#errorTel').addClass('d-none');
    $('#errorEmail').addClass('d-none');
    texto = '';
    if (tipo == '' || tipo == 0 || tipo.length == 0) {
        texto = 'Seleccione un Tipo de indentificación';
        $('#errorTipoIden').text(texto);
        $('#errorTipoIden').removeClass('d-none');
        return false;
    }

    texto = '';
    if (tipo == 'Nacional') {
        if (identificacion.length != 9) {
            texto = 'Ingrese una identificación válida';
            $('#errorIden').text(texto);
            $('#errorIden').removeClass('d-none');
            return false;
        }
        if (!numero.test(identificacion)) {
            texto = 'Ingrese una identificación válida';
            $('#errorIden').text(texto);
            $('#errorIden').removeClass('d-none');
            return false;
        }
        if (identificacion.length == 0 || identificacion == '') {
            texto = '';
            $('#errorIden').text(texto);
            $('#errorIden').removeClass('d-none');
            return false;
        }
    }
    if (tipo == 'DIMEX') {
        if (identificacion.length != 12) {
            texto = 'Ingrese una identificación válida';
            $('#errorIden').text(texto);
            $('#errorIden').removeClass('d-none');
            return false;
        }
        if (!numero.test(identificacion)) {
            texto = 'Ingrese una identificación válida';
            $('#errorIden').text(texto);
            $('#errorIden').removeClass('d-none');
            return false;
        }
        if (identificacion.length == 0 || identificacion == '') {
            texto = '';
            $('#errorIden').text(texto);
            $('#errorIden').removeClass('d-none');
            return false;
        }

        if (nombre == '' || nombre == 0 || nombre.length == 0) {
            texto = 'Ingrese un nombre';
            $('#errorNom').text(texto);
            $('#errorNom').removeClass('d-none');
            return false;
        }
        if (apellido == '' || apellido == 0 || apellido.length == 0) {
            texto = 'Ingrese un apellido';
            $('#errorApe').text(texto);
            $('#errorApe').removeClass('d-none');
            return false;
        }
    }

    texto = '';
    if (telefono.length != 8) {
        texto = 'Ingrese un número válido';
        $('#errorTel').text(texto);
        $('#errorTel').removeClass('d-none');
        return false;
    }
    if (!numero.test(telefono)) {
        texto = 'Ingrese un número válido';
        $('#errorTel').text(texto);
        $('#errorTel').removeClass('d-none');
        return false;
    }
    var primero = telefono.substr(0, 1);
    if (primero != 2 && primero != 8 && primero != 7 && primero != 6) {
        texto = 'Ingrese un número válido';
        $('#errorTel').text(texto);
        $('#errorTel').removeClass('d-none');
        return false;
    }

    texto = '';
    var expreCor = /^([a-zA-Z0-9\_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,160})+$/;
    if (!expreCor.test(email)) {
        texto = 'Ingrese un correo válido';
        $('#errorEmail').text(texto);
        $('#errorEmail').removeClass('d-none');
        return false;
    }
    texto = '';
    if (condominios == '' || condominios == 0 || condominios.length == 0) {
        texto = 'Seleccione un Condominio';
        $('#errorCondomi').text(texto);
        $('#errorCondomi').removeClass('d-none');
        return false;
    }
    if (condominios == 'Otro') {
        if (otro == '' || otro == 0 || otro.length == 0) {
            texto = 'Ingrese un otro condominio';
            $('#errorOtro').text(texto);
            $('#errorOtro').removeClass('d-none');
            return false;
        }
    }

    //limpiarFormulario();
    //location.href = 'exito.html';

    $('#formdata').submit();
});
