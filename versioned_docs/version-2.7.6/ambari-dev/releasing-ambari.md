# Releasing Ambari

## Useful Links

### [Publishing Maven Artifacts](http://apache.org/dev/publishing-maven-artifacts.html)

* Setting up release signing keys
* Uploading artifacts to staging and release repositories

### [Apache Release Guidelines](http://www.apache.org/legal/release-policy.html)

* Release requirements
* Process for staging

## Preparing for release

Setup for first time release managers

If you are being a release manager for the first time, you will need to run the following additional steps so that you are not blocked during the actual release process.

**Configure SSH/SFTP to home.apache.org**

SFTP to home.apache.org supports only Key-Based SSH Logins

```bash
# Generate RSA Keys
 mkdir ~/.ssh
 chmod 700 ~/.ssh
 ssh-keygen -t rsa -b 4096

# Note: This will create ~/.ssh/id_rsa and ~/.ssh/id_rsa.pub files will be generated

# Upload Public RSA Key
Login at http://id.apache.org
Add Public SSH Key to your profile from ~/.ssh/id_rsa.pub
SSH Key (authorized_keys line):
Submit changes

# Verify SSH to minotaur.apache.org works
ssh -i ~/.ssh/id_rsa {username}@minotaur.apache.org

# SFTP to home.apache.org
sftp {username}@home.apache.org
mkdir public_html
cd public_html
put test #This test file is a sample empty file present in current working directory from which you sftp.

Verify URL http://home.apache.org/{username}/test
```

**Generate OpenGPG Key**

You should get a signing key, keep it in a safe place, upload the public key to apache, and build a web of trust.

Ref: http://zacharyvoase.com/2009/08/20/openpgp/

```bash
gpg2 --gen-key
gpg2 --keyserver pgp.mit.edu --send-key {key}
gpg2 --armor --export {username}@apache.org > {username}.asc
Copy over {username}.asc to {username}@home.apache.org:public_html/~{username}.asc
Verify URL http://home.apache.org/~{username}/{username}.asc
Query PGP KeyServer http://pgp.mit.edu:11371/pks/lookup?search=0x{key}&op=vindex
  
Web of Trust:
Request others to sign your PGP key.
 
Login at http://id.apache.org
Add OpenPGP Fingerprint to your profile
OpenPGP Public Key Primary Fingerprint: XXXX YYYY ZZZZ ....
Submit changes
Verify that the public PGP key is exported to http://home.apache.org/keys/committer/{username}.asc
```

**Email dev@ambari.apache.org mailing list notifying that you will be creating the release branch at least one week in advance**

```
Subject: Preparing Ambari X.Y.Z branch

Hi developers and PMCs,

I am proposing cutting a new branch branch-X.Y for Ambari X.Y.Z on __________  as per the outlined tasks in the Ambari Feature + Roadmap page (https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=30755705).

After making the branch, we (i.e., development community) should only accept blocker or critical bug fixes into the branch and harden it until it meets a high enough quality bar.

If you have a bug fix, it should first be committed to trunk, and after ensuring that it does not break any tests (including smoke tests), then it should be integrated to the Ambari branch-X.Y
If you have any doubts whether a fix should be committed into branch-X.Y, please email me for input at ____________
Stay tuned for updates on the release process.

Thanks
```

**Create the release branch**

Create a branch for a release using branch-X.Y (ex: branch-2.1) as the name of the branch.

Note: Going forward, we should be creating branch-{majorVersion}.{minorVersion), so that the same branch can be used for maintenance releases.

**Checkout the release branch**

```bash
git checkout branch-X.Y
```

**Update Ambari REST API docs**

Starting with Ambari's `<span>trunk</span>` branch as of Ambari 2.8, the release manager should generate documentation from existing source code. The documentation should be checked back into the branch before performing the release.

```bash
# Generate the following artifacts:
# - Configuration markdown at docs/configuration/index.md
# - swagger.json and index.html at docs/api/generated/
cd ambari-server/
mvn clean compile exec:java@configuration-markdown test -Drat.skip -Dcheckstyle.skip -DskipTests -Dgenerate.swagger.resources

# Review and Commit the changes to branch-X.Y
git commit
```

**Update release version**

Once the branch has been created, the release version must be set and committed. The changes should be committed to the release branch.

**Ambari 2.8+**

