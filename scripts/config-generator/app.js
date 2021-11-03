const fs = require('fs')
const h = require('./helpers')

// Define different products read/write paths prefix and entrypoint for the
// main config.
const CONFIGS = require('./config')

// Define different modes for regex matching
const WITH_JSON    = 1
const WITHOUT_JSON = 2

// Define different types of variables
const TYPE  = 1
const ARRAY = 2

const commentStr = '(\\t+\\/\\/[ %\-><\\}\\{#"`’“”\\*\\?\':\\/\\(\\)\\[\\]\\.,\\w]*\\n)'
const keyStr     = '([_\\w]+)'
const typeStr    = '([\\{\\}\\*\\.\\[\\]\\w]+)'
const jsonStr    = 'json:"([-\\.\\w]+)"'

const innerStructInfoRegexWithJSON = new RegExp(commentStr + '*\\t+(\\w+) +struct ' + '{.+?\\n\\t+} `' + jsonStr + '`', 's')
const innerStructInfoRegexNoJSON   = new RegExp(commentStr + '*\\t+(\\w+) +struct ' + '{.+?\\n\\t+}', 's')
const variablesGlobalRegexWithJSON = new RegExp(commentStr + '*\\t+' + keyStr + ' +' + typeStr + '.+`.*' + jsonStr + '.*', 'g')
const variablesRegexWithJSON       = new RegExp(commentStr + '*\\t+' + keyStr + ' +' + typeStr + '.+`.*' + jsonStr + '.*')
const variablesGlobalRegexNoJSON   = new RegExp(commentStr + '*\\t+' + keyStr + ' +' + typeStr, 'g')
const variablesRegexNoJSON         = new RegExp(commentStr + '*\\t+' + keyStr + ' +' + typeStr)
const mapRegex                     = new RegExp('map\\[([\\.\\w]+)\\](\\[\\])?')

// Fetch the seclected product(s) from the argument
process.argv[2].split(',').forEach(async a => {
  const [ p, branch = 'master' ] = a.split(':'),
        product = CONFIGS[p]

  // Check if the user provided a correct argument
  if (product) {
    // Create directory if it does not exist
    fs.mkdirSync(`./${product.path.dir}${branch}`, { recursive: true })

    // Fetch all required files
    product.entrypoint.file = await h.fetchFile(product.entrypoint.path, branch)
    for (const [ key, path ] of Object.entries(product.dependencies)) {
      product.dependencies[key] = await h.fetchFile(path)
    }

    const variables = getStruct(
      product.entrypoint.struct,
      product.entrypoint.file,
      product.prefix,
      product.dependencies
    )

    // Write the result in the file associated the product selected
    fs.writeFileSync(
      // Path for file
      `./${product.path.dir}${branch}/${product.path.file}.json`,
      // Josnified and prettified output of the script
      JSON.stringify(variables, null, 2)
    )

    // Write the markdown in the file associated the product selected
    fs.writeFileSync(
      // Path for file
      `./${product.path.dir}${branch}/${product.path.file}.md`,
      // Josnified and prettified output of the script
      h.generateMarkdown(variables)
    )
  // Log eroror message on the usability of the script
  } else console.log(
    `${process.argv[2]} config does not exist.\n` +
    "Options are:\n" +
    "\t- gateway\n" +
    "\t- dashboard\n" +
    "\t- pump\n" +
    "\t- tib\n" +
    "\t- mdcb"
  )
})

// Selects a struct to scan, replace sub-structs with
// "${key}.${sub-struct.key} ${sub-struct.type} ${json}.${sub-struct.json}"
function getStruct(name, data, prefix, dependencies) {
  // console.log(`[DEBUG]: processing ${name} struct`)
  const result = data.match(new RegExp(`(type ${name} struct {.+?\\n})`, 's'))

  // If a strcut with 'name' exists
  if (result) {
    let struct = result[0]

    // Replace inner-structs
    struct = innerStructHelper(WITH_JSON, struct, data, prefix, dependencies)
    // Add support for structs that don't have json
    struct = innerStructHelper(WITHOUT_JSON, struct, data, prefix, dependencies)

    // Return the output of the getVariables function which is list of
    // variables with all its info
    return getVariables(struct, data, prefix, dependencies)

  // Log that there was no struct found with the specified name
  } else return console.log(`${name} struct not found.`)
}

// Helps the getStruct function replace the inner-struct pieces
function innerStructHelper(mode, struct, data, prefix, dependencies) {
  let re, result, description, key, json, parsed, p

  // Determine the regex based on the mode
  re = WITH_JSON === mode ? innerStructInfoRegexWithJSON : innerStructInfoRegexNoJSON

  // Check if there are an structs inside the current struct
  while (re.test(struct)) {
    result      = struct.match(re)
    description = result[1]
    key         = result[2]
    json        = result[3]

    // console.log(`[DEBUG]: processing ${key} sub-struct with config prefix ${json}`)

    // Use the getVariables function to parse the inner variables of the
    // inner-structs with struct level variables and then use the value to
    // replace the current sub-struct

    parsed = getVariables(result[0], data, prefix, dependencies).map(variable => {

      p = ""
      if (variable.description) p += `\t\/\/ ${variable.description.trim()}\n`
      p+= `\t${key}_${variable.key} ${variable.type}`
      p+= WITH_JSON === mode ? ` \`json:"${json}.${variable.json}"\`\n` : '\n'

      return p
    }).join('')

    // Replace inner-struct with parsed equivalent
    struct = struct.replace(
      WITH_JSON === mode ?
      new RegExp(commentStr + `*\\t+${key} +struct {.+?\\n\\t+} \`json:"${json}"\``, 's') :
      new RegExp(commentStr + `*\\t+${key} +struct {.+?\\n\\t+}`, 's'),
      parsed
    )
  }

  // Return the modified struct
  return struct
}

