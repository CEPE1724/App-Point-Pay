// slack.js
import { APIURL } from '../../config/apiconfig';

export const sendSlackMessage = async (errorDetails) => {
    const webhookUrl = APIURL.postSlack();
    const payload = {
        text: `*🚨 Error Reportado:*\n
            *🕒 Timestamp:* ${new Date().toISOString()}\n
            *👤 Usuario ID:* ${errorDetails.userId}\n
            *👤 Nombre de Usuario:* ${errorDetails.username}\n
            *⚙️ Componente:* ${errorDetails.component}\n
            *📝 Descripción:* ${errorDetails.errorMessage}\n
            *🔄 Proceso:* ${errorDetails.process}\n
            *🔍 Datos Contextuales:* \`\`\`${JSON.stringify(errorDetails.context, null, 2)}\`\`\`\n
            *🗂️ Stack Trace:* ${errorDetails.stackTrace || 'No disponible'}\n
            *🔴 Nivel de Severidad:* ${errorDetails.severity || 'ERROR'}\n
        `,
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje a Slack');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
