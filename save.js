import * as core from '@actions/core';
import * as cache from '@actions/cache';
import * as fs from 'node:fs/promises';

export async function run() {
	try {
		const restored = new Set(JSON.parse(core.getState('restored')));
		const entries = core.getInput('entries', {required: true});
		for (const entry of JSON.parse(entries)) {
			if (restored.has(entry.key))
				continue;
			try {
				await Promise.any(entry.paths.map(fs.stat));
			} catch (err) {
				continue;
			}
			if (await cache.saveCache(entry.paths, entry.key))
				core.info(`saved ${entry.key}`);
		}
	} catch (err) {
		core.setFailed(err.message);
	}
}

run();
