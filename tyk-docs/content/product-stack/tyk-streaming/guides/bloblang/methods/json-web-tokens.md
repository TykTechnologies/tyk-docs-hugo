---
title: JSON Web Tokens Methods
description: Explains Bloblang Json Web Token methods
tags: [ "Tyk Streams", "Bloblang", "JSON Web Tokens", "JWT", "Methods" ]
---

JSON Web Tokens (JWT) are a popular method for securely transmitting information between parties as a JSON object. They are compact, self-contained, and typically used for authentication and information exchange. This document delves into the methods available for parsing and signing JWTs using various algorithms through Bloblang, a powerful and flexible language for working with structured data.

## parse_jwt_es256

Parses a claims object from a JWT string encoded with ES256. This method does not validate JWT claims.

#### Parameters

**signing_secret** &lt;string&gt; The ES256 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_es256("""-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEGtLqIBePHmIhQcf0JLgc+F/4W/oI
dp0Gta53G35VerNDgUUXmp78J2kfh4qLdh0XtmOMI587tCaqjvDAXfs//w==
-----END PUBLIC KEY-----""")

# In:  {"signed":"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.GIRajP9JJbpTlqSCdNEz4qpQkRvzX4Q51YnTwVyxLDM9tKjR_a8ggHWn9CWj7KG0x8J56OWtmUxn112SRTZVhQ"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

## parse_jwt_es384

Parses a claims object from a JWT string encoded with ES384. This method does not validate JWT claims.

#### Parameters

**signing_secret** &lt;string&gt; The ES384 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_es384("""-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAERoz74/B6SwmLhs8X7CWhnrWyRrB13AuU
8OYeqy0qHRu9JWNw8NIavqpTmu6XPT4xcFanYjq8FbeuM11eq06C52mNmS4LLwzA
2imlFEgn85bvJoC3bnkuq4mQjwt9VxdH
-----END PUBLIC KEY-----""")

# In:  {"signed":"eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.H2HBSlrvQBaov2tdreGonbBexxtQB-xzaPL4-tNQZ6TVh7VH8VBcSwcWHYa1lBAHmdsKOFcB2Wk0SB7QWeGT3ptSgr-_EhDMaZ8bA5spgdpq5DsKfaKHrd7DbbQlmxNq"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

## parse_jwt_es512

Parses a claims object from a JWT string encoded with ES512. This method does not validate JWT claims.

#### Parameters

**signing_secret** &lt;string&gt; The ES512 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_es512("""-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAkHLdts9P56fFkyhpYQ31M/Stwt3w
vpaxhlfudxnXgTO1IP4RQRgryRxZ19EUzhvWDcG3GQIckoNMY5PelsnCGnIBT2Xh
9NQkjWF5K6xS4upFsbGSAwQ+GIyyk5IPJ2LHgOyMSCVh5gRZXV3CZLzXujx/umC9
UeYyTt05zRRWuD+p5bY=
-----END PUBLIC KEY-----""")

# In:  {"signed":"eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.ACrpLuU7TKpAnncDCpN9m85nkL55MJ45NFOBl6-nEXmNT1eIxWjiP4pwWVbFH9et_BgN14119jbL_KqEJInPYc9nAXC6dDLq0aBU-dalvNl4-O5YWpP43-Y-TBGAsWnbMTrchILJ4-AEiICe73Ck5yWPleKg9c3LtkEFWfGs7BoPRguZ"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

## parse_jwt_hs256

Parses a claims object from a JWT string encoded with HS256. This method does not validate JWT claims.

#### Parameters

**signing_secret** &lt;string&gt; The HS256 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_hs256("""dont-tell-anyone""")

# In:  {"signed":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.YwXOM8v3gHVWcQRRRQc_zDlhmLnM62fwhFYGpiA0J1A"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

## parse_jwt_hs384

Parses a claims object from a JWT string encoded with HS384. This method does not validate JWT claims.

#### Parameters

**signing_secret** &lt;string&gt; The HS384 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_hs384("""dont-tell-anyone""")

# In:  {"signed":"eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.2Y8rf_ijwN4t8hOGGViON_GrirLkCQVbCOuax6EoZ3nluX0tCGezcJxbctlIfsQ2"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

## parse_jwt_hs512

Parses a claims object from a JWT string encoded with HS512. This method does not validate JWT claims.

#### Parameters

