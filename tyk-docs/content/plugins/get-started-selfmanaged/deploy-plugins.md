---
date: 2017-03-24T15:45:13Z
title: CICD - Automating Your Plugin Builds
description: "This page explain how you can easily automate your plugin builds and add them to your CICD pipeline"
tags: ["CICD", "Tyk CICD", "Automation", "Plugin automation", "CICD Plugins", "Automate build", "CICD Pipeline"]
menu:
  main:
    parent: "Get Started with Custom Plugins"
weight: 10
---

It's very important to automate the deployment of your infrastructure.  

Ideally, you store your configurations and code in version control, and then through a trigger, have the ability to deploy everything automatically into higher environments.

With custom plugins, this is no different.

To illustrate this, we can look at the GitHub Actions of the [example repo][0].

We see that upon every pull request, a section of steps are taken to "Build, [Bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}), Release Go Plugin".

Let's break down the [workflow file][1]:


## 1. Compiling the Plugin

We can see the first few steps replicate our first task, bootstrapping the environment and compiling the plugin into a binary format.

```make
 steps:
    - uses: actions/checkout@v3
      
    - name: Copy Env Files
      run: cp tyk/confs/tyk_analytics.env.example tyk/confs/tyk_analytics.env

    - name: Build Go Plugin
      run: make go-build
```

We can look at the [Makefile][2] to further break down the last `go-build` command.

## 2. Bundle The Plugin

The next step of the workflow is to "[bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}})" the plugin.

```
- name: Bundle Go Plugin
      run: docker-compose run --rm --user=1000 --entrypoint "bundle/bundle-entrypoint.sh" tyk-gateway
```

This command generates a "bundle" from the sample Go plugin in the repo.

{{< note success >}}
**Note**  

For added security, please consider signing your [bundles]({{< ref "plugins/how-to-serve-plugins.md" >}}), especially if the connection between the Gateways and the Bundler server traverses the internet.

{{< /note >}}


Custom plugins can be "bundled", (zipped/compressed) into a standard format, and then uploaded to some server so that they can be downloaded by the Gateways in real time.

This process allows us to decouple the building of our custom plugins from the runtime of the Gateways.

In other words, Gateways can be scaled up and down, and pointed at different plugin repos very easily.  This makes it easier to deploy Custom plugins especially in containerized environments such as Kubernetes, where we don't have to worry about persistent volumes.

You can read more about plugin bundles [here][3].

## 3. Deploy The Plugin

Next step of the workflow is to publish our bundle to a server that's reachable by the Gateways.

```make
- name: Upload Bundle
      uses: actions/upload-artifact@v3
      with:
        name: customgoplugin.zip
        path: tyk/bundle/bundle.zip

    - uses: jakejarvis/s3-sync-action@master
      with:
        args: --acl public-read --follow-symlinks
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-east-1'   
        SOURCE_DIR: 'tyk/bundle'
```

This step uploads the Bundle to both GitHub and an AWS S3 bucket.  Obviously, your workflow will look slightly different here.

{{< note success >}}
**Note**  

For seamless deployments, take a look at multi-version [plugin support]({{< ref "plugins/supported-languages/golang.mdd#upgrading-your-tyk-gateway" >}}) to enable zero downtime deployments of your Tyk Gateway installs

{{< /note >}}

### 4. Configure the Gateway

In order to instruct the Gateway to download the bundle, we need two things:

1. The root server - The server which all bundles will be downloaded from.  This is set globally in the Tyk conf file [here]({{< ref "tyk-oss-gateway/configuration#enable_bundle_downloader" >}}).

2. The name of the bundle - this is generated during your workflow usually.  This is defined at the API level (this is where you declare Custom plugins, as evident in task 2)

The field of the API Definition that needs to be set is `custom_middleware_bundle`.

## Summary

That's it!  

We've set up our dev environment, built, compiled, a Custom Go plugin, loaded onto a Tyk Gateway, and tested it by sending an API request.  Finally, we've talked about deploying a Bundle in a production grade set up.

Have a look at our [examples repo][4] for more inspiration.

[0]: https://github.com/TykTechnologies/custom-go-plugin/actions
[1]: https://github.com/TykTechnologies/custom-go-plugin/blob/master/.github/workflows/makefile.yml
[2]: https://github.com/TykTechnologies/custom-go-plugin/blob/master/Makefile#L59
[3]: https://github.com/TykTechnologies/custom-go-plugin#deploying-the-go-plugin
[4]: https://github.com/TykTechnologies/custom-plugin-examples