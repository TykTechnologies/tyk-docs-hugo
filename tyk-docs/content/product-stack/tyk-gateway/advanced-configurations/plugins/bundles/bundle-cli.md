---
date: 2024-08-20T13:32:12Z
title: Bundler CLI Tool
description: "Explains usage of the bundler CLI tool"
tags: ["Bundle CLI Tool"]
---

The bundler tool is a CLI service, provided by _Tyk Gateway_ as part of its binary since v2.8. This lets you generate
[plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}).

{{< note >}}
**Note**  
Generated plugin bundles must be served using your own web server.
{{< /note >}}

Issue the following command to see more details on the `bundle` command:

```bash
/opt/tyk-gateway/bin/tyk bundle -h
```

---

## Prerequisites

To create plugin bundles you will need the following:

- **Manifest.json**: The [manifest.json]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#manifest" >}}) file
  contains the paths to the plugin source files and the name of the function implementing each plugin. The
  _manifest.json_ file is mandatory and must exist on the Tyk Gateway file system. By default the bundle CLI looks for
  a file named _manifest.json_ in the current working directory where the bundle command is run from. The exact location
  can be specified using the `--manifest` command option.
- **Plugin source code files**: The plugin source code files should be contained relative to the directory in which the
  _manifest.json_ file is located. The _manifest.json_ should contain relative path references to source code files.

  {{< note >}}
  **Note**  
  Source code files are not required when creating a plugin bundle for gRPC plugins since the plugin
  source code is located at the gRPC server.
  {{< /note >}}

- **Certificate key**: Plugin bundles can optionally be signed with an RSA private key. The corresponding public key
  should be located in the file configured in environmental variable `TYK_GW_PUBLICKEYPATH` or the `public_key_path`
  parameter in `tyk.conf`:

```json
{
  "enable_bundle_downloader": true,
  "bundle_base_url": "http://my-bundle-server.com/bundles/",
  "public_key_path": "/path/to/my/pubkey.pem"
}
```

---

## Directory Structure

A suggested directory structure is shown below for Golang, Javascript and Python bundles in the tabs below.

In this case, the `manifest.json` will reference the Python files located in the plugins subdirectory, ensuring the
Python plugin source files are organized relative to the manifest. The Tyk Gateway will load and execute these Python
plugins based on the paths defined in the `manifest.json` file.

{{< tabs_start >}} {{< tab_start "Golang" >}}

```bash
/bundle-directory
├── manifest.json               # Manifest file with plugin references
└── /plugins                    # Subdirectory containing compiled plugin
    └── plugin.so               # Compiled Golang plugin
```

{{< tab_end >}} {{< tab_start "Javascript" >}}

```bash
/bundle-directory
├── manifest.json               # Manifest file with plugin references
└── /plugins                    # Subdirectory containing source files
    ├── plugin1.js              # First JavaScript plugin source file
    └── plugin2.js              # Second JavaScript plugin source file
```

{{< tab_end >}}

{{< tab_start "Python" >}}

```bash
/bundle-directory
├── manifest.json               # Manifest file with plugin references
└── /plugins                    # Subdirectory containing source files
    ├── plugin1.py              # First Python plugin source file
    └── plugin2.py              # Second Python plugin source file
```

{{< tab_end >}}

{{< tabs_end >}}

---

## Creating a plugin bundle

Run the following command to create the bundle:

```bash
$ tyk bundle build
```

The resulting file will contain all your specified files and a modified `manifest.json` with the checksum and signature
(if required) applied, in ZIP format.

By default, Tyk will attempt to sign plugin bundles for improved security. If no private key is specified, the program
will prompt for a confirmation. Use `-y` to override this (see options below).

---

## Command Options

Instructions on how to create plugin bundles is displayed by issuing the following command:

```bash
/opt/tyk-gateway/bin/tyk bundle build -h
```

The following options are supported:

- `--manifest`: Specifies the path to the manifest file. This defaults to `manifest.json` within the current working
  directory.
- `--output`: Specifies the name of the bundle file e.g. `--output bundle-latest.zip`. If this flag is not specified,
  `bundle.zip` will be used.
- `-y`: Force tool to create unsigned bundle without prompting e.g. `$ tyk bundle build --output bundle-latest.zip -y`.
- `--key`: Specifies the path to your private key which is used to generate signed bundle e.g.
  `$ tyk bundle build --output bundle-latest.zip --key=mykey.pem`.

---

## Docker Example

Since v5.5 Tyk Gateway uses distroless docker images.

For Gateway version < v5.5 it is possible to use Docker to create plugin bundles as shown in the example below.

```bash
docker run --rm -it \
  --name bundler \
  -v `pwd`:/plugin-source \
  -v `pwd`/../../../confs/keys:/keys \
  -w /plugin-source \
  --entrypoint /bin/bash \
  tykio/tyk-gateway:v5.4.0 \
  -c 'export PATH="/opt/tyk-gateway:$$PATH"; tyk bundle build -o bundle.zip -k /keys/key.pem'
```

This Docker command runs a container using the `tykio/tyk-gateway:v5.4.0` image to build a Tyk plugin bundle. It mounts
the current directory from the host as `/plugin-source` and a directory containing keys as `/keys` inside the container.
The working directory within the container is set to `/plugin-source`, and the default entrypoint is overridden to use
`/bin/bash`. The command executed in the container exports a modified `PATH` to include the Tyk Gateway binaries, then
runs `tyk bundle build` to generate a plugin bundle named `bundle.zip`, using the specified key for authentication. The
container is automatically removed after the command completes, and the operation is conducted interactively.
