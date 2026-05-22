import * as core from '@actions/core';
import * as cache from '@actions/cache';

export async function run() {
	try {
		const restored = [];
		const entries = core.getInput('entries', {required: true});
		for (const entry of JSON.parse(entries)) {
			if (await cache.restoreCache(entry.paths, entry.key))
				restored.push(entry.key)
		}
		core.saveState('restored', restored);
	} catch (err) {
		core.setFailed(err.message);
	}
}

run();
