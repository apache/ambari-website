---
title: Compiling Components for Ambari Bigtop Stack
---

# Compiling Components for Ambari Bigtop Stack

## Introduction

Apache Bigtop is designed for infrastructure engineers and data scientists seeking comprehensive packaging, testing, and configuration of leading open-source big data components. Bigtop supports a wide range of components/projects, including but not limited to Hadoop, HBase, and Spark. This guide specifically focuses on how to compile components for the **Ambari Bigtop Stack**.

## Use Cases for Apache Bigtop

1. **Simplified Package Building**: Bigtop significantly simplifies the process of compiling RPM or DEB packages for big data components across different operating systems through pre-configured Docker images, making it quick and efficient.

2. **Dependency Management**: Bigtop integrates complex dependencies required during the compilation process, effectively resolving common compilation errors and ensuring a smooth compilation experience through patches in the code. This means users no longer need to worry about official packages failing to compile or setting up complex compilation environments.

3. **Apache Ambari Support**: Bigtop provides support for Apache Ambari, allowing users to easily package big data software that is compatible with Ambari and meets installation requirements.

## Getting Started with Bigtop

This guide uses the official Bigtop 3.3.0 as an example, with CentOS 7 as the compilation operating system. The same operations apply to other systems and versions.

### Prerequisites

- Linux environment
- Docker installed on your system
- Git

### Step-by-Step Guide

#### 1. Create a Development Directory

```bash
mkdir ~/dev/
```

#### 2. Clone Bigtop Repository

```bash
cd ~/dev/
git clone https://github.com/apache/bigtop.git
```

#### 3. Switch to Version 3.3.0

```bash
cd bigtop
git checkout release-3.3.0
```

#### 4. Pull the Bigtop CentOS 7 Compilation Environment Image

```bash
# If you need to compile for other operating systems or architectures (e.g., ARM),
# you can search for the corresponding Bigtop version in the image repository
# https://hub.docker.com/r/bigtop/slaves/tags
docker pull bigtop/slaves:3.3.0-centos-7
```

#### 5. Launch the Container

**Scenario 1**: If you've previously compiled big data components locally and have a Maven repository cache, it's best to map this directory to the container's default Maven download directory to avoid downloading packages again.

For example, if your local Maven repository directory is `/data/repository`:

```bash
cd ~/dev/bigtop
docker run -d -it --network host -v `pwd`:/ws -v /data/repository:/root/.m2/repository --workdir /ws --name bigtopr bigtop/slaves:3.3.0-centos-7
```

**Scenario 2**: If you don't have a Maven cache locally or are unfamiliar with this, you should still map a directory to the Bigtop container to facilitate repeated compilations using downloaded Maven cache. Otherwise, when the container is deleted, your Maven cache will be lost, and dependency downloading is the most time-consuming stage of recompilation.

```bash
mkdir -p ~/m2/repository
cd ~/dev/bigtop
docker run -d -it --network host -v `pwd`:/ws -v ~/m2/repository:/root/.m2/repository --workdir /ws --name bigtopr bigtop/slaves:3.3.0-centos-7
```

#### 6. Modify Maven Repository Settings (Optional)

You can configure Maven to use mirrors that are faster for your location. This step is optional but can significantly improve download speeds.

1. Enter the container:
```bash
docker exec -it bigtopr /bin/bash
```

2. Edit the Maven settings file:
```bash
vi /usr/local/maven/conf/settings.xml
```

3. Add appropriate mirror repositories based on your location. For example:

```xml
<mirrors>
  <mirror>
    <id>central-mirror</id>
    <mirrorOf>central</mirrorOf>
    <name>Central Repository Mirror</name>
    <url>https://repo1.maven.org/maven2/</url>
  </mirror>
  <!-- Add other mirrors as needed -->
</mirrors>
```

#### 7. Compile Big Data Components

Enter your running container:

```bash
docker exec -it bigtopr /bin/bash
```

Compile components:

```bash
. /etc/profile.d/bigtop.sh
./gradlew flink-clean flink-pkg -PparentDir=/usr/bigtop -PpkgSuffix -PbuildThreads=2C repo
```

**Explanation of compilation parameters**:

- `-PparentDir=/usr/bigtop`: Changes the default installation path of the package, making Bigtop-built packages conform to Ambari installation specifications.
- `-PpkgSuffix`: Makes the output package include the Bigtop version number (e.g., hadoop_3_3_0), conforming to Ambari Bigtop service specifications.
- `-PbuildThreads=2C`: Sets the number of threads for compilation (2 times the number of CPU cores).

## Parallel Compilation for Improved Performance

A pull request for parallel compilation to speed up the build process has been submitted to the community and is currently under review. Once merged, all Java components in Bigtop will be able to compile in parallel, expected to be available in versions after Bigtop 3.3.1.

Performance comparison for parallel compilation (after all dependencies are downloaded):

| Component  | Time Before | Time After |
|------------|-------------|------------|
| Alluxio    | 21min       | 07:43min   |
| Hive       | 05:33min    | 03:04min   |
| HBase      | 06:18min    | 02:55min   |
| Zookeeper  | 01:25min    | 35s        |
| Livy       | 03:29min    | 03:12min   |
| Phoenix    | 11:23min    | 05:32min   |
| Zeppelin   | 14:15min    | 13:19min   |
| Flink      | 36:27min    | 14:16min   |
| Hadoop     | 50min       | 16min      |

Example of parallel compilation command:

```bash
docker run -d -it --network host -v `pwd`:/ws -v /data/repository:/data/repository --workdir /ws --name bigtop bigtop/slaves:trunk-centos-7 --cpus 16
source /etc/profile.d/bigtop.sh
./gradlew alluxio-clean alluxio-pkg -PcompileThreads=2C
```

This approach shows a 2-3x improvement in compilation speed, with even more significant effects during initial compilation (e.g., Hadoop initial compilation time reduced from 3 hours to 1 hour).
