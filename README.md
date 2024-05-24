# API de Envío de SMS

Esta es una API desarrollada en Node.js utilizando Express para enviar SMS de manera masiva o individual utilizando el servicio de Twilio.

## Requisitos

- Node.js
- npm
- Cuenta de Twilio

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd tu_repositorio
    ```
3. Instala las dependencias necesarias:
    ```bash
    npm install
    ```

## Configuración

1. Crea un archivo `.env` en el directorio raíz del proyecto y añade tus credenciales de Twilio:
    ```env
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    ```

2. Asegúrate de que las variables del archivo `.env` se carguen correctamente. Puedes usar el paquete `dotenv` para ello. Instálalo con:
    ```bash
    npm install dotenv
    ```

3. Modifica tu `app.js` para cargar las variables de entorno:
    ```javascript
    require('dotenv').config();
    const express = require('express');
    const bodyParser = require('body-parser');
    const twilio = require('twilio');

    const app = express();
    const port = process.env.PORT || 3000;

    // Configuración del middleware
    app.use(bodyParser.json());

    // Configuración de Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);

    app.post('/send-sms', (req, res) => {
        const { numero, cuerpo } = req.body;

        if (!numero || !cuerpo) {
            return res.status(400).json({ error: 'Número y cuerpo del mensaje son requeridos' });
        }

        client.messages.create({
            body: cuerpo,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: numero
        })
        .then((message) => {
            res.status(200).json({ message: 'SMS enviado correctamente', sid: message.sid });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    });

    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
    ```

## Uso

1. Inicia el servidor:
    ```bash
    node app.js
    ```

2. Envía una solicitud POST a `http://localhost:3000/send-sms` con un cuerpo JSON como el siguiente:
    ```json
    {
        "numero": "+1234567890",
        "cuerpo": "Este es un mensaje de prueba"
    }
    ```

## Endpoints

### POST /send-sms

Envía un SMS al número especificado con el cuerpo del mensaje proporcionado.

#### Parámetros

- `numero` (string): El número de teléfono al que se enviará el SMS. Debe estar en formato internacional.
- `cuerpo` (string): El contenido del mensaje SMS.

#### Ejemplo de solicitud

```json
{
    "numero": "+1234567890",
    "cuerpo": "Este es un mensaje de prueba"
}