function getVariables(struct, data, prefix, dependencies) {
  let variables, lines, found = false
  const configs = []

  // Get the varibales from inside the struct passed in
  variables = struct.match(variablesGlobalRegexWithJSON)

  // Get variables with json part in the regex
  if (variables) {
    found = true
    getVariablesHelper(variables, variablesRegexWithJSON, data, prefix, dependencies, configs)
    struct = struct.replace(variablesGlobalRegexWithJSON, '')
  }

  // Remove struct first and last lines so that the regex does not capture them
  // as valid variables
  lines = struct.split('\n')
  struct = lines.slice(1, lines.length - 1).join('\n')

  // Add support for variables without json part
  variables = struct.match(variablesGlobalRegexNoJSON)

  // Get variables with json part in the regex
  if (variables) {
    found = true
    getVariablesHelper(variables, variablesRegexNoJSON, data, prefix, dependencies, configs)
  }

  // If no variable exist return and empty array log the struct and error
  // message
  if (! found) {
    console.log(struct)
    console.log(`No variables were found.`)
    return []
  }

  return configs
}

// Iternate through the different variables and pull their information as well
// as recursively going in and resolving types that have their own structs
function getVariablesHelper(variables, re, data, prefix, dependencies, configs) {
  let match, description, key, type, json, mapMatch, map, header, vars, obj

  variables.forEach(variable => {
    match  = variable.match(re)
    header = false
    vars   = []

    description = match[1] ? match[0]
        .replace(/^\t+\/\//gm, '')
        .split('\n')
        .slice(0, -1)
        .map(l => l.replace(/^ /g, ''))
        .join('\n') : undefined
    key  = match[2]
    type = match[3]
    json = match[4] || key.replace('_', '.')

    // Types with map[$type] prefix
    map = ""
    if ((mapMatch = type.match(mapRegex))) {
      type = type.slice(mapMatch[0].length)
      map  = mapMatch[0]
    }

    // 1 to 1 Type mapping
    if (testVariableRegex(type, data)) {
      header = true

      getStruct(type, data, prefix, dependencies).forEach(variable =>
        vars.push(createVariableObject(TYPE, key, map, json, prefix, variable))
      )
    // Types with [] prefix
    } else if (type.startsWith('[]') && testVariableRegex(type.slice(2), data)) {
      obj = []

      getStruct(type.slice(2), data, prefix, dependencies).forEach(variable => {
        obj.push(createVariableObject(ARRAY, key, map, json, prefix, variable))
      })

      vars.push({
        flavour: 'variable',
        description: description,
        key: key,
        json: json,
        type: type,
        nested: obj,
      })
      
    // Add support for configs that have dependencies on other configs
    } else if (type.includes('.') && type.split('.')[0] in dependencies) {
      const [ k, struct ] = type.split('.')
      header = true

      getStruct(struct, dependencies[k], prefix, dependencies).forEach(variable =>
        vars.push(createVariableObject(TYPE, key, map, json, prefix, variable))
      )

      if ('MongoConf' === struct)
        getStruct('BaseMongoConf', dependencies[k], prefix, dependencies).forEach(variable =>
          vars.push(createVariableObject(TYPE, key, map, json, prefix, variable))
        )

    // Basic types or types not found or not supported
    } else {
      vars.push({
        flavour: 'variable',
        description: description,
        key: key,
        json: json,
        env: `${prefix}_${key.toUpperCase()}`,
        type: 'IPsHandleStrategy'     === type ? 'string' :
              'EnvMapString'          === type ? 'map[string]string' :
              'UserPermissionObject'  === type ? 'map[ObjectGroup]string' :
              'MongoType'             === type ? 'int' :
              'EnvMapString'          === type ? 'map[string]string' :
              map                              ? `${map}${type}` :
              type
      })
    }

    if (header) {
      configs.push({
        flavour: 'header',
        description: description,
        key: key,
        json: json,
        type: type
      })
    }

    configs.push(...vars)
  })
}

function testVariableRegex(type, data) {
  return new RegExp(`(type ${type} struct {.+?\\n})`, 's').test(data)
}

function createVariableObject(type, key, map, json, prefix, variable) {
  const object = {
    description: variable.description,
    type: variable.type,
  }

  switch (type) {
    case TYPE:
      object.flavour = 'variable'
      object.env = `${prefix}_${key.toUpperCase()}_${variable.key.toUpperCase()}`
      object.key = `${key}_${variable.key}`
      object.json = `${json}.${variable.json}`
      break

    case ARRAY:
      object.key = variable.key
      object.json = variable.json
      break
  }

  if (map) object.type = `${map}${object.type}`
  if (variable.nested) object.nested = variable.nested

  return object
}
