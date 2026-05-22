import * as core from '@actions/core';
import * as cache from '@actions/cache';

export async function run() {
	try {
		const entries = core.getInput('entries', {required: true});
		for (const entry of JSON.parse(entries)) {
			const key = await cache.saveCache(entry.paths, entry.key);
			if (key)
				core.info(`saved ${key}`);
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}
