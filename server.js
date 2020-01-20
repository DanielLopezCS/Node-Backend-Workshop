const express = require('express');
const cors = require('cors');
const app = express();



//apply cors
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/database', require('./routes/api/database'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
