const { platform, arch } = process

let binding = null

switch (platform) {
  case 'linux':
    switch (arch) {
      case 'x64':
        binding = require('./cohesive.linux-x64-gnu.node')
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  // case 'darwin', 'win32':
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

binding.run();