# Upgrading `wix-style-react` to version 8
---

Upgrading to version 8 will give you better performacne, better api and most importantly keep you in sync with the continusly ongoing features in the library. Upgrading requires some effort from your side, but in order to make it as smooth as possible we have created this detailed migration guide.

## Imports

### Named imports
For better performance we introduced named imports which will allow yoshi or custom webpack to eliminate dead code in our components. [Read more about tree-shaking](https://webpack.js.org/guides/tree-shaking/)

Cherry-pick imports are no longer supported, instead you should use the named imports.
```diff
- import TextButton from 'wix-style-react/TextButton';
+ import { TextButton } from 'wix-style-react';
```

In order to easily replace the mentioned import, run the following codemod:
```jsx
npx wix-ui-codemod wix-style-react/named-imports ./src
```

This codemode should be able to take care of these:
```diff
- import TextButton from 'wix-style-react/TextButton';
- import TextButton from 'wix-style-react/dist/src/TextButton';
- import TextButton from 'wix-style-react/TextButton';
- import PopoverMenu, {PopoverMenuProps} from 'wix-style-react/beta/PopoverMenu';
```
But it will not handle namespace based imports and this should be handled manually:
```
import * as SomeIconButton from 'wix-style-react/IconButton';
```

### Icons
Icons import from `wix-style-react` is no longer supported. Instead you should import them from `wix-ui-icons-common`
```diff
- import Add from 'wix-style-react/new-icons/Add';
+ import Add from 'wix-ui-icons-common/Add';
```
In order to easily replace the mentioned imports, run the following codemods which does it for you:
```jsx
npx wix-ui-codemod wix-style-react/icons-common <path>
```

### Testing after migration

To double check that everything works well, just make sure to run yoshi build or any build tool like storybook to see if there are any errors thrown.

## Next steps
The next steps of migration will require you to remove the usage of obsolete components, and in other cases, adapt your usage to api changes.
All changes are categorized by components in the index section below. But before you dive in, we advise you to take a couple of minutes and get familiar with the changes we did, by reading the following overview section.

### Migration overview

#### Remove old and deprecated components
1. The follwing components are removed due to the previous version of the `FormField` component. They were deprecated for a long time and will not be available anymore:
- `<AutoCompleteComposite/>`
- `<FieldWithSelectionComposite/>`
- `<GoogleAddressInputWithLabel/>`
- `<InputAreaWithLabelComposite/>`
- `<MultiSelectComposite/>`
2. The following components are removed due to a more up-to-date APIs
- `<FullTextView/>`
- `<HBox/>`, `<VBox/>`
- `<StatsWidget/>`
- `<TextLink/>`
3. - Remove `SideMenu` in favor of the new up-to-date and easy to use `SideBar` component:
- `<SideMenu/>` `<SideMenuDrill/>`
4. Remove `<DataTable/>` - This component became _internal_ and should not be used directly - use `<Table/>` instead
- `<DataTable/>`
#### Standardize components with tooltip props configuration
change the usage of internal tooltips - instead of passing specific props (e.g. `tootlipContent`), you are now allowed to propagate the entire `tooltipProps`
- `<AddItem/>`
- `<FillButton/>`
- `<ImageViewer/>`
#### Standardize input components message indications
 Changed message indication to `status` and `statusMessage` instead of `error`, `errorMessage`, `help` and `helpMessage`.
 - `<ColorInput/>`
 - `<DatePicker/>`
 - `<Dropdown/>`
 - `<GoogleAddressInput/>`
 - `<ImageViewer/>`
 - `<Input/>`
 - `<InputArea/>`
 - `<InputWithOptions/>`
 - `<MultiSelect/>`
 - `<NoBorderInput/>`
 - `<NumberInput/>`
 - `<RichTextInputArea/>`
 - `<Search/>`
 #### Remove old skins and themes
The library contained a lot of old code, including unsupported styles of the design system. Many components used a `theme` prop that is now removed
- `<DropdownLayout/>`
- `<GoogleAddressInput/>`
- `<Input/>`
- `<InputArea/>`
- `<MultiSelect/>`
- `<NoBorderInput/>`
- `<NumberInput/>`
- `<Search/>`
 #### More general changes
- `<Avatar/>` - remove old and deprecated colors.
- `<CircularProgressBar/>` - remove exeperimental dynamic loading, in favor of future improvements. also remove legacy driver methods.
-` <DatePicker/>` - change `isOpen` to `initialOpen`
- `<Input/>` - removed legacy sub component `<Input.Units/>` and the `magnifyingGlass` props
- `InputArea/>` - removed `onTooltipShow
- `<LinearProgressBar/>` - remove exeperimental dynamic loading, in favor of future improvements. also remove legacy driver methods.
- `<Loader/>` - remove exeperimental dynamic loading, in favor of future improvements.
- `<RadioGroup/>` - remove `type`, a deprecated skin of the radio group in favor of the `<SegmentedToggle/>` component
- `<StatisticsWidget/>` - remove `statistics` prop.
- `<Table/>` - remove `clickRowChecbox` - removed due to typo, use `clickRowCheckbox` instead
- `<TableActionCell/>` - use new `Tooltip` component internally and rename the `primaryAction.theme` prop to `primaryAction.skin`
- `<Tag/>` - wrap text by default.
### Bigger Topics
- `<InputWithOptions/>` (and the entire dropdown family) - change default behavior to not call `clickOutside` when popover is closed.
- `<Popover/>`  - change default behavior to not call `clickOutside` when popover is closed.
- `<Page/>` - remove `upgrade`, to better performance, new API features and slickness.
- `<PopoverMenu/>` - Change implementation to the previously `beta PopoverMenu`
- `<Tooltip/>` - Change implemenation to the upraded `Tooltip`

Now when you are more familiar with the changes of the new version, you can use the detailed instructions for the different components, which are used in your codebase.

## Index
<span style="color:#c30000">links don't work in Storybook - only in GitHub. sorry for the inconvenience.</span>
- [Components](#components)
  - [\<AddItem/>](#additem)
  - [\<Avatar/>](#avatar)
  - [\<AutoCompleteComposite/>](#autocompletecomposite)
  - [\<CircularProgressBar/>](#circularprogressbar)
  - [\<ColorInput/>](#colorinput)
  - [\<DataTable/>](#datatable)
  - [\<DatePicker/>](#datepicker)
  - [\<Dropdown/>](#dropdown)
  - [\<DropdownLayout/>](#dropdownlayout)
  - [\<FieldWithSelectionComposite/>](#fieldwithselectioncomposite)
  - [\<FillButton/>](#fillbutton)
  - [\<FullTextView/>](#fulltextview)
  - [\<GoogleAddressInputWithLabel/>](#googleaddressinputwithlabel)
  - [\<GoogleAddressInput/>](#googleaddressinput)
  - [\<HBox/>](#hbox)
  - [\<ImageViewer/>](#imageviewer)
  - [\<Input/>](#input)
  - [\<InputArea/>](#inputarea)
  - [\<InputAreaWithLabelComposite/>](#inputareawithlabelcomposite)
  - [\<InputWithOptions/>](#inputwithoptions)
  - [\<LinearProgressBar/>](#linearprogressbar)
  - [\<Loader/>](#loader)
  - [\<MultiSelect/>](#multiselect)
  - [\<MultiSelectComposite/>](#multiselectcomposite)
  - [\<NoBorderInput/>](#noborderinput)
  - [\<NumberInput/>](#numberinput)
  - [\<Page/>](#page)
  - [\<Popover/>](#popover)
  - [\<PopoverMenu/>](#popovermenu)
  - [\<RadioGroup/>](#radiogroup)
  - [\<RichTextInputArea/>](#sidemenu)
  - [\<Search/>](#search)
  - [\<SideMenu/>](#sidemenudrill)
  - [\<SideMenuDrill/>](#richtextinputarea)
  - [\<StatisticsWidget/>](#statisticswidget)
  - [\<StatsWidget/>](#statswidget)
  - [\<TextLink/>](#textlink)
  - [\<Table/>](#table)
  - [\<TableActionCell/>](#tableactioncell)
  - [\<Tag/>](#tag)
  - [\<Tooltip/>](#tooltip)
  - [\<VBox/>](#vbox)

- [Guides](#guides)
  - [Icons](#icons)
  - [error --> status](#error--errormessage----status--statusmessage)
  - [help prop](#help-prop)

# Components
---

## \<AddItem/>

Props:
- removed `tooltipAppendTo` - use `tooltipProps` instead.
- removed `tooltipContent` - use `tooltipProps` instead.
- removed `tooltipPlacement` - use `tooltipProps` instead.
- removed `tooltipFixed` - use `tooltipProps` instead.
- removed `tooltipFlip` - use `tooltipProps` instead.

_Note: `tooltipProps` are defiled in Tooltip component story page._

<details>
  <summary>Using <code>tooltipProps</code> prop example:</summary>

  Before:
  ```jsx
  <AddItem
    tooltipAppendTo="window"
    tooltipContent="hello"
    tooltipPlacement="top"
    tooltipFixed
    tooltipFlip
  />
  ```

  After:
  ```jsx
  <AddItem
    tooltipProps={
      appendTo: 'window',
      content: 'hello',
      placement: 'top',
      fixed: true,
      flip: true,
    }
  />
  ```
</details>

## \<Avatar/>

Props:
- `color` - Deprecated old values: 'blue', 'green', 'grey', 'red', 'orange'.
- new values are now A1 to A6.

<details>
  <summary>Using new <code>color</code> prop values example:</summary>

  Before:
  ```jsx
  <Avatar color="red" />
  ```

  After:
  ```jsx
  <Avatar color="A1" />
  ```
</details>

## \<AutoCompleteComposite/>

This component was deleted, use `<FormField/>` instead.

<details>
  <summary>Using <code><span><</span>FormField<span>/></span></code> example:</summary>

  Before:
  ```jsx
  <AutoCompleteComposite>
    <Component />
  </AutoCompleteComposite>
  ```

  - After:
  ```jsx
  <FormField>
    <Component />
  </FormField>
  ```
</details>

## \<CircularProgressBar/>

Props:
- removed `shouldLoadAsync` - we decided to remove this feature.

Testkit:
- changed `getTooltipErrorMessage` in driver (not uni) returns a `string` instead of `Promise<string>`.
- removed `getTooltip` - use `isErrorIconShown` and `getTooltipErrorMessage` instead.
- removed `isTooltipShown` - use `isErrorIconShown` and `getTooltipErrorMessage` instead.

## \<ColorInput/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.
- removed `hasError` - use `hasStatus` instead.

## \<DataTable/>

This component is _internal_ and should not be used directly - use `<Table/>` instead.

## \<DatePicker/>

Props:
- removed `isOpen` - use `initialOpen` instead.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

<details>
  <summary>Using <code>initialOpen</code> prop example:</summary>

  Before:
  ```jsx
  <DatePicker isOpen/>
  ```

  - After:
  ```jsx
  <DatePicker initialOpen/>
  ```
</details>

## \<Dropdown/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

## \<DropdownLayout/>

Props:
- removed `theme`

Testkit:
- removed `hasTheme`

## \<FieldWithSelectionComposite/>

This component was deleted, use `<FormField/>` instead.

<details>
  <summary>Using <code><span><</span>FormField<span>/></span></code> example:</summary>

  Before:
  ```jsx
  <FieldWithSelectionComposite>
    <Component />
  </FieldWithSelectionComposite>
  ```

  - After:
  ```jsx
  <FormField>
    <Component />
  </FormField>
  ```
</details>

## \<FillButton/>

Props:
- removed `tooltipContent` - use `tooltipProps` instead

_Note: `tooltipProps` are defiled in Tooltip component story page._

<details>
  <summary>Using <code>tooltipContent</code> prop example:</summary>

  Before:
  ```jsx
  <FillButton tooltipContent="hello" />
  ```

  - After:
  ```jsx
  <FillButton
    tooltipProps={
      content: 'hello',
    }
  />
  ```
</details>

## \<FullTextView/>

This component was deleted, use `<Text/>` instead.

## \<GoogleAddressInputWithLabel/>

This component was deleted, use `<FormField/>` instead.

<details>
  <summary>Using <code><span><</span>FormField<span>/></span></code> example:</summary>

  Before:
  ```jsx
  <GoogleAddressInputWithLabel>
    <Component />
  </GoogleAddressInputWithLabel>
  ```

  - After:
  ```jsx
  <FormField>
    <Component />
  </FormField>
  ```
</details>

## \<GoogleAddressInput/>

Props:
- removed `theme`
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

## \<HBox/>

This component was deleted, use `<Box/>` instead.

## \<ImageViewer/>

Props:
- removed `tooltipPlacement` - use `tooltipProps` instead.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.

Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- removed `isErrorVisible` - use `hasStatus` instead
- removed `getErrorTooltipContent` - use `getStatusMessage` instead

<details>
  <summary>Using <code>tooltipContent</code> prop example:</summary>

  Before:
  ```jsx
  <ImageViewer
    tooltipPlacement="top"
  />
  ```

  - After:
  ```jsx
  <ImageViewer
    tooltipProps={
      placement: 'top',
    }
  />
```
</details>

## \<Input/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.
- removed sub component `<Input.Units/>` use `<Input.Affix/>` component instead
- removed `magnifyingGlass` use `<Search/>` component instead
- removed `theme`

Testkit:
- removed `hasHelp`
- removed `clickUnit`
- removed `getUnit`
- removed `hasMagnifyingGlass`
- removed `clickMagnifyingGlass`
- removed `hasExclamation`
- removed `isNarrowError`
- removed `getTooltipElement`
- removed `getTooltipDataHook`

<details>
  <summary>Using <code><span><</span>Input.Affix<span>/></span></code> sub component example:</summary>

  Before:
  ```jsx
  <Dropdown
    prefix={<Input.Units>$</Input.Units>}
  />
  ```

  - After:
  ```jsx
  <Dropdown
    prefix={<Input.Affix>$</Input.Affix>}
  />
  ```
</details>

## \<InputArea/>

Props:
- removed `onTooltipShow`.
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.
- removed `hasError` - use `hasStatus` & `getStatus` instead.
- removed `hasWarning` - use `hasStatus` & `getStatus` instead.
- removed `getTooltipDataHook`.
- removed `getTooltipElement`.
- removed `isErrorMessageShown`.
- removed `mouseEnterErrorIndicator`.
- removed `getErrorMessage` - use `getStatusMessage` instead.
- removed `getWarningMessage` - use `getStatusMessage` instead.

## \<InputAreaWithLabelComposite/>

This component was deleted, use `<FormField/>` instead.

<details>
  <summary>Using <code><span><</span>FormField<span>/></span></code> example:</summary>

  Before:
  ```jsx
  <InputAreaWithLabelComposite>
    <Component />
  </InputAreaWithLabelComposite>
  ```

  - After:
  ```jsx
  <FormField>
    <Component />
  </FormField>
  ```
</details>

## \<InputWithOptions/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `disableClickOutsideWhenClosed`, this functionality is now permanent <br/>
  Just remove this prop, no other change required.

## \<LinearProgressBar/>

Props:
- removed `shouldLoadAsync` - we decided to remove this feature.

Testkit:
- changed `getTooltipErrorMessage` in driver (not uni) returns a `string` instead of a `Promise<string>`.
- removed `getTooltip` - use `isErrorIconShown` and `getTooltipErrorMessage` instead.
- removed `isTooltipShown` - use `isErrorIconShown` and `getTooltipErrorMessage` instead.

## \<Loader/>

Props:
- removed `shouldLoadAsync` - we decided to remove this feature.

## \<MultiSelect/>

Props:
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.
- removed `inputWrapperHasError` - use `hasStatus` instead.

## \<MultiSelectComposite/>

This component was deleted, use `<FormField/>` instead.

<details>
  <summary>Using <code><span><</span>FormField<span>/></span></code> example:</summary>

  Before:
  ```jsx
  <MultiSelectComposite>
    <Component />
  </MultiSelectComposite>
  ```

  - After:
  ```jsx
  <FormField>
    <Component />
  </FormField>
  ```
</details>

## \<NoBorderInput/>

Props:
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.

## \<NumberInput/>

Props:
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.

## \<Page/>

Props:
- removed `upgrade` - component is now upgraded by default

Features:
- **Flex Parent**: No need for Page parent to be a flex container with flow 'column'.
- **`<Page.FixedContent/>`**: Is now rendered as the new `<Page.Sticky/>` (See Examples in docs).
- **`<Page.Tail>`**: No longer receives a `minimized` prop.
- **`gradientCoverTail`**: Prop removed. Gradient never covers tail.
- **Content Stretch**: `<Page.Content/>` now allows it's children to stretch vertically.
- **Bottom-Padding**: If you had any bottom-padding hacks, remove them!

### Page Container

Previously we required that the Page's parent container will have these styles:

```css
.root {
  height: 100vh;
  display: flex;
  flex-flow: column;
  min-height: 0;
}
```

Now it is enough that the parent has a determined height.

```jsx
<div style={{height: '100vh'}}>
  <Page/>
</div>
```

IMPORTANT: If your page is already in an App structure, your Page container may already have a determined height!

```jsx
+--------------------------------------------------
|                    Header (48px)
+--------------------------------------------------
| Sidebar       |           <Page/>
| (100vh - 48px)|
|               |
|               |
+---------------+----------------------------------
```

#### Horizontal Scroll & min/max width

Horizontal scrolling and min/max width are already supported,
so you can remove any Page wrapper `<div>`'s you might have previously added in order to implement it.

### Content Stretch

This will stretch:

```jsx
<Page.Content>
  <Container stretchVertically>
    <Row stretchViewsVertically>
      <Col>
        <Card stretchVertically>
          <Card.Content>
             Hello World
          </Card.Content>
        </Card>
      </Col>
    </Row>
  </Container>
</Page.Content>
```

## \<Popover/>

Props:
- removed `disableClickOutsideWhenClosed`, this functionality is now permanent <br/>
  Just remove this prop, no other change required.

## \<PopoverMenu/>

Old PopoverMenu component was removed and replaced with new component that was previously available as `beta/PopoverMenu`.

Old PopoverMenu:

```jsx
import PopoverMenu from 'wix-style-react/PopoverMenu';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';

<PopoverMenu>
  <PopoverMenuItem onClick={clickHandler} text="Item" />
</PopoverMenu>;
```

New PopoverMenu:

```jsx
import { PopoverMenu, IconButton } from 'wix-style-react';
import More from 'wix-ui-icons-common/More';

<PopoverMenu
  triggerElement={
    <IconButton skin="inverted">
      <More />
    </IconButton>
  }
>
  <PopoverMenu.MenuItem onClick={clickHandler} text="Item" />
</PopoverMenu>;
```

## \<RadioGroup/>

Props:
- removed `type`.

Testkit:
- removed `isButtonType`.

<details>
  <summary>Using removed <code>type</code> prop with value <code>button</code> example:</summary>

  Before:
  ```jsx
  <RadioGroup type="button" />
  ```

  - After:
  ```jsx
  <SegmentedToggle />
  ```
</details>

## \<RichTextInputArea/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.
- removed `hasError` - use `hasStatus` & `getStatus` instead.
- removed `getErrorMessage` - use `getStatusMessage` instead.

## \<Search/>

Props:
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.

## \<SideMenu/>
This component was deleted, use `<Sidebar/>` instead.
For more information visit [\<Sidebar/>'s storybook page](https://wix-style-react.now.sh/?path=/story/components-api-components--sidebar).

## \<SideMenuDrill/>
This component was deleted, use `<Sidebar/>` instead.
For more information visit [\<Sidebar/>'s storybook page](https://wix-style-react.now.sh/?path=/story/components-api-components--sidebar).

## \<StatisticsWidget/>

Props:
- removed `statistics` use `items` instead.<br>
  _Note: No change needed in an item._

<details>
  <summary>Using <code>items</code> prop example:</summary>

  Before:
  ```jsx
  <StatisticsWidget statistics=[...]/>
  ```

  - After:
  ```jsx
  <StatisticsWidget items=[...]/>
  ```
</details>

## \<StatsWidget/>
This component was deleted, use `<StatisticsWidget/>` instead.

### Differences:
1. In contrast to the old `<StatsWidget/>`, the new `<StatisticsWidget/>` does not render the statistics inside a card. Due to that, also the next props do not exist.
2. `emptyState` prop
3. `suffix` prop which also inclues filters logic.

### New features
1. Keyboard and mouse accesibility features
2. Hover state and click functionality
3. Description tooltip
4. Customized text instead of elipssis

<details>
  <summary>Migrating a Stats widget example with percents example:</summary>

  Old code using `<StatsWidget/>`
  ```jsx
  import React from 'react';
  import StatsWidget from '..';
  import styles from './ExampleStatsWidget.scss';
  import { Container } from '../../Grid';
  import { storySettings } from './storySettings';

  export default () => (
    <Container>
      <div>
        <StatsWidget
          title="Let's see what's going on with your store"
          items={[
             {
               title: '$10',
               subtitle: 'Revenue',
               percent: -15,
             },
             {
               title: '2',
               subtitle: 'Products',
               percent: -15,
             },
             {
               title: '1',
               subtitle: 'Transactions',
               percent: 0,
             },
             {
               title: '$5',
               subtitle: 'Profit',
               percent: 10,
             },
             {
               title: '456',
               subtitle: 'Music',
               percent: 15,
             },
           ]}
          dataHook={storySettings.dataHook}
        />
      </div>
    </Container>
  );
  ```

  New code using `<StatisticsWidget/>`:
  ```jsx
  import React from 'react';
  import StatisticsWidget from 'wix-style-react/StatisticsWidget';
  import Card from 'wix-style-react/Card';

  render(
    <Card>
      <Card.Header title={"Let's see what's going on with your store"} />
      <Card.Content>
        <StatisticsWidget
          items={[
            {
              value: '$10',
              description: 'Revenue',
              percentage: -15,
            },
            {
              value: '2',
              description: 'Products',
              percentage: -15,
            },
            {
              value: '1',
              description: 'Transactions',
              percentage: 0,
            },
            {
              value: '$5',
              description: 'Profit',
              percentage: 10,
            },
            {
              value: '456',
              description: 'Music',
              percentage: 15,
            },
          ]}
        />
      </Card.Content>
    </Card>,
  );
  ```
</details>

<details>
  <summary>Migrating a StatsWidget example with Multiple filters example:</summary>

  Old code using `<StatsWidget/>`
  ```jsx
  import React from 'react';
  import StatsWidget from '..';

  import { Container } from '../../Grid';

  const dropdownOption = [
    { id: 0, value: 'This month' },
    { id: 1, value: 'This week' },
  ];

  const onFilterChange = () => {
    alert('hi');
  };

  export default () => (
     <StatsWidget
       title="Let's see what's going on with your store"
       items={[
       {
         title: '$10',
         subtitle: 'Revenue',
       },
       {
         title: '2',
         subtitle: 'Products',
       },
       {
         title: '1',
         subtitle: 'Transactions',
       },
       {
         title: '$5',
         subtitle: 'Profit',
       },
     ]}
     >
       <StatsWidget.FilterButton
         dataHook="StatsWidgetFilter"
         initialSelectedId={1}
         options={dropdownOption}
         onSelect={onFilterChange}
       />

       <StatsWidget.FilterButton
         dataHook="StatsWidgetFilter"
         initialSelectedId={1}
         options={dropdownOption}
         onSelect={onFilterChange}
       />
     </StatsWidget>
  );
  ```

  New code using `<StatisticsWidget/>`
  ```jsx
  import React from 'react';
  import StatisticsWidget from 'wix-style-react/StatisticsWidget';
  import Card from 'wix-style-react/Card';
  import DropdownBase from 'wix-style-react/DropdownBase';
  import Icons from 'wix-style-react/Icons';
  import TextButton from 'wix-style-react/TextButton';

  class StatsWrapper extends React.Component {
    _getSuffix() {
      return [
        <DropdownBase
          onSelect={({ id }) => alert('hi', id)}
          options={[
            { id: '7d', value: 'Last 7 days' },
            { id: '14d', value: 'Last 14 days' },
          ]}
        >
          {({ toggle, selectedOption = { id: '7d', value: 'Last 7 days' } }) => {
            return (
              <TextButton
                upgrade
                skin="dark"
                suffixIcon={<Icons.ChevronDown />}
                onClick={toggle}
              >
                {selectedOption.value}
              </TextButton>
            );
          }}
        </DropdownBase>,
        <DropdownBase
          onSelect={({ id }) => alert('hi', id)}
          options={[
            { id: 'US', value: 'Only from US' },
            { id: 'All', value: 'All' },
          ]}
        >
          {({ toggle, selectedOption = { id: 'All', value: 'All' } }) => {
            return (
              <TextButton
                upgrade
                skin="dark"
                suffixIcon={<Icons.ChevronDown />}
                onClick={toggle}
              >
                {selectedOption.value}
              </TextButton>
            );
          }}
        </DropdownBase>,
      ];
    }

    render() {
      return (
        <Card>
          <Card.Header title={"Let's see what's going on with your store"} suffix={this._getSuffix()} />
          <Card.Content>
            <StatisticsWidget items={[
       {
         value: '$10',
         description: 'Revenue',
       },
       {
         value: '2',
         description: 'Products',
       },
       {
         value: '1',
         description: 'Transactions',
       },
       {
         value: '$5',
         description: 'Profit',
       },
     ]} />
          </Card.Content>
        </Card>
      );
    }
  }
  ```
</details>

## \<TextLink/>
This component was deleted, use `<TextButton as="a"/>` instead.

<details>
  <summary>Using <code><span><</span>TextButton<span>/></span></code> component example:</summary>

  Before:
  ```jsx
  <TextLink>Hello!</TextLink>
  ```

  - After:
  ```jsx
  <TextButton as="a">Hello!</TextButton>
  ```
</details>

## \<Table/>

Testkit:
- removed `clickRowChecbox` - removed due to typo, use `clickRowCheckbox` instead

## \<TableActionCell/>
Component is now upgraded by default.<br>
The only change is that internally, the new `<PopoverMenu/>` is used.<br>
Therefore the prop `popoverMenuProps` contains new values now.<br>
For more information about `<PopoverMenu/>` visit [`<PopoverMenu/>`'s story page](https://wix-style-react.now.sh/?path=/story/components-api-components--popovermenu)

Props:
- removed `upgrade` - component is now upgraded by default
- changed `primaryAction.theme` to `primaryAction.skin` (with new values)

<details>
  <summary>Using <code>primaryAction.skin</code> prop example:</summary>

  Before:
  ```jsx
  <TableActionCell
    primaryAction={{
      theme: 'standard',
    }}
  />
  ```

  - After:
  ```jsx
  <TableActionCell
    primaryAction={{
      skin: 'standard',
    }}
  />
  ```
</details>

## \<Tag/>

Props:
- removed `wrap` - now text has ellipsis by default<br>
  Just remove this prop, no other change required.

## \<Tooltip/>

### New Tooltip features
- Is Uncontrolled, and only open on HOVER, as per the UX guidelines.
- Uses community backed positioning mechanism `Popper.js`.
- Has a slimmer API.
- Provides clear documentation on how to achieve various way of positioning.
- Uses unidriver.

### Removed props
The following props are not supported anymore and should be remove from your code:
- `active` - Component is uncontrolled component.
- `bounce` - Not supported by UX guidelines.
- `color` - Changing Tooltip theming is not supported.
- `disabled` - Component will read its children props to disable itself.
- `hideTrigger` - Component is uncontrolled.
- `lineHeight` - Text alignment is fixed by internal constants.
- `minWidth`
- `onClickOutside` - Not supported anymore. Component is interactive only on mouse enter or mouse leave.
- `padding` - Not supported by UX guidelines.
- `popover`
- `relative`
- `shouldCloseOnClickOutside`
- `shouldUpdatePosition`
- `showImmediately`
- `showTrigger`
- `theme`
- `upgrade`

The following props were changed/removed and require you to modify your code accordingly:
- `alignment` - changed to `textAlign` and supports only `center` and `start`.
- `appendByPredicate` -  Use `appendTo` values instead.
- `appendToParent` - Use `appendTo` with value `parent`.
- `hideDelay` - changed to `exitDelay`.
- `moveArrowTo` - Not supported by UX guidelines. Use `placement` to achieve it different arrow position.
- `showArrow` - Use `size` with value `small`.
- `showDelay` - changed to `enterDelay`.
- `size` - values are change from `normal, large` to `small, medium` by UX guidelines.


### New props
- `fixed` - whether to enable the fixed behaviour. This behaviour is used to keep the Tooltip at it's original placement even when it's being positioned outside the boundary.
- `flip` - whether to enable the flip behaviour. This behaviour is used to flip the Tooltips placement when it starts to overlap the target element.

### Testkit
Testkit was rewritten and is now async, which means you should `await` for every method invocation.
You should change the import path accordingly:

- `ReactTestUtils` - `import {tooltipTestkitFactory} from 'wix-style-react/dist/testkit';`
- `Enzyme` - `import {tooltipTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';`
- `Puppeteer` - `import {tooltipTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';`
- `Protractor` - `import {tooltipTestkitFactory} from 'wix-style-react/dist/testkit/protractor';`

### New API
API is slimmer and easier to interact it (with the recent types addition you can get an auto complete of these methods)

- `exists` - returns true if trigger element exists on the DOM.
- `tooltipExists` - returns true if tooltip element exists on the DOM.
- `mouseEnter` - mouse over the target element.
- `mouseLeave` - mouse leaves the target element.
- `getTooltipText` - returns tooltips content value in string.

## \<VBox/>

This component was deleted, use `<Box/>` instead.

# Guides
---

## Icons
Icons from `wix-style-react/new-icons` import path were removed.<br>
Please install and use icons from `wix-ui-icons-common` package directly. You can migrate your existing codebase using provided codemod.

Make sure you have `wix-ui-icons-common` package installed:

```bash
npm i wix-ui-icons-common
# or
yarn add wix-ui-icons-common
```

Then use our provided codemod or manually replace all icon imports with the following pattern:

```diff
- import Add from 'wix-style-react/new-icons/Add';
+ import Add from 'wix-ui-icons-common/Add';
```

To use codemod, run the following command (where the last argument is the directory or file for source code you want to transform):

```bash
npx wix-ui-codemod wix-style-react/icons-common src/
```

Please see [README.md](https://github.com/wix/wix-ui/blob/master/packages/wix-ui-codemod/README.md#wix-ui-codemod) file for more details on how to use the provided codemod.

### Using icons in your code

The icons from `wix-ui-icons-common` support all the same features as the old `wix-style-react/new-icons` icons. They are backwards compatible and their usage is the same:

```jsx
import Add from 'wix-ui-icons-common/Add';

export default () => (
  <div>
    <Add />
  </div>
);
```

## error & errorMessage --> status & statusMessage

Props:
- changed `error` to `status`
- changed `errorMessage` to `statusMessage`
- removed `theme` - Look at `<Input/>` component migration guide for more information.

Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- \~ \~ \~
- removed `hasError` - use `hasStatus` and `getStatus` instead
- removed `inputWrapperHasError` - use `hasStatus` and `getStatus` instead
- removed `isErrorVisible` - use `hasStatus` instead
- removed `getErrorTooltipContent` - use `getStatusMessage` instead

Before:

```jsx
<NumberInput error errorMessage="Error!" />
```

After:

```jsx
<NumberInput status="error" statusMessage="Error!" />
```

## help prop

Props:
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead

Testkit:
- removed `hasHelp` - use `<FormField/>` testkit instead

Before:
```jsx
<NumberInput help helpMessage="Help!" />
```

After:
```jsx
<FormField infoContent="Help!">
  <NumberInput />
</FormField>
```
