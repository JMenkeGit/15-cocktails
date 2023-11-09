#### React Router Fix

(Fix)[https://dev.to/dance2die/page-not-found-on-netlify-with-react-router-58mc]

for the build version:
In order for react router dom to work, in the public folder create a file "\_redirects" and add the following line:

"/\* /index.html 200"

#### CRA Fix

```
for continious deployment, change build to this in the package.json file:

"build": "CI= react-scripts build",

```

```sh
npm install react-router-dom@6
```
