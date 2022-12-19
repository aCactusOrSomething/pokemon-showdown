'use strict';

require('ts-node').register({project: './tsconfig.json', files: true, transpileOnly: true, transpiler: 'ts-node/transpilers/swc-experimental'});
const {Teams} = require('../.sim-dist');
const {Dex} = require('../.sim-dist/dex');


if (!process.argv[2]) {
	console.log(`Usage: node team-generation-benchmark.js <format> [number of runs]`);
	process.exit(1);
}


const n = parseInt(process.argv[3]) || 10000;


// initial team to warm things up
const format = Dex.formats.get(process.argv[2]);
const generator = Teams.getGenerator(format);
generator.getTeam();

const start = Date.now();
for (let i = 0; i < n; i++) {
	const generator = Teams.getGenerator(format);
	generator.getTeam();
}
const delta = Date.now() - start;
console.log(`${format.name}: ${Math.round((delta / n) * 1000)}ns per team (${n} teams in ${delta}ms)`);
