# svelte-portal

A Portal library for Svelte. Supports SSR and Portal updates.

[中文说明](README-zh.md)

online example：<https://svelte-portal.vercel.app/>

example code：<https://github.com/YeungKC/svelte-portal/tree/master/src/routes>

## Installation

```bash
yarn add @yeungkc/svelte-portal -D
npm install @yeungkc/svelte-portal --save-dev
```

## Usage

### Setup Portal Container

It is recommended to set up the `<PortalContainer />` in your +layout.svelte, for example:

```svelte
// +layout.svelte
<slot />
<PortalContainer />
```

You can setup multiple Portal Containers by using the name parameter:

```svelte
// +layout.svelte
<slot />
<PortalContainer name="foo" />
```

### Show Portal

Setup the `<Portal />` where you want it to be displayed. The usage is similar to `<svelte:component>`.

```svelte
<Portal portal-id="id" portal-container-name="name" this={SomeComponent} />
```

If SomeComponent requires a parameter, foo, you can add it in the `<Portal>`:

```svelte
<Portal portal-id="id" portal-container-name="name" this={SomeComponent} {foo} />
```

`portal-id` is an optional parameter for setting a fixed id for the Portal. It defaults to a random id.

`portal-container-name` is an optional parameter for selecting a specific Portal Container for the Portal.

## Known issues

Currently, svelte-portal does not support setting bind and forwarding event like <svelte:component>.
