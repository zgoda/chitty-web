function parseHost(hostName, secure) {
  const parts = hostName.split(':');
  if (parts.length > 1) {
    return { host: parts[0], port: parseInt(parts[1], 10) };
  }
  const port = secure ? 443 : 80;
  return { host: parts[0], port };
}

export { parseHost };
