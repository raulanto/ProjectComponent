export default {
    theme: {
        extend: {
            // Define los breakpoints del contenedor
            containers: {

                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            }
        }
    },
    plugins: [
        require('@tailwindcss/container-queries')
    ]
}