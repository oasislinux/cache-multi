import * as core from '@actions/core';
import * as cache from '@actions/cache';

export async function run() {
	const entries = core.getInput('entries', {required: true});
	for (const entry of JSON.parse(entries))
		await cache.saveCache(entry.paths, entry.key);
}
