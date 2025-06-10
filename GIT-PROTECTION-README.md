# Git Protection Against Accidental Master Pushes

## 🚫 Problem Solved
This setup prevents accidental direct pushes to the `master` branch, which can be difficult to roll back and disrupt the main codebase.

## 🔒 Protections Now Active

### Local Git Hooks
- **Pre-push Hook**: Blocks direct pushes to master branch
- **Commit Message Hook**: Warns when committing directly to master
- **Post-checkout Hook**: Reminds you when switching to master branch

### Git Aliases
- `git new-feature <name>` - Creates a new feature branch from latest master
- `git finish-feature` - Pushes current feature branch and reminds to create PR
- `git safe-push` - Safer alternative to `git push` that blocks master pushes

## 🚀 New Workflow

### Starting New Work
```bash
# Instead of working directly on master:
git new-feature my-awesome-feature

# This automatically:
# 1. Switches to master
# 2. Pulls latest changes
# 3. Creates and switches to feature/my-awesome-feature
```

### Finishing Work
```bash
# Push your feature branch
git finish-feature

# Then create a Pull Request on GitHub
```

### Daily Development
```bash
# Use safe-push instead of git push
git safe-push origin feature-branch

# Regular git push still works for feature branches
git push origin feature-branch
```

## ⚠️ Emergency Override
If you absolutely must push to master (emergency situations only):
```bash
git push --no-verify origin master
```

## 🛡️ Additional Protection Recommendations (GitHub Settings)

As a maintainer, configure these GitHub repository settings:

### 1. Branch Protection Rules
1. Go to **Settings** > **Branches** on GitHub
2. Add rule for `master` branch:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators (applies rules to you too)
   - ✅ Restrict pushes that create files that are larger than 100MB

### 2. Team Training
Share this workflow with your team:
```bash
# Team members should run this once:
git clone <repo-url>
cd tyk-docs
./setup-git-protection.sh
```

### 3. Pull Request Template
Create `.github/pull_request_template.md`:
```markdown
## What does this PR do?

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] I have tested my changes locally
- [ ] I have added tests if applicable

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] My changes generate no new warnings
```

## 🔧 Troubleshooting

### Hook Not Working?
```bash
# Verify hooks are configured
git config core.hooksPath
# Should output: .githooks

# Check hook permissions
ls -la .githooks/
# All hooks should be executable (-rwxr-xr-x)
```

### Need to Share Hooks with Team?
The hooks are in `.githooks/` directory and should be committed to the repo so everyone benefits.

### Accidentally Committed to Master?
```bash
# If you haven't pushed yet:
git reset --soft HEAD~1  # Undo commit, keep changes staged
git checkout -b feature/fix-something
git commit -m "Your commit message"

# If you already pushed (emergency recovery):
git checkout master
git reset --hard HEAD~1
git push --force-with-lease origin master  # ⚠️ Dangerous! Coordinate with team
```

## 📋 Setup for New Team Members

1. Clone the repository
2. Run `./setup-git-protection.sh`
3. Test the protection:
   ```bash
   git checkout master
   echo "test" > test.txt
   git add test.txt
   git commit -m "test commit"
   git push origin master  # This should be blocked!
   ```
4. Clean up test:
   ```bash
   git reset --hard HEAD~1
   rm test.txt
   ```

## 🎯 Best Practices Moving Forward

1. **Always work in feature branches**: `git new-feature <descriptive-name>`
2. **Keep feature branches small**: Easier to review and merge
3. **Use descriptive branch names**: `feature/add-user-auth`, `bugfix/fix-login-redirect`
4. **Regular sync with master**: `git checkout master && git pull origin master`
5. **Clean up old branches**: Delete merged feature branches

This protection system will help prevent the frustrating situation of accidentally pushing to master and having to deal with rollbacks!