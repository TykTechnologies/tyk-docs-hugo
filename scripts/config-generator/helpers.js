const https = require('https')

// Fetch config file from github repo
const fetchFile = async (path, branch = 'master') => {
  return new Promise(resolve => {
    https.get(`https://api.github.com/${path}?ref=${branch}`, {
      headers: {
        'Authorization': `token ${process.env.TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'request'
      }
    }, res => {
      const body = []
      res.on('data', chunk => body.push(chunk))
      res.on('end', () => resolve(Buffer.concat(body).toString()))
    })
  })
}

const generateMarkdown = variables => {
  let markdown = "", configs = {}

  variables.forEach(item => configs[item.json] = item)

  Object.values(configs).forEach(item => {
    if (! item.json.includes('-') && item.description) {
      if ('variable' === item.flavour) {
        markdown += `### ${item.json}\n`
        markdown += `EV: **${item.env}**<br />\n`
        markdown += `Type: \`${item.type}\`<br />\n\n`
        markdown += `${transformDescription(item)}\n\n`
      } else if ('header' === item.flavour) {
        markdown += `### ${item.json}\n`
        markdown += `${transformDescription(item)}\n\n`
      }
    }
  })

  return markdown
}

const transformDescription = ({ type, description, nested }) => {
  description = noteTransformer(description)

  if (nested) description = arrayObjectTransformer(type, nested, description)

  return description
}

const OUT = 0
const IN  = 1

const noteTransformer = description => {
  if (description.includes('Note:')) {
    let open = OUT, prev, d = ""

    description.split('\n').forEach(line => {
      if ('Note:' === line && OUT === open) {
        d += '{{< note success >}}\n**Note**\n\n'
        open = IN
      } else if (line.startsWith('  ')) d += line.slice(2) + '\n'
      else if (prev && ! line.startsWith('  ') && prev.startsWith('  ') && IN === open) {
        d += '{{< /note >}}\n'
        open = OUT
      } else d += line + '\n'
      prev = line
    })

    if (prev.startsWith('  ') && IN === open) d += '{{< /note >}}'

    return d
  }

  return description
}

const arrayObjectTransformer = (type, nested, description) => {
  let d = `**${type.slice(2)} Object**\n` +
    '\n| Variable | Type | Key | Description |' +
    '\n| ----------- | ----------- | ----------- | ----------- |'

  nested.forEach(item => d += `\n| ${item.key} | ${item.type} | ${item.json} | ${item.description || ''} |`)

  return description + '\n\n' + d
}

module.exports = {
  fetchFile: fetchFile,
  generateMarkdown: generateMarkdown
}
