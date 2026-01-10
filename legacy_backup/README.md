CV Builder — minimal Django scaffold

Quick start

1. Create and activate a virtual environment (Windows):

```bash
python -m venv .venv
.\.venv\Scripts\activate
```

2. Install requirements:

```bash
pip install -r "c:/Users/songo/OneDrive/Masaüstü/cv create project/requirements.txt"
```

3. Run the development server:

```bash
python manage.py runserver
```

Open http://127.0.0.1:8000/ and use the editor. The app uses client-side html2pdf.js (via CDN) to export the preview as PDF.

Notes
- No database is required for this prototype.
- Templates and draft samples live in `templates/editor/index.html` and `static/js/app.js`.
