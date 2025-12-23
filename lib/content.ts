import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

export function getContent<T>(pageName: string, lang: string = 'en'): T | null {
    const filePath = path.join(contentDir, lang, `${pageName}.json`);

    if (!fs.existsSync(filePath)) {
        // Fallback to English if language file doesn't exist
        const enFilePath = path.join(contentDir, 'en', `${pageName}.json`);
        if (fs.existsSync(enFilePath)) {
            const fileContent = fs.readFileSync(enFilePath, 'utf-8');
            return JSON.parse(fileContent) as T;
        }
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
}

export function saveContent<T>(pageName: string, content: T, lang: string = 'en'): void {
    const langDir = path.join(contentDir, lang);
    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
    }

    const filePath = path.join(langDir, `${pageName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

export function getAllContentPages(lang: string = 'en'): string[] {
    const langDir = path.join(contentDir, lang);
    if (!fs.existsSync(langDir)) {
        return [];
    }

    return fs.readdirSync(langDir)
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
}
