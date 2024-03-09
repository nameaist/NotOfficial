import subprocess
import os
import sys


argv = sys.argv
domain_name = ""
if len(argv) == 2 and argv[1] == '--help':
    print("Usage: python3 config.py -d domain_name")
    exit()
elif len(argv) == 3 and argv[1] == '-d':
    domain_name = argv[2]
else:
    print("Incorrect input , run with --help option")
    exit()

curr_dir = os.getcwd()
assert(curr_dir.split('/')[-1] == 'NotOfficial')


subprocess.run(['apt' , 'install' , 'curl' , '-y'])
subprocess.run(['apt' , 'install' , 'nodejs' , '-y'])
subprocess.run(['apt' , 'install' , 'npm' , '-y'])
subprocess.run(['npm' , 'i'])
subprocess.run(['npm' , 'i' , 'pm2' , '-g'])
subprocess.run(['pm2' , 'start' , 'server.js'])
subprocess.run(['apt' , 'install' , 'nginx' , '-y'])



with open('nginx_template' , 'r') as file:
    data = file.read()
    start_idx = data.find('server_name _;')
    if start_idx == -1:
        print("Something went wrong");
        exit()
    end_idx = start_idx + 14
    data = data[:start_idx] + "server_name " + domain_name + ";\n" + data[end_idx : ]


with open('/etc/nginx/sites-available/default' , 'w') as file:
    file.write(data)

subprocess.run(['service' , 'nginx' , 'restart'])
subprocess.run(['apt' , 'install' , 'certbot' , '-y'])
subprocess.run(['apt' , 'install' , 'python3-certbot-nginx' , '-y'])
subprocess.run(['certbot' , '-n' , '--agree-tos' , '--email' , 'test@edu.com' , '--nginx' , '-d' , domain_name])