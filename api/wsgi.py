"""File for gunicorn server"""

from api import app

if __name__ == "__main__":
  app.run()