**signing_secret** &lt;string&gt; The HS512 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_hs512("""dont-tell-anyone""")

# In:  {"signed":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.utRb0urG6LGGyranZJVo5Dk0Fns1QNcSUYPN0TObQ-YzsGGB8jrxHwM5NAJccjJZzKectEUqmmKCaETZvuX4Fg"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

## parse_jwt_rs256

Parses a claims object from a JWT string encoded with RS256. This method does not validate JWT claims.

Introduced in version v4.20.0.


#### Parameters

**signing_secret** &lt;string&gt; The RS256 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_rs256("""-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs/ibN8r68pLMR6gRzg4S
8v8l6Q7yi8qURjkEbcNeM1rkokC7xh0I4JVTwxYSVv/JIW8qJdyspl5NIfuAVi32
WfKvSAs+NIs+DMsNPYw3yuQals4AX8hith1YDvYpr8SD44jxhz/DR9lYKZFGhXGB
+7NqQ7vpTWp3BceLYocazWJgusZt7CgecIq57ycM5hjM93BvlrUJ8nQ1a46wfL/8
Cy4P0et70hzZrsjjN41KFhKY0iUwlyU41yEiDHvHDDsTMBxAZosWjSREGfJL6Mfp
XOInTHs/Gg6DZMkbxjQu6L06EdJ+Q/NwglJdAXM7Zo9rNELqRig6DdvG5JesdMsO
+QIDAQAB
-----END PUBLIC KEY-----""")

# In:  {"signed":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.b0lH3jEupZZ4zoaly4Y_GCvu94HH6UKdKY96zfGNsIkPZpQLHIkZ7jMWlLlNOAd8qXlsBGP_i8H2qCKI4zlWJBGyPZgxXDzNRPVrTDfFpn4t4nBcA1WK2-ntXP3ehQxsaHcQU8Z_nsogId7Pme5iJRnoHWEnWtbwz5DLSXL3ZZNnRdrHM9MdI7QSDz9mojKDCaMpGN9sG7Xl-tGdBp1XzXuUOzG8S03mtZ1IgVR1uiBL2N6oohHIAunk8DIAmNWI-zgycTgzUGU7mvPkKH43qO8Ua1-13tCUBKKa8VxcotZ67Mxm1QAvBGoDnTKwWMwghLzs6d6WViXQg6eWlJcpBA"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

## parse_jwt_rs384

Parses a claims object from a JWT string encoded with RS384. This method does not validate JWT claims.

#### Parameters

**signing_secret** &lt;string&gt; The RS384 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_rs384("""-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs/ibN8r68pLMR6gRzg4S
8v8l6Q7yi8qURjkEbcNeM1rkokC7xh0I4JVTwxYSVv/JIW8qJdyspl5NIfuAVi32
WfKvSAs+NIs+DMsNPYw3yuQals4AX8hith1YDvYpr8SD44jxhz/DR9lYKZFGhXGB
+7NqQ7vpTWp3BceLYocazWJgusZt7CgecIq57ycM5hjM93BvlrUJ8nQ1a46wfL/8
Cy4P0et70hzZrsjjN41KFhKY0iUwlyU41yEiDHvHDDsTMBxAZosWjSREGfJL6Mfp
XOInTHs/Gg6DZMkbxjQu6L06EdJ+Q/NwglJdAXM7Zo9rNELqRig6DdvG5JesdMsO
+QIDAQAB
-----END PUBLIC KEY-----""")

# In:  {"signed":"eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.orcXYBcjVE5DU7mvq4KKWFfNdXR4nEY_xupzWoETRpYmQZIozlZnM_nHxEk2dySvpXlAzVm7kgOPK2RFtGlOVaNRIa3x-pMMr-bhZTno4L8Hl4sYxOks3bWtjK7wql4uqUbqThSJB12psAXw2-S-I_FMngOPGIn4jDT9b802ottJSvTpXcy0-eKTjrV2PSkRRu-EYJh0CJZW55MNhqlt6kCGhAXfbhNazN3ASX-dmpd_JixyBKphrngr_zRA-FCn_Xf3QQDA-5INopb4Yp5QiJ7UxVqQEKI80X_JvJqz9WE1qiAw8pq5-xTen1t7zTP-HT1NbbD3kltcNa3G8acmNg"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

## parse_jwt_rs512

Parses a claims object from a JWT string encoded with RS512. This method does not validate JWT claims.

