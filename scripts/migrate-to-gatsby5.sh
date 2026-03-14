#!/bin/bash
#
# Blog Migration Helper Script
# Run this from the blog root directory: ./scripts/migrate-to-gatsby5.sh
#

set -e

echo "🚀 Blog Migration: Gatsby 2.x → 5.x"
echo "====================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Run this script from the blog root.${NC}"
    exit 1
fi

# Confirm Node version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" != "22" ]; then
    echo -e "${YELLOW}Warning: Node 22 recommended. Current: $(node --version)${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${GREEN}✓ Node $(node --version) detected${NC}"
echo ""

# Phase 1: Backup
echo "📦 Phase 1: Creating backup branch..."
if git rev-parse --verify backup/gatsby-2-original >/dev/null 2>&1; then
    echo "Backup branch already exists"
else
    git checkout -b backup/gatsby-2-original
    git push origin backup/gatsby-2-original 2>/dev/null || echo "Could not push backup branch"
    git checkout main 2>/dev/null || git checkout master
fi
echo -e "${GREEN}✓ Backup branch ready${NC}"
echo ""

# Phase 2: Test current build
echo "🧪 Phase 2: Testing current build..."
echo "This may take a few minutes..."

if npm run build > /tmp/current-build.log 2>&1; then
    echo -e "${GREEN}✓ Current build successful${NC}"
    BUILD_SUCCESS=true
else
    echo -e "${YELLOW}⚠ Current build failed (see /tmp/current-build.log)${NC}"
    BUILD_SUCCESS=false
fi
echo ""

# Phase 3: Clean dependencies
echo "🧹 Phase 3: Cleaning dependencies..."
read -p "Remove node_modules and package-lock.json? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf node_modules package-lock.json
    echo -e "${GREEN}✓ Dependencies cleaned${NC}"
else
    echo "Skipping clean..."
fi
echo ""

# Phase 4: Update React & Core
echo "⬆️ Phase 4: Updating React to 18..."
npm install react@18 react-dom@18 --save
echo -e "${GREEN}✓ React 18 installed${NC}"
echo ""

# Phase 5: Update Emotion
echo "🎨 Phase 5: Updating Emotion to v11..."
npm install @emotion/react@11 @emotion/styled@11 --save
npm uninstall @emotion/core emotion-theming 2>/dev/null || true
echo -e "${GREEN}✓ Emotion 11 installed${NC}"
echo ""

echo "📝 Manual Steps Required:"
echo "========================"
echo ""
echo "1. Update gatsby-config.js MDX configuration:"
echo "   - Remove defaultLayouts from gatsby-plugin-mdx options"
echo "   - Create gatsby-browser.js and gatsby-ssr.js with wrapPageElement"
echo ""
echo "2. Update src/templates/post.js:"
echo "   - Change: import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'"
echo "   - To: import { MDXProvider } from '@mdx-js/react'"
echo ""
echo "3. Update all components using @emotion/core:"
echo "   - Change: import {css} from '@emotion/core'"
echo "   - To: import {css} from '@emotion/react'"
echo ""
echo "4. Update gatsby-node.js GraphQL:"
echo "   - Change: sort: {order: DESC, fields: [frontmatter___date]}"
echo "   - To: sort: {frontmatter: {date: DESC}}"
echo ""
echo "5. Then run: npm install gatsby@5"
echo ""
echo -e "${YELLOW}See MIGRATION_PLAN.md for detailed instructions${NC}"
echo ""

# Summary
echo "📋 Summary:"
echo "==========="
echo "Backup created: backup/gatsby-2-original"
echo "Current build: $([ "$BUILD_SUCCESS" = true ] && echo 'WORKING' || echo 'BROKEN')"
echo "React: 18.x"
echo "Emotion: 11.x"
echo "Next: Gatsby 5 installation"
echo ""
echo -e "${GREEN}Phase 1-3 complete! Proceed with manual Phase 4 steps.${NC}"
