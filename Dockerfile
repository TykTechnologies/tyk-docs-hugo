FROM 		alpine:3.7

MAINTAINER  Zaid Albirawi

WORKDIR		/src

RUN			apk add hugo
RUN			apk add git

ENTRYPOINT ["hugo", "server", "--theme=tykio", "--buildDrafts"]