// Importa la biblioteca de Twilio
import twilio from 'twilio';

// Configura las credenciales de Twilio
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Tu SID de cuenta de Twilio
const authToken = 'YOUR_TWILIO_AUTH_TOKEN'; // Tu token de autenticación de Twilio
const client = twilio(accountSid, authToken); // Crea un nuevo cliente de Twilio

// Función para enviar un SMS
export const sendSms = (req, res) => {
    // Extrae el número de teléfono y el cuerpo del mensaje de la solicitud
    const { numero, cuerpo } = req.body;

    // Si no se proporcionan el número de teléfono o el cuerpo del mensaje, devuelve un error
    if (!numero || !cuerpo) {
        return res.status(400).json({ error: 'Número y cuerpo del mensaje son requeridos' });
    }

    // Intenta enviar el mensaje
    client.messages.create({
        body: cuerpo, // El cuerpo del mensaje
        from: 'YOUR_TWILIO_PHONE_NUMBER', // Tu número de teléfono de Twilio
        to: numero // El número de teléfono al que se envía el mensaje
    })
    .then((message) => {
        // Si el mensaje se envía correctamente, devuelve una respuesta exitosa
        res.status(200).json({ message: 'SMS enviado correctamente', sid: message.sid });
    })
    .catch((error) => {
        // Si hay un error al enviar el mensaje, devuelve un error
        res.status(500).json({ error: error.message });
    });
};