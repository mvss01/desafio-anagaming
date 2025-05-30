module.exports = {
    theme: {
        extend: {
            animation: {
                "fade-in": "fadeIn 0.8s ease-out",
                "glow": "glow 2s infinite alternate",
                "bounce": "bounce 1.5s infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0, transform: "scale(0.95)" },
                    "100%": { opacity: 1, transform: "scale(1)" },
                },
                glow: {
                    "0%": { opacity: 0.6 },
                    "100%": { opacity: 1 },
                },
            },
        },
    },
};
