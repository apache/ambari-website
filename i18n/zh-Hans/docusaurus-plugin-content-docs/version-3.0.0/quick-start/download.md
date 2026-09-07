---
sidebar_position: 2
title: 下载
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

# 下载 {#download}

欢迎访问 Apache Ambari 社区下载站点。您可以在这里找到 Apache Ambari 和 Apache Bigtop Stack 的最新版本。

## 下载链接 {#download-links}

### Apache Ambari 3.0.0 {#apache-ambari-300}

- Rocky Linux 8 软件包下载：[https://apache-ambari.com/dist/ambari/3.0.0/rocky8/](https://apache-ambari.com/dist/ambari/3.0.0/rocky8/)
- Rocky Linux 9 软件包下载：[https://apache-ambari.com/dist/ambari/3.0.0/rocky9/](https://apache-ambari.com/dist/ambari/3.0.0/rocky9/)

#### MD5 校验和 {#md5-checksums}
出于安全考虑，您可以使用 MD5 校验和验证下载文件的完整性：

- [查看 Rocky Linux 8 的 MD5 校验和](https://apache-ambari.com/dist/ambari/3.0.0/rocky8/MD5SUMS.txt)
- [查看 Rocky Linux 9 的 MD5 校验和](https://apache-ambari.com/dist/ambari/3.0.0/rocky9/MD5SUMS.txt)

### Apache Ambari Bigtop Stack 3.3.0 {#apache-ambari-bigtop-stack-330}

- Rocky Linux 8 软件包下载：[https://apache-ambari.com/dist/bigtop/3.3.0/rocky8/](https://apache-ambari.com/dist/bigtop/3.3.0/rocky8/)
- Rocky Linux 9 软件包下载：[https://apache-ambari.com/dist/bigtop/3.3.0/rocky9/](https://apache-ambari.com/dist/bigtop/3.3.0/rocky9/)

#### MD5 校验和 {#md5-checksums-1}
出于安全考虑，您可以使用 MD5 校验和验证下载文件的完整性：

- [查看 Rocky Linux 8 的 MD5 校验和](https://apache-ambari.com/dist/bigtop/3.3.0/rocky8/MD5SUMS.txt)
- [查看 Rocky Linux 9 的 MD5 校验和](https://apache-ambari.com/dist/bigtop/3.3.0/rocky9/MD5SUMS.txt)

## 创建本地仓库 {#creating-local-repository}

按照以下步骤创建本地仓库：

1. 安装 createrepo 软件包：
```bash
sudo dnf install createrepo
```

2. 创建仓库目录：
```bash
sudo mkdir -p /var/www/html/ambari-repo
sudo chmod -R 755 /var/www/html/ambari-repo
```

3. 下载 RPM 软件包：
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

4. 创建仓库元数据：
```bash
cd /var/www/html/ambari-repo
sudo createrepo .
```

5. 创建仓库配置文件：
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

6. 清理并更新 yum 缓存：
```bash
sudo dnf clean all
sudo dnf makecache
```

## 暴露仓库 {#exposing-the-repository}

要让其他计算机访问仓库，可以设置 Web 服务器。以下是使用 Nginx 的方法：

1. 安装 Nginx：
```bash
sudo dnf install nginx
```

2. 配置 Nginx 提供仓库服务：
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

3. 启动并启用 Nginx：
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

现在，其他计算机可以通过使用仓库服务器的 IP 地址或主机名配置其仓库文件来访问该仓库：

```bash
sudo tee /etc/yum.repos.d/ambari.repo << EOF
[ambari]
name=Ambari Repository
baseurl=http://your-server-ip/ambari-repo
gpgcheck=0
enabled=1
EOF
```

将 `your-server-ip` 替换为仓库服务器的实际 IP 地址或主机名。

## 故障排除 {#troubleshooting}

如果遇到问题，以下是一些常见解决方案：

1. 仓库无法访问：
   - 检查 Nginx 是否正在运行：`sudo systemctl status nginx`
   - 验证防火墙设置：`sudo firewall-cmd --list-all`
   - 检查 SELinux 上下文：`ls -Z /var/www/html/ambari-repo`
   
   如果仍然无法访问仓库，可以尝试：
   - 临时禁用防火墙：
     ```bash
     sudo systemctl stop firewalld
     sudo systemctl disable firewalld
     ```
   - 临时禁用 SELinux：
     ```bash
     sudo setenforce 0
     # To make it permanent, edit /etc/selinux/config and set SELINUX=permissive
     ```

2. Yum 缓存问题：
   - 清除 yum 缓存：`sudo dnf clean all`
   - 重建仓库元数据：`cd /var/www/html/ambari-repo && sudo createrepo .`

3. 权限问题：
   - 确保权限正确：`sudo chmod -R 755 /var/www/html/ambari-repo`
   - 检查 SELinux 上下文：`sudo restorecon -Rv /var/www/html/ambari-repo`

## 重要说明 {#important-notes}

- 所有软件包均为 x86_64 架构构建
- 软件包已在 Rocky Linux 8 和 9 上测试
- 更新按尽力而为的方式提供

## 带宽提示 {#bandwidth-notice}

此站点托管在带宽有限的服务器上。下载软件包时请予以体谅。
如有带宽相关问题，请联系站点管理员。

## 赞助 {#sponsorship}

此站点由社区志愿者维护。我们欢迎赞助，以帮助承担托管成本。
赞助者将在站点上获得致谢，并享有优先支持。
如有赞助事宜，请通过邮件列表联系我们。
