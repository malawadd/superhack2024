FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install -r requirements_non_enclave.txt
CMD ["python", "oracle.py"]