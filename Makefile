install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff: 
	node bin/gendiff.js -h
	
run:
	node bin/gendiff file1.json file2.json

test:
	npm test

test-coverage:
	npm test -- --coverage
	
test-watch:
	npm run test -- --watch	
	
lint:
	npx eslint .
