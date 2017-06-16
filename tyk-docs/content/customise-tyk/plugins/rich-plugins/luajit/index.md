---
date: 2017-03-24T13:39:37Z
title: LuaJIT
menu:
  main:
    parent: "Rich Plugins"
weight: 0
url: "/customise-tyk/plugins/rich-plugins/luajit"
---
### Requirements

Tyk uses [LuaJIT][1]. The main requirement is the LuaJIT shared library, you may find this as `libluajit-x` in most distros.

For Ubuntu 14.04 you may use:

`$ apt-get install libluajit-5.1-2
$ apt-get install luarocks`

The LuaJIT required modules are as follows:

*   [lua-cjson][2]: in case you have `luarocks`, run: `$ luarocks install lua-cjson`

### How to write LuaJIT Plugins

We have a demo plugin hosted [here][3]. The project implements a simple middleware for header injection, using a Pre hook (see [Tyk custom middleware hooks][4]) and [mymiddleware.lua][5].
### Lua Performance
Lua support is currently in beta stage. We are planning performance optimisations for future releases.
### Tyk Lua API Methods
Tyk Lua API methods aren’t currently supported.

 [1]: http://luajit.org/
 [2]: https://github.com/mpx/lua-cjson
 [3]: https://github.com/TykTechnologies/tyk-plugin-demo-lua
 [4]: /docs/customise-tyk/plugins/javascript-middleware/middleware-scripting-guide/
 [5]: https://github.com/TykTechnologies/tyk-plugin-demo-lua/blob/master/mymiddleware.lua