#### Parameters

**signing_secret** &lt;string&gt; The RS512 secret that was used for signing the token.  

#### Examples


```coffee
root.claims = this.signed.parse_jwt_rs512("""-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs/ibN8r68pLMR6gRzg4S
8v8l6Q7yi8qURjkEbcNeM1rkokC7xh0I4JVTwxYSVv/JIW8qJdyspl5NIfuAVi32
WfKvSAs+NIs+DMsNPYw3yuQals4AX8hith1YDvYpr8SD44jxhz/DR9lYKZFGhXGB
+7NqQ7vpTWp3BceLYocazWJgusZt7CgecIq57ycM5hjM93BvlrUJ8nQ1a46wfL/8
Cy4P0et70hzZrsjjN41KFhKY0iUwlyU41yEiDHvHDDsTMBxAZosWjSREGfJL6Mfp
XOInTHs/Gg6DZMkbxjQu6L06EdJ+Q/NwglJdAXM7Zo9rNELqRig6DdvG5JesdMsO
+QIDAQAB
-----END PUBLIC KEY-----""")

# In:  {"signed":"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.rsMp_X5HMrUqKnZJIxo27aAoscovRA6SSQYR9rq7pifIj0YHXxMyNyOBDGnvVALHKTi25VUGHpfNUW0VVMmae0A4t_ObNU6hVZHguWvetKZZq4FZpW1lgWHCMqgPGwT5_uOqwYCH6r8tJuZT3pqXeL0CY4putb1AN2w6CVp620nh3l8d3XWb4jaifycd_4CEVCqHuWDmohfug4VhmoVKlIXZkYoAQowgHlozATDssBSWdYtv107Wd2AzEoiXPu6e3pflsuXULlyqQnS4ELEKPYThFLafh1NqvZDPddqozcPZ-iODBW-xf3A4DYDdivnMYLrh73AZOGHexxu8ay6nDA"}
# Out: {"claims":{"iat":1516239022,"mood":"Disdainful","sub":"1234567890"}}
```

### sign_jwt_es256

Hash and sign an object representing JSON Web Token (JWT) claims using ES256.

#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples

```coffee
root.signed = this.claims.sign_jwt_es256("""-----BEGIN EC PRIVATE KEY-----
... signature data ...
-----END EC PRIVATE KEY-----""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.-8LrOdkEiv_44ADWW08lpbq41ZmHCel58NMORPq1q4Dyw0zFhqDVLrRoSvCvuyyvgXAFb9IHfR-9MlJ_2ShA9A"}
```

### sign_jwt_es384

Hash and sign an object representing JSON Web Token (JWT) claims using ES384.

#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples

```coffee
root.signed = this.claims.sign_jwt_es384("""-----BEGIN EC PRIVATE KEY-----
... signature data ...
-----END EC PRIVATE KEY-----""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIn0.8FmTKH08dl7dyxrNu0rmvhegiIBCy-O9cddGco2e9lpZtgv5mS5qHgPkgBC5eRw1d7SRJsHwHZeehzdqT5Ba7aZJIhz9ds0sn37YQ60L7jT0j2gxCzccrt4kECHnUnLw"}
```

### sign_jwt_es512

Hash and sign an object representing JSON Web Token (JWT) claims using ES512.

#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples


```coffee
root.signed = this.claims.sign_jwt_es512("""-----BEGIN EC PRIVATE KEY-----
... signature data ...
-----END EC PRIVATE KEY-----""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIn0.AQbEWymoRZxDJEJtKSFFG2k2VbDCTYSuBwAZyMqexCspr3If8aERTVGif8HXG3S7TzMBCCzxkcKr3eIU441l3DlpAMNfQbkcOlBqMvNBn-CX481WyKf3K5rFHQ-6wRonz05aIsWAxCDvAozI_9J0OWllxdQ2MBAuTPbPJ38OqXsYkCQs"}
```

### sign_jwt_hs256

Hash and sign an object representing JSON Web Token (JWT) claims using HS256.


#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples


```coffee
root.signed = this.claims.sign_jwt_hs256("""dont-tell-anyone""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIn0.hUl-nngPMY_3h9vveWJUPsCcO5PeL6k9hWLnMYeFbFQ"}
```

### sign_jwt_hs384

Hash and sign an object representing JSON Web Token (JWT) claims using HS384.

