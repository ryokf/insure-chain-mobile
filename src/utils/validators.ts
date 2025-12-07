export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export function getPasswordStrength(password: string): PasswordStrength {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'fair';
    if (score <= 4) return 'good';
    return 'strong';
}

export function validatePassword(password: string): {
    readonly isValid: boolean;
    readonly errors: readonly string[];
} {
    const errors: string[] = [];

    if (password.length < 8) errors.push('Password must be at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain lowercase letter');
    if (!/\d/.test(password)) errors.push('Password must contain number');

    return {
        isValid: errors.length === 0,
        errors,
    };
}

export function validateSeedPhrase(phrase: string): {
    readonly isValid: boolean;
    readonly wordCount: number;
    readonly error?: string;
} {
    const words = phrase.trim().split(/\s+/);
    const wordCount = words.length;

    const validCounts = [12, 15, 18, 21, 24];

    if (!validCounts.includes(wordCount)) {
        return {
            isValid: false,
            wordCount,
            error: `Seed phrase must have 12, 15, 18, 21, or 24 words. You entered ${wordCount} words.`,
        };
    }

    return {
        isValid: true,
        wordCount,
    };
}

export function validatePasswordMatch(
    password: string,
    confirmPassword: string,
): {
    readonly isValid: boolean;
    readonly error?: string;
} {
    if (password !== confirmPassword) {
        return {
            isValid: false,
            error: 'Passwords do not match',
        };
    }

    return {
        isValid: true,
    };
}
