# Verifying Release Candidate

[Apache Release Process](http://www.apache.org/dev/release-publishing)

The steps are based on what is needed on a fresh centos6 VM created based on [Quick Start Guide](../quick-start/quick-start-guide.md)

## Verify hashes and signature

```bash
mkdir -p /usr/work/ambari
pushd /usr/work/ambari
```

_Download the src tarball, asc signature, and md5/sha1 hashes._

Verify the hashes

```
openssl md5 apache-ambari-2.4.1-src.tar.gz | diff apache-ambari-2.4.1-src.tar.gz.md5 -
openssl sha1 apache-ambari-2.4.1-src.tar.gz | diff apache-ambari-2.4.1-src.tar.gz.sha1 -
```

Verify the signature

```bash
gpg --keyserver pgpkeys.mit.edu --recv-key <key ID>
gpg apache-ambari-2.4.1-src.tar.gz.asc
```

## Compiling the code

If you are verifying the release on a clean machine (e.g. freshly installed VM) then you need to run several preparatory step.

### Install mvn

```bash
mkdir /usr/local/apache-maven
cd /usr/local/apache-maven
wget http://mirror.olnevhost.net/pub/apache/maven/binaries/apache-maven-3.2.1-bin.tar.gz
tar -xvf apache-maven-3.2.1-bin.tar.gz
export M2_HOME=/usr/local/apache-maven/apache-maven-3.2.1
export M2=$M2_HOME/bin
export PATH=$M2:$PATH
```

### Install java

```bash
mkdir /usr/jdk
cd /usr/jdk
cp "FROM SOURCE"/jdk-7u67-linux-x64.tar.gz . (or download the latest)
tar -xvf jdk-7u67-linux-x64.tar.gz
export PATH=$PATH:/usr/jdk/jdk1.7.0_67/bin
export JAVA_HOME=/usr/jdk/jdk1.7.0_67
export _JAVA_OPTIONS="-Xmx2048m -XX:MaxPermSize=1024m -Djava.awt.headless=true"
```

### Install packages

```bash
yum install -y git
curl --silent --location https://rpm.nodesource.com/setup | bash -
yum install -y nodejs
yum install -y gcc-c++ make
npm install -g brunch@1.7.20
yum install -y libfreetype.so.6
yum install -y freetype
yum install -y fontconfig
yum install -y python-devel
yum install -y rpm-build
```

### Install python tools

```bash
wget http://pypi.python.org/packages/2.6/s/setuptools/setuptools-0.6c11-py2.6.egg --no-check-certificate

sh setuptools-0.6c11-py2.6.egg
```

### Additional steps

These steps may not be needed in every environment. You can either perform these steps before build or after, and if, you encounter specific errors.

_Install pom files needed by ambari-metrics-kafka-sink_


```bash
mkdir /tmp/pom-files
pushd /tmp/pom-files
cp "FROM SOURCE"/jms-1.1.pom .
cp "FROM SOURCE"/jmxri-1.2.1.pom .
cp "FROM SOURCE"/jmxtools-1.2.1.pom .
mvn install:install-file -Dfile=jmxri-1.2.1.pom -DgroupId=com.sun.jmx -DartifactId=jmxri -Dversion=1.2.1 -Dpackaging=jar
mvn install:install-file -Dfile=jms-1.1.pom -DgroupId=javax.jms -DartifactId=jms -Dversion=1.1 -Dpackaging=jar
mvn install:install-file -Dfile=jmxtools-1.2.1.pom -DgroupId=com.sun.jdmk -DartifactId=jmxtools -Dversion=1.2.1 -Dpackaging=jar
popd
```

### Compile the code

```bash
pushd /usr/work/ambari
tar -xvf apache-ambari-2.4.1-src.tar.gz
cd apache-ambari-2.4.1-src
mvn clean install -DskipTests
```