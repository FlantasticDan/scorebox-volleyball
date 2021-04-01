import os
import sys

import webbrowser

from multiprocessing import freeze_support

def bundle(app):
    freeze_support()
    try:
        app.template_folder = os.path.join(sys._MEIPASS, 'templates')
        app.static_folder = os.path.join(sys._MEIPASS, 'static')
        webbrowser.open_new('http://localhost:5000/setup')
    except Exception:
        pass