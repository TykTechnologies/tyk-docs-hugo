---
title: "Install Tyk on AWS EC2"
date: 2020-05-18
menu:
  main:
    parent: "AWS Marketplace"
weight: 5
url: "/getting-started/with-tyk-on-premises/installation/on-aws/ec2"
---

1. Spin up an [EC2 instance](https://aws.amazon.com/ec2/instance-types/), AWS Linux2 preferably, T2.Medium is fine
   - add a public IP
   - open up SG access to: 
     - 3000 for the Tyk Dashboard
     - 8080 for the Tyk Gateway
     - 22 TCP for SSH

2. SSH into the instance
`ssh -i mykey.pem ec2-user@public-ec2-ip`

3. Install Git, Docker, & Docker Compose
Feel free to copy paste these
```.sh
sudo yum update -y
sudo yum install git -y
sudo yum install -y docker
sudo service docker start
sudo usermod -aG docker ec2-user
sudo su
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker ps
```

4. Clone the Tyk Pro Docker repo

```.bash
git clone https://github.com/TykTechnologies/tyk-pro-docker-demo
cd tyk-pro-docker-demo/
```

5. Add the license key to `confs/tyk_analytics.conf` into the `license_key variable` using "vi" or "nano", etc

**This is the most common place to have problems.**

**Look for extra spaces between quotes ("") and the license key.  It will not work if there are any.**

Inside `tyk_analytics.conf`, `license_key` should look something like this, with a real license however:

`
"license_key": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd2VkMzU5My00NWZlLTY4YjItMmUxMDc3NDdjZmE4LDFmNjllMTgzLWZkODUtNGViNS02NzgwLWYzODllMjdkMjkyYiw1ODRhZjhiMi1hNDI4LTQwMDQtNzI2Ni01ZDk4ZDQ4Y2U2MDIsYjZjZDBiZjAtM2Y5OC00MzFkLTQ4YTctYjNkYmY3ZDAyYTU1LDIzYjBhNmRkLTlmODctNDAxOC00MDkyLTllODdkNzUxODE1YSw1ODgyMDBlZi1jYjEyLTRhZjctN2YwMi05OGNlN2FlOGVkMjIsNjJlZTI3MDUtZDJlYi00YzEzLTY2NTAtNmZmNjU2ZGUyMTE3LDQ5OTk2NzU5LTgwOTYtNGYwYS03YWFkLTYzYzA4MjhmODQ5NixhN2I4NzM5MC03YWE4LTRlYzktNThhZC04OWYyZGI5YmJlZGMsZmU4ZDhiOGEtNzkzOC00ZTY2LTRmOTAtYTViNjQ5MTVlOTI5LDYwMDY0Zjk1LTAxZjgtNDc4Ny01MTk4LWI2NmZjMGM2ZTJlOCxhZDQxMzVjYi1mNDJjLTRhYjAtNDBmMC0yNzcyYTg4NzdjYzEsMmY4NGNhOTgtMGNiNC00ZGYxLTVhNTUtNzJiYWQyNTVlNWVhLDcyNmY1M2QxLThmMmMtNGIwNy02ZGIzLTQ2MjNhNmY0ZjgxMixlOTc3YTc0OS02NWE2LTRiOGItNDAyNS04Y2UzMWNmYjYzNzQsNjI5NjJkMmMtODgxZC00YTE4LTdkMDgtY2RmYmNiNDVhZjA4LGYzNjdmNWVkLTFlNjktNDlkZC03YzZkLWFiOWQ2N2FlMjc4ZSxhZDM1MDZiMS1kMmUzLTRhZTItNmEwMC1iN2JjOGNjYWU3NjYsNjk3MjNjMmEtZmZiMzU5My00NWZlLTY4YjItMmUxMDc3NDdjZmE4LDFmNjllMTgzLWZkODUtNGViNS02NzgwLWYzODllMjdkMjkyYiw1ODRhZjhiMi1hNDI4LTQwMDQtNzI2Ni01ZDk4ZDQ4Y2U2MDIsYjZjZDBiZjAtM2Y5OC00MzFkLTQ4YTctYjNkYmY3ZDAyYTU1LDIzYjBhNmRkLTlmODctNDAxOC00MDkyLTllODdkNzUxODE1YSw1ODgyMDBlZi1jYjEyLTRhZjctN2YwMi05OGNlN2FlOGVkMjIsNjJlZTI3MDUtZDJlYi00YzEzLTY2NTAtNmZmNjU2ZGUyMTE3LDQ5OTk2NzU5LTgwOTYtNGYwYS03YWFkLTYzYzA4MjhmODQ5NixhN2I4NzM5MC03YWE4LTRlYzktNThhZC04OWYyZGI5YmJlZGMsZmU4ZDhiOGEtNzkzOC00ZTY2LTRmOTAtYTViNjQ5MTVlOTI5LDYwMDY0Zjk1LTAxZjgtNDc4Ny01MTk4LWI2NmZjMGM2ZTJlOCxhZDQxMzVjYi1mNDJjLTRhYjAtNDBmMC0yNzcyYTg4NzdjYzEsMmY4NGNhOTgtMGNiNC00ZGYxLTVhNTUtNzJiYWQyNTVlNWVhLDcyNmY1M2QxLThmMmMtNGIwNy02ZGIzLTQ2MjNhNmY0ZjgxMixlOTc3YTc0OS02NWE2LTRiOGItNDAyNS04Y2UzMWNmYjYzNzQsNjI5NjJkMmMtODgxZC00YTE4LTdkMDgtY2RmYmNiNDVhZjA4LGYzNjdmNWVkLTFlNjktNDlkZC03YzZkLWFiOWQ2N2FlMjc4ZSxhZDM1MDZiMS1kMmUzLTRhZTItNmEwMC1iN2JjOGNjYWU3NjYsNjk3MjNjMmEtZmZiEQsnWheJWQ",
`

6. Run the containers via `docker-compose`

```.bash
docker-compose -f docker-compose.yml -f docker-local.yml up -d
```

7. Visit

```
http://<public-ec2-ip>:3000
```
and fill out the Bootstrap form!
**If you see any page besides the Bootstrap page, you have pasted the license key incorrectly**

## Enable SSL for the Gateway & Dashboard

1. Add the following to `confs/tyk.conf`

```.json
"policies.policy_connection_string": "https://tyk-dashboard:3000"
"db_app_conf_options.connection_string": "https://tyk-dashboard:3000"
"http_server_options": {
  "use_ssl": true,
  "certificates": [
    {
      "domain_name": "*.yoursite.com",
      "cert_file": "./new.cert.cert",
      "key_file": "./new.cert.key"
    }
  ],
  "ssl_insecure_skip_verify": true   ### YOU ONLY NEED THIS IF YOU ARE USING SELF SIGNED CERTS
}
```

2. Add the following to `confs/tyk_analytics.conf`

```.json
"tyk_api_config.Host": "https://tyk-gateway"
"http_server_options": {
  "use_ssl": true,
  "certificates": [
    {
      "domain_name": "*.yoursite.com",
      "cert_file": "./new.cert.cert",
      "key_file": "./new.cert.key"
    }
  ]
}
```

3. Generate self-signed Certs: (Or bring your own CA signed)

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

4. Mount your certs to containers through `docker-compose.yml`

```.yaml
tyk-dashboard:
    ...
    volumes: 
    - ./cert.pem:/opt/tyk-dashboard/new.cert.cert
    - ./key.pem:/opt/tyk-dashboard/new.cert.key
tyk-gateway:
    ...
    volumes: 
    - ./cert.pem:/opt/tyk-gateway/new.cert.cert
    - ./key.pem:/opt/tyk-gateway/new.cert.key
```

5. Restart your containers with the mounted files

```
docker-compose -f docker-compose.yml -f docker-local.yml up -d tyk-dashboard tyk-gateway
```

6. Download the bootstrap script onto EC2 machine

```
wget https://gist.githubusercontent.com/sedkis/6f0510445b984b0b70f88564b244020f/raw/f739181cad0e994d2ea6f9022cab1e0ebc55dfd8/bootstrap.sh
```

7. Apply execute permissions to file:

```chmod +x bootstrap.sh```

8. Run the bootstrap script

```./bootstrap.sh localhost```

9. Done! use the generated user and password to log into The Tyk Dashboard