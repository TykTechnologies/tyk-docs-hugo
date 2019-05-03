#### File handles

One thing that happens to systems that are under heavy strain is the likelihood of running out of file descriptors, so we need to make sure that this is set up properly.

Set the global file limits like this:

In the file `/etc/sysctl.conf` add:

`fs.file-max=80000`

For the file: `/etc/security/limits.conf`, add:

```{.copyWrapper}
*          soft     nproc          80000
*          hard     nproc          80000
*          soft     nofile         80000
*          hard     nofile         80000
root       soft     nproc          80000
root       hard     nproc          80000
root       soft     nofile         80000
root       hard     nofile         80000
```

The above is a catch-all! On some systems and init systems the wildcard limit doesn't always work.

If you are using `systemd` and you see the message `http: proxy error: dial tcp xxx.xxx.xxx.xxx:9086: socket: too many open files` in the log, try adding `LimitNOFILE=80000` to the `/usr/lib/systemd/system/tyk-gateway.service` file.

**Ubuntu and Upstart**

If you are using Upstart, then you'll need to set the file handle limits in the init script (`/etc/init/tyk-gateway.conf`):

`limit nofile 50000 80000`