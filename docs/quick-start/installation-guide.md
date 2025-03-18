# Ambari Installation Guide

This guide covers the installation and setup of Apache Ambari on bare metal, KVM, Docker, or Vagrant environments.

## Prerequisites

Ensure you have a working environment (bare metal, KVM, Docker, or [Vagrant setup](./environment-setup/vagrant-environment-setup.md)) before proceeding.

## 1. Setting up Ambari Repository

Create a local Ambari RPM repository:
```bash
createrepo -o /path /path

# Create repository configuration
cat > /etc/yum.repos.d/ambari_repo.repo << EOF
[ambari_repo]
baseurl = file:///vagrant_data/
gpgcheck = 0
name = ambari_repository
EOF
```

## 2. Install Dependencies and Ambari Agent

Install the following packages on all hosts:
```bash
# Install required dependencies
yum install -y python3-distro
yum install -y java-17-openjdk-devel
yum install -y java-1.8.0-openjdk-devel
yum install -y ambari-agent
```

## 3. Install Ambari Server

On the designated Ambari server machine:
```bash
yum install -y python3-psycopg2
yum install -y ambari-server
```

## 4. Database Setup

Choose either MySQL or PostgreSQL for your database backend.

### 4.1 MySQL Setup

1. Remove existing MySQL packages:
```bash
rpm -qa | grep mysql
rpm -ev <package-name> --nodeps
```

2. Set up MySQL 8.0 repository:
```bash
yum -y install https://dev.mysql.com/get/mysql80-community-release-el8-1.noarch.rpm
```

3. Install and start MySQL:
```bash
yum -y install mysql-server
systemctl start mysqld.service
systemctl enable mysqld.service
```

4. Configure MySQL users and databases:
```sql
-- Create Ambari user and grant privileges
CREATE USER 'ambari'@'localhost' IDENTIFIED BY 'ambari';
GRANT ALL PRIVILEGES ON *.* TO 'ambari'@'localhost';
CREATE USER 'ambari'@'%' IDENTIFIED BY 'ambari';
GRANT ALL PRIVILEGES ON *.* TO 'ambari'@'%';

-- Create required databases
CREATE DATABASE ambari CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE hive;
CREATE DATABASE ranger;
CREATE DATABASE rangerkms;

-- Create service users
CREATE USER 'hive'@'%' IDENTIFIED BY 'hive';
GRANT ALL PRIVILEGES ON hive.* TO 'hive'@'%';

CREATE USER 'ranger'@'%' IDENTIFIED BY 'ranger';
GRANT ALL PRIVILEGES ON *.* TO 'ranger'@'%' WITH GRANT OPTION;

CREATE USER 'rangerkms'@'%' IDENTIFIED BY 'rangerkms';
GRANT ALL PRIVILEGES ON rangerkms.* TO 'rangerkms'@'%';

FLUSH PRIVILEGES;
```

5. Import Ambari schema:
```bash
mysql -uambari -pambari ambari < /var/lib/ambari-server/resources/Ambari-DDL-MySQL-CREATE.sql
```

### 4.2 PostgreSQL Setup

1. Install and initialize PostgreSQL:
```bash
yum install -y postgresql
/usr/bin/postgresql-setup --initdb
```

2. Configure PostgreSQL:
```bash
# Edit postgresql.conf
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /var/lib/pgsql/data/postgresql.conf

# Add client authentication rules to pg_hba.conf
cat >> /var/lib/pgsql/data/pg_hba.conf << EOF
host ambari ambari 0.0.0.0/0 md5
host hive hive 0.0.0.0/0 md5
host ranger ranger 0.0.0.0/0 md5
host rangerkms rangerkms 0.0.0.0/0 md5
EOF
```

3. Create users and databases:
```sql
-- As postgres user
CREATE ROLE "ambari" LOGIN PASSWORD 'admin' NOINHERIT;
CREATE DATABASE ambari;
GRANT ALL PRIVILEGES ON DATABASE ambari TO ambari;
```

4. Import schema:
```bash
PGPASSWORD='admin' psql -h localhost -p 5432 -U ambari -d ambari \
  -f /var/lib/ambari-server/resources/Ambari-DDL-Postgres-CREATE.sql
```

## 5. Configure Ambari Server

### For PostgreSQL:
```bash
# Setup JDBC driver
ambari-server setup --jdbc-db=postgres --jdbc-driver=/usr/share/java/postgresql-42.7.3.jar

# Configure Ambari server
ambari-server setup -s \
  -j /usr/lib/jvm/java-1.8.0-openjdk \
  --ambari-java-home /usr/lib/jvm/java-17-openjdk \
  --database=postgres \
  --databasehost=localhost \
  --databaseport=5432 \
  --databasename=ambari \
  --databaseusername=ambari \
  --databasepassword=admin
```

### For MySQL:
```bash
# Download MySQL JDBC driver
wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.28/mysql-connector-java-8.0.28.jar \
  -O /usr/share/java/mysql-connector-java.jar

# Setup JDBC driver
ambari-server setup --jdbc-db=mysql --jdbc-driver=/usr/share/java/mysql-connector-java.jar

# Configure MySQL 8 compatibility
echo "server.jdbc.url=jdbc:mysql://localhost:3306/ambari?useSSL=true&verifyServerCertificate=false&enabledTLSProtocols=TLSv1.2" \
  >> /etc/ambari-server/conf/ambari.properties

# Configure Ambari server
ambari-server setup -s \
  -j /usr/lib/jvm/java-1.8.0-openjdk \
  --ambari-java-home /usr/lib/jvm/java-17-openjdk \
  --database=mysql \
  --databasehost=localhost \
  --databaseport=3306 \
  --databasename=ambari \
  --databaseusername=ambari \
  --databasepassword=ambari
```

## 6. Start Services

1. Start Ambari Server:
```bash
ambari-server start
```

2. Configure and start Ambari Agents on all hosts:
```bash
# Edit ambari-agent configuration
sed -i "s/hostname=.*/hostname=your_ambari_server_hostname/" /etc/ambari-agent/conf/ambari-agent.ini

# Start agent
ambari-agent start
```

## 7. Access Ambari Web Interface

Once all services are started, access the Ambari Web Interface at:
```
http://your_ambari_server_hostname:8080
```
Default credentials:
- Username: admin
- Password: admin

## Troubleshooting

1. If you encounter firewall issues, disable it (for development environments only):
```bash
systemctl stop firewalld
systemctl disable firewalld
```

2. Ensure proper hostname resolution by configuring `/etc/hosts` on all nodes.

3. For MySQL 8 connection issues, verify the JDBC URL includes the correct SSL parameters in `ambari.properties`.

4. Check service logs:
- Ambari Server: `/var/log/ambari-server/ambari-server.log`
- Ambari Agent: `/var/log/ambari-agent/ambari-agent.log`
