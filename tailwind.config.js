/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Hacker theme colors
                'hacker-green': '#00ff41',
                'hacker-dark': '#0d1117',
                'hacker-gray': '#161b22',
                'hacker-black': '#050505',
                'hacker-border': '#30363d',
                'hacker-dim': '#484f58',
                // Cyber theme colors from original HTML
                'cyber': {
                    'black': '#050505',
                    'dark': '#0a0f0d',
                    'green': '#00ff41',
                    'greenDim': 'rgba(0, 255, 65, 0.1)',
                    'red': '#ff2a2a',
                    'blue': '#00f0ff',
                    'gray': '#1a1a1a',
                    'accent': '#008F11'
                }
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
                sans: ['"Noto Sans SC"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
