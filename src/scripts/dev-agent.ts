#!/usr/bin/env node
/**
 * CloudHop Dev Agent
 * Hybrid approach: You define strategy, agent handles grunt work
 * 
 * Usage:
 *   npm run agent           # Interactive mode
 *   npm run agent build     # Run specific command
 *   npm run agent test      # Run tests
 *   npm run agent commit "msg" # Commit changes
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = __dirname;

// Color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  command: (msg) => console.log(`${colors.magenta}⟳${colors.reset} ${msg}`),
};

class DevAgent {
  constructor() {
    this.running = true;
  }

  // Execute shell command
  exec(cmd, { silent = false, cwd = PROJECT_ROOT } = {}) {
    try {
      if (!silent) log.command(cmd);
      const output = execSync(cmd, { cwd, encoding: 'utf-8', stdio: silent ? 'pipe' : 'inherit' });
      if (!silent) log.success('Command completed');
      return output;
    } catch (error) {
      log.error(`Command failed: ${error.message}`);
      throw error;
    }
  }

  // Read file
  readFile(filePath) {
    try {
      const fullPath = path.join(PROJECT_ROOT, filePath);
      const content = fs.readFileSync(fullPath, 'utf-8');
      log.success(`Read ${filePath}`);
      return content;
    } catch (error) {
      log.error(`Failed to read ${filePath}: ${error.message}`);
      return null;
    }
  }

  // List directory
  listDir(dirPath = '.') {
    try {
      const fullPath = path.join(PROJECT_ROOT, dirPath);
      const files = fs.readdirSync(fullPath);
      log.success(`Listed ${dirPath}`);
      return files;
    } catch (error) {
      log.error(`Failed to list ${dirPath}: ${error.message}`);
      return [];
    }
  }

  // Git commands
  gitStatus() {
    try {
      const output = this.exec('git status', { silent: true });
      console.log(output);
    } catch (error) {
      log.error('Git status failed');
    }
  }

  gitAdd(files = '.') {
    try {
      this.exec(`git add ${files}`, { silent: true });
      log.success(`Added ${files} to staging`);
    } catch (error) {
      log.error(`Failed to add files: ${error.message}`);
    }
  }

  gitCommit(message) {
    try {
      this.exec(`git commit -m "${message}"`, { silent: true });
      log.success(`Committed: ${message}`);
    } catch (error) {
      log.error(`Commit failed: ${error.message}`);
    }
  }

  gitPush(branch = 'production') {
    try {
      this.exec(`git push origin ${branch}`, { silent: true });
      log.success(`Pushed to ${branch}`);
    } catch (error) {
      log.error(`Push failed: ${error.message}`);
    }
  }

  gitLog(lines = 5) {
    try {
      const output = this.exec(`git log --oneline -${lines}`, { silent: true });
      console.log(output);
    } catch (error) {
      log.error('Git log failed');
    }
  }

  // Build commands
  build() {
    log.info('Building project...');
    try {
      this.exec('npm run build');
      log.success('Build completed successfully');
    } catch (error) {
      log.error('Build failed');
    }
  }

  dev() {
    log.info('Starting dev server...');
    this.exec('npm run dev');
  }

  test() {
    log.info('Running tests...');
    try {
      this.exec('npm run test');
      log.success('Tests passed');
    } catch (error) {
      log.error('Tests failed');
    }
  }

  lint() {
    log.info('Running linter...');
    try {
      this.exec('npm run lint');
      log.success('Linting passed');
    } catch (error) {
      log.warn('Linting issues found');
    }
  }

  lintFix() {
    log.info('Auto-fixing linting issues...');
    try {
      this.exec('npm run lint:fix');
      log.success('Linting fixed');
    } catch (error) {
      log.error('Linting fix failed');
    }
  }

  // High-level workflows
  async commitAndPush(message) {
    log.info('Starting commit workflow...');
    this.gitStatus();
    this.gitAdd();
    this.gitCommit(message);
    this.gitPush();
    log.success('Commit and push completed');
  }

  async buildAndPush(message) {
    log.info('Starting build and push workflow...');
    this.build();
    this.gitStatus();
    this.gitAdd();
    this.gitCommit(message || 'Build updated');
    this.gitPush();
    log.success('Build and push completed');
  }

  // Show help
  showHelp() {
    console.log(`
${colors.bright}${colors.cyan}CloudHop Dev Agent${colors.reset}
Hybrid approach: You strategize, agent does grunt work

${colors.bright}Commands:${colors.reset}
  
  ${colors.green}git${colors.reset}
    status              - Show git status
    add [files]         - Stage files for commit
    commit <msg>        - Commit with message
    push [branch]       - Push to branch (default: production)
    log [lines]         - Show commit history
  
  ${colors.green}build${colors.reset}
    build               - Build project (npm run build)
    dev                 - Start dev server (npm run dev)
    test                - Run tests (npm run test)
    lint                - Run linter (npm run lint)
    lint:fix            - Auto-fix linting issues
  
  ${colors.green}workflows${colors.reset}
    commit-push <msg>   - Stage, commit, and push
    build-push [msg]    - Build, commit, and push
  
  ${colors.green}file${colors.reset}
    read <file>         - Read file contents
    ls [dir]            - List directory
  
  ${colors.green}other${colors.reset}
    help                - Show this menu
    exit                - Exit agent

${colors.bright}Examples:${colors.reset}
  npm run agent build
  npm run agent commit "Fix Music component"
  npm run agent commit-push "Add GameHub feature"
  npm run agent build-push "Deploy new build"
  npm run agent read src/pages/Music.tsx
  npm run agent ls src/pages
    `);
  }

  // Parse command
  async handleCommand(input) {
    const parts = input.trim().split(/\s+/);
    const [cmd, ...args] = parts;

    switch (cmd) {
      // Git commands
      case 'status':
        this.gitStatus();
        break;
      case 'add':
        this.gitAdd(args.join(' ') || '.');
        break;
      case 'commit':
        if (!args.length) {
          log.error('Commit message required: commit <message>');
        } else {
          this.gitCommit(args.join(' '));
        }
        break;
      case 'push':
        this.gitPush(args[0] || 'production');
        break;
      case 'log':
        this.gitLog(parseInt(args[0]) || 5);
        break;

      // Build commands
      case 'build':
        this.build();
        break;
      case 'dev':
        this.dev();
        break;
      case 'test':
        this.test();
        break;
      case 'lint':
        this.lint();
        break;
      case 'lint:fix':
        this.lintFix();
        break;

      // Workflows
      case 'commit-push':
        if (!args.length) {
          log.error('Commit message required: commit-push <message>');
        } else {
          await this.commitAndPush(args.join(' '));
        }
        break;
      case 'build-push':
        await this.buildAndPush(args.join(' '));
        break;

      // File commands
      case 'read':
        if (!args.length) {
          log.error('File path required: read <file>');
        } else {
          const content = this.readFile(args.join(' '));
          if (content) console.log(content);
        }
        break;
      case 'ls':
        const files = this.listDir(args[0] || '.');
        console.log(files.join('\n'));
        break;

      // Other
      case 'help':
        this.showHelp();
        break;
      case 'exit':
        log.info('Exiting agent');
        this.running = false;
        break;
      case '':
        break;
      default:
        log.error(`Unknown command: ${cmd}`);
        log.info('Type "help" for available commands');
    }
  }

  // Interactive prompt
  async startInteractive() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(`${colors.bright}${colors.cyan}
╔════════════════════════════════════════╗
║     CloudHop Dev Agent (Hybrid)        ║
║   You = Strategy, Me = Grunt Work      ║
╚════════════════════════════════════════╝
${colors.reset}`);
    this.showHelp();

    const prompt = () => {
      if (!this.running) {
        rl.close();
        return;
      }
      rl.question(`${colors.magenta}agent>${colors.reset} `, async (input) => {
        await this.handleCommand(input);
        prompt();
      });
    };

    prompt();
  }
}

// Main
const agent = new DevAgent();
const args = process.argv.slice(2);

if (args.length === 0) {
  // Interactive mode
  agent.startInteractive();
} else {
  // Command mode
  agent.handleCommand(args.join(' ')).then(() => {
    process.exit(0);
  });
}
