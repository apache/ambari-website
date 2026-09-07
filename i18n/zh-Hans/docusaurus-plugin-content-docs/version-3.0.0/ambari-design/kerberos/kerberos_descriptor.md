---
title: Kerberos 描述符
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
- [Kerberos 描述符](#the-kerberos-descriptor)
  - [Components of a Kerberos Descriptor](#components-of-a-kerberos-descriptor)
    - [Stack-level Properties](#stack-level-properties)
    - [Stack-level Identities](#stack-level-identities)
    - [Stack-level Auth-to-local-properties](#stack-level-auth-to-local-properties)
    - [Stack-level Configurations](#stack-level-configurations)
    - [Services](#services)
    - [Service-level Identities](#service-level-identities)
    - [Service-level Auth-to-local-properties](#service-level-auth-to-local-properties)
    - [Service-level Configurations](#service-level-configurations)
    - [Components](#components)
    - [Component-level Identities](#component-level-identities)
    - [Component-level Auth-to-local-properties](#component-level-auth-to-local-properties)
    - [Component-level Configurations](#component-level-configurations)
  - [Kerberos Descriptor specifications](#kerberos-descriptor-specifications)
    - [properties](#properties)
    - [auth-to-local-properties](#auth-to-local-properties)
    - [configurations](#configurations)
    - [identities](#identities)
    - [principal](#principal)
    - [keytab](#keytab)
    - [services](#services)
    - [components](#components)
  - [Examples](#examples)
- [Kerberos 服务](kerberos_service.md)
- [启用 Kerberos](enabling_kerberos.md)

<a name="the-kerberos-descriptor"></a>

## Kerberos 描述符 {#the-kerberos-descriptor}

Kerberos 描述符是 JSON 格式的文本文件，包含 Ambari 为 Stack 及其服务启用或禁用 Kerberos 所需的信息。该文件必须命名为 **_kerberos.json_**，并应位于相关 Stack 或服务定义的根目录中。Kerberos 描述符采用层次结构，服务级描述符中的详细信息可以覆盖（或更新）Stack 级描述符中的详细信息。

要为 Stack 中的服务启用 Kerberos，必须存在 Stack 级 Kerberos 描述符。即使通用服务拥有 Kerberos 描述符，只有相关 Stack 通过 Stack 级 Kerberos 描述符表明支持 Kerberos 时，才能为其启用 Kerberos。

要为服务的组件启用 Kerberos，该组件必须在所属服务的服务级描述符中有条目。这允许自动化 Kerberos 功能管理服务的部分组件，同时忽略该服务的其他组件。

Kerberos 描述符继承自基础 Stack 或服务，但只能作为完整描述符覆盖，不允许使用部分描述符。

完整描述符（由 Stack 级描述符、服务级描述符以及用户输入的更新构建）具有以下结构：

- Stack-level Properties
- Stack-level Identities
- Stack-level Configurations
- Stack-level Auth-to-local-properties
- Services
  - Service-level Identities
  - Service-level Auth-to-local-properties
  - Service-level Configurations
  - Components
    - Component-level Identities
    - Component-level Auth-to-local-properties
    - Component-level Configurations

描述符的每一层都继承父级数据，但必要时可以覆盖这些数据。例如，组件会继承其所属服务的配置和身份，而该服务又继承 Stack 的配置和身份。

<a name="components-of-a-kerberos-descriptor"></a>

### Kerberos 描述符的组成部分 {#components-of-a-kerberos-descriptor}

<a name="stack-level-properties"></a>

#### Stack 级属性 {#stack-level-properties}

Stack 级属性是一组可选的名称/值对，可用于变量替换。例如，如果存在名为 `**_property1_**` 且值为 `**_value1_**` 的属性，则配置属性名称或值中的任何 `**_${property1}_**` 都会替换为 `**_value1_**`。

此属性仅适用于 Stack 级 Kerberos 描述符，不能被较低级别的描述符覆盖。

请参阅 [properties](#properties)。

<a name="stack-level-identities"></a>

#### Stack 级身份 {#stack-level-identities}

Stack 级身份是一个可选的身份块，其中包含零个或多个身份描述符列表，这些身份在 Stack 的所有服务之间通用。此类身份的示例是 Ambari smoke test 用户，所有服务都使用它执行服务检查操作。服务级和组件级身份可以通过在身份名称前加正斜杠（/）来引用并专门化 Stack 级身份。例如，如果存在名为 "smokeuser" 的 Stack 级身份，服务或组件可以声明 "**_reference_**" 属性并将其设置为 "/smokeuser"，从而创建引用并专门化该身份的身份块。在此身份块中，可以按需覆盖身份的详细信息。这不会修改 Stack 级身份，而是创建其副本并更新副本的属性。

请参阅 [identities](#identities)。

<a name="stack-level-auth-to-local-properties"></a>

#### Stack 级 Auth-to-local 属性 {#stack-level-auth-to-local-properties}

Stack 级 auth-to-local-properties 是一个可选列表，其中包含零个或多个配置属性规范 `(config-type/property_name[|concatenation_scheme])`，用于指示哪些属性应使用动态生成的 auth-to-local 规则集进行更新。

请参阅 [auth-to-local-properties](#auth-to-local-properties)。

<a name="stack-level-configurations"></a>

#### Stack 级配置 {#stack-level-configurations}

Stack 级 configurations 是一个可选配置块，其中包含零个或多个配置描述符列表，这些描述符在 Stack 的所有服务之间通用。由于数据结构的特性，配置描述符可以被覆盖。但是，覆盖配置属性可能造成非预期行为，因为在 Kerberization 过程完成之前无法确定属性的值。

请参阅 [configurations](#configurations)。

<a name="services"></a>

#### 服务 {#services}

Services 是零个或多个服务描述符的列表。Stack 级 Kerberos Descriptor 不应列出任何服务；但是，服务级 Kerberos Descriptor 至少应包含一个服务。

请参阅 [services](#services)。

<a name="service-level-identities"></a>

#### 服务级身份 {#service-level-identities}

服务级 identities 是一个可选身份块，其中包含零个或多个身份描述符列表，这些身份在服务的所有组件之间通用。组件级身份可以通过指定相对或绝对路径来引用并专门化服务级身份。

例如，如果存在名为 "service_identity" 的服务级身份，子组件可以将其 "reference" 属性设置为 "../service_identity" 或 "/service_name/service_identity"，并按需覆盖值，以创建引用并专门化该身份的身份块。这不会覆盖服务级身份，而是创建其副本并更新副本的属性。

##### Examples {#examples}

```
{
  "name" : "relative_path_example",
  "reference" : "../service_identity",
  ...
}
```

```
{
  "name" : "absolute_path_example",
  "reference" : "/SERVICE/service_identity",
  ...
}
```

**注意**：使用身份的绝对路径后，任何其他服务或组件都可以引用任意服务级身份。

请参阅 [identities](#identities)。

<a name="service-level-auth-to-local-properties"></a>

#### 服务级 Auth-to-local 属性 {#service-level-auth-to-local-properties}

服务级 auth-to-local-properties 是一个可选列表，其中包含零个或多个配置属性规范 `(config-type/property_name[|concatenation_scheme])`，用于指示哪些属性应使用动态生成的 auth-to-local 规则集进行更新。

请参阅 [auth-to-local-properties](#auth-to-local-properties)。

<a name="service-level-configurations"></a>

#### 服务级配置 {#service-level-configurations}

服务级 configurations 是一个可选配置块，其中列出零个或多个配置描述符，这些描述符在服务内的所有组件之间通用。由于数据结构的特性，配置描述符可以被覆盖。但是，覆盖配置属性可能造成非预期行为，因为在 Kerberization 过程完成之前无法确定属性的值。

请参阅 [configurations](#configurations)。

<a name="service-components"></a>

#### 组件 {#components}

Components 是零个或多个组件描述符块的列表。

请参阅 [components](#components)。

<a name="component-level-identities"></a>

#### 组件级身份 {#component-level-identities}

组件级 identities 是一个可选身份块，其中包含零个或多个专属于该组件的身份描述符列表。组件级身份可以使用其绝对路径（`/service_name/component_name/identity_name`）进行引用（和专门化）。这不会覆盖组件级身份，而是创建其副本并更新副本的属性。

请参阅 [identities](#identities)。

<a name="component-level-auth-to-local-properties"></a>

#### 组件级 Auth-to-local 属性 {#component-level-auth-to-local-properties}

组件级 auth-to-local-properties 是一个可选列表，其中包含零个或多个配置属性规范 `(config-type/property_name[|concatenation_scheme])`，用于指示哪些属性应使用动态生成的 auth-to-local 规则集进行更新。

请参阅 [auth-to-local-properties](#auth-to-local-properties)。

<a name="component-level-configurations"></a>

#### 组件级配置 {#component-level-configurations}

组件级 configurations 是一个可选配置块，其中列出零个或多个专属于该组件的配置描述符。

请参阅 [configurations](#configurations)。

### Kerberos 描述符规范 {#kerberos-descriptor-specifications}

<a name="properties"></a>

#### properties {#properties}

`properties` 块仅在服务级 Kerberos Descriptor 文件中有效。该块由以下名称/值对组成：

```
"properties" : {
  "property_1" : "value_1",
  "property_2" : "value_2",
  ...
}
```

<a name="auth-to-local-properties"></a>

#### auth-to-local-properties {#auth-to-local-properties}

`auth-to-local-properties` 块可用于 Stack 级、服务级和组件级描述符。该块是配置规范列表（`config-type/property_name[|concatenation_scheme]`），用于指示哪些属性包含应根据 Kerberized 集群中所用身份动态更新的 auth-to-local 规则。

该规范可以选择声明将规则追加到规则集值时使用的连接方案。指定时可设置以下方案之一：

- **`new_lines`** - 规则集中的规则以换行符（`\n`）分隔
- **`new_lines_escaped`** - 规则集中的规则以 `\` 和换行符（`\n`）分隔
- **`spaces`** - 规则集中的规则以空白字符分隔（实际上将所有规则放在同一行）

如果未指定，默认连接方案为 `new_lines`。

```
"auth-to-local-properties" : [
  "core-site/hadoop.security.auth_to_local",
  "service.properties/http.authentication.kerberos.name.rules|new_lines_escaped",
  ...
]
```

<a name="configurations"></a>

#### configurations {#configurations}

Stack 级、服务级和组件级描述符中可以存在 `configurations` 块。该块是一个或多个配置块的列表，每个配置块包含一个以配置类型命名的结构，其中包含各相关属性的值。

每个属性名称和值可以是具体值，也可以包含使用 Stack 级 `properties` 块或任何可用配置中的值替换的变量。`properties` 块中的属性按名称（`${property_name}`）引用，配置属性按配置规范（`${config-type/property_name}`）引用，Kerberos principal 按 principal 路径（`principals/SERVICE/COMPONENT/principal_name`）引用。

```
"configurations" : [
  {
    "config-type-1" : {
      "${cluster-env/smokeuser}_property" : "value1",
      "some_realm_property" : "${realm}",
       ...
    }
  },
  {
    "config-type-2" : {
      "property-2" : "${cluster-env/smokeuser}",
      ...
    }
  },
  ...
]
```

If `cluster-env/smokuser` was `"ambari-qa"` and realm was `"EXAMPLE.COM"`, the above block would effectively be translated to

```
"configurations" : [
  {
    "config-type-1" : {
      "ambari-qa_property" : "value1",
      "some_realm_property" : "EXAMPLE.COM",
      ...
    }
  },
  {
    "config-type-2" : {
      "property-2" : "ambari-qa",
      ...
    }
  },
  ...
]
```

<a name="identities"></a>

#### identities {#identities}

Stack 级、服务级和组件级描述符中可以存在 `identities` 描述符。该块是零个或多个身份描述符的列表。每个身份描述符都是一个块，包含 `name`、可选的 `reference` 标识符、可选的 `principal` 描述符和可选的 `keytab` 描述符。

`name` 属性应是 `identity` 描述符在其 `local` 作用域（Stack、服务或组件）内唯一的具体名称。但是，为保持与旧版 Ambari 的向后兼容，它也可以是 Kerberos Descriptor 中其他身份的引用标识符。此功能已弃用，未来版本的 Ambari 可能不再提供。

`reference` 属性是 `identitiy` 描述符的可选属性。如果存在，则表示使用被引用身份的属性作为当前身份的基础，当前身份块中指定的属性会覆盖基础数据。在这种情况下，基础数据会复制到本地身份，因此更改只在本地生效，而不是全局生效。被引用身份可以是分层的，一个被引用身份还可以引用另一个身份，依此类推。因此必须注意避免创建循环引用。引用值必须是被引用身份描述符的相对或绝对 _path_。相对 _path_ 以 `../` 开头，可在组件级身份描述符中用于引用父服务中的身份描述符。绝对 _path_ 以 `/` 开头，可在任意级别按以下方式使用：

- **Stack-level** identity reference: `/identitiy_name`
- **Service-level** identity reference: `/SERVICE_NAME/identitiy_name`
- **Component-level** identity reference: `/SERVICE_NAME/COMPONENT_NAME/identitiy_name`

```
"identities" : [
  {
    "name" : "local_identity",
    "principal" : {
      ...
    },
    "keytab" : {
      ...
    }
  },
  {
    "name" : "/smokeuser",
    "principal" : {
      "configuration" : "service-site/principal_property_name"
    },
    "keytab" : {
      "configuration" : "service-site/keytab_property_name"
    }
  },
  ...
]
```

<a name="principal"></a>

#### principal {#principal}

`principal` 块是 `identity` 描述符块中的可选块。它声明身份 principal 的详细信息，包括 principal 的 `value`、`type`（user 或 service）、相关 `configuration` 属性和本地用户名映射。所有属性都是可选的；但是，如果所有属性都没有可用的基础值或默认值（通过父身份的 `reference` 值提供），则可以忽略该 principal。

principal 的 `value` 属性应为规范化的 principal 名称，其中包含 principal 的组件和 realm。大多数情况下，应使用 realm 变量（`${realm}` 或 `${kerberos-env/realm}`）指定 realm。此外，对于 service principal，应使用 "`_HOST`" 表示相关主机名。通常，代理端脚本或服务本身会将此值替换为当前主机的主机名。但是，如果该服务在代理端无法进行 "`_HOST`" 替换，则可以使用内置主机名变量（`${hostname}`）。示例：`smokeuser@${realm}`、`service/_HOST@${realm}`。

principal 的 `type` 属性可以是 `user` 或 `service`。如果未指定，则默认为 `user`。此值决定如何在 KDC 或 Active Directory 中创建身份。在 Active Directory 场景中，由于帐户创建方式不同，这一点尤其重要。它还会告知 Ambari 如何处理 principal 和相关 keytab 文件，包括用户界面行为和数据缓存。

`configuration` 属性是可选的配置规范（`config-type/property_name`），其值将设置为该 principal 的 `value`（替换变量后）。

如果提供 `local_username` 属性，它会指示为此身份生成 auth-to-local 规则时使用哪个本地用户帐户。如果未指定，则不会生成显式的 auth-to-local 规则。

```
"principal" : {
  "value": "${cluster-env/smokeuser}@${realm}",
  "type" : "user" ,
  "configuration": "cluster-env/smokeuser_principal_name",
  "local_username" : "${cluster-env/smokeuser}"
}
```

```
"principal" : {
  "value": "component1/_HOST@${realm}",
  "type" : "service" ,
  "configuration": "service-site/component1.principal"
}
```

<a name="keytab"></a>

#### keytab {#keytab}

`keytab` 块是 `identity` 描述符块中的可选块。它描述如何创建和存储相关 keytab 文件。该块声明 keytab 文件在目标主机本地文件系统中的路径、为该文件分配的权限以及相关配置属性。

`file` 属性声明将 keytab 文件分发到相关主机时用于存储它的绝对路径。如果未提供此属性，则不会创建 keytab 文件。

`owner` 属性是可选块，指定作为文件所有者的本地用户帐户，以及授予该用户的访问权限（`"rw"` - 读/写；`"r"` - 只读）。默认情况下，所有者获得只读权限。

`group` 属性是可选块，指定作为文件组所有者的本地组，以及授予该组中本地用户帐户的访问权限（`"rw"` - 读/写；`"r"` - 只读；`“”` - 无访问权限）。默认情况下，该组没有访问权限。

`configuration` 属性是可选的配置规范（`config-type/property_name`），其值将设置为此 keytab 文件的路径（替换变量后）。

```
"keytab" : {
  "file": "${keytab_dir}/smokeuser.headless.keytab",
  "owner": {
    "name": "${cluster-env/smokeuser}",
    "access": "r"
  },
  "group": {
    "name": "${cluster-env/user_group}",
    "access": "r"
  },
  "configuration": "${cluster-env/smokeuser_keytab}"
}
```

<a name="services"></a>

#### services {#services-1}

Stack 级和服务级 Kerberos Descriptor 文件中可以存在 `services` 块。该块是要添加到 Kerberos Descriptor 的零个或多个服务描述符列表。

每个服务块包含服务 `name`，以及可选的 `identities`、`auth_to_local_properties`、`configurations` 和 `components` 块。

```
"services": [
  {
    "name": "SERVICE1_NAME",
    "identities": [
      ...
    ],
    "auth_to_local_properties" : [
      ...
    ],
    "configurations": [
      ...
    ],
    "components": [
      ...
    ]
  },
  {
    "name": "SERVICE2_NAME",
    "identities": [
      ...
    ],
    "auth_to_local_properties" : [
      ...
    ],
    "configurations": [
      ...
    ],
    "components": [
      ...
    ]
  },
  …
]
```

<a name="components"></a>

#### components {#components-1}

`service` 描述符块中可以存在 `components` 块。该块是属于所含服务描述符的零个或多个组件描述符列表。每个组件描述符都是一个块，包含组件 `name` 以及可选的 `identities`、`auth_to_local_properties` 和 `configurations` 块。

```
"components": [
  {
    "name": "COMPONENT_NAME",
    "identities": [
      ...
    ],
    "auth_to_local_properties" : [
      ...
    ],
    "configurations": [
      ...
    ]
  },
  ...
]
```

<a name="examples"></a>

### 示例 {#examples-1}

#### Example Stack-level Kerberos Descriptor {#example-stack-level-kerberos-descriptor}

以下示例附有用于说明的注释。这些注释在实际的 JSON 格式文件中无效。

```
{
  // Properties that can be used in variable replacement operations.
  // For example, ${keytab_dir} will resolve to "/etc/security/keytabs".
  // Since variable replacement is recursive, ${realm} will resolve
  // to ${kerberos-env/realm}, which in-turn will resolve to the
  // declared default realm for the cluster
  "properties": {
    "realm": "${kerberos-env/realm}",
    "keytab_dir": "/etc/security/keytabs"
  },
  // A list of global Kerberos identities. These may be referenced
  // using /identity_name. For example the “spnego” identity may be
  // referenced using “/spnego”
  "identities": [
    {
      "name": "spnego",
      // Details about this identity's principal. This instance does not
      // declare any value for configuration or local username. That is
      // left up to the services and components use wish to reference
      // this principal and set overrides for those values.
      "principal": {
        "value": "HTTP/_HOST@${realm}",
        "type" : "service"
      },
      // Details about this identity’s keytab file. This keytab file
      // will be created in the configured keytab file directory with
      // read-only access granted to root and users in the cluster’s
      // default user group (typically, hadoop). To ensure that only
      // a single copy exists on the file system, references to this
      // identity should not override the keytab file details;
      // however if it is desired that multiple keytab files are
      // created, these values may be overridden in a reference
      // within a service or component. Since no configuration
      // specification is set, the the keytab file location will not
      // be set in any configuration file by default. Services and
      // components need to reference this identity to update this
      // value as needed.
      "keytab": {
        "file": "${keytab_dir}/spnego.service.keytab",
        "owner": {
          "name": "root",
          "access": "r"
        },
        "group": {
          "name": "${cluster-env/user_group}",
          "access": "r"
        }
      }
    },
    {
      "name": "smokeuser",
      // Details about this identity's principal. This instance declares
      // a configuration and local username mapping. Services and
      // components can override this to set additional configurations
      // that should be set to this principal value.  Overriding the
      // local username may create undesired behavior since there may be
      // conflicting entries in relevant auth-to-local rule sets.
      "principal": {
        "value": "${cluster-env/smokeuser}@${realm}",
        "type" : "user",
        "configuration": "cluster-env/smokeuser_principal_name",
        "local_username" : "${cluster-env/smokeuser}"
      },
      // Details about this identity’s keytab file. This keytab file
      // will be created in the configured keytab file directory with
      // read-only access granted to the configured smoke user
      // (typically ambari-qa) and users in the cluster’s default
      // user group (typically hadoop). To ensure that only a single
      // copy exists on the file system, references to this identity
      // should not override the keytab file details; however if it
      // is desired that multiple keytab files are created, these
      // values may be overridden in a reference within a service or
      // component.
      "keytab": {
        "file": "${keytab_dir}/smokeuser.headless.keytab",
        "owner": {
          "name": "${cluster-env/smokeuser}",
          "access": "r"
        },
        "group": {
          "name": "${cluster-env/user_group}",
          "access": "r"
        },
        "configuration": "cluster-env/smokeuser_keytab"
      }
    }
  ]
}
```

#### 服务级 Kerberos Descriptor 示例 {#example-service-level-kerberos-descriptor}

以下示例附有用于说明的注释。这些注释在实际的 JSON 格式文件中无效。

```
{
  // One or more services may be listed in a service-level Kerberos
  // Descriptor file
  "services": [
    {
      "name": "SERVICE_1",
      // Service-level identities to be created if this service is installed.
      // Any relevant keytab files will be distributed to hosts with at least
      // one of the components on it.
      "identities": [
        // Service-specific identity declaration, declaring all properties
        // needed initiate the creation of the principal and keytab files,
        // as well as setting the service-specific  configurations.  This may
        // be referenced by contained components using ../service1_identity.
        {
          "name": "service1_identity",
          "principal": {
            "value": "service1/_HOST@${realm}",
            "type" : "service",
            "configuration": "service1-site/service1.principal"
          },
          "keytab": {
            "file": "${keytab_dir}/service1.service.keytab",
            "owner": {
              "name": "${service1-env/service_user}",
              "access": "r"
            },
            "group": {
              "name": "${cluster-env/user_group}",
              "access": "r"
            },
            "configuration": "service1-site/service1.keytab.file"
          }
        },
        // Service-level identity referencing the stack-level spnego
        // identity and overriding the principal and keytab configuration
        // specifications.
        {
          "name": "service1_spnego",
          "reference": "/spnego",
          "principal": {
            "configuration": "service1-site/service1.web.principal"
          },
          "keytab": {
            "configuration": "service1-site/service1.web.keytab.file"
          }
        },
        // Service-level identity referencing the stack-level smokeuser
        // identity. No properties are being overridden and overriding
        // the principal and keytab configuration specifications.
        // This ensures that the smokeuser principal is created and its
        // keytab file is distributed to all hosts where components of this
        // this service are installed.
        {
          "name": "service1_smokeuser",
          "reference": "/smokeuser"
        }
      ],
      // Properties related to this service that require the auth-to-local
      // rules to be dynamically generated based on identities create for
      // the cluster.
      "auth_to_local_properties" : [
        "service1-site/security.auth_to_local"
      ],
      // Configuration properties to be set when this service is installed,
      // no matter which components are installed
      "configurations": [
        {
          "service-site": {
            "service1.security.authentication": "kerberos",
            "service1.security.auth_to_local": ""
          }
        }
      ],
      // A list of components related to this service
      "components": [
        {
          "name": "COMPONENT_1",
          // Component-specific identities to be created when this component
          // is installed.  Any keytab files specified will be distributed
          // only to the hosts where this component is installed.
          "identities": [
            // An identity "local" to this component
            {
              "name": "component1_service_identity",
              "principal": {
                "value": "component1/_HOST@${realm}",
                "type" : "service",
                "configuration": "service1-site/comp1.principal",
                "local_username" : "${service1-env/service_user}"
              },
              "keytab": {
                "file": "${keytab_dir}/s1c1.service.keytab",
                "owner": {
                  "name": "${service1-env/service_user}",
                  "access": "r"
                },
                "group": {
                  "name": "${cluster-env/user_group}",
                  "access": ""
                },
                "configuration": "service1-site/comp1.keytab.file"
              }
            },
            // The stack-level spnego identity overridden to set component-specific
            // configurations
            {
              "name": "component1_spnego_1",
              "reference": "/spnego",
              "principal": {
                "configuration": "service1-site/comp1.spnego.principal"
              },
              "keytab": {
                "configuration": "service1-site/comp1.spnego.keytab.file"
              }
            },
            // The stack-level spnego identity overridden to set a different set of component-specific
            // configurations
            {
              "name": "component1_spnego_2",
              "reference": "/spnego",
              "principal": {
                "configuration": "service1-site/comp1.someother.principal"
              },
              "keytab": {
                "configuration": "service1-site/comp1.someother.keytab.file"
              }
            }
          ],
          // Component-specific configurations to set if this component is installed
          "configurations": [
            {
              "service-site": {
                "comp1.security.type": "kerberos"
              }
            }
          ]
        },
        {
          "name": "COMPONENT_2",
          "identities": [
            {
              "name": "component2_service_identity",
              "principal": {
                "value": "component2/_HOST@${realm}",
                "type" : "service",
                "configuration": "service1-site/comp2.principal",
                "local_username" : "${service1-env/service_user}"
              },
              "keytab": {
                "file": "${keytab_dir}/s1c2.service.keytab",
                "owner": {
                  "name": "${service1-env/service_user}",
                  "access": "r"
                },
                "group": {
                  "name": "${cluster-env/user_group}",
                  "access": ""
                },
                "configuration": "service1-site/comp2.keytab.file"
              }
            },
            // The service-level service1_identity identity overridden to
            // set component-specific configurations
            {
              "name": "component2_service1_identity",
              "reference": "../service1_identity",
              "principal": {
                "configuration": "service1-site/comp2.service.principal"
              },
              "keytab": {
                "configuration": "service1-site/comp2.service.keytab.file"
              }
            }
          ],
          "configurations" : [
            {
              "service-site" : {
                "comp2.security.type": "kerberos"
              }
            }
          ]
        }
      ]
    }
  ]
}
```