#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples


```coffee
root.signed = this.claims.sign_jwt_hs384("""dont-tell-anyone""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIn0.zGYLr83aToon1efUNq-hw7XgT20lPvZb8sYei8x6S6mpHwb433SJdXJXx0Oio8AZ"}
```

### sign_jwt_hs512

Hash and sign an object representing JSON Web Token (JWT) claims using HS512.

#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples


```coffee
root.signed = this.claims.sign_jwt_hs512("""dont-tell-anyone""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIn0.zBNR9o_6EDwXXKkpKLNJhG26j8Dc-mV-YahBwmEdCrmiWt5les8I9rgmNlWIowpq6Yxs4kLNAdFhqoRz3NXT3w"}
```

### sign_jwt_rs256

Hash and sign an object representing JSON Web Token (JWT) claims using RS256.

#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples


```coffee
root.signed = this.claims.sign_jwt_rs256("""-----BEGIN RSA PRIVATE KEY-----
... signature data ...
-----END RSA PRIVATE KEY-----""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.b0lH3jEupZZ4zoaly4Y_GCvu94HH6UKdKY96zfGNsIkPZpQLHIkZ7jMWlLlNOAd8qXlsBGP_i8H2qCKI4zlWJBGyPZgxXDzNRPVrTDfFpn4t4nBcA1WK2-ntXP3ehQxsaHcQU8Z_nsogId7Pme5iJRnoHWEnWtbwz5DLSXL3ZZNnRdrHM9MdI7QSDz9mojKDCaMpGN9sG7Xl-tGdBp1XzXuUOzG8S03mtZ1IgVR1uiBL2N6oohHIAunk8DIAmNWI-zgycTgzUGU7mvPkKH43qO8Ua1-13tCUBKKa8VxcotZ67Mxm1QAvBGoDnTKwWMwghLzs6d6WViXQg6eWlJcpBA"}
```

### sign_jwt_rs384

Hash and sign an object representing JSON Web Token (JWT) claims using RS384.

#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples


```coffee
root.signed = this.claims.sign_jwt_rs384("""-----BEGIN RSA PRIVATE KEY-----
... signature data ...
-----END RSA PRIVATE KEY-----""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.orcXYBcjVE5DU7mvq4KKWFfNdXR4nEY_xupzWoETRpYmQZIozlZnM_nHxEk2dySvpXlAzVm7kgOPK2RFtGlOVaNRIa3x-pMMr-bhZTno4L8Hl4sYxOks3bWtjK7wql4uqUbqThSJB12psAXw2-S-I_FMngOPGIn4jDT9b802ottJSvTpXcy0-eKTjrV2PSkRRu-EYJh0CJZW55MNhqlt6kCGhAXfbhNazN3ASX-dmpd_JixyBKphrngr_zRA-FCn_Xf3QQDA-5INopb4Yp5QiJ7UxVqQEKI80X_JvJqz9WE1qiAw8pq5-xTen1t7zTP-HT1NbbD3kltcNa3G8acmNg"}
```

### sign_jwt_rs512

Hash and sign an object representing JSON Web Token (JWT) claims using RS512.

#### Parameters

**signing_secret** &lt;string&gt; The secret to use for signing the token.  

#### Examples


```coffee
root.signed = this.claims.sign_jwt_rs512("""-----BEGIN RSA PRIVATE KEY-----
... signature data ...
-----END RSA PRIVATE KEY-----""")

# In:  {"claims":{"sub":"user123"}}
# Out: {"signed":"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsIm1vb2QiOiJEaXNkYWluZnVsIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.rsMp_X5HMrUqKnZJIxo27aAoscovRA6SSQYR9rq7pifIj0YHXxMyNyOBDGnvVALHKTi25VUGHpfNUW0VVMmae0A4t_ObNU6hVZHguWvetKZZq4FZpW1lgWHCMqgPGwT5_uOqwYCH6r8tJuZT3pqXeL0CY4putb1AN2w6CVp620nh3l8d3XWb4jaifycd_4CEVCqHuWDmohfug4VhmoVKlIXZkYoAQowgHlozATDssBSWdYtv107Wd2AzEoiXPu6e3pflsuXULlyqQnS4ELEKPYThFLafh1NqvZDPddqozcPZ-iODBW-xf3A4DYDdivnMYLrh73AZOGHexxu8ay6nDA"}
```
