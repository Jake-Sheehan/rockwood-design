import { persistentAtom } from '@nanostores/persistent';

export const theme = persistentAtom<string>('theme', 'light');

export function toggleTheme() {
    theme.set(theme.get() === 'light' ? 'dark' : 'light');
}
