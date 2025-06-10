#!/bin/bash

echo "🔒 Setting up Git protection against accidental master pushes..."
echo "═══════════════════════════════════════════════════════════════"

# Create .githooks directory if it doesn't exist
if [ ! -d ".githooks" ]; then
    echo "❌ .githooks directory not found!"
    echo "Please run this script from the repository root directory."
    exit 1
fi

# Configure Git to use the custom hooks directory
echo "📁 Configuring Git hooks directory..."
git config core.hooksPath .githooks

# Make hooks executable
echo "🔧 Making hooks executable..."
chmod +x .githooks/pre-push
chmod +x .githooks/commit-msg

# Set up helpful Git aliases
echo "⚙️  Setting up helpful Git aliases..."
git config alias.safe-push '!f() { current=$(git symbolic-ref HEAD --short); if [ "$current" = "master" ]; then echo "🚫 Cannot push to master directly. Use: git push origin feature-branch-name"; else git push "$@"; fi; }; f'
git config alias.new-feature '!f() { git checkout master && git pull origin master && git checkout -b "feature/$1"; }; f'
git config alias.finish-feature '!f() { branch=$(git symbolic-ref HEAD --short); git push origin "$branch" && echo "✅ Pushed $branch. Now create a PR on GitHub!"; }; f'

# Set up branch protection reminder
echo "🛡️  Setting up branch protection..."
cat > .git/hooks/post-checkout << 'EOF'
#!/bin/bash
if [ "$3" = "1" ]; then  # Branch checkout (not file checkout)
    current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
    if [ "$current_branch" = "master" ]; then
        echo ""
        echo "⚠️  You're now on the MASTER branch!"
        echo "Remember to create a feature branch before making changes:"
        echo "  git new-feature <feature-name>"
        echo ""
    fi
fi
EOF
chmod +x .git/hooks/post-checkout

echo ""
echo "✅ Git protection setup complete!"
echo ""
echo "📚 New Git commands available:"
echo "  git new-feature <name>     - Create a new feature branch"
echo "  git finish-feature         - Push current feature branch"
echo "  git safe-push             - Safer push command"
echo ""
echo "🔒 Protections now active:"
echo "  ✓ Pre-push hook blocks direct pushes to master"
echo "  ✓ Commit message hook warns when committing to master" 
echo "  ✓ Post-checkout hook reminds you when on master"
echo "  ✓ Safe-push alias prevents accidental master pushes"
echo ""
echo "⚠️  To bypass in emergencies only: git push --no-verify origin master"
echo ""