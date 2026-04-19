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

### How it works
- Every push to `master` (or `main`) triggers the **"Deploy static content to Pages"** workflow.
- The workflow uses `actions/configure-pages` with `enablement: true`, which automatically enables GitHub Pages (via GitHub Actions) if it is not already active in the repository settings.
- After deployment, a verification step checks that key pages (`index.html`, `contact.html`, etc.) respond with HTTP 2xx or 3xx. Any page that fails causes the workflow to exit with an error.

### Troubleshooting
- If the workflow fails at the *Setup Pages* step with "Not Found", make sure the repository is **public** (or that GitHub Pages is available for private repositories on your plan), and that the workflow has `pages: write` and `id-token: write` permissions.
- The `enablement: true` parameter in `actions/configure-pages` will automatically set the GitHub Actions deployment source for Pages, so no manual configuration in repository settings is required.

## Contact
- Email: info@al-azab.co
- LinkedIn: [Mohamed Azab](https://www.linkedin.com/in/mohamed-azab-109a70274/)
