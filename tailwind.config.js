/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#806eb5',
                    mid: '#634da3',
                    dim: '#452b91'
                },
                background: '#11111b',

            },
            boxShadow: {
                glow: '0 0 10px rgba(255, 255, 255, 0.7)',
                glowStrong: '0 0 20px rgba(255, 255, 255, 0.9)',
            },
        }, // Added closing brace for 'extend'
    },
    plugins: [],
}
