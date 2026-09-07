---
title: Kerberos 服务
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
- [Kerberos 服务](#the-kerberos-service)
  - [配置](#configurations)
    - [kerberos-env](#kerberos-env)
    - [krb5-conf](#krb5-conf)
- [启用 Kerberos](enabling_kerberos.md)

<a name="the-kerberos-service"></a>

## Kerberos 服务 {#the-kerberos-service}

<a name="configurations"></a>

### 配置 {#configurations}

<a name="kerberos-env"></a>

#### kerberos-env {#kerberos-env}

##### kdc_type {#kdc_type}

正在使用的 KDC 类型。

_可能的值：_
- `none`
  - Ambari 不与 KDC 集成。在这种情况下，应手动创建 Kerberos 身份并分发 keytab 文件
- `mit-kdc`
  - Ambari 与 MIT KDC 集成
- `active-directory`
  - Ambari 与 Active Directory 集成
- `ipa` 
  - Ambari 与 FreeIPA 服务器集成

##### manage_identities {#manage_identities}

表示 Ambari 指定的用户和服务 Kerberos 身份（principal 和 keytab 文件）是否应由 Ambari（`true`）管理（创建、删除、更新等），还是由用户（`false`）手动管理。

_可能的值：_ `true`、`false`

##### create_ambari_principal {#create_ambari_principal}

表示 Ambari Kerberos 身份（Ambari 本身及其视图使用的 principal 和 keytab 文件）是否应由 Ambari（`true`）管理（创建、删除、更新等），还是由用户（`false`）手动管理。

_可选值：_ `true`, `false`

此属性取决于 `manage_identities` 的值；如果 `manage_identities` 为 false，则 `create_ambari_principal` 也将被假定为 `false`。

##### manage_auth_to_local {#manage_auth_to_local}

表示 Hadoop auth-to-local 规则是否应由 Ambari（`true`）管理，还是由用户（`false`）手动管理。

_可选值：_ `true`, `false`

##### install_packages {#install_packages}

表示 Ambari 是否应安装 Kerberos 客户端软件包（`true`）或不安装（`false`）。如果不安装，则用户安装的 Kerberos 工具程序（如 kadmin、kinit、klist 和 kdestroy）应在命令行选项和行为上与 MIT Kerberos 5 版本 1.10.3 兼容。

_可能的值：_ `true`、`false`

##### ldap_url {#ldap_url}

Active Directory LDAP 接口的 URL。此值**必须**表示使用 LDAPS 的安全通道，因为创建和更新 Active Directory 账号密码需要该通道。
 
_示例：_ `ldaps://ad.example.com:636`

如果 `kdc_type` 为 `active-directory`，则此属性为必填项。

##### container_dn {#container_dn}

配置的 Active Directory 中用于存储 Ambari 管理的用户和服务 principal 的容器可分辨名称（DN）。

_示例：_ `OU=hadoop,DC=example,DC=com`

如果 `kdc_type` 为 `active-directory`，此属性为必填项。

##### encryption_types {#encryption_types}

KDC 应返回的受支持会话密钥加密类型列表（以空格分隔）。

_默认值：_ aes des3-cbc-sha1 rc4 des-cbc-md5

##### realm {#realm}

创建服务 principal 时使用的默认 realm。

_示例：_ `EXAMPLE.COM`

此值应全部使用大写字符。

##### kdc_hosts {#kdc_hosts}

相关 KDC 主机的 IP 地址或 FQDN 列表，以逗号分隔。每个条目也可以包含端口号。

_示例：_ `kdc.example.com, kdc1.example.com`

_示例：_ `kdc.example.com:88, kdc1.example.com:88`

##### admin_server_host {#admin_server_host}

Kerberos 管理主机的 IP 地址或 FQDN。可以选择包含端口号。

_示例：_ `kadmin.example.com`

_示例：_ `kadmin.example.com:88`

如果 `kdc_type` 为 `mit-kdc` 或 `ipa`，该值必须是 Kerberos 管理主机的 FQDN。

##### master_kdc {#master_kdc}

主从 KDC 部署中主 KDC 主机的 IP 地址或 FQDN。可以选择包含端口号。

_示例：_ `kadmin.example.com`

_示例：_ `kadmin.example.com:88`

##### executable_search_paths {#executable_search_paths}

用于查找 kadmin、kinit 等 Kerberos 工具的搜索路径列表，以逗号分隔。

_默认值：_ `/usr/bin, /usr/kerberos/bin, /usr/sbin, /usr/lib/mit/bin, /usr/lib/mit/sbin`

##### password_length {#password_length}

生成的密码所需长度。

_默认值：_ `20`

##### password_min_lowercase_letters {#password_min_lowercase_letters}

生成的密码中要求的小写字母（a-z）最少数量

_默认值：_ `1`

##### password_min_uppercase_letters {#password_min_uppercase_letters}

生成的密码中要求的大写字母（A-Z）最少数量

_默认值：_ `1`

##### password_min_digits {#password_min_digits}

生成的密码中要求的数字（0-9）最少数量

_默认值：_ `1`

##### password_min_punctuation {#password_min_punctuation}

生成的密码中要求的标点字符（?.!$%^*()-_+=~）最少数量

_默认值：_ `1`

##### password_min_whitespace {#password_min_whitespace}

生成的密码中要求的空白字符最少数量

_默认值：_ `0`

##### service_check_principal_name {#service_check_principal_name}

执行 Kerberos 服务检查时使用的 principal 名称

_示例：_ `${cluster_name}-${short_date}`

##### case_insensitive_username_rules {#case_insensitive_username_rules}

强制 principal 名称在 auth-to-local 规则中解析为小写本地用户名

_可选值：_ `true`, `false`

_默认值：_ `false`

##### ad_create_attributes_template {#ad_create_attributes_template}

用于生成 JSON 格式文档的 Velocity 模板，其中包含在对应 Active Directory 中创建新 Kerberos 身份所需的属性名称和值。

变量包括：

- `principal_name` - principal 的组件（主组件和实例）部分
- `principal_primary` - principal 名称的_主组件_
- `principal_instance` - principal 名称的_实例组件_
- `realm` - principal 的 `realm` 部分
- `realm_lowercase` - principal 的 `realm` 小写形式
- `normalized_principal` - 完整 principal 值，包括组件和 realm 部分
- `principal_digest` - 规范化 principal 的 binhex 编码 SHA1 摘要
- `principal_digest_256` - 规范化 principal 的 binhex 编码 SHA256 摘要
- `principal_digest_512` - 规范化 principal 的 binhex 编码 SHA512 摘要
- `password` - 生成的密码
- `is_service` - principal 为_服务_ principal 时为 `true`，为_用户_ principal 时为 `false`
- `container_dn` - `kerberos-env/container_dn` 属性值

_注意_：principal 由以下部分组成：主组件、实例组件（可选）和 realm：

* 用户 principal：**_`primary_component`_**@**_`realm`_**
* 服务 principal：**_`primary_component`_**/**_`instance_component`_**@**_`realm`_**

_默认值：_

```
{
"objectClass": ["top", "person", "organizationalPerson", "user"],
"cn": "$principal_name",
#if( $is_service )
"servicePrincipalName": "$principal_name",
#end
"userPrincipalName": "$normalized_principal",
"unicodePwd": "$password",
"accountExpires": "0",
"userAccountControl": "66048"
}
```

此属性为必填项，仅在 `kdc_type` 为 `active-directory` 时使用。

##### kdc_create_attributes {#kdc_create_attributes}

在相关（MIT）KDC 中创建新 Kerberos 身份时使用的属性集合。

_示例：_ `-requires_preauth max_renew_life=7d`

此属性可选，仅在 `kdc_type` 为 `mit-kdc` 时使用。

##### ipa_user_group {#ipa_user_group}

用户 principal 应加入的 IPA 组。

此属性可选，仅在 `kdc_type` 为 `ipa` 时使用。

<a name="krb5-conf"></a>

#### krb5-conf {#krb5-conf}

##### manage_krb5_conf {#manage_krb5_conf}

表示 krb5.conf 文件是由 Ambari（`true`）管理（创建、更新等），还是由用户手动管理（`false`）。

_可选值：_ `true`, `false`

_默认值：_ `false`

##### domains {#domains}

用于将服务器主机名映射到 realm 名称的域名列表，以逗号分隔。

_示例：_ host.example.com, example.com, .example.com

此属性可选。

##### conf_dir {#conf_dir}

krb5.conf 配置目录
默认值：/etc

##### content {#content}

可自定义的 krb5.conf 模板（Jinja 模板引擎）

_默认值：_

```
[libdefaults]
  renew_lifetime = 7d
  forwardable = true
  default_realm = {{realm}}
  ticket_lifetime = 24h
  dns_lookup_realm = false
  dns_lookup_kdc = false
  default_ccache_name = /tmp/krb5cc_%{uid}
  #default_tgs_enctypes = {{encryption_types}}
  #default_tkt_enctypes = {{encryption_types}}
{% if domains %}
[domain_realm]
{%- for domain in domains.split(',') %}
  {{domain|trim()}} = {{realm}}
{%- endfor %}
{% endif %}
[logging]
  default = FILE:/var/log/krb5kdc.log
  admin_server = FILE:/var/log/kadmind.log
  kdc = FILE:/var/log/krb5kdc.log

[realms]
  {{realm}} = {
{%- if master_kdc %}
    master_kdc = {{master_kdc|trim()}}
{%- endif -%}
{%- if kdc_hosts > 0 -%}
{%- set kdc_host_list = kdc_hosts.split(',')  -%}
{%- if kdc_host_list and kdc_host_list|length > 0 %}
    admin_server = {{admin_server_host|default(kdc_host_list[0]|trim(), True)}}
{%- if kdc_host_list -%}
{%- if master_kdc and (master_kdc not in kdc_host_list) %}
    kdc = {{master_kdc|trim()}}
{%- endif -%}
{% for kdc_host in kdc_host_list %}
    kdc = {{kdc_host|trim()}}
{%- endfor -%}
{% endif %}
{%- endif %}
{%- endif %}
  }

{# Append additional realm declarations below #}
```
