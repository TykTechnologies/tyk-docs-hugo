---
date: 2017-03-24T13:43:51Z
title: Requirements
menu:
  main:
    parent: "LuaJIT"
weight: 0 
aliases: 
  -  "plugins/supported-languages/rich-plugins/luajitrequirements"
---

Tyk uses [LuaJIT](http://luajit.org/). The main requirement is the LuaJIT shared library, you may find this as `libluajit-x` in most distros.

For Ubuntu 14.04 you may use:

`$ apt-get install libluajit-5.1-2
$ apt-get install luarocks`

The LuaJIT required modules are as follows:

*   [lua-cjson](https://github.com/mpx/lua-cjson): in case you have `luarocks`, run: `$ luarocks install lua-cjson`
*   From v1.3.6 You can also use override response code, headers and body using ReturnOverrides. See the [Extend ReturnOverides](https://github.com/TykTechnologies/tyk/pull/763) sample for details.