/* eslint @typescript-eslint/no-var-requires: 0 */
import { getInput } from '@actions/core';
import * as rt from 'runtypes';

if (!process.env.CI) {
  require('dotenv').config();
}

export const config = rt.Record({
  githubToken: rt.String,
  todoistToken: rt.String,
  query: rt.String,
  storageBucket: rt.String,
  syncFileName: rt.String,
});

export type Config = rt.Static<typeof config>;

export async function makeConfig(): Promise<Config> {
  return config.check({
    githubToken: getInput('github-token') || process.env.GITHUB_TOKEN,
    todoistToken: getInput('todoist-token') || process.env.TODOIST_TOKEN,
    query: getInput('query') || process.env.QUERY,
    storageBucket: getInput('storage-bucket') || process.env.STORAGE_BUCKET,
    syncFileName:
      getInput('sync-file-name') || process.env.FILENAME || 'gh-todoist.json',
  });
}
