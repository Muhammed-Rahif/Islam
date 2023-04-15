# Contributing to Islam app

Thank you for considering contributing to this Islam app project! We appreciate your help and support in spreading the message of Islam and may Allah (SWT) reward you abundantly for your efforts.

## Getting Started

To get started with contributing, you will need to set up the project on your local machine. You can do this by following the instructions below.

### Prerequisites

Before you can start developing, you will need to make sure the following are installed on your system:

- Node.js
- Yarn
- @ionic/cli
- @capacitor/cli
- Git
- Git Conventional Commits

You can install these globally by running the following commands:

```bash
# Install Node.js
# https://nodejs.org/en/download

# Install Git
# https://git-scm.com/downloads

# Install Yarn
npm install -g yarn

# Install @ionic/cli and @capacitor/cli
npm install -g @ionic/cli @capacitor/cli

# Install Git Conventional Commits
npm install --global git-conventional-commits
```

## Setting up the project

1. Clone the repository:

```bash
git clone https://github.com/Muhammed-Rahif/Islam.
```

2. Go to project directory in your local mechine.

```bash
cd Islam
```

3. Initialize git conventional commits

```bash
git-conventional-commits init
```

Now open the project in [VS Code](https://code.visualstudio.com/) or your preferred code editor.

## Development

To start developing new features or fixing bugs, follow these steps:

**1. Create a new branch from the main branch:**

```bash
git checkout main
git pull
git checkout -b feat/my-new-feature # or 'fix/my-fix' 'docs/my-doc'
```

**2. Install the project dependencies:**

```bash
yarn install
```

**3. Start the development server:**

```bash
ionic serve
```

This will start a local development server at http://localhost:8100. You can make changes to the code and see the changes reflected in the browser.

**4. When you are done making changes, commit your changes to your branch using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):**

```bash
git add .
git commit -m "feat: add my new feature"
git push origin feat/my-new-feature # or 'fix/my-fix' 'docs/my-doc'
```

Please use one of the following prefixes to indicate the type of change:

- feat: for new features
- fix: for bug fixes
- docs: for documentation updates
- style: for formatting or style changes that do not affect code
- refactor: for code refactoring or restructuring
- test: for adding or updating tests
- chore: for other changes, such as build process, dependencies, or tooling.

For more advanced commit message, [Semantic Commit Messages](https://gist.github.com/Muhammed-Rahif/cf0d4b78f6ec8ea6ef2e2e6025b7e37f) and [Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13). You can check and use any scopes and options from [git-conventional-commits.yaml](git-conventional-commits.yaml) file.

**5. Create a pull request (PR) for your changes:**

- Go to the project repository on GitHub
- Click on the "Pull requests" tab
- Click on the "New pull request" button
- Select your branch from the "Compare" dropdown menu
- Review your changes and add a description for your PR
- Click on the "Create pull request" button
- Your changes will now be reviewed by the project maintainers. They may request changes or ask for more information before merging your changes.

## Testing

1. Make sure the development server is running:

```bash
ionic serve
```

2. Run the tests using Playwright:

```
yarn playwright test
```

This will run the tests in the [`src/tests`](src/tests) directory and generate a report with the results.

To view the test report, open the `index.html` file located in the `playwright-report` directory in your browser. You can find this directory after running the tests.

If you need to modify or add more tests, please ensure that the tests follow the conventions established in the existing test files, and that they cover all relevant use cases.

## Conclusion

We appreciate your interest in contributing to this Islam app project. By following the guidelines in this document, you will help us ensure that the project remains high quality and easy to maintain, inshaAllah.

If you have any questions or need help getting started, please don't hesitate to reach out to the project maintainers or the community. We're always happy to help newcomers get started and contribute to the project.

May Allah (SWT) reward you for your efforts and make them a means of benefiting the ummah.
