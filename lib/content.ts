import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

export function getContent<T>(pageName: string): T | null {
    const filePath = path.join(contentDir, `${pageName}.json`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
}

export function saveContent<T>(pageName: string, content: T): void {
    const filePath = path.join(contentDir, `${pageName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

export function getAllContentPages(): string[] {
    if (!fs.existsSync(contentDir)) {
        return [];
    }

    return fs.readdirSync(contentDir)
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
}
