# Install base Python image
FROM python:3.9

# Copy files to the container
COPY *.py /app/
COPY *.csv /app/
COPY requirements.txt /app/

# Set working directory to previously added app directory
WORKDIR /app/

# Install dependencies
RUN pip install -r requirements.txt

# Train and save three ML models to the working dir
RUN python PipeLineLogisticRegression.py

# Expose the port uvicorn is running on
EXPOSE 80