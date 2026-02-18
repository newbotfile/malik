mini.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Server URLs for ERFAN-MD
const serverUrls = {
    'server1': 'https://erfanxmini1-d120f0a566d7.herokuapp.com',
    'server2': 'https://erfanxmini2-581336bea650.herokuapp.com',
    'server3': 'https://erfanxmini3-8c647230bcea.herokuapp.com',
    'server4': 'https://erfanxmini4-1da10bf9c15c.herokuapp.com',
    'server5': 'https://erfanxmini5-43f244327cdf.herokuapp.com',
    'server6': 'https://erfanxmini6-57266df35c08.herokuapp.com',
    'server7': 'https://erfanxmini7-0c8f9137c32e.herokuapp.com',
    'server8': 'https://erfanxmini8-6b1f80d42176.herokuapp.com',
    'server9': 'https://erfanxmini9-97cb04dd19e8.herokuapp.com',
    'server10': 'https://erfanxmini10-f6e2816cde71.herokuapp.com
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