Starting with Ambari 2.8, the build process relies on [Maven 3.5+ which allows the](https://maven.apache.org/maven-ci-friendly.html) [use of the `${revision}` tag](https://maven.apache.org/maven-ci-friendly.html). This means that the release version can be defined once in the root `pom.xml` and then inherited by all submodules. In order to build Ambari with a specific build number, there are two methods:

```bash
mvn -Drevision=2.8.0.0.0 ...
Editing the root pom.xml to include the new build number
<revision>2.8.0.0-SNAPSHOT</revision>
```

To be consistent with prior releases, the `pom.xml` should be updated in order to contain the new version.

**Steps followed for 2.8.0 release as a reference**

```bash
# Update the revision property to the release version
mvn versions:set-property -Dproperty=revision -DnewVersion=2.8.0.0.0

# Remove .versionsBackup files
git clean -f -x

# Review and commit the changes to branch-X.Y
git commit
```
:::danger
Ambari 2.7 and Earlier Releases (Deprecated)
:::

Older Ambari branches still required that you update every `pom.xml` manually through the below process:

**Steps followed for 2.2.0 release as a reference**

```bash
# Update the release version
mvn versions:set -DnewVersion=2.2.0.0.0
pushd ambari-metrics
mvn versions:set -DnewVersion=2.2.0.0.0
popd
pushd contrib/ambari-log4j
mvn versions:set -DnewVersion=2.2.0.0.0
popd
pushd contrib/ambari-scom
mvn versions:set -DnewVersion=2.2.0.0.0
popd
pushd docs
mvn versions:set -DnewVersion=2.2.0.0.0
popd

# Update the ambari.version properties in all pom.xml
$ find . -name "pom.xml" | xargs grep "ambari\.version"

./contrib/ambari-scom/ambari-scom-server/pom.xml:        2.1.0-SNAPSHOT
./contrib/ambari-scom/ambari-scom-server/pom.xml:            ${ambari.version}
./contrib/views/hive/pom.xml:    2.1.0.0.0
./contrib/views/jobs/pom.xml:        ${ambari.version}
./contrib/views/pig/pom.xml:    2.1.0.0.0
./contrib/views/pom.xml:    2.1.0.0.0
./contrib/views/storm/pom.xml:      ${ambari.version}
./contrib/views/tez/pom.xml:      ${ambari.version}
./docs/pom.xml:        2.1.0
./docs/pom.xml:        ${project.artifactId}-${ambari.version}

# Update any 2.1.0-SNAPSHOT references in pom.xml
$ grep -r --include "pom.xml" "2.1.0-SNAPSHOT" .

# Remove .versionsBackup files
git clean -f -x -d

# Review and commit the changes to branch-X.Y
git commit
```

**Update KEYS**

If this is the first time you have taken release management responsibilities, make sure to update the KEYS file and commit the updated KEYS in both the ambari trunk branch and the release branch. Also in addition to updating the KEYS file in the tree, you also need to p ush the KEYS file to [https://dist.apache.org/repos/dist/release/ambari/](https://dist.apache.org/repos/dist/release/ambari/)

```bash
gpg2 --list-keys jluniya@apache.org >> KEYS
gpg2 --armor --export jluniya@apache.org >> KEYS

# commit the changes to both trunk and new release branch
git commit

# push the updated KEYS file to https://dist.apache.org/repos/dist/release/ambari/.

# Only PMCs members can do this 'svn' step.

svn co https://dist.apache.org/repos/dist/release/ambari ambari_svn
cp {path_to_keys_file}/KEYS ambari_svn/KEYS
svn update KEYS
svn commit -m "Updating KEYS for Ambari"
```

**Setup Build**

Setup Jenkins Job for the new branch on http://builds.apache.org 

## Creating Release Candidate

```
Note: The first release candidate is rc0. The following documented process assumes rc0, but replace it with the appropriate rc number as required.

```

**Checkout the release branch**

```
git checkout branch-X.Y
```

**Create a Release Tag from the release branch**

```bash
git tag -a release-X.Y.Z-rc0 -m 'Ambari X.Y.Z RC0'
git push origin release-X.Y.Z-rc0
```

**Create a tarball**

```bash
# create a clean copy of the source
 cd ambari-git-X.Y.Z
 git clean -f -x -d
 cd ..

 cp -R ambari-git-X.Y.Z apache-ambari-X.Y.Z-src

 # create ambari-web/public by running the build instructions per https://cwiki.apache.org/confluence/display/AMBARI/Ambari+Development
 # once ambari-web/public is created, copy it as ambari-web/public-static
 cp -R ambari-git-X.Y.Z/ambari-web/public apache-ambari-X.Y.Z-src/ambari-web/public-static

 # make sure apache rat tool runs successfully
 cp -R apache-ambari-X.Y.Z-src apache-ambari-X.Y.Z-ratcheck
 cd apache-ambari-X.Y.Z-ratcheck
 mvn clean apache-rat:check
 cd ..

 # if rat check fails, file JIRAs and fix them before proceeding.

 # tar it up, but exclude git artifacts
 tar --exclude=.git --exclude=.gitignore --exclude=.gitattributes -zcvf apache-ambari-X.Y.Z-src.tar.gz apache-ambari-X.Y.Z-src
```

**Sign the tarball**

```bash
gpg2  --armor --output apache-ambari-X.Y.Z-src.tar.gz.asc --detach-sig apache-ambari-X.Y.Z-src.tar.gz
```

**Generate SHA512 checksums:**

```
sha512sum apache-ambari-X.Y.Z-src.tar.gz > apache-ambari-X.Y.Z-src.tar.gz.sha512
```

or

```
openssl sha512 apache-ambari-X.Y.Z-src.tar.gz > apache-ambari-X.Y.Z-src.tar.gz.sha512
```

**Upload the artifacts to your apache home:**

The artifacts then need to be copied over (SFTP) to

```
public_html/apache-ambari-X.Y.Z-rc0
```

## Voting on Release Candidate

**Call for a vote on the dev@ambari.apache.org mailing list with something like this:**

I have created an ambari-** release candidate.

GIT source tag (r***)

```
https://git-wip-us.apache.org/repos/asf/ambari/repo?p=ambari.git;a=log;h=refs/tags/release-x.y.z-rc0
```

Staging site: http://home.apache.org/user_name/apache-ambari-X.Y.Z-rc0

Vote will be open for 72 hours.

```
[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove (and reason why)
```

Once the vote passes/fails, send out an email with subject like "[RESULT] [VOTE] Apache Ambari x.y.z rc0" to dev@ambari.apache.org. For the vote to pass, 3 +1 votes are required. If the vote does not pass another release candidate will need to be created after addressing the feedback from the community.

## Publishing and Announcement

* Login to [https://id.apache.org](https://id.apache.org) and verify the fingerprint of PGP key used to sign above is provided. (gpg --fingerprint)
* Upload your PGP public key only to _/home/_

Publish the release as below:

```bash
svn co https://dist.apache.org/repos/dist/release/ambari ambari

# Note : Only PMCs members can do this 'svn' step.

cd ambari
mkdir ambari-X.Y.Z
scp ~/public_html/apache-ambari-X.Y.Z-rc0/* ambari-X.Y.Z
svn add ambari-X.Y.Z
svn rm ambari-A.B.C  # Remove the older release from the mirror.  Only the latest version should appear in dist.

svn commit -m "Committing Release X.Y.Z"
```

Create the release tag:

```bash
git tag -a release-X.Y.Z -m 'Ambari X.Y.Z'
git push origin release-X.Y.Z
```

Note that it takes 24 hours for the changes to propagate to the mirrors.

Wait 24 hours and verify that the bits are available in the mirrors before sending an announcement.

**Update Ambari Website and Wiki**

http://ambari.apache.org is checked in Git in `/ambari/docs/src/site` folder.

```bash
cd docs
mvn versions:set -DnewVersion=X.Y.Z

# Make necessary changes, typically to pom.xml, site.xml, index.apt, and whats-new.apt
mvn clean site
```

Examine the changes under _/ambari/docs/target_ folder.

Update the wiki to add pages for installation of the new version. _Usually you can copy the pages for the last release and make the URL changes to point to new repo/tarball location._

**Send out Announcement to dev@ambari.apache.org and user@ambari.apache.org.**

Subject: [ANNOUNCE] Apache Ambari X.Y.Z.

The Apache Ambari team is proud to announce Apache Ambari version X.Y.Z

Apache Ambari is a tool for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari consists of a set of RESTful APIs and a browser-based management console UI.

The release bits are at: http://www.apache.org/dyn/closer.cgi/ambari/ambari-X.Y.Z.

To use the released bits please use the following documentation:

https://cwiki.apache.org/confluence/display/AMBARI/Installation+Guide+for+Ambari+X.Y.Z

We would like to thank all the contributors that made the release possible.

Regards,

The Ambari Team

**Submit release data to Apache reporter database.**

This step can be done only by a project PMC. If release manager is not an Ambari PMC then please reach out to an existing Ambari PMC or contact Ambari PMC chair to complete this step.

- Login to https://reporter.apache.org/addrelease.html?ambari with apache credentials.
- Fill out the fields:
    - Committe: ambari
    - Full version name: 2.2.0
    - Date of release (YYYY-MM-DD):  2015-12-19
- Submit the data
- Verify that the submitted data is reflected at https://reporter.apache.org/?ambari

Performing this step keeps [https://reporter.apache.org/?ambari](https://reporter.apache.org/?ambari) site updated and people using the Apache Reporter Service will be able to see the latest release data for Ambari.

## Publish Ambari artifacts to Maven central

Please use the following [document](https://docs.google.com/document/d/1RjWQOaTUne6t8DPJorPhOMWAfOb6Xou6sAdHk96CHDw/edit) to publish Ambari artifacts to Maven central.  
