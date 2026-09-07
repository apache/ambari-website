---
title: Ambari 安装指南
---

<!---
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
--->

# Ambari 安装指南 {#ambari-installation-guide}

本指南介绍如何在裸机、KVM、Docker 或 Vagrant 环境中安装和设置 Apache Ambari。

## 重要：防火墙配置 {#important-firewall-configuration}

:::tip 开始之前
防火墙设置可能会阻止组件之间必要的通信端口，从而严重影响集群功能。请仔细阅读以下指南。
:::

### 开发和测试环境 {#development--testing-environments}
对于开发或测试环境，请考虑禁用防火墙：
```bash
systemctl stop firewalld
systemctl disable firewalld
```

### 生产环境 {#production-environments}

#### 对系统管理员 {#for-system-administrators}
根据所部署的具体组件，配置防火墙以允许 Hadoop 生态系统所需的端口：

| 组件 | 端口 | 用途 |
|-----------|-------|---------|
| Ambari Server | 8080, 8440, 8441 | Web UI、代理通信 |
| Core Hadoop | 8020, 9000, 50070, 50075 | HDFS NameNode、DataNode HTTP |
| YARN | 8032, 8088, 19888 | ResourceManager、UI、JobHistory |
| Hive | 9083, 10000 | Metastore、HiveServer2 |

:::note NodeManager 端口
YARN NodeManager 在动态分配的端口上分配容器（默认范围：32768-65535）。
可以通过 `yarn.nodemanager.resource.ports`（位于 `yarn-site.xml` 中）限制此范围。
:::

:::info 对普通用户
如果您不熟悉高级网络配置，我们建议：
- 在初始设置和集群测试期间禁用防火墙
- 为生产部署咨询网络安全专家
:::

## 先决条件 {#prerequisites}

继续之前，请确保您已有可用的环境（裸机、KVM、Docker 或 [Vagrant 设置](./environment-setup/vagrant-environment-setup.md)）。

## 1. 设置 Ambari 仓库 {#1-setting-up-ambari-repository}

创建本地 Ambari RPM 仓库：
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

## 2. 安装依赖和 Ambari 代理 {#2-install-dependencies-and-ambari-agent}

在所有主机上安装以下软件包：
```bash
# Install required dependencies
yum install -y python3-distro
yum install -y java-17-openjdk-devel
yum install -y java-1.8.0-openjdk-devel
yum install -y ambari-agent
```

## 3. 安装 Ambari Server {#3-install-ambari-server}

在指定的 Ambari 服务器计算机上：
```bash
yum install -y python3-psycopg2
yum install -y ambari-server
```

## 4. 数据库设置 {#4-database-setup}

为数据库后端选择 MySQL 或 PostgreSQL。

### 4.1 MySQL 设置 {#41-mysql-setup}

1. 删除现有 MySQL 软件包：
```bash
rpm -qa | grep mysql
rpm -ev <package-name> --nodeps
```

2. 设置 MySQL 8.0 仓库：
```bash
yum -y install https://dev.mysql.com/get/mysql80-community-release-el8-1.noarch.rpm
```

3. 安装并启动 MySQL：
```bash
yum -y install mysql-server
systemctl start mysqld.service
systemctl enable mysqld.service
```

4. 配置 MySQL 用户和数据库：
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

5. 导入 Ambari 架构：
```bash
mysql -uambari -pambari ambari < /var/lib/ambari-server/resources/Ambari-DDL-MySQL-CREATE.sql
```

### 4.2 PostgreSQL 设置 {#42-postgresql-setup}

1. 安装并初始化 PostgreSQL：
```bash
yum install -y postgresql
/usr/bin/postgresql-setup --initdb
```

2. 配置 PostgreSQL：
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

3. 创建用户和数据库：
```sql
-- As postgres user
CREATE ROLE "ambari" LOGIN PASSWORD 'admin' NOINHERIT;
CREATE DATABASE ambari;
GRANT ALL PRIVILEGES ON DATABASE ambari TO ambari;
```

4. 导入架构：
```bash
PGPASSWORD='admin' psql -h localhost -p 5432 -U ambari -d ambari \
  -f /var/lib/ambari-server/resources/Ambari-DDL-Postgres-CREATE.sql
```

## 5. 配置 Ambari Server {#5-configure-ambari-server}

### 对于 PostgreSQL： {#for-postgresql}
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

### 对于 MySQL： {#for-mysql}
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

## 6. 启动服务 {#6-start-services}

1. 启动 Ambari Server：
```bash
ambari-server start
```

2. 在所有主机上配置并启动 Ambari 代理：
```bash
# Edit ambari-agent configuration
sed -i "s/hostname=.*/hostname=your_ambari_server_hostname/" /etc/ambari-agent/conf/ambari-agent.ini

# Start agent
ambari-agent start
```

## 7. 访问 Ambari Web 界面 {#7-access-ambari-web-interface}

所有服务启动后，可通过以下地址访问 Ambari Web 界面：
```
http://your_ambari_server_hostname:8080
```
默认凭据：
- 用户名：admin
- 密码：admin

## 故障排除 {#troubleshooting}

1. 通过在所有节点上配置 `/etc/hosts`，确保主机名解析正常。

2. 对于 MySQL 8 连接问题，请确认 `ambari.properties` 中的 JDBC URL 包含正确的 SSL 参数。

3. 检查服务日志：
- Ambari Server：`/var/log/ambari-server/ambari-server.log`
- Ambari 代理：`/var/log/ambari-agent/ambari-agent.log`
