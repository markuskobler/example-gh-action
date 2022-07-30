const os = require("os");

try {
  const binding = (function loadModule({ platform, arch }) {
    switch (platform) {
      case "linux":
        switch (arch) {
          case "x64":
            return require("./cohesive.linux-x64-gnu.node");
        }
    }
    throw new Error(`Unsupported Action OS/Architecture (${platform}/${arch})`);
  })(process);

  (async () => binding.run())();
} catch (err) {
  process.exitCode = 1;

  function format(v) {
    if (v === null || v === undefined) {
      return "";
    } else if (v instanceof Error) {
      return v.toString();
    } else if (typeof v === "string" || v instanceof String) {
      return v;
    }
    return JSON.stringify(v);
  }

  const msg = format(err)
    .replace(/^Error: /, "")
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A");

  process.stdout.write(`::error::${msg}` + os.EOL);
}
