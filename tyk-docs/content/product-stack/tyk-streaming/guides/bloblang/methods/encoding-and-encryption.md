
---
title: Encoding and Encryption Methods
description: Explains Bloblang encoding and encryption methods
tags: [ "Tyk Streams", "Bloblang", "Encoding", "Encryption", "Methods" ]
---

This page provides a detailed guide to the encoding and encryption methods available in Bloblang, the data transformation language used within Tyk Streams. These methods enable you to securely encode, decode, encrypt and decrypt your data, leveraging a variety of algorithms and schemes. Each method includes specific parameters and examples.

## compress

Compresses a string or byte array value according to a specified algorithm.

#### Parameters

**algorithm** &lt;string&gt; One of `flate`, `gzip`, `pgzip`, `lz4`, `snappy`, `zlib`, `zstd`.  
**level** &lt;integer, default `-1`&gt; The level of compression to use. May not be applicable to all algorithms.  

#### Examples


```coffee
let long_content = range(0, 1000).map_each(content()).join(" ")
root.a_len = $long_content.length()
root.b_len = $long_content.compress("gzip").length()


# In:  hello world this is some content
# Out: {"a_len":32999,"b_len":161}
```

```coffee
root.compressed = content().compress("lz4").encode("base64")

# In:  hello world I love space
# Out: {"compressed":"BCJNGGRwuRgAAIBoZWxsbyB3b3JsZCBJIGxvdmUgc3BhY2UAAAAAGoETLg=="}
```

## decode

