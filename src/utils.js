const getReqData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
};

const validReqData = (body) => {
    try {
        const { name, age, hobbies } = JSON.parse(body);

        if (!name || !age) return false;
        if (typeof name !== 'string') return false;
        if (typeof age !== 'number') return false;
        if (hobbies && !Array.isArray(hobbies)) return false;
        if (hobbies && hobbies.length > 0) {
            const arr = hobbies.filter((str) => typeof str !== 'string');
            if (arr.length > 0) return false;
        }

        return true;
    } catch (error) {
        error;
    }
};

module.exports = { 
    getReqData,
    validReqData,
};
