# Alazab Construction Website

Static website for Alazab Construction to present services, projects, and contact information.

## Tech Stack
- HTML
- CSS / SCSS
- JavaScript
- External frontend libraries via CDN (e.g., Swiper, Lightgallery)

## Run Locally
No build step is required.

1. Clone the repository.
2. Open `index.html` directly in your browser.

## Project Structure (high level)
- `index.html` and other `*.html` files: website pages
- `css/`: stylesheets
- `js/`: frontend scripts and animation assets
- `assets/`, `images/`, `img/`, `logo/`: static media assets
- `.github/workflows/static.yml`: GitHub Pages deployment workflow

## Deployment
Deployment is handled by GitHub Pages through the workflow in `.github/workflows/static.yml`.

### GitHub Pages + Custom Domain
- The repository includes a root `CNAME` file with `al-azab.co`.
- The workflow enables GitHub Pages automatically and deploys the repository content.
- Keep static files that must be available from the domain root (example: `w.png`) in repository root so they are served as:
  - `https://al-azab.co/w.png`

### Verification checklist
1. Push to `main` or `master`.
2. Confirm the workflow **Deploy static content to Pages** finishes successfully.
3. In repository **Settings → Pages**, confirm the site is active and domain is `al-azab.co`.
4. Open:
   - `https://al-azab.co/`
   - `https://al-azab.co/w.png`

## Contact
- Email: info@al-azab.co
- LinkedIn: [Mohamed Azab](https://www.linkedin.com/in/mohamed-azab-109a70274/)
