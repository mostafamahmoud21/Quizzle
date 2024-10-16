import * as bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(parseInt(process.env.ROUND)); // Generate salt with a strength of 10 rounds
    return bcrypt.hash(password, salt);
};

// Function to compare a password with a hash
export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
