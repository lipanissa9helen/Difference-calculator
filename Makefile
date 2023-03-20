install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff: 
	node bin/gendiff.js -h

test:
	npm test

test-coverage:
	npm test -- --coverage
	
test-watch:
	npm run test -- --watch
