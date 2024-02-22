# Feature Flags

* Sometimes, we want to have the ability for the end users to experiment with a new feature, but not expose it as a general feature since it has not gone through rigorous testing and use of the feature could result in problems. In other cases, we want to provide an escape hatch for certain edge-case scenarios that we may not want to expose in general because using the escape hatch is potentially dangerous and should only be reserved special occasions. For these purposes, Ambari has a notion of **feature flags**.

* Feature flags can be created as an attribute of App.supports map under [https://github.com/apache/ambari/blob/trunk/ambari-web/app/config.js](https://github.com/apache/ambari/blob/trunk/ambari-web/app/config.js)
* Those boolean flags are exposed in the Ambari Web UI via `<ambari-server-protocol>://<ambari-server-host>:<ambari-server-port>/#/experimental`
    * The end user can go to the above URL to turn certain experimental features on.

        ![](./imgs/experimental-features%20.png)

* In Ambari Web code, we should toggle experimental features on/off via the App.supports object.

* You will see sample usage if you recursively grep for "App.supports" under the ambari-web project.
