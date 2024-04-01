const db = require('./src/config/database');
const User = db.UserModel;
const createFirstUser = async () => {
    try {
        const existingUser = await User.findOne({ where: { email: 'first.user@example.ext' } });

        if (existingUser) {
            console.log('User already exists.');
            process.exit(0);
        }

        await User.create({
            fullname: 'WhosYourDaddy',
            email: 'first.user@example.ext',
            password: "admin123!",
        });

        console.log('User created successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error creating User:', error);
    }
};

createFirstUser();
