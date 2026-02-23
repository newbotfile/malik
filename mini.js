const express = require('express');
const axios = require('axios');
const router = express.Router();

// Server URLs for ERFAN-MD
const serverUrls = {
    'server1': 'https://erfan-1-a6887c47a0f5.herokuapp.com',
    'server2': 'https://erfan-2-84ba50ad74a3.herokuapp.com',
    'server3': 'https://erfan-3-15f0623d12c7.herokuapp.com',
    'server4': 'https://erfan-4-1a4964ebe5bb.herokuapp.com',
    'server5': 'https://erfan-5-7d6c1550b886.herokuapp.com',
    'server6': 'https://erfan-6-65085074ccc1.herokuapp.com',
    'server7': 'https://erfan-7-71bfcb746ac7.herokuapp.com',
    'server8': 'https://erfan-8-babdb2a4c766.herokuapp.com',
    'server9': 'https://erfan-9-4901b478b4b4.herokuapp.com',
    'server10': 'https://erfan-10-362153c5271e.herokuapp.com',
    'server11': 'https://erfan-11-3194ff41316d.herokuapp.com',
    'server12': 'https://erfan-12-cd99e718d667.herokuapp.com'  // ✅ FIXED!
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
