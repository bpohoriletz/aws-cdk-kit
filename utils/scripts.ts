import * as fs from 'fs';

export function loadScript(app: string, action: string): string {
  try {
    return fs.readFileSync(`../scripts/${app}/${action}.sh`, 'utf8');
  } catch (error) {
    return '';
  }
}