Decodes an encoded string target according to a chosen scheme and returns the result as a byte array. When mapping the result to a JSON field the value should be cast to a string using the method [string](#string, or encoded using the method [encode](#encode), otherwise it will be base64 encoded by default.

Available schemes are: `base64`, `base64url` [(RFC 4648 with padding characters)](https://rfc-editor.org/rfc/rfc4648.html), `base64rawurl` [(RFC 4648 without padding characters)](https://rfc-editor.org/rfc/rfc4648.html), `hex` and `ascii85`.

#### Parameters

**scheme** &lt;string&gt; The decoding scheme to use.  

#### Examples


```coffee
root.decoded = this.value.decode("hex").string()

# In:  {"value":"68656c6c6f20776f726c64"}
# Out: {"decoded":"hello world"}
```

```coffee
root = this.encoded.decode("ascii85")

# In:  {"encoded":"FD,B0+DGm>FDl80Ci\"A>F`)8BEckl6F`M&(+Cno&@/"}
# Out: this is totally unstructured data
```

## decompress

Decompresses a string or byte array value according to a specified algorithm. The result of decompression 

#### Parameters

**algorithm** &lt;string&gt; One of `gzip`, `pgzip`, `zlib`, `bzip2`, `flate`, `snappy`, `lz4`, `zstd`.  

#### Examples


```coffee
root = this.compressed.decode("base64").decompress("lz4")

# In:  {"compressed":"BCJNGGRwuRgAAIBoZWxsbyB3b3JsZCBJIGxvdmUgc3BhY2UAAAAAGoETLg=="}
# Out: hello world I love space
```

Use the `.string()` method in order to coerce the result into a string, this makes it possible to place the data within a JSON document without automatic base64 encoding.

```coffee
root.result = this.compressed.decode("base64").decompress("lz4").string()

# In:  {"compressed":"BCJNGGRwuRgAAIBoZWxsbyB3b3JsZCBJIGxvdmUgc3BhY2UAAAAAGoETLg=="}
# Out: {"result":"hello world I love space"}
```

## decrypt_aes

Decrypts an encrypted string or byte array target according to a chosen AES encryption method and returns the result as a byte array. The algorithms require a key and an initialization vector / nonce. Available schemes are: `ctr`, `ofb`, `cbc`.

#### Parameters

**scheme** &lt;string&gt; The scheme to use for decryption, one of `ctr`, `ofb`, `cbc`.  
**key** &lt;string&gt; A key to decrypt with.  
**iv** &lt;string&gt; An initialization vector / nonce.  

#### Examples


```coffee
let key = "2b7e151628aed2a6abf7158809cf4f3c".decode("hex")
let vector = "f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff".decode("hex")
root.decrypted = this.value.decode("hex").decrypt_aes("ctr", $key, $vector).string()

# In:  {"value":"84e9b31ff7400bdf80be7254"}
# Out: {"decrypted":"hello world!"}
```

## encode

Encodes a string or byte array target according to a chosen scheme and returns a string result. Available schemes are: `base64`, `base64url` [(RFC 4648 with padding characters)](https://rfc-editor.org/rfc/rfc4648.html), `base64rawurl` [(RFC 4648 without padding characters)](https://rfc-editor.org/rfc/rfc4648.html), `hex`, `ascii85`.

#### Parameters

**scheme** &lt;string&gt; The encoding scheme to use.  

#### Examples


```coffee
root.encoded = this.value.encode("hex")

# In:  {"value":"hello world"}
# Out: {"encoded":"68656c6c6f20776f726c64"}
```

```coffee
root.encoded = content().encode("ascii85")

# In:  this is totally unstructured data
# Out: {"encoded":"FD,B0+DGm>FDl80Ci\"A>F`)8BEckl6F`M&(+Cno&@/"}
```

## encrypt_aes

Encrypts a string or byte array target according to a chosen AES encryption method and returns a string result. The algorithms require a key and an initialization vector / nonce. Available schemes are: `ctr`, `ofb`, `cbc`.

#### Parameters

**scheme** &lt;string&gt; The scheme to use for encryption, one of `ctr`, `ofb`, `cbc`.  
**key** &lt;string&gt; A key to encrypt with.  
**iv** &lt;string&gt; An initialization vector / nonce.  

#### Examples


```coffee
let key = "2b7e151628aed2a6abf7158809cf4f3c".decode("hex")
let vector = "f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff".decode("hex")
root.encrypted = this.value.encrypt_aes("ctr", $key, $vector).encode("hex")

# In:  {"value":"hello world!"}
# Out: {"encrypted":"84e9b31ff7400bdf80be7254"}
```

## hash

Hashes a string or byte array according to a chosen algorithm and returns the result as a byte array. When mapping the result to a JSON field the value should be cast to a string using the method [string][methods.string], or encoded using the method [encode][methods.encode], otherwise it will be base64 encoded by default.

Available algorithms are: `hmac_sha1`, `hmac_sha256`, `hmac_sha512`, `md5`, `sha1`, `sha256`, `sha512`, `xxhash64`, `crc32`.

The following algorithms require a key, which is specified as a second argument: `hmac_sha1`, `hmac_sha256`, `hmac_sha512`.

#### Parameters

**algorithm** &lt;string&gt; The hasing algorithm to use.  
**key** &lt;(optional) string&gt; An optional key to use.  
**polynomial** &lt;string, default `"IEEE"`&gt; An optional polynomial key to use when selecting the `crc32` algorithm, otherwise ignored. Options are `IEEE` (default), `Castagnoli` and `Koopman`  

#### Examples


```coffee
root.h1 = this.value.hash("sha1").encode("hex")
root.h2 = this.value.hash("hmac_sha1","static-key").encode("hex")

# In:  {"value":"hello world"}
# Out: {"h1":"2aae6c35c94fcfb415dbe95f408b9ce91ee846ed","h2":"d87e5f068fa08fe90bb95bc7c8344cb809179d76"}
```

The crc32 algorithm supports options for the polynomial.

```coffee
root.h1 = this.value.hash(algorithm: "crc32", polynomial: "Castagnoli").encode("hex")
root.h2 = this.value.hash(algorithm: "crc32", polynomial: "Koopman").encode("hex")

# In:  {"value":"hello world"}
# Out: {"h1":"c99465aa","h2":"df373d3c"}
```