export default async function validateToken(albumHash, clientId) {
    const apiUrl = `https://api.imgur.com/3/album/${albumHash}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Client-ID ${clientId}`
            }
        });

        if (!response.ok) {
            return false; // Album is not available
        }

        const data = await response.json();
        if (data.success) {
            return true; // Album is available
        } else {
            return false; // Album is not available
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return false; // Error occurred, assume album is not available
    }
}