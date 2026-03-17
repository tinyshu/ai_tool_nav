# tools 目录说明

本目录用于存放各个工具卡片使用的「真图片」资源。

## 使用方式

- 图片会通过 `ToolItem.image` 字段引用：
  - `image: "lingdong.png"` 对应路径 `/tools/lingdong.png`
  - 实际文件应放在本目录：`public/tools/lingdong.png`
- `ToolCard` 组件会优先使用 `image` 渲染图片；
  - 如果 `image` 为空或不存在，则回退为原来的「渐变底色 + 文字 icon」样式。

## 命名规范建议

- 仅使用 **小写英文字母、数字和连字符**：`a-z 0-9 -`
- 不要使用空格和中文路径，示例：
  - ✅ `lingdong.png`
  - ✅ `chatgpt-logo.webp`
  - ❌ `凌动AI.png`
  - ❌ `Chat GPT.png`

推荐使用 `webp` 或 `png`，尺寸建议在 **96×96 ~ 256×256** 之间，体积尽量控制在几十 KB。

