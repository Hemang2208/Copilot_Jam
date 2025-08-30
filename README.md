
# Interplanetary Travel Experience (World of 2070)

A futuristic, dark-mode-only web app simulating the user journey of interplanetary travel in the year 2070. Built with Next.js, Tailwind CSS, ShadCN, Framer Motion, and more.

## Features

- **Futuristic UI**: Fully dark mode, immersive visuals, and animated transitions.
- **User Flow**:
  1. **Generate Your Role**: Describe yourself and get a unique interplanetary role.
  2. **Learn Skills**: Earn licenses for space travel in the Skills Marketplace.
  3. **Book Travel**: Choose a planet and book your journey.
  4. **View Boarding Pass**: See your itinerary and boarding details.
- **Persistent Progress**: All user actions (role, skills, bookings) are saved in localStorage.
- **Responsive Design**: Works beautifully on desktop and mobile.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## Getting Started

1. **Clone the repository:**
	```sh
	git clone <your-repo-url>
	cd Copilot_Jam
	```
2. **Install dependencies:**
	```sh
	npm install
	# or
	yarn install
	```
3. **Run the development server:**
	```sh
	npm run dev
	# or
	yarn dev
	```
4. **Open in your browser:**
	Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/app/` — Main app pages (landing, generate, marketplace, travel, etc.)
- `src/components/` — Reusable UI and feature components
- `src/lib/` — Constants and utility functions
- `public/` — Static assets (images, icons)

## Customization

- All theme colors and UI are designed for a dark, sci-fi look.
- To add new skills or planets, edit `src/lib/constants.ts`.
- All user progress is stored in localStorage for demo purposes.

## Credits

- Built by Hemang2208 for the Copilot Jam.
- Inspired by sci-fi, space travel, and the future of learning.

## License

MIT License
