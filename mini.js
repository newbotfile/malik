const express = require('express');
const axios = require('axios');
const router = express.Router();

// Server URLs for ERFAN-MD
const serverUrls = {
    'server1': 'https://irfan-x1-6cf0ec6ac6f4.herokuapp.com',
    'server2': 'https://irfan-x2-a47b0fd0369b.herokuapp.com',
    'server3': 'https://irfan-x3-3a0bb4f72e98.herokuapp.com',
    'server4': 'https://irfan-x4-18049ab2d15a.herokuapp.com',
    'server5': 'https://irfan-x5-fc968780e33e.herokuapp.com',
    'server6': 'https://irfan-x6-19bee864fce7.herokuapp.com',
    'server7': 'https://irfan-x7-2ea9214bbbc8.herokuapp.com',
    'server8': 'https://irfan-x8-df079c6a0406.herokuapp.com',
    'server9': 'https://irfan-x9-3a39e194caa7.herokuapp.com',
    'server10': 'https://irfan-x10-c9bc8fdb4e52.herokuapp.com',
    'server11': 'https://irfan-x11-6d59647899a5.herokuapp.com',
    'server12': 'https://irfan-x12-9ba2470d54c7.herokuapp.com'  // ✅ FIXED!
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
