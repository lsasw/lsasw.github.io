# 七智的个人博客

这是部署在 GitHub Pages 上的纯静态个人博客。

## 目录

- `index.html`：首页，展示最近文章。
- `archive.html`：所有文章归档。
- `about.html`：关于页面。
- `posts/`：文章页面。
- `css/blog.css`：博客样式。
- `legacy-home/`：旧首页备份。

## 更新文章

1. 复制 `posts/` 里的任意一篇文章，改文件名、标题、日期和正文。
2. 在 `archive.html` 的 `post-list` 里新增一行。
3. 如果是最近文章，也同步更新 `index.html` 的最近文章列表。
4. 提交并推送到 `master`，GitHub Pages 会自动更新。
