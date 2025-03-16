"use strict";(self.webpackChunkambari_website=self.webpackChunkambari_website||[]).push([[239],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>k});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),o=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=o(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),c=o(a),k=r,u=c["".concat(s,".").concat(k)]||c[k]||d[k]||i;return a?n.createElement(u,l(l({ref:t},m),{},{components:a})):n.createElement(u,l({ref:t},m))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=c;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var o=2;o<i;o++)l[o]=a[o];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},46230:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>o});var n=a(87462),r=(a(67294),a(3905));const i={title:"The Kerberos Service"},l=void 0,p={unversionedId:"ambari-design/kerberos/kerberos_service",id:"ambari-design/kerberos/kerberos_service",title:"The Kerberos Service",description:"\x3c!---",source:"@site/docs/ambari-design/kerberos/kerberos_service.md",sourceDirName:"ambari-design/kerberos",slug:"/ambari-design/kerberos/kerberos_service",permalink:"/docs/next/ambari-design/kerberos/kerberos_service",draft:!1,editUrl:"https://github.com/vivostar/vivostar.github.io/tree/master/docs/ambari-design/kerberos/kerberos_service.md",tags:[],version:"current",frontMatter:{title:"The Kerberos Service"},sidebar:"ambariSidebar",previous:{title:"The Kerberos Descriptor",permalink:"/docs/next/ambari-design/kerberos/kerberos_descriptor"},next:{title:"Enabling Kerberos",permalink:"/docs/next/ambari-design/kerberos/enabling_kerberos"}},s={},o=[{value:"The Kerberos Service",id:"the-kerberos-service",level:2},{value:"Configurations",id:"configurations",level:3},{value:"kerberos-env",id:"kerberos-env",level:4},{value:"kdc_type",id:"kdc_type",level:5},{value:"manage_identities",id:"manage_identities",level:5},{value:"create_ambari_principal",id:"create_ambari_principal",level:5},{value:"manage_auth_to_local",id:"manage_auth_to_local",level:5},{value:"install_packages",id:"install_packages",level:5},{value:"ldap_url",id:"ldap_url",level:5},{value:"container_dn",id:"container_dn",level:5},{value:"encryption_types",id:"encryption_types",level:5},{value:"realm",id:"realm",level:5},{value:"kdc_hosts",id:"kdc_hosts",level:5},{value:"admin_server_host",id:"admin_server_host",level:5},{value:"master_kdc",id:"master_kdc",level:5},{value:"executable_search_paths",id:"executable_search_paths",level:5},{value:"password_length",id:"password_length",level:5},{value:"password_min_lowercase_letters",id:"password_min_lowercase_letters",level:5},{value:"password_min_uppercase_letters",id:"password_min_uppercase_letters",level:5},{value:"password_min_digits",id:"password_min_digits",level:5},{value:"password_min_punctuation",id:"password_min_punctuation",level:5},{value:"password_min_whitespace",id:"password_min_whitespace",level:5},{value:"service_check_principal_name",id:"service_check_principal_name",level:5},{value:"case_insensitive_username_rules",id:"case_insensitive_username_rules",level:5},{value:"ad_create_attributes_template",id:"ad_create_attributes_template",level:5},{value:"kdc_create_attributes",id:"kdc_create_attributes",level:5},{value:"ipa_user_group",id:"ipa_user_group",level:5},{value:"krb5-conf",id:"krb5-conf",level:4},{value:"manage_krb5_conf",id:"manage_krb5_conf",level:5},{value:"domains",id:"domains",level:5},{value:"conf_dir",id:"conf_dir",level:5},{value:"content",id:"content",level:5}],m={toc:o};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/next/kerberos"},"Introduction")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/next/ambari-design/kerberos/kerberos_descriptor"},"The Kerberos Descriptor")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#the-kerberos-service"},"The Kerberos Service"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#configurations"},"Configurations"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#kerberos-env"},"kerberos-env")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#krb5-conf"},"krb5-conf")))))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/next/ambari-design/kerberos/enabling_kerberos"},"Enabling Kerberos"))),(0,r.kt)("a",{name:"the-kerberos-service"}),(0,r.kt)("h2",{id:"the-kerberos-service"},"The Kerberos Service"),(0,r.kt)("a",{name:"configurations"}),(0,r.kt)("h3",{id:"configurations"},"Configurations"),(0,r.kt)("a",{name:"kerberos-env"}),(0,r.kt)("h4",{id:"kerberos-env"},"kerberos-env"),(0,r.kt)("h5",{id:"kdc_type"},"kdc_type"),(0,r.kt)("p",null,"The type of KDC being used. "),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Possible Values:")," "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"none"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Ambari is not to integrate with a KDC.  In this case, it is expected that the Kerberos identities\nwill be created and the keytab files are distributed manually"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"mit-kdc"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Ambari is to integrate with an MIT KDC"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"active-directory"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Ambari is to integrate with an Active Directory"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ipa")," ",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Ambari is to integrate with a FreeIPA server")))),(0,r.kt)("h5",{id:"manage_identities"},"manage_identities"),(0,r.kt)("p",null,"Indicates whether the Ambari-specified user and service Kerberos identities (principals and keytab files)\nshould be managed (created, deleted, updated, etc...) by Ambari (",(0,r.kt)("inlineCode",{parentName:"p"},"true"),") or managed manually by the\nuser (",(0,r.kt)("inlineCode",{parentName:"p"},"false"),")."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Possible Values:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("h5",{id:"create_ambari_principal"},"create_ambari_principal"),(0,r.kt)("p",null,"Indicates whether the Ambari Kerberos identity (principal and keytab file used by Ambari, itself, and\nits views) should be managed (created, deleted, updated, etc...) by Ambari (",(0,r.kt)("inlineCode",{parentName:"p"},"true"),") or managed manually\nby the user (",(0,r.kt)("inlineCode",{parentName:"p"},"false"),")."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Possible Values:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("p",null,"This property is dependent on the value of ",(0,r.kt)("inlineCode",{parentName:"p"},"manage_identities"),", where as if ",(0,r.kt)("inlineCode",{parentName:"p"},"manage_identities")," is\nfalse, ",(0,r.kt)("inlineCode",{parentName:"p"},"create_ambari_principal")," will assumed to be ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," as well."),(0,r.kt)("h5",{id:"manage_auth_to_local"},"manage_auth_to_local"),(0,r.kt)("p",null,"Indicates whether the Hadoop auth-to-local rules should be managed by Ambari (",(0,r.kt)("inlineCode",{parentName:"p"},"true"),") or managed\nmanually by the user (",(0,r.kt)("inlineCode",{parentName:"p"},"false"),")."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Possible Values:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("h5",{id:"install_packages"},"install_packages"),(0,r.kt)("p",null,"Indicates whether Ambari should install the Kerberos client packages (",(0,r.kt)("inlineCode",{parentName:"p"},"true"),") or not (",(0,r.kt)("inlineCode",{parentName:"p"},"false"),").\nIf not, it is expected that Kerberos utility programs installed by the user (such as kadmin, kinit,\nklist, and kdestroy) are compatible with MIT Kerberos 5 version 1.10.3 in command line options and\nbehaviors."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Possible Values:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("h5",{id:"ldap_url"},"ldap_url"),(0,r.kt)("p",null,"The URL to the Active Directory LDAP Interface. This value ",(0,r.kt)("strong",{parentName:"p"},"must")," indicate a secure channel using\nLDAPS since it is required for creating and updating passwords for Active Directory accounts."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:"),"  ",(0,r.kt)("inlineCode",{parentName:"p"},"ldaps://ad.example.com:636")),(0,r.kt)("p",null,"If the ",(0,r.kt)("inlineCode",{parentName:"p"},"kdc_type")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"active-directory"),", this property is mandatory."),(0,r.kt)("h5",{id:"container_dn"},"container_dn"),(0,r.kt)("p",null,"The distinguished name (DN) of the container used store the Ambari-managed user and service principals\nwithin the configured Active Directory"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:"),"  ",(0,r.kt)("inlineCode",{parentName:"p"},"OU=hadoop,DC=example,DC=com")),(0,r.kt)("p",null,"If the ",(0,r.kt)("inlineCode",{parentName:"p"},"kdc_type")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"active-directory"),", this property is mandatory."),(0,r.kt)("h5",{id:"encryption_types"},"encryption_types"),(0,r.kt)("p",null,"The supported (space-delimited) list of session key encryption types that should be returned by the KDC."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," aes des3-cbc-sha1 rc4 des-cbc-md5"),(0,r.kt)("h5",{id:"realm"},"realm"),(0,r.kt)("p",null,"The default realm to use when creating service principals"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"EXAMPLE.COM")),(0,r.kt)("p",null,"This value is expected to be in all uppercase characters."),(0,r.kt)("h5",{id:"kdc_hosts"},"kdc_hosts"),(0,r.kt)("p",null,"A comma-delimited list of IP addresses or FQDNs for the list of relevant KDC hosts. Optionally a\nport number may be included for each entry."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"kdc.example.com, kdc1.example.com")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"kdc.example.com:88, kdc1.example.com:88")),(0,r.kt)("h5",{id:"admin_server_host"},"admin_server_host"),(0,r.kt)("p",null,"The IP address or FQDN for the Kerberos administrative host. Optionally a port number may be included."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"kadmin.example.com")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"kadmin.example.com:88")),(0,r.kt)("p",null,"If the ",(0,r.kt)("inlineCode",{parentName:"p"},"kdc_type")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"mit-kdc")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"ipa"),", the value must be the FQDN of the Kerberos administrative host. "),(0,r.kt)("h5",{id:"master_kdc"},"master_kdc"),(0,r.kt)("p",null,"The IP address or FQDN of the master KDC host in a master-slave KDC deployment. Optionally a port\nnumber may be included."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"kadmin.example.com")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"kadmin.example.com:88")),(0,r.kt)("h5",{id:"executable_search_paths"},"executable_search_paths"),(0,r.kt)("p",null,"A comma-delimited list of search paths to use to find Kerberos utilities like kadmin and kinit."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"/usr/bin, /usr/kerberos/bin, /usr/sbin, /usr/lib/mit/bin, /usr/lib/mit/sbin")),(0,r.kt)("h5",{id:"password_length"},"password_length"),(0,r.kt)("p",null,"The length required length for generated passwords."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"20")),(0,r.kt)("h5",{id:"password_min_lowercase_letters"},"password_min_lowercase_letters"),(0,r.kt)("p",null,"The minimum number of lowercase letters (a-z) required in generated passwords"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"1")),(0,r.kt)("h5",{id:"password_min_uppercase_letters"},"password_min_uppercase_letters"),(0,r.kt)("p",null,"The minimum number of uppercase letters (A-Z) required in generated passwords"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"1")),(0,r.kt)("h5",{id:"password_min_digits"},"password_min_digits"),(0,r.kt)("p",null,"The minimum number of digits (0-9) required in generated passwords"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"1")),(0,r.kt)("h5",{id:"password_min_punctuation"},"password_min_punctuation"),(0,r.kt)("p",null,"The minimum number of punctuation characters (?.!$%^*()-_+=~) required in generated passwords"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"1")),(0,r.kt)("h5",{id:"password_min_whitespace"},"password_min_whitespace"),(0,r.kt)("p",null,"The minimum number of whitespace characters required in generated passwords"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"0")),(0,r.kt)("h5",{id:"service_check_principal_name"},"service_check_principal_name"),(0,r.kt)("p",null,"The principal name to use when executing the Kerberos service check"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"${cluster_name}-${short_date}")),(0,r.kt)("h5",{id:"case_insensitive_username_rules"},"case_insensitive_username_rules"),(0,r.kt)("p",null,"Force principal names to resolve to lowercase local usernames in auth-to-local rules"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Possible values:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("h5",{id:"ad_create_attributes_template"},"ad_create_attributes_template"),(0,r.kt)("p",null,"A Velocity template to use to generate a JSON-formatted document containing the set of attribute\nnames and values needed to create a new Kerberos identity in the relevant Active Directory."),(0,r.kt)("p",null,"Variables include: "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"principal_name")," - the components (primary and instance) portion of the principal"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"principal_primary")," - the ",(0,r.kt)("em",{parentName:"li"},"primary component")," of the principal name"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"principal_instance")," - the ",(0,r.kt)("em",{parentName:"li"},"instance component")," of the principal name"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"realm")," - the ",(0,r.kt)("inlineCode",{parentName:"li"},"realm")," portion of the principal"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"realm_lowercase")," - the lowercase form of the ",(0,r.kt)("inlineCode",{parentName:"li"},"realm")," of the principal"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"normalized_principal")," - the full principal value, including the component and realms parts"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"principal_digest")," - a binhexed-encoded SHA1 digest of the normalized principal"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"principal_digest_256")," - a binhexed-encoded SHA256 digest of the normalized principal"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"principal_digest_512")," - a binhexed-encoded SHA512 digest of the normalized principal"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"password")," - the generated password"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"is_service")," - ",(0,r.kt)("inlineCode",{parentName:"li"},"true")," if the principal is a ",(0,r.kt)("em",{parentName:"li"},"service")," principal, ",(0,r.kt)("inlineCode",{parentName:"li"},"false")," if the principal is a ",(0,r.kt)("em",{parentName:"li"},"user")," principal"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"container_dn")," - the ",(0,r.kt)("inlineCode",{parentName:"li"},"kerberos-env/container_dn")," property value ")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Note"),": A principal is made up of the following parts:  primary component, instances component\n(optional), and realm:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"User principal: ",(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("em",{parentName:"strong"},(0,r.kt)("inlineCode",{parentName:"em"},"primary_component"))),"@",(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("em",{parentName:"strong"},(0,r.kt)("inlineCode",{parentName:"em"},"realm")))),(0,r.kt)("li",{parentName:"ul"},"Service principal: ",(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("em",{parentName:"strong"},(0,r.kt)("inlineCode",{parentName:"em"},"primary_component"))),"/",(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("em",{parentName:"strong"},(0,r.kt)("inlineCode",{parentName:"em"},"instance_component"))),"@",(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("em",{parentName:"strong"},(0,r.kt)("inlineCode",{parentName:"em"},"realm"))))),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'{\n"objectClass": ["top", "person", "organizationalPerson", "user"],\n"cn": "$principal_name",\n#if( $is_service )\n"servicePrincipalName": "$principal_name",\n#end\n"userPrincipalName": "$normalized_principal",\n"unicodePwd": "$password",\n"accountExpires": "0",\n"userAccountControl": "66048"\n}\n')),(0,r.kt)("p",null,"This property is mandatory and only used if the ",(0,r.kt)("inlineCode",{parentName:"p"},"kdc_type")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"active-directory")),(0,r.kt)("h5",{id:"kdc_create_attributes"},"kdc_create_attributes"),(0,r.kt)("p",null,"The set of attributes to use when creating a new Kerberos identity in the relevant (MIT) KDC."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"-requires_preauth max_renew_life=7d")),(0,r.kt)("p",null,"This property is optional and only used if the ",(0,r.kt)("inlineCode",{parentName:"p"},"kdc_type")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"mit-kdc")),(0,r.kt)("h5",{id:"ipa_user_group"},"ipa_user_group"),(0,r.kt)("p",null,"The group in IPA that user principals should be a member of."),(0,r.kt)("p",null,"This property is optional and only used if the ",(0,r.kt)("inlineCode",{parentName:"p"},"kdc_type")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"ipa")),(0,r.kt)("a",{name:"krb5-conf"}),(0,r.kt)("h4",{id:"krb5-conf"},"krb5-conf"),(0,r.kt)("h5",{id:"manage_krb5_conf"},"manage_krb5_conf"),(0,r.kt)("p",null,"Indicates whether the krb5.conf file should be managed (created, updated, etc...) by Ambari (",(0,r.kt)("inlineCode",{parentName:"p"},"true"),")\nor managed manually by the user (",(0,r.kt)("inlineCode",{parentName:"p"},"false"),")."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Possible values:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")," ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("h5",{id:"domains"},"domains"),(0,r.kt)("p",null,"A comma-separated list of domain names used to map server host names to the realm name."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Example:")," host.example.com, example.com, .example.com"),(0,r.kt)("p",null,"This property is optional"),(0,r.kt)("h5",{id:"conf_dir"},"conf_dir"),(0,r.kt)("p",null,"The krb5.conf configuration directory\nDefault value: /etc"),(0,r.kt)("h5",{id:"content"},"content"),(0,r.kt)("p",null,"Customizable krb5.conf template (Jinja template engine)"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Default value:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[libdefaults]\n  renew_lifetime = 7d\n  forwardable = true\n  default_realm = {{realm}}\n  ticket_lifetime = 24h\n  dns_lookup_realm = false\n  dns_lookup_kdc = false\n  default_ccache_name = /tmp/krb5cc_%{uid}\n  #default_tgs_enctypes = {{encryption_types}}\n  #default_tkt_enctypes = {{encryption_types}}\n{% if domains %}\n[domain_realm]\n{%- for domain in domains.split(',') %}\n  {{domain|trim()}} = {{realm}}\n{%- endfor %}\n{% endif %}\n[logging]\n  default = FILE:/var/log/krb5kdc.log\n  admin_server = FILE:/var/log/kadmind.log\n  kdc = FILE:/var/log/krb5kdc.log\n\n[realms]\n  {{realm}} = {\n{%- if master_kdc %}\n    master_kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{%- if kdc_hosts > 0 -%}\n{%- set kdc_host_list = kdc_hosts.split(',')  -%}\n{%- if kdc_host_list and kdc_host_list|length > 0 %}\n    admin_server = {{admin_server_host|default(kdc_host_list[0]|trim(), True)}}\n{%- if kdc_host_list -%}\n{%- if master_kdc and (master_kdc not in kdc_host_list) %}\n    kdc = {{master_kdc|trim()}}\n{%- endif -%}\n{% for kdc_host in kdc_host_list %}\n    kdc = {{kdc_host|trim()}}\n{%- endfor -%}\n{% endif %}\n{%- endif %}\n{%- endif %}\n  }\n\n{# Append additional realm declarations below #}\n")))}d.isMDXComponent=!0}}]);