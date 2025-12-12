FROM  python:3.12-alpine

COPY auth_app auth_app

COPY requirements.txt /auth_app/requirements.txt

WORKDIR /auth_app/

RUN pip install -r requirements.txt

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]

