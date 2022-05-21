// NodeJs 12.x version or greater has not supported require("fs/promises")
// https://stackoverflow.com/questions/64725249/fs-promises-api-in-typescript-not-compiling-in-javascript-correctly
const fs = require('fs').promises;
const rimraf = require('rimraf');
const svgr = require('@svgr/core').default;
const camelcase = require('camelcase');
const babel = require('@babel/core');
const { minify } = require('terser');
const path = require('path');

const outputPath = path.resolve(__dirname, './jsx');

async function transformSVGtoJSX(file, componentName) {
	const content = await fs.readFile(
		path.resolve(__dirname, `./optimized/${file}`),
		'utf-8'
	);
	const svgReactContent = await svgr(
		content,
		{
			icon: false,
			replaceAttrValues: { '#000': "{props.color || '#FFF'}" },
			svgProps: {
				width: '{props.width}',
				height: '{props.width}',
				fill: '{props.color}' || '#000',
			},
		},
		{ componentName }
	);
	const { code } = await babel.transformAsync(svgReactContent, {
		presets: [['@babel/preset-react', { useBuiltIns: true }]],
	});

	const { code: minifiedCode } = await minify(code);
	return minifiedCode;
}

function indexFileContent(files, includeExtension = true) {
	let content = '';
	const extension = includeExtension ? '.js' : '';
	files.map((fileName) => {
		const componentName = `${camelcase(fileName.replace(/.svg/, ''), {
			pascalCase: true,
		})}Icon`;
		const directoryString = `'./builder/jsx/${componentName}${extension}'`;
		content += `export { default as ${componentName} } from ${directoryString};\n`;
	});
	return content;
}

async function buildIcons() {
	let outDir = outputPath;
	await fs.mkdir(outDir, { recursive: true });

	const files = await fs.readdir(
		path.resolve(__dirname, './optimized'),
		'utf-8'
	);

	await Promise.all(
		files.flatMap(async (fileName) => {
			const componentName = `${camelcase(fileName.replace(/.svg/, ''), {
				pascalCase: true,
			})}Icon`;
			const content = await transformSVGtoJSX(fileName, componentName);
			const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element;\nexport default ${componentName};\n`;

			// console.log(`- Creating file: ${componentName}.js`);
			await fs.writeFile(`${outDir}/${componentName}.js`, content, 'utf-8');
			await fs.writeFile(`${outDir}/${componentName}.d.ts`, types, 'utf-8');
		})
	);

	console.log('- Creating file: index.js');
	const indexPath = __dirname + '/../index.ts';
	console.log(`KDebugger -> build -> buildIcons`, indexPath);
	await fs.writeFile(indexPath, indexFileContent(files), 'utf-8');
}

(function main() {
	console.log('🏗 Building icon package...');
	new Promise((resolve) => {
		rimraf(`${outputPath}/*`, resolve);
	})
		.then(() => Promise.all([buildIcons()]))
		.then(() => console.log('✅ Finished building package.'));
})();
