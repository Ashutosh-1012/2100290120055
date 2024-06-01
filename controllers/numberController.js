const NumberWindow = require('../models/NumberWindow');
const fetchNumbers = require('../utils/fetchNumbers');
const WINDOW_SIZE = 10;

const getNumbers = async (req, res) => {
    const numberId = req.params.numberid;
    const validIds = ['p', 'f', 'e', 'r'];
    const endpoints = {
        'p': 'primes',
        'f': 'fibo',
        'e': 'even',
        'r': 'rand'
    };

    if (!validIds.includes(numberId)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const numbers = await fetchNumbers(endpoints[numberId]);
    const windowData = await NumberWindow.findOne({}) || new NumberWindow({ numbers: [] });
    const windowPrevState = [...windowData.numbers];

    numbers.forEach(number => {
        if (!windowData.numbers.includes(number)) {
            if (windowData.numbers.length >= WINDOW_SIZE) {
                windowData.numbers.shift();
            }
            windowData.numbers.push(number);
        }
    });

    await windowData.save();

    const windowCurrState = [...windowData.numbers];
    const avg = (windowCurrState.reduce((acc, num) => acc + num, 0) / windowCurrState.length).toFixed(2);

    res.json({
        numbers,
        windowPrevState,
        windowCurrState,
        avg
    });
};

module.exports = { getNumbers };
