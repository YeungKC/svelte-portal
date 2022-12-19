# svelte-portal

一个用于 Svelte 的 Portal 库。**没有 Dom 移动操作**和支持 SSR。

在线 example：<https://svelte-portal.vercel.app/>

example 代码：<https://github.com/YeungKC/svelte-portal/tree/master/src/routes>

## 安装

```bash
yarn add @yeungkc/svelte-portal -D
npm install @yeungkc/svelte-portal --save-dev
```

## 用法

### 设置 Portal 容器

一般在 +layout.svelte 设置 `<PortalContainer />`，例如：

```svelte
// +layout.svelte
<slot />
<PortalContainer />
```

可以设置多个 Portal Container，使用 name 参数区分：

```svelte
// +layout.svelte
<slot />
<PortalContainer name="foo" />
```

### 展示 Portal

在想要展示 Portal 的地方设置 `<Portal />`，用法和 `<svelte:component>` 相同。

```svelte
<Portal portal-id="id" portal-container-name="name" this={SomeComponent} />
```

如果 SomeComponent 需要参数 foo，可以在 `<Portal>` 中添加：

```svelte
<Portal portal-id="id" portal-container-name="name" this={SomeComponent} {foo} />
```

`portal-id` 为可选参数，为 portal 设置固定 id，默认为随机 id。
`portal-container-name` 为可选参数，为 portal 选择不同的 portal container。

## 已知问题

目前 svelte-portal 不能像 <svelte:component> 那样设置 bind 和转发 event。
