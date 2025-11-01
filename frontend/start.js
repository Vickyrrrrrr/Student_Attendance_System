const { spawn } = require('child_process');
const path = require('path');

// Set environment variables
process.env.BROWSER = 'none';
process.env.NODE_ENV = 'development';

// Start react-scripts
const reactScripts = spawn('npm', ['start'], {
  cwd: path.join(__dirname),
  shell: true,
  stdio: 'inherit'
});

reactScripts.on('error', (error) => {
  console.error('Failed to start frontend:', error);
  process.exit(1);
});

reactScripts.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  reactScripts.kill('SIGINT');
  process.exit(0);
});
