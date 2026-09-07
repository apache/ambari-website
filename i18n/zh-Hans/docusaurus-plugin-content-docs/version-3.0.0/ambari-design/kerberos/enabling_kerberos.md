---
title: 启用 Kerberos
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
-->

- [简介](index.md)
- [Kerberos 描述符](kerberos_descriptor.md)
- [Kerberos 服务](kerberos_service.md)
- [启用 Kerberos](#enabling-kerberos)
  - [启用 Kerberos 向导](#the-enable-kerberos-wizard)
  - [REST API](#the-rest-api)
  - [其他技术信息](#miscellaneous-technical-information)
    - [密码生成](#password-generation)

<a name="enabling-kerberos"></a>

## 启用 Kerberos {#enabling-kerberos}

可以使用 Ambari UI 中的 _启用 Kerberos 向导_ 或 REST API 为集群启用 Kerberos。

<a name="the-enable-kerberos-wizard"></a>

### 启用 Kerberos 向导 {#the-enable-kerberos-wizard}

Ambari UI 中的 _启用 Kerberos 向导_ 提供易于使用的向导界面，引导用户完成启用 Kerberos 的过程。

<a name="the-rest-api"></a>

### REST API {#the-rest-api}

可以使用 Ambari REST API 通过以下 API 调用启用 Kerberos：

**_注意：_**

- 根据需要修改身份验证凭据
  - `curl ... -u username:password ...`
  - 以下示例使用
    - username: admin
    - password: admin
- 根据需要修改 Ambari Server 主机名和端口
  - `curl ... http://HOST:PORT/api/v1/...`
  - 以下示例使用
    - HOST:  AMBARI_SERVER
    - PORT: 8080
- 根据需要修改集群名称
  - `curl ... http://.../CLUSTER/...`
  - 以下示例使用
    - CLUSTER:  CLUSTER_NAME
- @./payload 表示 payload 数据存储在文件中，而不是内联声明
  - `curl ... -d @./payload ...`
  - 以下示例使用 `./payload`，应将其替换为实际文件路径
  - payload 文件的内容列在 curl 语句下方

#### 将 KERBEROS 服务添加到集群 {#add-the-kerberos-service-to-cluster}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X POST http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/services/KERBEROS
```

#### 将 KERBEROS_CLIENT 组件添加到 KERBEROS 服务 {#add-the-kerberos_client-component-to-the-kerberos-service}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X POST http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/services/KERBEROS/components/KERBEROS_CLIENT
```

#### 创建并设置 KERBEROS 服务配置 {#create-and-set-kerberos-service-configurations}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X PUT -d @./payload http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME
```

使用 MIT KDC 时的 payload 示例：

```
[
  {
    "Clusters": {
      "desired_config": {
        "type": "krb5-conf",
        "tag": "version1",
        "properties": {
          "domains":"",
          "manage_krb5_conf": "true",
          "conf_dir":"/etc",
          "content" : "[libdefaults]\n  renew_lifetime = 7d\n  forwardable = true\n  default_realm = {{realm}}\n  ticket_lifetime = 24h\n  dns_lookup_realm = false\n  dns_lookup_kdc = false\n  default_ccache_name = /tmp/krb5cc_%{uid}\n  #default_tgs_enctypes = {{encryption_types}}\n  #default_tkt_enctypes = {{encryption_types}}\n{% if domains %}\n[domain_realm]\n{%- for domain in domains.split(',') %}\n  {{domain|trim()}} = {{realm}}\n{%- endfor %}\n{% endif %}\n[logging]\n  default = FILE:/var/log/krb5kdc.log\n  admin_server = FILE:/var/log/kadmind.log\n  kdc = FILE:/var/log/krb5kdc.log\n\n[realms]\n  {{realm}} = {\n{%- if master_kdc %}\n    master_kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{%- if kdc_hosts > 0 -%}\n{%- set kdc_host_list = kdc_hosts.split(',')  -%}\n{%- if kdc_host_list and kdc_host_list|length > 0 %}\n    admin_server = {{admin_server_host|default(kdc_host_list[0]|trim(), True)}}\n{%- if kdc_host_list -%}\n{%- if master_kdc and (master_kdc not in kdc_host_list) %}\n    kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{% for kdc_host in kdc_host_list %}\n    kdc = {{kdc_host|trim()}}\n{%- endfor -%}\n{% endif %}\n{%- endif %}\n{%- endif %}\n  }\n\n{# Append additional realm declarations below #}"
        }
      }
    }
  },
  {
    "Clusters": {
      "desired_config": {
        "type": "kerberos-env",
        "tag": "version1",
        "properties": {
          "kdc_type": "mit-kdc",
          "manage_identities": "true",
          "create_ambari_principal": "true",
          "manage_auth_to_local": "true",
          "install_packages": "true",
          "encryption_types": "aes des3-cbc-sha1 rc4 des-cbc-md5",
          "realm" : "EXAMPLE.COM",
          "kdc_hosts" : "FQDN.KDC.SERVER",
          "master_kdc" : "FQDN.MASTER.KDC.SERVER",
          "admin_server_host" : "FQDN.ADMIN.KDC.SERVER",
          "executable_search_paths" : "/usr/bin, /usr/kerberos/bin, /usr/sbin, /usr/lib/mit/bin, /usr/lib/mit/sbin",
          "service_check_principal_name" : "${cluster_name}-${short_date}",
          "case_insensitive_username_rules" : "false"
        }
      }
    }
  }
]
```

使用 Active Directory 时的 payload 示例：

```
[
  {
    "Clusters": {
      "desired_config": {
        "type": "krb5-conf",
        "tag": "version1",
        "properties": {
          "domains":"",
          "manage_krb5_conf": "true",
          "conf_dir":"/etc",
          "content" : "[libdefaults]\n  renew_lifetime = 7d\n  forwardable = true\n  default_realm = {{realm}}\n  ticket_lifetime = 24h\n  dns_lookup_realm = false\n  dns_lookup_kdc = false\n  default_ccache_name = /tmp/krb5cc_%{uid}\n  #default_tgs_enctypes = {{encryption_types}}\n  #default_tkt_enctypes = {{encryption_types}}\n{% if domains %}\n[domain_realm]\n{%- for domain in domains.split(',') %}\n  {{domain|trim()}} = {{realm}}\n{%- endfor %}\n{% endif %}\n[logging]\n  default = FILE:/var/log/krb5kdc.log\n  admin_server = FILE:/var/log/kadmind.log\n  kdc = FILE:/var/log/krb5kdc.log\n\n[realms]\n  {{realm}} = {\n{%- if master_kdc %}\n    master_kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{%- if kdc_hosts > 0 -%}\n{%- set kdc_host_list = kdc_hosts.split(',')  -%}\n{%- if kdc_host_list and kdc_host_list|length > 0 %}\n    admin_server = {{admin_server_host|default(kdc_host_list[0]|trim(), True)}}\n{%- if kdc_host_list -%}\n{%- if master_kdc and (master_kdc not in kdc_host_list) %}\n    kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{% for kdc_host in kdc_host_list %}\n    kdc = {{kdc_host|trim()}}\n{%- endfor -%}\n{% endif %}\n{%- endif %}\n{%- endif %}\n  }\n\n{# Append additional realm declarations below #}"
        }
      }
    }
  },
  {
    "Clusters": {
      "desired_config": {
        "type": "kerberos-env",
        "tag": "version1",
        "properties": {
          "kdc_type": "active-directory",
          "manage_identities": "true",
          "create_ambari_principal": "true",
          "manage_auth_to_local": "true",
          "install_packages": "true",
          "encryption_types": "aes des3-cbc-sha1 rc4 des-cbc-md5",
          "realm" : "EXAMPLE.COM",
          "kdc_hosts" : "FQDN.AD.SERVER",
          "master_kdc" : "FQDN.MASTER.AD.SERVER",
          "admin_server_host" : "FQDN.AD.SERVER",
          "ldap_url" : "LDAPS://AD_HOST:PORT",
          "container_dn" : "OU=....,....",
          "executable_search_paths" : "/usr/bin, /usr/kerberos/bin, /usr/sbin, /usr/lib/mit/bin, /usr/lib/mit/sbin",
          "password_length": "20",
          "password_min_lowercase_letters": "1",
          "password_min_uppercase_letters": "1",
          "password_min_digits": "1",
          "password_min_punctuation": "1",
          "password_min_whitespace": "0",
          "service_check_principal_name" : "${cluster_name}-${short_date}",
          "case_insensitive_username_rules" : "false",
          "create_attributes_template" :  "{\n \"objectClass\": [\"top\", \"person\", \"organizationalPerson\", \"user\"],\n \"cn\": \"$principal_name\",\n #if( $is_service )\n \"servicePrincipalName\": \"$principal_name\",\n #end\n \"userPrincipalName\": \"$normalized_principal\",\n \"unicodePwd\": \"$password\",\n \"accountExpires\": \"0\",\n \"userAccountControl\": \"66048\"}"
        }
      }
    }
  }
]
```
使用 IPA 时的 payload 示例：

```
[
  {
    "Clusters": {
      "desired_config": {
        "type": "krb5-conf",
        "tag": "version1",
        "properties": {
          "domains":"",
          "manage_krb5_conf": "true",
          "conf_dir":"/etc",
          "content" : "[libdefaults]\n  renew_lifetime = 7d\n  forwardable = true\n  default_realm = {{realm}}\n  ticket_lifetime = 24h\n  dns_lookup_realm = false\n  dns_lookup_kdc = false\n  default_ccache_name = /tmp/krb5cc_%{uid}\n  #default_tgs_enctypes = {{encryption_types}}\n  #default_tkt_enctypes = {{encryption_types}}\n{% if domains %}\n[domain_realm]\n{%- for domain in domains.split(',') %}\n  {{domain|trim()}} = {{realm}}\n{%- endfor %}\n{% endif %}\n[logging]\n  default = FILE:/var/log/krb5kdc.log\n  admin_server = FILE:/var/log/kadmind.log\n  kdc = FILE:/var/log/krb5kdc.log\n\n[realms]\n  {{realm}} = {\n{%- if master_kdc %}\n    master_kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{%- if kdc_hosts > 0 -%}\n{%- set kdc_host_list = kdc_hosts.split(',')  -%}\n{%- if kdc_host_list and kdc_host_list|length > 0 %}\n    admin_server = {{admin_server_host|default(kdc_host_list[0]|trim(), True)}}\n{%- if kdc_host_list -%}\n{%- if master_kdc and (master_kdc not in kdc_host_list) %}\n    kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{% for kdc_host in kdc_host_list %}\n    kdc = {{kdc_host|trim()}}\n{%- endfor -%}\n{% endif %}\n{%- endif %}\n{%- endif %}\n  }\n\n{# Append additional realm declarations below #}"
        }
      }
    }
  },
  {
    "Clusters": {
      "desired_config": {
        "type": "kerberos-env",
        "tag": "version1",
        "properties": {
          "kdc_type": "ipa",
          "manage_identities": "true",
          "create_ambari_principal": "true",
          "manage_auth_to_local": "true",
          "install_packages": "true",
          "encryption_types": "aes des3-cbc-sha1 rc4 des-cbc-md5",
          "realm" : "EXAMPLE.COM",
          "kdc_hosts" : "FQDN.KDC.SERVER",
          "master_kdc" : "FQDN.MASTER.KDC.SERVER",
          "admin_server_host" : "FQDN.ADMIN.KDC.SERVER",
          "executable_search_paths" : "/usr/bin, /usr/kerberos/bin, /usr/sbin, /usr/lib/mit/bin, /usr/lib/mit/sbin",
          "service_check_principal_name" : "${cluster_name}-${short_date}",
          "case_insensitive_username_rules" : "false"
        }
      }
    }
  }
]
```

#### 创建 KERBEROS_CLIENT 主机组件 {#create-the-kerberos_client-host-components}
_对每台主机执行一次，将 HOST_NAME 替换为实际值_

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X POST -d '{"host_components" : [{"HostRoles" : {"component_name":"KERBEROS_CLIENT"}}]}' http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/hosts?Hosts/host_name=HOST_NAME
```

#### 安装 KERBEROS 服务和组件 {#install-the-kerberos-service-and-components}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X PUT -d '{"ServiceInfo": {"state" : "INSTALLED"}}' http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/services/KERBEROS
```

#### 停止所有服务 {#stop-all-services}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X PUT -d  '{"RequestInfo":{"context":"Stop Service"},"Body":{"ServiceInfo":{"state":"INSTALLED"}}}' http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/services
```

#### 获取默认 Kerberos 描述符 {#get-the-default-kerberos-descriptor}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X GET http://AMBARI_SERVER:8080/api/v1/stacks/STACK_NAME/versions/STACK_VERSION/artifacts/kerberos_descriptor
```

#### 获取自定义 Kerberos 描述符（如果之前已设置） {#get-the-customized-kerberos-descriptor-if-previously-set}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X GET http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/artifacts/kerberos_descriptor
```

#### 设置 Kerberos 描述符 {#set-the-kerberos-descriptor}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X POST -d @./payload http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/artifacts/kerberos_descriptor
```

Payload：

```
{
  "artifact_data" : {
    ... 
  } 
}
```

**_注意：_** Kerberos 描述符 payload 可以是完整的 Kerberos 描述符，也可以只是叠加到默认 Kerberos 描述符上的更新内容。

#### 设置 KDC 管理员凭据 {#set-the-kdc-administrator-credentials}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X POST -d @./payload http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/credentials/kdc.admin.credential
```

Payload:

```
{
  "Credential" : {
    "principal" : "admin/admin@EXAMPLE.COM",
    "key" : "h4d00p&!",
    "type" : "temporary"
  }
}
```

**_注意：_** 应更新 _principal_ 和 _key_（密码）值，使其与 KDC 管理员账号的正确凭据匹配。

**_注意：_** `type` 值可以是 `temporary` 或 `persisted`；但是，只有在之前已设置 Ambari 凭据存储时，该值才能为 `persisted`。

#### 启用 Kerberos {#enable-kerberos}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X PUT -d @./payload http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME
```

Payload

```
{
  "Clusters": {
    "security_type" : "KERBEROS"
  }
}
```

#### 启动所有服务 {#start-all-services}

```
curl -H "X-Requested-By:ambari" -u admin:admin -i -X PUT -d '{"ServiceInfo": {"state" : "STARTED"}}' http://AMBARI_SERVER:8080/api/v1/clusters/CLUSTER_NAME/services
```

<a name="miscellaneous-technical-information"></a>

### 其他技术信息 {#miscellaneous-technical-information}

<a name="password-generation"></a>

#### 密码生成 {#password-generation}

使用 Active Directory 启用 Kerberos 时，Ambari 必须使用内部机制构建 keytab 文件。这是因为无法从 Active Directory 远程请求 keytab 文件。为了创建 keytab 文件，Ambari 需要知道每个相关 Kerberos 身份的密码。因此，Ambari 会根据需要设置或更新身份密码。

Active Directory 中每个由 Ambari 管理的账号的密码都是随机生成的，并且仅在内存中保存到设置账号密码和生成 keytab 文件所需的时间。密码使用以下可由用户设置的参数生成：

- Password length (`kerberos-env/password_length`)
  - 默认值：20
- Minimum number of lower-cased letters (`kerberos-env/password_min_lowercase_letters`)
  - 默认值：1
  - 字符集：`abcdefghijklmnopqrstuvwxyz`
- Minimum number of upper-cased letters (`kerberos-env/password_min_uppercase_letters`)
  - 默认值：1
  - 字符集：`ABCDEFGHIJKLMNOPQRSTUVWXYZ`
- Minimum number of digits (`kerberos-env/password_min_digits`)
  - 默认值：1
  - 字符集：`1234567890`
- Minimum number of punctuation characters (`kerberos-env/password_min_punctuation`)
  - 默认值：1
  - 字符集：`?.!$%^*()-_+=~`
- Minimum number of whitespace characters (`kerberos-env/password_min_whitespace`)
  - 默认值：0
  - 字符集：`(space character)`

执行以下算法：

1. 创建一个用于存储密码字符的数组
2. 对每个字符类别（大写字母、小写字母、数字……），从相应字符集中随机选择所需的最少数量，并存入数组
3. 对于预期密码长度与已收集字符数之差，从随机选择的字符类别中随机选择字符，并存入数组，直到达到该数量
4. 按预期密码长度从数组中随机取出字符，并追加到密码结果
5. 返回生成的密码

使用 `java.security.SecureRandom` 类的静态实例（[http://docs.oracle.com/javase/7/docs/api/java/security/SecureRandom.html](http://docs.oracle.com/javase/7/docs/api/java/security/SecureRandom.html)）生成用于标识字符集内索引的随机整数。
