/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			travel: {
  				50: 'hsl(var(--travel-50))',
  				100: 'hsl(var(--travel-100))',
  				200: 'hsl(var(--travel-200))',
  				300: 'hsl(var(--travel-300))',
  				400: 'hsl(var(--travel-400))',
  				500: 'hsl(var(--travel-500))',
  				600: 'hsl(var(--travel-600))',
  				700: 'hsl(var(--travel-700))',
  				800: 'hsl(var(--travel-800))',
  				900: 'hsl(var(--travel-900))'
			},
			bali: {
				50: 'hsl(var(--bali-50))',
				100: 'hsl(var(--bali-100))',
				200: 'hsl(var(--bali-200))',
				300: 'hsl(var(--bali-300))',
				400: 'hsl(var(--bali-400))',
				500: 'hsl(var(--bali-500))',
				600: 'hsl(var(--bali-600))',
				700: 'hsl(var(--bali-700))',
				800: 'hsl(var(--bali-800))',
				900: 'hsl(var(--bali-900))'
			},
			paris: {
				50: 'hsl(var(--paris-50))',
				100: 'hsl(var(--paris-100))',
				200: 'hsl(var(--paris-200))',
				300: 'hsl(var(--paris-300))',
				400: 'hsl(var(--paris-400))',
				500: 'hsl(var(--paris-500))',
				600: 'hsl(var(--paris-600))',
				700: 'hsl(var(--paris-700))',
				800: 'hsl(var(--paris-800))',
				900: 'hsl(var(--paris-900))'
			},
			tokyo: {
				50: 'hsl(var(--tokyo-50))',
				100: 'hsl(var(--tokyo-100))',
				200: 'hsl(var(--tokyo-200))',
				300: 'hsl(var(--tokyo-300))',
				400: 'hsl(var(--tokyo-400))',
				500: 'hsl(var(--tokyo-500))',
				600: 'hsl(var(--tokyo-600))',
				700: 'hsl(var(--tokyo-700))',
				800: 'hsl(var(--tokyo-800))',
				900: 'hsl(var(--tokyo-900))'
			},
			newyork: {
				50: 'hsl(var(--newyork-50))',
				100: 'hsl(var(--newyork-100))',
				200: 'hsl(var(--newyork-200))',
				300: 'hsl(var(--newyork-300))',
				400: 'hsl(var(--newyork-400))',
				500: 'hsl(var(--newyork-500))',
				600: 'hsl(var(--newyork-600))',
				700: 'hsl(var(--newyork-700))',
				800: 'hsl(var(--newyork-800))',
				900: 'hsl(var(--newyork-900))'
			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in': {
  				from: {
  					transform: 'translateX(-100%)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.3s ease-out',
  			'slide-in': 'slide-in 0.3s ease-out'
}
	}
  },
  plugins: [tailwindcssAnimate],
}