FROM python:3.7
ARG WORKDIR=/code
RUN mkdir $WORKDIR
WORKDIR $WORKDIR
RUN pip install pgsync
COPY wait-for-it.sh wait-for-it.sh
COPY entrypoint.sh entrypoint.sh
COPY schema.json schema.json
RUN chmod +x wait-for-it.sh
RUN chmod +x entrypoint.sh
