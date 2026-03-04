const express = require('express');
const axios = require('axios');
const router = express.Router();

// Server URLs for ERFAN-MD
const serverUrls = {
    'server1': 'https://amini1-28eb311dc9df.herokuapp.com',
    'server2': 'https://amini2-37f6c3cae4c0.herokuapp.com',
    'server3': 'https://amini3-7d9bc0e9a450.herokuapp.com',
    'server4': 'https://amini4-6d12f04eee0e.herokuapp.com',
    'server5': 'https://amini5-78e6d1b5f3e5.herokuapp.com',
    'server6': 'https://amini6-76c17093a1b7.herokuapp.com',
    'server7': 'https://amini7-e9ba3a5065e8.herokuapp.com',
    'server8': 'https://amini8-c561cdbbe8fc.herokuapp.com',
    'server9': 'https://amini-9-32994a855ea4.herokuapp.com',
    'server10': 'https://amini10-dc7254126648.herokuapp.com',
    'server11': 'https://amini11-2adce08372a1.herokuapp.com',
    'server12': 'https://amini12-d9ae808fb3a2.herokuapp.com',
    'server13': 'https://amini13-8e49068f428f.herokuapp.com',
    'server14': 'https://amini14-f0c2ba4dcc3a.herokuapp.com',
    'server15': 'https://amini15-a076c8d3b443.herokuapp.com',
    'server16': 'https://amini16-b118a1e50cd2.herokuapp.com',
    'server17': 'https://amini17-f0bd6d4f1acb.herokuapp.com',
    'server18': 'https://amini18-ab087407c2e5.herokuapp.com',
    'server19': 'https://amini19-91ddda78f72f.herokuapp.com',
    'server20': 'https://amini20-9b6034900f38.herokuapp.com'  // ✅ FIXED!
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
