const path = require('path');

module.exports = async (req, res) => {
  const serverDistPath = path.join(
    process.cwd(),
    'dist',
    'rana-al-cabin',
    'server',
    'server.mjs'
  );

  const server = await import(serverDistPath);
  return server.default(req, res);
};
