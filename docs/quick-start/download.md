---
sidebar_position: 2
---

# Download

Welcome to the Apache Ambari Community Download Site. Here you can find the latest releases of Apache Ambari and Apache Bigtop packages.

## Download Links

### Apache Ambari 3.0.0

- Rocky Linux 8 Package Download: [https://apache-ambari.com/dist/ambari/3.0.0/rocky8/](https://apache-ambari.com/dist/ambari/3.0.0/rocky8/)
- Rocky Linux 9 Package Download: [https://apache-ambari.com/dist/ambari/3.0.0/rocky9/](https://apache-ambari.com/dist/ambari/3.0.0/rocky9/)

#### MD5 Checksums
For security purposes, you can verify the integrity of the downloaded files using MD5 checksums:

- [View MD5 Checksums - Rocky Linux 8](https://apache-ambari.com/dist/ambari/3.0.0/rocky8/MD5SUMS.txt)
- [View MD5 Checksums - Rocky Linux 9](https://apache-ambari.com/dist/ambari/3.0.0/rocky9/MD5SUMS.txt)

### Apache Ambari Bigtop Stack 3.3.0

- Rocky Linux 8 Package Download: [https://apache-ambari.com/dist/bigtop/3.3.0/rocky8/](https://apache-ambari.com/dist/bigtop/3.3.0/rocky8/)
- Rocky Linux 9 Package Download: [https://apache-ambari.com/dist/bigtop/3.3.0/rocky9/](https://apache-ambari.com/dist/bigtop/3.3.0/rocky9/)

#### MD5 Checksums
For security purposes, you can verify the integrity of the downloaded files using MD5 checksums:

- [View MD5 Checksums - Rocky Linux 8](https://apache-ambari.com/dist/bigtop/3.3.0/rocky8/MD5SUMS.txt)
- [View MD5 Checksums - Rocky Linux 9](https://apache-ambari.com/dist/bigtop/3.3.0/rocky9/MD5SUMS.txt)

## Creating Local Repository

Follow these steps to create a local repository:

1. Install createrepo package:
```bash
sudo dnf install createrepo
```

2. Create repository directory:
```bash
sudo mkdir -p /var/www/html/ambari-repo
sudo chmod -R 755 /var/www/html/ambari-repo
```

3. Download RPM packages:
```bash
# For Rocky Linux 8:
cd /var/www/html/ambari-repo
wget -r -np -nH --cut-dirs=4 --reject 'index.html*' https://www.apache-ambari.com/dist/ambari/3.0.0/rocky8/
wget -r -np -nH --cut-dirs=4 --reject 'index.html*' https://www.apache-ambari.com/dist/bigtop/3.3.0/rocky8/

# For Rocky Linux 9:
cd /var/www/html/ambari-repo
wget -r -np -nH --cut-dirs=4 --reject 'index.html*' https://www.apache-ambari.com/dist/ambari/3.0.0/rocky9/
wget -r -np -nH --cut-dirs=4 --reject 'index.html*' https://www.apache-ambari.com/dist/bigtop/3.3.0/rocky9/
```

4. Create repository metadata:
```bash
cd /var/www/html/ambari-repo
sudo createrepo .
```

5. Create repository configuration file:
```bash
# For Rocky Linux 8:
sudo tee /etc/yum.repos.d/ambari.repo << EOF
[ambari]
name=Ambari Repository
baseurl=http://your-server-ip/ambari-repo
gpgcheck=0
enabled=1
EOF

# For Rocky Linux 9:
sudo tee /etc/yum.repos.d/ambari.repo << EOF
[ambari]
name=Ambari Repository
baseurl=http://your-server-ip/ambari-repo
gpgcheck=0
enabled=1
EOF
```

6. Clean and update yum cache:
```bash
sudo dnf clean all
sudo dnf makecache
```

## Exposing the Repository

To make the repository accessible to other machines, you can set up a web server. Here's how to do it using Nginx:

1. Install Nginx:
```bash
sudo dnf install nginx
```

2. Configure Nginx to serve the repository:
```bash
sudo tee /etc/nginx/conf.d/ambari-repo.conf << EOF
server {
    listen 80;
    server_name _;
    root /var/www/html/ambari-repo;
    autoindex on;
    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF
```

3. Start and enable Nginx:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```


Now other machines can access the repository by configuring their repo file with your server's IP address or hostname:

```bash
sudo tee /etc/yum.repos.d/ambari.repo << EOF
[ambari]
name=Ambari Repository
baseurl=http://your-server-ip/ambari-repo
gpgcheck=0
enabled=1
EOF
```

Replace `your-server-ip` with the actual IP address or hostname of your repository server.

## Troubleshooting

If you encounter any issues, here are some common solutions:

1. Repository not accessible:
   - Check if Nginx is running: `sudo systemctl status nginx`
   - Verify firewall settings: `sudo firewall-cmd --list-all`
   - Check SELinux context: `ls -Z /var/www/html/ambari-repo`
   
   If you still can't access the repository, you can try:
   - Temporarily disable firewall:
     ```bash
     sudo systemctl stop firewalld
     sudo systemctl disable firewalld
     ```
   - Temporarily disable SELinux:
     ```bash
     sudo setenforce 0
     # To make it permanent, edit /etc/selinux/config and set SELINUX=permissive
     ```

2. Yum cache issues:
   - Clear yum cache: `sudo dnf clean all`
   - Rebuild repository metadata: `cd /var/www/html/ambari-repo && sudo createrepo .`

3. Permission issues:
   - Ensure correct permissions: `sudo chmod -R 755 /var/www/html/ambari-repo`
   - Check SELinux context: `sudo restorecon -Rv /var/www/html/ambari-repo`

## Important Notes

- All packages are built for x86_64 architecture
- Packages are tested on Rocky Linux 8 and 9
- Updates are provided on a best-effort basis

## Bandwidth Notice

This site is hosted on a server with limited bandwidth. Please be considerate when downloading packages.
For any bandwidth-related issues, please contact the site administrators.

## Sponsorship

This site is maintained by community volunteers. We welcome sponsorship to help cover hosting costs.
Sponsors will be acknowledged on the site and receive priority support.
For sponsorship inquiries, please contact us through the mailing list. 