const express = require('express');
const axios = require('axios');
const router = express.Router();

// Server URLs for ERFAN-MD
const serverUrls = {
    'server1': 'https://aserver1-d0aa3babd520.herokuapp.com',
    'server2': 'https://aserver2-c6f4bfc5aa45.herokuapp.com',
    'server3': 'https://aserver3-f6b149ec2b4b.herokuapp.com',
    'server4': 'https://aserver4-d17fe684a28c.herokuapp.com',
    'server5': 'https://aserver5-772576c88dcf.herokuapp.com',
    'server6': 'https://aserver6-f0b9d21a63d8.herokuapp.com',
    'server7': 'https://aserver7-697dc5638187.herokuapp.com',
    'server8': 'https://aserver8-405a1ca16997.herokuapp.com',
    'server9': 'https://aserver9-6102a200adf4.herokuapp.com',
    'server10': 'https://aserver10-e210b898dcd5.herokuapp.com' // ✅ FIXED!
};

// Get server list
router.get('/servers', (req, res) => {
    const servers = Object.keys(serverUrls).map(key => ({
        id: key,
        name: `Server ${key.replace('server', '')}`,
        url: serverUrls[key]
    }));
    res.json({ servers });
});

// Get server status
router.get('/status/:serverId', async (req, res) => {
    try {
        const { serverId } = req.params;
        const serverUrl = serverUrls[serverId];
        
        if (!serverUrl) {
            return res.json({ error: 'Server not found' });
        }
        
        const response = await axios.get(`${serverUrl}/active`, {
            timeout: 5000
        });
        
        res.json({
            count: response.data.count || 0,
            limit: response.data.limit || 50
        });
    } catch (error) {
        res.json({
            count: 0,
            limit: 50,
            error: 'Failed to fetch status'
        });
    }
});

// Generate pair code
router.get('/code', async (req, res) => {
    try {
        const { server, number } = req.query;
        
        if (!server || !number) {
            return res.json({ error: 'Server and number are required' });
        }
        
        const serverUrl = serverUrls[server];
        if (!serverUrl) {
            return res.json({ error: 'Server not found' });
        }
        
        const phoneNumber = number.replace(/[^\d]/g, '');
        if (phoneNumber.length < 10 || phoneNumber.length > 15) {
            return res.json({ error: 'Invalid phone number format' });
        }
        
        const response = await axios.get(`${serverUrl}/code?number=${phoneNumber}`, {
            timeout: 15000
        });
        
        // Return ONLY the code
        if (response.data && response.data.code) {
            res.json({ code: response.data.code });
        } else {
            res.json({ error: 'No code received' });
        }
    } catch (error) {
        res.json({ error: 'Failed to generate code' });
    }
});

// Random server endpoint for bot pair command
router.get('/random', (req, res) => {
    const servers = Object.keys(serverUrls);
    const randomServer = servers[Math.floor(Math.random() * servers.length)];
    res.json({ 
        server: randomServer,
        url: serverUrls[randomServer] 
    });
});

module.exports = router;
