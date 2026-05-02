#!/usr/bin/env tsx

/**
 * CloudHop Local Dev Agent
 * 
 * An autonomous agent that runs inside Docker and can:
 * - Read and edit your repository files
 * - Run npm commands, tests, and builds
 * - Commit and push to GitHub
 * - Manage Docker containers
 * - Execute arbitrary shell commands
 * 
 * Usage:
 *   # Interactive mode
 *   docker-compose run --rm agent bash
 *   
 *   # Or run a specific command
 *   docker-compose run --rm agent npm run build
 *   docker-compose run --rm agent npm run lint:fix
 * 
 * Example workflow:
 *   1. Start the agent: docker-compose run --rm agent
 *   2. Inside the agent: npm install
 *   3. Make edits: echo "fix" > src/file.ts
 *   4. Commit: git add . && git commit -m "Fix"
 *   5. Push: git push origin main
 */

import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { promisify } from 'util';
import * as readline from 'readline';

const execAsync = promisify(exec);

interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

/**
 * Execute shell commands inside the container
 */
class DevAgent {
  private workspaceDir = process.cwd();
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * Run a shell command
   */
  async runCommand(command: string): Promise<CommandResult> {
    try {
      console.log(`\n$ ${command}`);
      const { stdout, stderr } = await execAsync(command, {
        cwd: this.workspaceDir,
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      });

      if (stdout) console.log(stdout);
      if (stderr && !stderr.includes('warning')) console.error(stderr);

      return { stdout, stderr, exitCode: 0 };
    } catch (error: any) {
      const stderr = error.stderr || error.message || 'Unknown error';
      console.error(stderr);
      return {
        stdout: error.stdout || '',
        stderr,
        exitCode: error.code || 1,
      };
    }
  }

  /**
   * Read a file from the repository
   */
  async readFile(filePath: string): Promise<string> {
    try {
      const fullPath = path.join(this.workspaceDir, filePath);
      return await fs.readFile(fullPath, 'utf-8');
    } catch (error: any) {
      throw new Error(`Failed to read ${filePath}: ${error.message}`);
    }
  }

  /**
   * Write a file to the repository
   */
  async writeFile(filePath: string, content: string): Promise<void> {
    try {
      const fullPath = path.join(this.workspaceDir, filePath);
      await fs.writeFile(fullPath, content, 'utf-8');
      console.log(`✓ Written to ${filePath}`);
    } catch (error: any) {
      throw new Error(`Failed to write ${filePath}: ${error.message}`);
    }
  }

  /**
   * List files in a directory
   */
  async listDir(dirPath: string = '.'): Promise<string[]> {
    try {
      const fullPath = path.join(this.workspaceDir, dirPath);
      const files = await fs.readdir(fullPath);
      return files;
    } catch (error: any) {
      throw new Error(`Failed to list ${dirPath}: ${error.message}`);
    }
  }

  /**
   * Git operations
   */
  async gitStatus(): Promise<string> {
    const result = await this.runCommand('git status --short');
    return result.stdout;
  }

  async gitAdd(files: string = '.'): Promise<void> {
    await this.runCommand(`git add ${files}`);
  }

  async gitCommit(message: string): Promise<void> {
    const safeMessage = message.replace(/"/g, '\\"');
    await this.runCommand(`git commit -m "${safeMessage}"`);
  }

  async gitPush(branch: string = 'main'): Promise<void> {
    await this.runCommand(`git push origin ${branch}`);
  }

  /**
   * NPM operations
   */
  async npmInstall(): Promise<void> {
    await this.runCommand('npm ci --frozen-lockfile');
  }

  async npmBuild(): Promise<void> {
    console.log('\n🔨 Building CloudHop...');
    const result = await this.runCommand('npm run build');
    if (result.exitCode === 0) {
      console.log('✓ Build successful');
    } else {
      throw new Error('Build failed');
    }
  }

  async npmLint(): Promise<void> {
    console.log('\n🔍 Linting...');
    const result = await this.runCommand('npm run lint');
    if (result.exitCode === 0) {
      console.log('✓ Lint passed');
    }
  }

  async npmTest(): Promise<void> {
    console.log('\n🧪 Running tests...');
    const result = await this.runCommand('npm test');
    if (result.exitCode === 0) {
      console.log('✓ Tests passed');
    }
  }

  /**
   * Docker operations
   */
  async dockerStatus(): Promise<string> {
    const result = await this.runCommand('docker ps -a --format "table {{.Names}}\\t{{.Status}}"');
    return result.stdout;
  }

  /**
   * Interactive prompt
   */
  private prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  /**
   * Main interactive loop
   */
  async interactive(): Promise<void> {
    console.log(`
╔════════════════════════════════════╗
║  CloudHop Dev Agent                ║
║  Workspace: ${this.workspaceDir.split('/').pop() || this.workspaceDir}${' '.repeat(18 - (this.workspaceDir.split('/').pop() || this.workspaceDir).length)}║
╚════════════════════════════════════╝

Type 'help' for available commands.
    `);

    let running = true;
    while (running) {
      const input = await this.prompt('\n> ');
      const [command, ...args] = input.trim().split(' ');

      try {
        switch (command.toLowerCase()) {
          case 'help':
            this.printHelp();
            break;

          case 'build':
            await this.npmBuild();
            break;

          case 'lint':
            await this.npmLint();
            break;

          case 'test':
            await this.npmTest();
            break;

          case 'install':
            await this.npmInstall();
            break;

          case 'status':
            console.log(await this.gitStatus());
            break;

          case 'commit':
            const message = args.join(' ') || (await this.prompt('Commit message: '));
            await this.gitAdd();
            await this.gitCommit(message);
            break;

          case 'push':
            const branch = args[0] || 'main';
            await this.gitPush(branch);
            break;

          case 'docker':
            console.log(await this.dockerStatus());
            break;

          case 'read':
            if (!args[0]) {
              console.log('Usage: read <filepath>');
              break;
            }
            const content = await this.readFile(args[0]);
            console.log(content);
            break;

          case 'ls':
            const dir = args[0] || '.';
            const files = await this.listDir(dir);
            console.log(files.join('\n'));
            break;

          case 'run':
            const cmd = args.join(' ');
            if (!cmd) {
              console.log('Usage: run <command>');
              break;
            }
            await this.runCommand(cmd);
            break;

          case 'exit':
          case 'quit':
            running = false;
            break;

          default:
            if (command) {
              await this.runCommand(input);
            }
        }
      } catch (error: any) {
        console.error(`❌ Error: ${error.message}`);
      }
    }

    this.rl.close();
    console.log('\nGoodbye!');
  }

  private printHelp(): void {
    console.log(`
Available Commands:

  build           - Build CloudHop (npm run build)
  lint            - Run linter
  test            - Run tests
  install         - Install dependencies
  
  status          - Git status
  commit <msg>    - Stage and commit changes
  push [branch]   - Push to GitHub
  
  docker          - Show running containers
  
  read <file>     - Read a file
  ls [dir]        - List directory
  run <cmd>       - Run arbitrary shell command
  
  help            - Show this menu
  exit            - Exit the agent

Examples:
  > build
  > npm run dev
  > commit Update dashboard UI
  > push production
  > read src/App.tsx
    `);
  }
}

// Run agent
if (require.main === module) {
  const agent = new DevAgent();
  agent.interactive().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default DevAgent;
