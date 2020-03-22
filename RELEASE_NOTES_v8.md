# `wix-style-react` v8 is out!

## High-Level Goals for v8
`wix-style-react` was created back in 2017, aiming to provide developers a component library they can use, building their applications. The library grew fast, thanks to the help of many contributors, making it the most popular and well-maintained component library in Wix. As it evolved, a lot of changes has been done, both from design level and code best practices.

Components changed independently to provide more features, while common behavior and constrains were implemented differently across components. Also, the design of the system was changed and a lot, but some legacy code was left dead and still exists in the codebase, causing confusion and an increase of bundle size.

From technical point of view, modern approaches for code optimizations like tree shaking and dynamic imports started to become popular, but the library didn't exploit it.

All of that and more, were the main reasons for a new major version, focusing on **Performance**, **Quality** and **Consistency**. Please refer to the [Migration Guide](./MIGRATION.md) for the required changes in your code.

## Performance

More than 20,000 lines of code were removed, reflecting in less legacy code, smaller installation size and small bundle size of components that are available in every application using `wix-style-react`. Bundle size change are measured on every pull-request, as you can see [in this example](https://github.com/wix/wix-style-react/pull/5013/checks), meaning its easier to identify degregation and stop them.

### Removing Legacy Code
Since v6, the `Tooltip` component was "upgraded" under the hood to a new and improved one using `Popper.js`. In order to ease the migration, the `upgrade` prop was added to allow consumers to choose between the legacy component and the new one while displaying a "deprecation message" for those who didn't upgrade.

While this approach allowed the migration to be done more easily, it caused an increase of bundle size. By removing the old code, the component got smaller by **20%**! Similar change reduced **10%** in the `Page` component. More legacy CSS code was also removed from the inputs, so another small gain with minimal effort.

### Bundling optimization
Until now, the library supported the import of `CommonJS` modules, which were better than importing the entire library, however, it didn't benefit from the gains of using `ESModule` approach.

#### Tree Shaking
By changing our system to support `ESM`, the consumers can immediately benefit from **Tree-Shaking** and reduce up to **20% of bundle size**! We already see some very successful migrations and will be happy if you can [share your results](https://mykolass.wixsite.com/biggest-looser) with us

```diff
- import Button from 'wix-style-react/Button';
+ import { Button } from 'wix-style-react';
```

#### Dynamic imports
`ESM` support also allows us to implement **Dynamic Import** inside our components.  This is a mandatory first step towards our future changes to drastically reduce the initial load of applications, especially heavy components such as `DatePicker` and `Popover`. We predict dynamically loading can reduce **50%** of the initial size for such components.

Stay tuned for these improvements in the next versions, following [this RFC](https://github.com/wix/wix-style-react/issues/4847)

## Quality and Consistency
As the following changes might look cosmetic, they help in creating a standard way to declare APIs, consume components, and reduce support requests.

***Patterns*** - The `FormField` component exists for a while now and supports any kind of children to add a label and common informative indicators. Therefore, all past composites such as `FieldWithSelectionComposite` can be safely removed.

![image](https://user-images.githubusercontent.com/6093192/77247248-dc1b5000-6c37-11ea-91d0-6601e4243a52.png)

***Legacy components*** - The `SideMenu` component was removed and instead, the up-to-date `SideBar` component with a much simpler, yet powerful API and light/dark skins.

![image](https://user-images.githubusercontent.com/6093192/77247093-619e0080-6c36-11ea-9ba2-6ff9c257cae9.png)

***Consistent APIs*** - While `Input` was almost the only component to support `statusMessage` instead of `error` and `errorMessage`, this now became a standard for all input and selection families.

![image](https://user-images.githubusercontent.com/6093192/77247069-18e64780-6c36-11ea-9e9e-1abd7e6d37d0.png)

***Predictable APIs*** - Now when the new `Tooltip` is out, we created a standard way to pass tooltip props for ones that use it. For example, the `AddItem` component now gets `tooltipProps` instead of `tooltipContent` and other specific props. This makes API much more stable and controlled from one place.

***Separation of the icons library*** - the `Icons` used by `wix-style-react` were separated to a standalone library [`wix-ui-icons-common`](https://wix-wix-ui-icons-common.surge.sh/) in order to allow more control on changes and make it possible to use by other design systems. Its documentation will also be updated in the near future for easier discoverability.

## Next Steps
While a lot of work was already done in this major version, a lot done in minor versions as well, for example, the addition of Typescript type definitions, Unidriver for each component, documentation improvements, Mobile Web, SSR support and much more.

The library keeps moving forward towards a much better future, as we put our focus a lot more on the performance of components, standartizing APIs and improving/rewriting legacy components.

Also, we are working hard on defining the right approach for the library's theme, which will allow using `wix-style-react` in more projects.