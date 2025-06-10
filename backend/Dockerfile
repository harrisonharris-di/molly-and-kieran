# Dockerfile (backend/Dockerfile)
FROM python:3.11

# Install Poetry
RUN pip install poetry

WORKDIR /app
COPY backend/ /app

# Install dependencies using Poetry
RUN poetry config virtualenvs.create false \
    && poetry install --no-root

EXPOSE 5000
CMD ["python", "app.py"]
