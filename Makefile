unit:
	yarn test:unit:watch

# Assumes that:
# - You are on the master branch
# - Your dist npm task puts things into the dist/ folder
gh-pages:
	-git checkout -b gh-pages
	git checkout gh-pages
	git merge master
	npm run dist
	cp dist/* .
	git add . && git commit -m "♻️ 📄"
	git push origin gh-pages
	git checkout master
