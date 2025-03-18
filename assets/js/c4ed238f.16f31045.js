"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[8862],{24677:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>t});const r=JSON.parse('{"id":"ambari-design/kerberos/kerberos_service","title":"The Kerberos Service","description":"\x3c!---","source":"@site/versioned_docs/version-3.0.0/ambari-design/kerberos/kerberos_service.md","sourceDirName":"ambari-design/kerberos","slug":"/ambari-design/kerberos/kerberos_service","permalink":"/docs/3.0.0/ambari-design/kerberos/kerberos_service","draft":false,"unlisted":false,"editUrl":"https://github.com/vivostar/vivostar.github.io/tree/master/versioned_docs/version-3.0.0/ambari-design/kerberos/kerberos_service.md","tags":[],"version":"3.0.0","frontMatter":{"title":"The Kerberos Service"},"sidebar":"ambariSidebar","previous":{"title":"The Kerberos Descriptor","permalink":"/docs/3.0.0/ambari-design/kerberos/kerberos_descriptor"},"next":{"title":"Enabling Kerberos","permalink":"/docs/3.0.0/ambari-design/kerberos/enabling_kerberos"}}');var s=i(74848),d=i(28453);const l={title:"The Kerberos Service"},c=void 0,a={},t=[{value:"The Kerberos Service",id:"the-kerberos-service",level:2},{value:"Configurations",id:"configurations",level:3},{value:"kerberos-env",id:"kerberos-env",level:4},{value:"kdc_type",id:"kdc_type",level:5},{value:"manage_identities",id:"manage_identities",level:5},{value:"create_ambari_principal",id:"create_ambari_principal",level:5},{value:"manage_auth_to_local",id:"manage_auth_to_local",level:5},{value:"install_packages",id:"install_packages",level:5},{value:"ldap_url",id:"ldap_url",level:5},{value:"container_dn",id:"container_dn",level:5},{value:"encryption_types",id:"encryption_types",level:5},{value:"realm",id:"realm",level:5},{value:"kdc_hosts",id:"kdc_hosts",level:5},{value:"admin_server_host",id:"admin_server_host",level:5},{value:"master_kdc",id:"master_kdc",level:5},{value:"executable_search_paths",id:"executable_search_paths",level:5},{value:"password_length",id:"password_length",level:5},{value:"password_min_lowercase_letters",id:"password_min_lowercase_letters",level:5},{value:"password_min_uppercase_letters",id:"password_min_uppercase_letters",level:5},{value:"password_min_digits",id:"password_min_digits",level:5},{value:"password_min_punctuation",id:"password_min_punctuation",level:5},{value:"password_min_whitespace",id:"password_min_whitespace",level:5},{value:"service_check_principal_name",id:"service_check_principal_name",level:5},{value:"case_insensitive_username_rules",id:"case_insensitive_username_rules",level:5},{value:"ad_create_attributes_template",id:"ad_create_attributes_template",level:5},{value:"kdc_create_attributes",id:"kdc_create_attributes",level:5},{value:"ipa_user_group",id:"ipa_user_group",level:5},{value:"krb5-conf",id:"krb5-conf",level:4},{value:"manage_krb5_conf",id:"manage_krb5_conf",level:5},{value:"domains",id:"domains",level:5},{value:"conf_dir",id:"conf_dir",level:5},{value:"content",id:"content",level:5}];function o(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/docs/3.0.0/kerberos",children:"Introduction"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/docs/3.0.0/ambari-design/kerberos/kerberos_descriptor",children:"The Kerberos Descriptor"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"#the-kerberos-service",children:"The Kerberos Service"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"#configurations",children:"Configurations"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"#kerberos-env",children:"kerberos-env"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"#krb5-conf",children:"krb5-conf"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/docs/3.0.0/ambari-design/kerberos/enabling_kerberos",children:"Enabling Kerberos"})}),"\n"]}),"\n",(0,s.jsx)("a",{name:"the-kerberos-service"}),"\n",(0,s.jsx)(n.h2,{id:"the-kerberos-service",children:"The Kerberos Service"}),"\n",(0,s.jsx)("a",{name:"configurations"}),"\n",(0,s.jsx)(n.h3,{id:"configurations",children:"Configurations"}),"\n",(0,s.jsx)("a",{name:"kerberos-env"}),"\n",(0,s.jsx)(n.h4,{id:"kerberos-env",children:"kerberos-env"}),"\n",(0,s.jsx)(n.h5,{id:"kdc_type",children:"kdc_type"}),"\n",(0,s.jsx)(n.p,{children:"The type of KDC being used."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.em,{children:"Possible Values:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"none"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Ambari is not to integrate with a KDC.  In this case, it is expected that the Kerberos identities\nwill be created and the keytab files are distributed manually"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"mit-kdc"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Ambari is to integrate with an MIT KDC"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"active-directory"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Ambari is to integrate with an Active Directory"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"ipa"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Ambari is to integrate with a FreeIPA server"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h5,{id:"manage_identities",children:"manage_identities"}),"\n",(0,s.jsxs)(n.p,{children:["Indicates whether the Ambari-specified user and service Kerberos identities (principals and keytab files)\nshould be managed (created, deleted, updated, etc...) by Ambari (",(0,s.jsx)(n.code,{children:"true"}),") or managed manually by the\nuser (",(0,s.jsx)(n.code,{children:"false"}),")."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Possible Values:"})," ",(0,s.jsx)(n.code,{children:"true"}),", ",(0,s.jsx)(n.code,{children:"false"})]}),"\n",(0,s.jsx)(n.h5,{id:"create_ambari_principal",children:"create_ambari_principal"}),"\n",(0,s.jsxs)(n.p,{children:["Indicates whether the Ambari Kerberos identity (principal and keytab file used by Ambari, itself, and\nits views) should be managed (created, deleted, updated, etc...) by Ambari (",(0,s.jsx)(n.code,{children:"true"}),") or managed manually\nby the user (",(0,s.jsx)(n.code,{children:"false"}),")."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Possible Values:"})," ",(0,s.jsx)(n.code,{children:"true"}),", ",(0,s.jsx)(n.code,{children:"false"})]}),"\n",(0,s.jsxs)(n.p,{children:["This property is dependent on the value of ",(0,s.jsx)(n.code,{children:"manage_identities"}),", where as if ",(0,s.jsx)(n.code,{children:"manage_identities"})," is\nfalse, ",(0,s.jsx)(n.code,{children:"create_ambari_principal"})," will assumed to be ",(0,s.jsx)(n.code,{children:"false"})," as well."]}),"\n",(0,s.jsx)(n.h5,{id:"manage_auth_to_local",children:"manage_auth_to_local"}),"\n",(0,s.jsxs)(n.p,{children:["Indicates whether the Hadoop auth-to-local rules should be managed by Ambari (",(0,s.jsx)(n.code,{children:"true"}),") or managed\nmanually by the user (",(0,s.jsx)(n.code,{children:"false"}),")."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Possible Values:"})," ",(0,s.jsx)(n.code,{children:"true"}),", ",(0,s.jsx)(n.code,{children:"false"})]}),"\n",(0,s.jsx)(n.h5,{id:"install_packages",children:"install_packages"}),"\n",(0,s.jsxs)(n.p,{children:["Indicates whether Ambari should install the Kerberos client packages (",(0,s.jsx)(n.code,{children:"true"}),") or not (",(0,s.jsx)(n.code,{children:"false"}),").\nIf not, it is expected that Kerberos utility programs installed by the user (such as kadmin, kinit,\nklist, and kdestroy) are compatible with MIT Kerberos 5 version 1.10.3 in command line options and\nbehaviors."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Possible Values:"})," ",(0,s.jsx)(n.code,{children:"true"}),", ",(0,s.jsx)(n.code,{children:"false"})]}),"\n",(0,s.jsx)(n.h5,{id:"ldap_url",children:"ldap_url"}),"\n",(0,s.jsxs)(n.p,{children:["The URL to the Active Directory LDAP Interface. This value ",(0,s.jsx)(n.strong,{children:"must"})," indicate a secure channel using\nLDAPS since it is required for creating and updating passwords for Active Directory accounts."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"}),"  ",(0,s.jsx)(n.code,{children:"ldaps://ad.example.com:636"})]}),"\n",(0,s.jsxs)(n.p,{children:["If the ",(0,s.jsx)(n.code,{children:"kdc_type"})," is ",(0,s.jsx)(n.code,{children:"active-directory"}),", this property is mandatory."]}),"\n",(0,s.jsx)(n.h5,{id:"container_dn",children:"container_dn"}),"\n",(0,s.jsx)(n.p,{children:"The distinguished name (DN) of the container used store the Ambari-managed user and service principals\nwithin the configured Active Directory"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"}),"  ",(0,s.jsx)(n.code,{children:"OU=hadoop,DC=example,DC=com"})]}),"\n",(0,s.jsxs)(n.p,{children:["If the ",(0,s.jsx)(n.code,{children:"kdc_type"})," is ",(0,s.jsx)(n.code,{children:"active-directory"}),", this property is mandatory."]}),"\n",(0,s.jsx)(n.h5,{id:"encryption_types",children:"encryption_types"}),"\n",(0,s.jsx)(n.p,{children:"The supported (space-delimited) list of session key encryption types that should be returned by the KDC."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," aes des3-cbc-sha1 rc4 des-cbc-md5"]}),"\n",(0,s.jsx)(n.h5,{id:"realm",children:"realm"}),"\n",(0,s.jsx)(n.p,{children:"The default realm to use when creating service principals"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"EXAMPLE.COM"})]}),"\n",(0,s.jsx)(n.p,{children:"This value is expected to be in all uppercase characters."}),"\n",(0,s.jsx)(n.h5,{id:"kdc_hosts",children:"kdc_hosts"}),"\n",(0,s.jsx)(n.p,{children:"A comma-delimited list of IP addresses or FQDNs for the list of relevant KDC hosts. Optionally a\nport number may be included for each entry."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"kdc.example.com, kdc1.example.com"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"kdc.example.com:88, kdc1.example.com:88"})]}),"\n",(0,s.jsx)(n.h5,{id:"admin_server_host",children:"admin_server_host"}),"\n",(0,s.jsx)(n.p,{children:"The IP address or FQDN for the Kerberos administrative host. Optionally a port number may be included."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"kadmin.example.com"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"kadmin.example.com:88"})]}),"\n",(0,s.jsxs)(n.p,{children:["If the ",(0,s.jsx)(n.code,{children:"kdc_type"})," is ",(0,s.jsx)(n.code,{children:"mit-kdc"})," or ",(0,s.jsx)(n.code,{children:"ipa"}),", the value must be the FQDN of the Kerberos administrative host."]}),"\n",(0,s.jsx)(n.h5,{id:"master_kdc",children:"master_kdc"}),"\n",(0,s.jsx)(n.p,{children:"The IP address or FQDN of the master KDC host in a master-slave KDC deployment. Optionally a port\nnumber may be included."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"kadmin.example.com"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"kadmin.example.com:88"})]}),"\n",(0,s.jsx)(n.h5,{id:"executable_search_paths",children:"executable_search_paths"}),"\n",(0,s.jsx)(n.p,{children:"A comma-delimited list of search paths to use to find Kerberos utilities like kadmin and kinit."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"/usr/bin, /usr/kerberos/bin, /usr/sbin, /usr/lib/mit/bin, /usr/lib/mit/sbin"})]}),"\n",(0,s.jsx)(n.h5,{id:"password_length",children:"password_length"}),"\n",(0,s.jsx)(n.p,{children:"The length required length for generated passwords."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"20"})]}),"\n",(0,s.jsx)(n.h5,{id:"password_min_lowercase_letters",children:"password_min_lowercase_letters"}),"\n",(0,s.jsx)(n.p,{children:"The minimum number of lowercase letters (a-z) required in generated passwords"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"1"})]}),"\n",(0,s.jsx)(n.h5,{id:"password_min_uppercase_letters",children:"password_min_uppercase_letters"}),"\n",(0,s.jsx)(n.p,{children:"The minimum number of uppercase letters (A-Z) required in generated passwords"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"1"})]}),"\n",(0,s.jsx)(n.h5,{id:"password_min_digits",children:"password_min_digits"}),"\n",(0,s.jsx)(n.p,{children:"The minimum number of digits (0-9) required in generated passwords"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"1"})]}),"\n",(0,s.jsx)(n.h5,{id:"password_min_punctuation",children:"password_min_punctuation"}),"\n",(0,s.jsx)(n.p,{children:"The minimum number of punctuation characters (?.!$%^*()-_+=~) required in generated passwords"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"1"})]}),"\n",(0,s.jsx)(n.h5,{id:"password_min_whitespace",children:"password_min_whitespace"}),"\n",(0,s.jsx)(n.p,{children:"The minimum number of whitespace characters required in generated passwords"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"0"})]}),"\n",(0,s.jsx)(n.h5,{id:"service_check_principal_name",children:"service_check_principal_name"}),"\n",(0,s.jsx)(n.p,{children:"The principal name to use when executing the Kerberos service check"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"${cluster_name}-${short_date}"})]}),"\n",(0,s.jsx)(n.h5,{id:"case_insensitive_username_rules",children:"case_insensitive_username_rules"}),"\n",(0,s.jsx)(n.p,{children:"Force principal names to resolve to lowercase local usernames in auth-to-local rules"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Possible values:"})," ",(0,s.jsx)(n.code,{children:"true"}),", ",(0,s.jsx)(n.code,{children:"false"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"false"})]}),"\n",(0,s.jsx)(n.h5,{id:"ad_create_attributes_template",children:"ad_create_attributes_template"}),"\n",(0,s.jsx)(n.p,{children:"A Velocity template to use to generate a JSON-formatted document containing the set of attribute\nnames and values needed to create a new Kerberos identity in the relevant Active Directory."}),"\n",(0,s.jsx)(n.p,{children:"Variables include:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"principal_name"})," - the components (primary and instance) portion of the principal"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"principal_primary"})," - the ",(0,s.jsx)(n.em,{children:"primary component"})," of the principal name"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"principal_instance"})," - the ",(0,s.jsx)(n.em,{children:"instance component"})," of the principal name"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"realm"})," - the ",(0,s.jsx)(n.code,{children:"realm"})," portion of the principal"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"realm_lowercase"})," - the lowercase form of the ",(0,s.jsx)(n.code,{children:"realm"})," of the principal"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"normalized_principal"})," - the full principal value, including the component and realms parts"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"principal_digest"})," - a binhexed-encoded SHA1 digest of the normalized principal"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"principal_digest_256"})," - a binhexed-encoded SHA256 digest of the normalized principal"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"principal_digest_512"})," - a binhexed-encoded SHA512 digest of the normalized principal"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"password"})," - the generated password"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"is_service"})," - ",(0,s.jsx)(n.code,{children:"true"})," if the principal is a ",(0,s.jsx)(n.em,{children:"service"})," principal, ",(0,s.jsx)(n.code,{children:"false"})," if the principal is a ",(0,s.jsx)(n.em,{children:"user"})," principal"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"container_dn"})," - the ",(0,s.jsx)(n.code,{children:"kerberos-env/container_dn"})," property value"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Note"}),": A principal is made up of the following parts:  primary component, instances component\n(optional), and realm:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["User principal: ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"primary_component"})})}),"@",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"realm"})})})]}),"\n",(0,s.jsxs)(n.li,{children:["Service principal: ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"primary_component"})})}),"/",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"instance_component"})})}),"@",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"realm"})})})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.em,{children:"Default value:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'{\n"objectClass": ["top", "person", "organizationalPerson", "user"],\n"cn": "$principal_name",\n#if( $is_service )\n"servicePrincipalName": "$principal_name",\n#end\n"userPrincipalName": "$normalized_principal",\n"unicodePwd": "$password",\n"accountExpires": "0",\n"userAccountControl": "66048"\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["This property is mandatory and only used if the ",(0,s.jsx)(n.code,{children:"kdc_type"})," is ",(0,s.jsx)(n.code,{children:"active-directory"})]}),"\n",(0,s.jsx)(n.h5,{id:"kdc_create_attributes",children:"kdc_create_attributes"}),"\n",(0,s.jsx)(n.p,{children:"The set of attributes to use when creating a new Kerberos identity in the relevant (MIT) KDC."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," ",(0,s.jsx)(n.code,{children:"-requires_preauth max_renew_life=7d"})]}),"\n",(0,s.jsxs)(n.p,{children:["This property is optional and only used if the ",(0,s.jsx)(n.code,{children:"kdc_type"})," is ",(0,s.jsx)(n.code,{children:"mit-kdc"})]}),"\n",(0,s.jsx)(n.h5,{id:"ipa_user_group",children:"ipa_user_group"}),"\n",(0,s.jsx)(n.p,{children:"The group in IPA that user principals should be a member of."}),"\n",(0,s.jsxs)(n.p,{children:["This property is optional and only used if the ",(0,s.jsx)(n.code,{children:"kdc_type"})," is ",(0,s.jsx)(n.code,{children:"ipa"})]}),"\n",(0,s.jsx)("a",{name:"krb5-conf"}),"\n",(0,s.jsx)(n.h4,{id:"krb5-conf",children:"krb5-conf"}),"\n",(0,s.jsx)(n.h5,{id:"manage_krb5_conf",children:"manage_krb5_conf"}),"\n",(0,s.jsxs)(n.p,{children:["Indicates whether the krb5.conf file should be managed (created, updated, etc...) by Ambari (",(0,s.jsx)(n.code,{children:"true"}),")\nor managed manually by the user (",(0,s.jsx)(n.code,{children:"false"}),")."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Possible values:"})," ",(0,s.jsx)(n.code,{children:"true"}),", ",(0,s.jsx)(n.code,{children:"false"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Default value:"})," ",(0,s.jsx)(n.code,{children:"false"})]}),"\n",(0,s.jsx)(n.h5,{id:"domains",children:"domains"}),"\n",(0,s.jsx)(n.p,{children:"A comma-separated list of domain names used to map server host names to the realm name."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Example:"})," host.example.com, example.com, .example.com"]}),"\n",(0,s.jsx)(n.p,{children:"This property is optional"}),"\n",(0,s.jsx)(n.h5,{id:"conf_dir",children:"conf_dir"}),"\n",(0,s.jsx)(n.p,{children:"The krb5.conf configuration directory\nDefault value: /etc"}),"\n",(0,s.jsx)(n.h5,{id:"content",children:"content"}),"\n",(0,s.jsx)(n.p,{children:"Customizable krb5.conf template (Jinja template engine)"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.em,{children:"Default value:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"[libdefaults]\n  renew_lifetime = 7d\n  forwardable = true\n  default_realm = {{realm}}\n  ticket_lifetime = 24h\n  dns_lookup_realm = false\n  dns_lookup_kdc = false\n  default_ccache_name = /tmp/krb5cc_%{uid}\n  #default_tgs_enctypes = {{encryption_types}}\n  #default_tkt_enctypes = {{encryption_types}}\n{% if domains %}\n[domain_realm]\n{%- for domain in domains.split(',') %}\n  {{domain|trim()}} = {{realm}}\n{%- endfor %}\n{% endif %}\n[logging]\n  default = FILE:/var/log/krb5kdc.log\n  admin_server = FILE:/var/log/kadmind.log\n  kdc = FILE:/var/log/krb5kdc.log\n\n[realms]\n  {{realm}} = {\n{%- if master_kdc %}\n    master_kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{%- if kdc_hosts > 0 -%}\n{%- set kdc_host_list = kdc_hosts.split(',')  -%}\n{%- if kdc_host_list and kdc_host_list|length > 0 %}\n    admin_server = {{admin_server_host|default(kdc_host_list[0]|trim(), True)}}\n{%- if kdc_host_list -%}\n{%- if master_kdc and (master_kdc not in kdc_host_list) %}\n    kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{% for kdc_host in kdc_host_list %}\n    kdc = {{kdc_host|trim()}}\n{%- endfor -%}\n{% endif %}\n{%- endif %}\n{%- endif %}\n  }\n\n{# Append additional realm declarations below #}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>c});var r=i(96540);const s={},d=r.createContext(s);function l(e){const n=r.useContext(d);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(d.Provider,{value:n},e.children)}}}]);