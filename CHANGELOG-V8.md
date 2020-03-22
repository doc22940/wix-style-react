# Changelog

All notable changes are documented in this file.

Types of changes:

1. **Added** for new features.
1. **Changed** for changes in existing functionality.
1. **Deprecated** for soon-to-be removed features.
1. **Removed** for now removed features.
1. **Fixed** for any bug fixes.
1. **Security** in case of vulnerabilities.
1. **Breaking** for breaking changes
1. **Docs** for documentation changes
1. **Lab** components and features that are still in a work in progress


## 8.0.0 - 2020-XX-XX

This is only a *brief* list of changes, for the *full* list of changes see the [migration guide](MIGRATION.md)<br>.
For changelog of version 7 [see here](CHANGELOG-V7.md)

### Deleted

- `<AutoCompleteComposite/>`
- `<FieldWithSelectionComposite/>`
- `<FullTextView/>`
- `<GoogleAddressInputWithLabel/>`
- `<HBox/>`
- `<InputAreaWithLabelComposite/>`
- `<MultiSelectComposite/>`
- `<SideMenu/>`
- `<SideMenuDrill/>`
- `<StatsWidget/>`
- `<TextLink/>`
- `<VBox/>`

### Changed

#### `<AddItem/>`
Props:
- removed `tooltipAppendTo`
- removed `tooltipContent`
- removed `tooltipPlacement`
- removed `tooltipFixed`
- removed `tooltipFlip`

#### `<Avatar/>`

Props:
- changed `color` - only values

#### `<CircularProgressBar/>`

Props:
- removed `shouldLoadAsync`

Testkit:
- changed `getTooltipErrorMessage` in driver (not uni) returns a `string` instead of `Promise<string>`
- removed `getTooltip`
- removed `isTooltipShown`

#### `<ColorInput/>`

Props:
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`

Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- removed `hasError`

#### `<DataTable/>`

This component is _internal_ and should not be used directly - use `<Table/>` instead

#### `<DatePicker/>`

Props:
- removed `isOpen`
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`

#### `<Dropdown/>`

Props:
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`


#### `<DropdownLayout/>`

Props:
- removed `theme`

Testkit:
- removed `hasTheme`

#### `<FillButton/>`

Props:
- removed `tooltipContent`

#### `<GoogleAddressInput/>`

Props:
- removed `theme`
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`

#### `<ImageViewer/>`

Props:
- removed `tooltipPlacement`
- removed `error` & `errorMessage`

Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- removed `isErrorVisible`
- removed `getErrorTooltipContent`

#### `<Input/>`

Props:
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`
- removed sub component `<Input.Units/>`
- removed `magnifyingGlass`
- removed `theme`

Testkit:
- removed `hasHelp`
- removed `clickUnit`
- removed `getUnit`
- removed `hasMagnifyingGlass`
- removed `clickMagnifyingGlass`
- removed `hasExclamation`
- removed `isNarrowError`

#### `<InputArea/>`

Props:
- removed `onTooltipShow`
- removed `theme`
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`

Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- removed `hasError`
- removed `hasWarning`
- removed `getTooltipDataHook`
- removed `getTooltipElement`
- removed `isErrorMessageShown`
- removed `mouseEnterErrorIndicator`
- removed `getErrorMessage`
- removed `getWarningMessage`

#### `<InputWithOptions/>`

Props:
- removed `error` & `errorMessage`
- removed `disableClickOutsideWhenClosed`

#### `<LinearProgressBar/>`

Props:
- removed `shouldLoadAsync`

Testkit:
- changed `getTooltipErrorMessage` in driver (not uni) returns a `string` instead of a `Promise<string>`
- removed `getTooltip`
- removed `isTooltipShown`

#### `<Loader/>`

Props:
- removed `shouldLoadAsync`

#### `<MultiSelect/>`

Props:
- removed `theme`
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`

Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- removed `inputWrapperHasError`

#### `<NoBorderInput/>`

Props:
- removed `theme`
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`


Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`

#### `<NumberInput/>`

Props:
- removed `theme`
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`


Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`

#### `<Page/>`

Props:
- removed `upgrade`

#### `<Popover/>`

Props:
- removed `disableClickOutsideWhenClosed`

#### `<PopoverMenu/>`
changed to next

#### `<RadioGroup/>`

Props:
- removed `type`

Testkit:
- removed `isButtonType`

#### `<RichTextInputArea/>`

Props:
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`

Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- removed `hasError`
- removed `getErrorMessage`

#### `<Search/>`

Props:
- removed `theme`
- removed `error` & `errorMessage`
- removed `help` & `helpMessage`


Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`

#### `<StatisticsWidget/>`

Props:
- removed `statistics`

#### `<Table/>`

Testkit:
- removed `clickRowChecbox` - removed due to typo, use `clickRowCheckbox` instead

#### `<TableActionCell/>`
Props:
- removed `upgrade`
- changed `primaryAction.theme` to `primaryAction.skin` (with new values)

#### `<Tag/>`

Props:
- removed `wrap`

#### `<Tooltip/>`

Props:
- removed `upgrade`
